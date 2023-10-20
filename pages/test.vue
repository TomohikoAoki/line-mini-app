<template>
    <div class="app-main">
        <div class="point-area">
            <div v-if="memberId">
                <h1 class="point-title">ハートフルポイント</h1>
                <div class="point-content">
                    <p class="current-point">現在のポイント:</p>
                    <p class="point-display"><span class="point">{{ point }}</span><span class="pt">pt</span></p>
                </div>
            </div>
            <div v-else>
                会員情報と紐づけされていないため、<br>表示できません。<br>
                こちらよりハートフル会員登録をお願いします。
                <button class="btn"><nuxt-link to="/register">会員登録</nuxt-link></button>
            </div>
        </div>
        <div class="navi">
            <div class="navi-item" @click="readingQrCode" :class="{ disable: !memberId }">ポイントを<br>貯める</div>
            <div class="navi-item" :class="{ disable: !memberId }">ポイントを使う</div>
        </div>
        <div>test:{{ test }}</div>
        <div class="qr-code">
            <p>lineProfile:{{ lineProfile }}</p>
            <p>token:{{ token }}</p>
        </div>
        <ConnectConfirm @connectFlag="fetchMemberData" v-if="confirmModal01"></ConnectConfirm>
    </div>
</template>

<script>
import ConnectConfirm from '../components/Modal/ConnectConfirm.vue'

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            test: null,
            point: 0,
            qrResult: null,
            qrError: null,
            confirmModal01: false,
            responseProfile: { name: 'tomohiko Aoki', email: 'aoki@ton-q.com' },
            responseMemberData: { point: 500, user_id: 'heartfull' }
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
    watch: {
        lineProfile(val) {
            if (val) {
                this.confirmModal01 = true
            }
        },
        async qrResult(val) {
            if (val) {
                const response = await axios.get('https://sysf.heartful.work/epoints/add/12157/122487/250/135465/add')
                this.test = response.data
                this.point = response.data.totalPoints
            }
        }
    },
    methods: {
        async fetchMemberData() {
            // this.tokenを送る
            //　const response = await axios.post('https://sysf.heartful.work/epoints/add/12157/122487/250/135465/add')

            this.confirmModal01 = false
            $nuxt.$loading.start();

            const response = await new Promise(resolve => setTimeout(() => {
                resolve(this.responseMemberData)
            }, 1000))

            if (response) {
                this.point = response.point
                this.$store.dispatch('setMemberId', response.user_id)

                $nuxt.$loading.finish();

                return
            }



        },
        readingQrCode() {
            this.qrResult = null
            if (!this.memberId) return false
            liff.scanCodeV2()
                .then((result) => {
                    this.qrResult = result
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
                const token = liff.getAccessToken();
                const profileData = liff.getDecodedIDToken()
                this.$store.dispatch('setToken', token)
                this.$store.dispatch('setProfile', profileData)
            })
            .catch((error) => {
                this.liffError = error;
                // const profileData = this.responseProfile
                // this.$store.dispatch('setProfile', profileData)
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

.test {
    text-align: center;
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

.qr-code {
    p {
        margin: 20px auto;
        width: 90%;
    }
}

.profile {
    width: 90%;
    margin: 30px auto;

    .profile-name {
        text-align: center;
        font-weight: bold;
        margin: 10px;
    }

    .profile-picture {
        img {
            width: 100%;
            height: auto;
        }
    }
}
</style>


