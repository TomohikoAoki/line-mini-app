<template>
    <div>
        <div class="point-area">
            <h1 class="point-title">ハートフルポイント</h1>
            <div class="point-content">
                <p class="current-point">現在のポイント:</p>
                <p class="point-display"><span class="point">{{ point }}</span><span class="pt">pt</span></p>
            </div>
        </div>
        <div class="test">
            <h2>テストエリア</h2>
            <button @click="test" class="btn">自分の<br>LINE情報</button>
            <div>{{ decodeToken }}</div>
        </div>
        <div class="navi">
            <div class="navi-item" @click="readingQrCode">ポイントを<br>貯める</div>
            <div class="navi-item"><nuxt-link to="/register">会員登録</nuxt-link></div>
        </div>
        <div class="qr-code">
            <p>QRコードテスト:{{ qrResult }}</p>
            <p>QRコードエラー:{{ qrError }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.point-area {
    width: 90%;
    margin: 50px auto;
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
</style>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            testToken: null,
            lineToken: null,
            point: 100,
            decodeToken: null,
            qrResult: null,
            qrError: null
        }
    },
    computed: {
        ...mapGetters({
            token: "getToken"
        })
    },
    methods: {
        getTestToken() {
            this.testToken = this.$store.getters['getToken']
        },
        test() {
            this.decodeToken = liff.getDecodedIDToken()
        },
        readingQrCode() {
            this.qrResult = null
            liff.scanCodeV2()
                .then((result) => {
                    this.qrResult = result
                })
                .catch((err) => {
                    this.qrError = err;
                });
        }
    },
    mounted() {
        this.$liffInit
            .then(() => {
                this.sdkVersion = liff.getVersion();
                const token = liff.getAccessToken();
                this.$store.dispatch('setToken', token)
            })
            .catch((error) => {
                this.liffError = error;
            });
    },
}

</script>
