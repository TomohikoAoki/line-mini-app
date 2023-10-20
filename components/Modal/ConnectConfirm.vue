<template>
    <div class="modal-container">
        <div class="modal-content">
            <div>
                このアプリを利用するにはメールアドレスでのハートフル会員との紐づけが必要です。
                <br>
                <form class="form">
                    <div class="form-group">
                        <label>メールアドレス</label>
                        <div class="form-content">
                            <input class="input-text" :value="profile.email">
                        </div>
                    </div>
                </form>
                <br>
                <button @click="ok" class="btn">許可する</button>
            </div>
            <div class="register">
                ハートフル会員にまだご登録頂いていない方は、こちらより新規でご登録ください。
                <button @click="ok" class="btn"><nuxt-link to="/register">新規登録</nuxt-link></button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    methods: {
        ok() {
            this.$emit('connectFlag', true)
        }
    },
    computed: {
        ...mapGetters({
            profile: 'getProfile'
        })
    }
}
</script>

<style lang="scss" scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);

    .modal-content {
        position: absolute;
        padding: 2em 1em;
        width: 80%;
        height: 70%;
        background-color: #fff;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        .register {
            padding-top: 2em
        }
    }
}

.btn {
    display: block;
    margin: 10% auto;
}

.form {
    width: 90%;
    margin: 0 auto;

    .form-group {
        margin: 0 0 1em 0;

        .form-label {}

        .form-content {
            .input-text {
                border: 1px solid #b7b7b7;
                width: 100%;
                height: 3em;
                border-radius: 10px;
            }
        }
    }


}

.btn {
    width: 100px;
    margin: 0 auto;
    padding: 1.2em 0;
    text-align: center;
    background-color: #854b4b;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
}
</style>