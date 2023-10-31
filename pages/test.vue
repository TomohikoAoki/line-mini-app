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
        <Transition name="fade">
            <ConnectConfirm v-model="modalFlag" v-if="modalFlag" @formData="connectMember" class="connect-confirm">
            </ConnectConfirm>
        </Transition>
        <Transition name="fade">
            <FlashMessage v-if="message" @close="closeMessage">{{ message }}</FlashMessage>
        </Transition>
        <nav class="link">
            <ul class="link__list">
                <li class="link__list_item"><span class="item_container" @click="opneConnectMember">会員連携</span></li>
                <li class="link__list_item"><nuxt-link to="/terms" class="item_container">利用規約</nuxt-link></li>
                <li class="link__list_item"><nuxt-link to="/privacy" class="item_container">プライバシーポリシー</nuxt-link></li>
            </ul>
        </nav>
        <div class="test">
            <p><span class="labeel">response</span><br> {{ response }}</p>
            <p><span class="labeel">err</span><br>{{ err }}</p>
            <p><span class="labeel">query</span><br>{{ query }}</p>
            <p><span class="labeel">test</span><br>{{ test }}</p>
        </div>
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
            qrError: null,
            qrValue: null,
            err: null,
            query: null
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
        // storeのtokenの監視
        token(val) {
            // storeのtokenが変化して存在してたら
            if (val) {
                $nuxt.$loading.start();

                // watchの中だからthen構文で
                axios.get(`https://sysf.heartful.work/epoints/verifyLineToken/?id_token=${this.token}`)
                    .then((response) => {
                        this.response = response

                        // this.point = response.data.data.point ?? 0
                        // this.$store.dispatch('setMember', response.data.data)
                        this.message = '会員情報との紐づけができました。'

                        $nuxt.$loading.finish();
                    }).catch((err) => {
                        // 紐づけができなかった場合
                        if (!err.response) {
                            this.err = err
                            this.message = 'ネットワークエラー。ステータスコード拾えない'
                            $nuxt.$loading.finish();
                            return false
                        }
                        this.err = err.response
                        // ひもづけを行うためのモーダルオープン
                        this.modalFlag = true
                        $nuxt.$loading.finish();
                    })
            }
        }
    },
    methods: {
        // LINE_IDと会員情報の紐づけ
        // modalからのformDataのemitで開始
        async connectMember(formData) {
            this.modalFlag = false
            $nuxt.$loading.start();

            // 送信 {usrmail:string, password:string, member_id,string}
            const response = await axios.get(`/api2/epoints/linkmember/?usrmail=${formData.usrmail}&password=${formData.password}&id_token=${this.token}`)
                .catch((err) => {
                    //ネットワークエラーの場合はresponseがないので
                    if (!err.response) {
                        this.err = err
                        this.message = 'ネットワークエラー。ステータスコード拾えない'
                        return err
                    }
                    return err.response
                })

            this.response = response.data

            // 紐づけできた場合は、ポイントを更新
            if (response.status === 200) {
                // this.point = response.data.data.point

                this.message = '紐づけが完了しました'
            }
            else if (response.status === 404) {
                this.message = '情報が見つかりませんでした。'
            }
            else {
                this.message = 'まだ設定していないエラーです'
            }

            $nuxt.$loading.finish();
        },
        // point送信関数
        async sendPoint(result) {
            const response = await axios.post('https://tonq.net/api/heartful/point/add', result, {
                headers: {
                    Authorization: "ApiToken ymEYCBC4BjxjxAhvgUF2TLCqRmYtwXaNKjwSbwjv",
                }
            }).catch(err => err.response)
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
                    //let value = JSON.parse(result.value)

                    this.qrValue = result

                    // ここに使用期限が切れていないかのチェックいれる
                    const date = new Date()
                    const time = date.getTime()

                    // 切れている場合は表示
                    // if (value.exp < time) {
                    //     this.message = '有効期限が切れています'
                    //     return false
                    // }

                    // userID,point,codeIDを送信
                    // value['member_id'] = this.member.member_id
                    // return this.sendPoint(value)
                })
                // .then((response) => {
                //     this.response = response
                //     this.$store.dispatch('setMember', response.data.data)
                //     this.point = response.data.data.point
                //     // 表示 成功した
                //     this.message = 'ポイントが加算されました'
                // })
                .catch((err) => {
                    // どうするか？？？？
                    this.message = 'すでに使用されたクーポンです'
                });
            $nuxt.$loading.finish();
        },
        closeMessage() {
            this.message = null
        },
        opneConnectMember() {
            this.modalFlag = true
        }
    },
    async mounted() {
        // line ブラウザ以外で表示した場合？？
        if (this.$route.query.liffClientId) {
            this.query = this.$route.query

            let formData = new URLSearchParams()
            formData.append('grant_type', 'authorization_code')
            formData.append('code', `${this.$route.query.code}`)
            formData.append('redirect_uri', `${this.$route.query.liffRedirectUri}`)
            formData.append('client_id', `${this.$route.query.liffClientId}`)
            formData.append('client_secret', '2ad91db933341ce52b3b92d586a09ef9')

            const res = await axios.post('https://api.line.me/oauth2/v2.1/token', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).catch(err => err.response)

            this.test = res
        }


        // 初期化
        this.$liffInit
            .then(() => {
                const token = liff.getIDToken();
                const profileData = liff.getDecodedIDToken()

                //storeにLINEのtokenとprofileを保存
                this.$store.dispatch('setToken', token)
                this.$store.dispatch('setProfile', profileData)


            }).catch((error) => {
                this.$router.push('/')
            })

    },
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=swap');

.app-main {
    background-color: rgb(70, 53, 106);
    background-image: url(~static/images/bg.jpg);
    background-repeat: repeat-y;
    background-size: 100% auto;
    position: relative;
    width: 100%;
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
            font-family: 'Amiri', serif;
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

.connect-confirm {
    width: 100vw;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1001;
    overflow-y: scroll;
    -webkit-overflow-scrolling: auto;
}

.link {
    width: 90%;
    margin: 0 auto;
    color: #efb94b;
    padding-top: 30px;
    padding-bottom: 70px;

    .link__list {
        .link__list_item {
            border-bottom: 1px solid;

            .item_container {
                display: block;
                width: 100%;
                height: 100%;
                padding: 1em;

                &:hover {
                    filter: brightness(120%);
                    background-color: blueviolet;
                }
            }
        }
    }
}

.test {
    width: 100%;
    margin: 0 auto;
    overflow-wrap: break-word;
    background-color: #000000;
    color: #fff;
}

.labeel {
    display: inline-block;
    padding: 0.5em;
    background-color: rgb(69, 36, 36);
    color: #fff;
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


