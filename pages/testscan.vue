<template>
    <div class="app-main">
        <div className="App">
            <header className="App-header">
                
                <h1 class="point-title">ハートフルポイント</h1>
                <div class="navi">
                    <div class="navi-item" @click="readingQrCode">ポイントを貯める</div>
                </div>
                
            </header>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            modalFlag: false,
            point: 0,
        }
    },
    components: {

    },
    computed: {
        ...mapGetters({
            token: "getToken",
            memberId: 'getMemberId',
            lineProfile: 'getProfile',
        }),
    },
    watch: {
        token(val) {
            if (val) {
                $nuxt.$loading.start();
                axios.get(`https://sysf.heartful.work/epoints/verifyLineToken/?id_token=${this.token}`)
                    .then((response) => {
                        this.response = response.data

                        // this.point = response.data.data.point ?? 0
                        // this.$store.dispatch('setMember', response.data.data)

                        $nuxt.$loading.finish();
                    }).catch((err) => {
                        this.err = err.response

                        if (err.response.status === 402) {
                            this.modalFlag = true
                        }
                        // エラーの場合
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
            const response = await axios.get(`https://uranai.heartf.com/Public/epoints/linkmember/?usrmail=${formData.usrmail}&password=${formData.password}&id_token=${this.token}`)
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
        // QRコードリーダー
        readingQrCode() {
            $nuxt.$loading.start();
                liff.scanCodeV2()
                    .then((result) => {
                    // result = { value: "" }
                    })
                .catch((error) => {
                    this.message = error.message || 'エラーが発生しました。';
                });
            // liff.scanCodeV2()
            //     .then((result) => {
            //         // this.getData = result.value
            //         // this.getDataAry = getData.split(',')
            //         // this.ekanteis_id = getDataAry[0]
            //         // this.point = getDataAry[1]
            //         // return axios.get('https://sysf.heartful.work/epoints/add/12157/122487/250/135465/add')
            //         // return axios.get('https://sysf.heartful.work/epoints/add/'+ memberId + '/'+ ekanteis_id +'/'+ point + '/LINE_ID/add')
            //     })
            //     .catch((err) => {
            //         this.qrError = err;
            //     });
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
                const profileData = liff.getDecodedIDToken()

                //storeにLINEのtokenとprofileを保存
                this.$store.dispatch('setToken', token)
                this.$store.dispatch('setProfile', profileData)


            }).catch((error) => {
                // どうしようもないからエラーページに飛ばす
                this.error = error
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
</style>


