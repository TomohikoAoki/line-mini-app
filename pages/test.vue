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
            <p>{{ token }}</p>
        </div>
        <ConnectConfirm v-model="modalFlag" v-if="modalFlag" @formData="connectMember"></ConnectConfirm>
    </div>
</template>

<script>
import ConnectConfirm from '../components/Modal/ConnectConfirm.vue'
import crypto from 'crypto';

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
        ConnectConfirm,
    },
    computed: {
        ...mapGetters({
            token: "getToken",
            memberId: 'getMemberId',
            lineProfile: 'getProfile',
        }),
    },
    methods: {
        async connectMember(formData) {
            this.modalFlag = false
            $nuxt.$loading.start();

            const lineToken = liff.getIDToken()
            formData['line_id'] = this.token

            const currentDate = new Date().toISOString().split('T')[0]
            const string = currentDate + 'tsuchiura8888'

            const apiKey = crypto.createHash('md5').update(string).digest('hex')
            console.log(apiKey);

            try {
                const response = await axios.get(`https://sysf.heartful.work/epoints/linkmember?email=test@example.com&password=YourPassword&id=123`, {
                    headers: {
                        'API-Key': `${apiKey}`
                    }
                })

                console.log(response.data)

                // 紐づけされていた場合は、ポイントとuser_idを返却
                if (response.status === 200) {
                    this.point = response.data.totalPoints
                    this.$store.dispatch('setMemberId', response.data.userId)

                    $nuxt.$loading.finish();
                    return
                }
            } catch (err) {
                console.log(err)
            }


            $nuxt.$loading.finish();
        },
        // QRコードリーダー
        readingQrCode() {
            $nuxt.$loading.start();
            liff.scanCodeV2()
                .then((result) => {
                    return axios.get('https://sysf.heartful.work/epoints/add/12157/122487/250/135465/add')
                }).then((response) => {
                    this.test = response.data
                    this.point = response.data.totalPoints
                })
                .catch((err) => {
                    this.qrError = err;
                });
            $nuxt.$loading.finish();
        }
    },
    mounted() {
        this.$liffInit
            .then(() => {
                const token = liff.getIDToken();
                const profileData = liff.getDecodedIDToken()
                //storeにLINEのtokenとprofileを保存
                this.$store.dispatch('setToken', token)
                this.$store.dispatch('setProfile', this.responseProfile)
                // 最初のハートフルサーバーへのアクセス
                // LINEのIDで紐づけできるか確認してもらう
                // 紐づけされている場合は、ポイントとuser_idを返却
                // 紐づけされていない場合は、何もなし(LINEのIDはサーバーに保存してもらう)
                return axios.get('https://sysf.heartful.work/epoints/add/12157/0/135465/0/add')

            }).then((response) => {
                // 返ってきたデータからpointは表示, user_idはstoreに保存
                // 紐づけがない場合は、user_idはfalseからnullに、ポイントは0
                // 手動で紐付けを則すためのモーダルを開く
                // this.test = response
                this.point = response.data.totalPoints ?? 0
                this.$store.dispatch('setMemberId', null)
                this.modalFlag = true
            })
            .catch((error) => {
                this.liffError = error;
            });
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
</style>


