<template>
    <div class="modal-container">
        <div class="modal-content">
            <p>
                以前にハートフル会員にご登録頂いている場合は、データの紐づけが必要です。
                下記にご登録いただいたメールアドレスとパスワードを入力し、送信してください。
            </p>
            <form class="form">
                <div class="form-group">
                    <label>メールアドレス</label>
                    <div class="form-content">
                        <input class="input-text" v-model="formData.usrmail" type="email">
                    </div>
                </div>
                <div class="form-group">
                    <label>パスワード</label>
                    <div class="form-content">
                        <input class="input-text" v-model="formData.password" type="password">
                    </div>
                </div>
                <button @click.prevent="connect" class="btn">
                    確認
                </button>
            </form>
            <br>
            <div class="register">
                このまま利用する場合は閉じるを押してください。
                <button @click="close" class="btn">閉じる</button>
            </div>
        </div>
    </div>
</template>

<script>
// import { ValidationProvider, extend, ValidationObserver, localize } from 'vee-validate/dist/vee-validate'
// import { required, email, alpha_num } from 'vee-validate/dist/rules'
// import ja from 'vee-validate/dist/locale/ja.json'

// extend('required', required);
// extend('email', email)
// extend('alpha_num', alpha_num)

// localize('ja', ja)
// localize({
//     ja: {
//         names: {
//             email: 'メールアドレス',
//             password: 'パスワード',
//         },
//         messages: {
//             email: 'メールアドレスの形式が有効でありません。',
//             alpha_num: '半角英数字で入力してください。'
//         }
//     },
// })

export default {
    data() {
        return {
            formData: {
                usrmail: '',
                password: '',
            }
        }
    },
    // components: {
    //     ValidationProvider,
    //     ValidationObserver,
    // },
    methods: {
        connect() {
            this.$emit('formData', this.formData)
        },
        close() {
            this.$emit('input', false)
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);

    .modal-content {
        position: absolute;
        padding: 2em 1em;
        width: 90%;
        height: 80%;
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

    &.disable {
        opacity: 0.2;
    }
}

.form {
    width: 90%;
    margin: 0 auto;

    .form-group {
        margin: 0 0 1em 0;

        .form-label {}

        .form-content {
            .input-text {
                display: block;
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