<template>
    <div class="app-main">
        <div class="point-area">
            <div>
                <h1 class="point-title">ハートフルポイント</h1>
                <div class="point-content">
                    <p class="current-point">現在のポイント:</p>
                    <p class="point-display"><span class="point">{{ point }}</span><span class="pt">pt</span></p>
                </div>
            </div>
        </div>
        <div class="navi">
            <div class="navi-item" @click="readingQrCode">ポイントを<br>貯める</div>
            <div class="navi-item">ポイントを使う</div>
        </div>
        <div class="test">
            <p>member:{{ member }}</p>
            <p>result: {{ result }}</p>
            <p>response: {{ response }}</p>
            <p>exp: {{ exp }}</p>
            <p>qrError: {{ qrError }}</p>
        </div>
        <ConnectConfirm v-model="modalFlag" v-if="modalFlag" @formData="connectMember"></ConnectConfirm>
        <Transition name="fade">
            <FlashMessage v-if="message" @close="closeMessage">{{ message }}</FlashMessage>
        </Transition>
    </div>
</template>

<script>
import ConnectConfirm from '../components/Modal/ConnectConfirm.vue'
import FlashMessage from '../components/Modal/FlashMessage.vue'

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            modalFlag: false,
            point: 0,
            message: null,
            response: null,
            email: null,
            name: null,
            test: null,
            result: null,
            time: null,
            exp: null,
            qrError: null
        }
    },
    components: {
        ConnectConfirm,
        FlashMessage
    },
    computed: {
        ...mapGetters({
            token: "getToken",
            member: 'getMember',
            lineProfile: 'getProfile',
        }),
    },
    watch: {
        async token(val) {
            if (val) {
                $nuxt.$loading.start();
                this.test = val
                const response = await axios.post('https://tonq.net/api/heartful/first', { 'line_token': this.token }, {
                    headers: {
                        Authorization: "ApiToken ymEYCBC4BjxjxAhvgUF2TLCqRmYtwXaNKjwSbwjv",
                    }
                })

                // @response {status:int, data:{object}}
                // 返ってきたデータからpointは表示, member情報はstoreに保存
                // 参照データがない場合は、新しく会員情報を作って返ってくる(member_idとline_idの紐づけだけされている)
                this.point = response.data.data.point ?? 0
                this.$store.dispatch('setMember', response.data.data)

                // データにmailがない場合は初めてのアクセス or 紐づけされていないと判断
                // 手動で紐付けを則すためのモーダルを開く
                if (response.data.data.email === null) {

                    this.modalFlag = true
                }
                $nuxt.$loading.finish();
            }
        }
    },
    methods: {
        // LINE_IDと会員情報の紐づけ
        // modalからのformDataのemitで開始
        async connectMember(formData) {
            this.modalFlag = false
            $nuxt.$loading.start();

            formData['member_id'] = this.member.member_id

            // 送信 {usrmail:string, password:string, member_id,string}
            try {
                const response = await axios.post('https://tonq.net/api/heartful/connect', formData, {
                    headers: {
                        Authorization: "ApiToken ymEYCBC4BjxjxAhvgUF2TLCqRmYtwXaNKjwSbwjv",
                    }
                })

                // response {status:int,data:{object}}
                // 紐づけできた場合は、ポイントとmemberを更新
                if (response.status === 200) {
                    this.point = response.data.data.point
                    this.$store.dispatch('setMember', response.data.data)

                    $nuxt.$loading.finish();

                    // 表示 紐づけが完了しました
                    this.message = '紐づけが完了しました'

                    return
                }
                if (response.status === 404) {
                    // 表示 情報が見つかりませんでした
                    this.message = '情報が見つかりませんでした'
                }
            } catch (err) {
                // サーバー側のエラー
                console.log(err)
            }
            $nuxt.$loading.finish();
        },
        // point送信関数
        async sendPoint(result) {
            const response = await axios.post('https://tonq.net/api/heartful/point/add', result, {
                headers: {
                    Authorization: "ApiToken ymEYCBC4BjxjxAhvgUF2TLCqRmYtwXaNKjwSbwjv",
                }
            })
            this.response = response
            return response
        },
        // QRコードリーダー起動 & ポイント送信
        readingQrCode() {
            $nuxt.$loading.start();
            liff.scanCodeV2()
                .then((result) => {
                    // result:QRコードからの情報 {value:{point:int,code_id:any,user_id:string,exp:int}}
                    // codeIDで連続の使用を防ぐ
                    let value = JSON.parse(result.value)

                    // ここに使用期限が切れていないかのチェックいれる
                    const date = new Date()
                    const time = date.getTime()

                    // 切れている場合は表示
                    if (value.exp < time) {
                        this.message = '有効期限が切れています'
                        return false
                    }

                    // userID,point,codeIDを送信
                    value['member_id'] = this.member.member_id
                    return this.sendPoint(value)
                })
                .then((response) => {
                    this.response = response
                    this.$store.dispatch('setMember', response.data.data)
                    this.point = response.data.data.point
                    // 表示 成功した
                    this.message = 'ポイントが加算されました'
                })
                .catch((err) => {
                    // どうするか？？？？
                    this.message = 'すでに使用されたクーポンです'
                });
            $nuxt.$loading.finish();
        },
        closeMessage() {
            this.message = null
        }
    },
    mounted() {
        // 初期化
        this.$liffInit
            .then(() => {
                const token = liff.getIDToken();
                // テスト用
                //const token = 'eyJraWQiOiI2YWE4YWQwN2NkMmFhYWRjYzY1NmY3ZTIxMzljY2U4YjhjNGE2YzgxYzI5MDQyZjQ4MTY4MDY3MmZkMDNjOTY5IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTFlMDAyNDUwNTc3ZDFiMjVlMDNiZmE2M2FlZGMzOWVlIiwiYXVkIjoiMjAwMTA2MTYzNyIsImV4cCI6MTY5ODExODA0MCwiaWF0IjoxNjk4MTE0NDQwLCJuYW1lIjoiVG9tb2hpa28gIEFva2kiLCJwaWN0dXJlIjoiaHR0cHM6Ly9wcm9maWxlLmxpbmUtc2Nkbi5uZXQvMGh2UzB0dnY4N0tYd05EUVY4dl9OV0t6RklKeEY2SXk4MGRXbGtIeW9OZmtra09HbF9OV2t6SFN3UGRVOGtPV2NvTnpoaUdpRllmazUxIn0.PzXC01jUWn0cYshIK2pJxem-shHZbdCtepj4y5TO5EKN7gw5nqz1rKPLGGfJ9GGyYdWFNDlGv-bUguvNCfFBJw'

                const profileData = liff.getDecodedIDToken()

                //storeにLINEのtokenとprofileを保存
                this.$store.dispatch('setToken', token)
                this.$store.dispatch('setProfile', this.responseProfile)


            }).catch((error) => {
                // どうしようもないのでエラーページに飛ばす
                this.error = error
                console.log(error)
            })

    },
}

</script>

<style lang="scss">
.app-main {
    position: relative;
}

.point-area {
    width: 90%;
    margin: 0 auto;
    padding: 50px 10px;
    filter: drop-shadow(0 0 5px #999);
    border-radius: 10px;

    .point-title {
        text-align: center;
        background-color: #d99090;
        font-weight: bold;
        color: #fff;
        padding: 1em;
        border-radius: 10px 10px 0 0;
    }
}

.point-content {
    background-color: #FFF;
    padding: 3em;
    text-align: center;
    border-radius: 0 0 10px 10px;

    .current-point {}

    .point-display {
        .point {
            color: rgb(117, 21, 40);
            font-weight: bold;
            font-size: 3em;
        }

        .pt {
            font-weight: bold;
            font-size: 1.3em;
        }
    }
}


.navi {
    display: flex;
    justify-content: center;

    .navi-item {
        width: 150px;
        padding: 70px 0;
        text-align: center;
        background-color: #d99090;
        color: #fff;
        font-weight: bold;
        border-radius: 10px;
        margin: 0 0.4em;

        &.disable {
            opacity: 0.2;
        }

        a {
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    }
}

.btn {
    display: block;
    width: 100px;
    margin: 20px auto;
    padding: 1.2em 0;
    text-align: center;
    background-color: #854b4b;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
}

.test {
    width: 100%;

    p {
        width: 90%;
        margin: 0 auto;
    }
}

.fade-enter {
    /*開始の状態を指定する*/
    opacity: 0;
    transform: translateY(-20px);
}

.fade-enter-to {
    /*終了の状態を指定する*/
    opacity: 1;
}

.fade-enter-active {
    /*動作（イージングや時間）を指定する*/
    transition: opacity 250ms ease-out, transform 250ms ease-out;
}

.fade-leave {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

.fade-leave-active {
    transition: opacity 250ms ease-out;
}
</style>


