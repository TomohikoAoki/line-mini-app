<template>
    <div class="app-main">
        <div class="point-area">
            <div>
                <div>
                    <SvgBase icon-name="display-point-top" viewBox="0 0 258.5 65.5" iconColor="#efb94b"
                        iconTitle="ハートフルポイント">
                        <DisplayPointTop></DisplayPointTop>
                    </SvgBase>
                </div>
                <div class="point-content">
                    <p class="current-point">現在のポイント:</p>
                    <p class="point-display"><span class="point">{{ point }}</span><span class="pt">pt</span></p>
                </div>
                <div>
                    <SvgBase icon-name="display-point-bottom" viewBox="0 0 258.5 35" iconColor="#efb94b"
                        iconTitle="ハートフルポイントボトム">
                        <DisplayPointBottom></DisplayPointBottom>
                    </SvgBase>
                </div>
            </div>
        </div>
        <div class="navi">
            <div class="navi-item" @click="addPoint">
                <div class="navi-item__icon">
                    <SvgBase icon-name="icon-navi-add" viewBox="0 0 77.5 85.4" iconColor="#efb94b" iconTitle="ポイントを貯める">
                        <IconNaviAdd></IconNaviAdd>
                    </SvgBase>
                </div>
                <p class="navi-item__text">ポイントを<br>貯める</p>
            </div>
            <div class="navi-item" @click="usePointOpen">
                <div class="navi-item__icon">
                    <SvgBase icon-name="icon-navi-add" viewBox="0 0 77.5 85.4" iconColor="#efb94b" iconTitle="ポイントを貯める">
                        <IconNaviAdd></IconNaviAdd>
                    </SvgBase>
                </div>
                <p class="navi-item__text">ポイントを<br>使う</p>
            </div>
        </div>
        <Transition name="fade">
            <ConnectConfirm v-model="modalFlag" v-if="modalFlag" @formData="connectMember"
                class="fixed-modal connect-confirm">
            </ConnectConfirm>
        </Transition>
        <Transition name="fade">
            <UsePointModal v-model="usePointModalFlag" v-if="usePointModalFlag" :totalPoint="point" @usePoint="usePoint"
                class="fixed-modal connect-confirm">
            </UsePointModal>
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
import UsePointModal from '../components/Modal/UsePoint.vue'
import FlashMessage from '../components/Modal/FlashMessage.vue'

import SvgBase from '../components/Svg/Base.vue'
import DisplayPointTop from '../components/Svg/Data/DisplayPointTop'
import DisplayPointBottom from '../components/Svg/Data/DisplayPointBottom'
import IconNaviAdd from '../components/Svg/Data/IconNaviAdd'

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            modalFlag: false,
            usePointModalFlag: false,
            point: 100,
            message: null,
            response: null,
            test: null,
            err: null,
            query: null
        }
    },
    components: {
        ConnectConfirm,
        UsePointModal,
        FlashMessage,
        SvgBase,
        DisplayPointTop,
        DisplayPointBottom,
        IconNaviAdd
    },
    computed: {
        ...mapGetters({
            token: "getToken",
            member: 'getMember',
            lineProfile: 'getProfile',
            firstContact: 'getFirstContact',
        }),
    },
    methods: {
        // LINE_IDと会員情報の連携
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
        // LineIDが登録されている場合、
        // point取得
        async connectMemberByLineToken() {
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
        },
        // QRコードリーダー起動 & ポイント追加
        addPoint() {
            $nuxt.$loading.start();
            liff.scanCodeV2()
                .then((result) => {
                    if (result.value !== null) {
                        // TODO: 【code_id】修正予定
                        var ekanteisId = JSON.parse(result.value)['code_id'];
                        // alert(ekanteisId);

                        return this.axiosGetTotalpoints('add/195124');
                        // totalpoints = axiosGet('add/'+ ekanteisId);
                    }
                    this.message = 'QRコードが正常に読み込まれませんでした'
                })
                .then((point) => {
                    this.message = 'ポイントが加算されました'
                    this.point = point
                })
                .catch((err) => {
                    // どうするか？？？？
                    this.err = err
                    this.message = '何かしらエラー'
                });
            $nuxt.$loading.finish();
        },
        usePointOpen() {
            this.usePointModalFlag = true
        },
        // QRコードリーダー起動 & ポイント使用
        usePoint(point) {
            liff.scanCodeV2()
                .then((result) => {
                    if (result.value != null) {
                        var val = JSON.parse(result.value);
                        // 【code_id】修正予定
                        var ekanteisId = val['code_id'];

                        return this.axiosGetTotalpoints(`use/100/${point}`);
                        // totalpoints = axiosGet('use/'+ ekanteisId + '/' + point);
                    }
                    this.message = 'QRコードが正常に読み込まれませんでした'
                })
                .then((returnPoint) => {
                    this.message = 'ポイントが使用しました。'
                    this.point = returnPoint
                })
                .catch((error) => {
                    alert('エラーが発生しました。2' + error);
                });
        },
        axiosGetTotalpoints(url) {
            return axios.get(`https://sysf.heartful.work/epoints/${url}`)
                // Successful
                .then(function (response) {
                    var totalpoints = response.data['totalPoints'];
                    alert('response:' + totalpoints);
                    return totalpoints;
                })
                // failure
                .catch(function (error) {
                    console.log(error);
                    alert('通信エラー：' + error);
                    return error;
                });

        },
        // 会員連携モーダル開く
        opneConnectMember() {
            this.modalFlag = true
        },
        closeMessage() {
            this.message = null
        },
    },
    async mounted() {
        // lineブラウザ以外で表示した場合？？
        // queryの有無で判断(LINEブラウザの場合queryがなかったから)
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
            }).catch(err => {
                if (!err.response) {
                    this.err = err
                    this.message = 'ネットワークエラー'
                    return err
                }
                return err.response
            })

            this.test = res
        }

        // 初回のみ自動で
        // LineIdが紐づいていればpoint取得
        if (this.firstContact) {
            this.connectMemberByLineToken()
            this.$store.dispatch('setFirstContact')
        }
    },
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=swap');

$baseColor : #efb94b;

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
    padding: 3em;
    text-align: center;

    .current-point {
        color: $baseColor;
    }

    .point-display {
        .point {
            font-family: 'Amiri', serif;
            color: $baseColor;
            font-weight: bold;
            font-size: 3em;
        }

        .pt {
            font-family: 'Amiri', serif;
            color: $baseColor;
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
        padding: 25px 0 20px 0;
        text-align: center;
        border: 1px solid $baseColor;
        color: #fff;
        font-weight: bold;
        border-radius: 10px;
        margin: 0 0.4em;
        position: relative;

        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: $baseColor;
            opacity: 0.05;
        }

        .navi-item__icon {
            width: 45%;
            margin: 0 auto;
        }

        .navi-item__text {
            padding-top: 1em;
            font-size: 0.9em;
            color: $baseColor;
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

.fixed-modal {
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
        border-top: 1px solid $baseColor;
        border-bottom: 1px solid $baseColor;

        .link__list_item {
            border-bottom: 1px dotted;

            &:last-child {
                border-bottom: none;
            }

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


