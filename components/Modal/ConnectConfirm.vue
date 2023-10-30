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
                        <input class="input-text" v-model="formData.usrmail" type="email" @blur="fieldValidation('usrmail')"
                            :class="{ valid: validation.usrmail, invalid: validation.usrmail === false }">
                        <div class="error"><span v-if="validation.usrmail === false">{{
                            validationMessage.usrmail[messageNumber] }}</span>
                        </div>

                    </div>
                </div>
                <div class="form-group">
                    <label>パスワード</label>
                    <div class="form-content">
                        <input class="input-text" v-model="formData.password" type="password"
                            @blur="fieldValidation('pass')"
                            :class="{ valid: validation.password, invalid: validation.password === false }">
                    </div>
                    <div class="error"><span v-if="validation.password === false">{{
                        validationMessage.password[messageNumber] }}</span></div>
                </div>
                <button @click.prevent="connect" class="btn" :disabled="!validation.usrmail || !validation.password"
                    :class="{ disable: !validation.usrmail || !validation.password }">
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

export default {
    data() {
        return {
            // 送信用 formData
            formData: {
                usrmail: '',
                password: '',
            },
            // validation flag
            validation: {
                usrmail: null,
                password: null,
            },
            // validetion message
            validationMessage: {
                usrmail: ['必ず入力してください。', 'メールアドレスの形式が違います'],
                password: ['必ず入力してください。', '半角英数字で入力してください。']
            },
            // messageのための番号
            messageNumber: null
        }
    },
    computed: {
    },
    methods: {
        connect() {
            this.$emit('formData', this.formData)
        },
        close() {
            this.$emit('input', false)
        },
        // validation
        fieldValidation(field) {
            // validationの形式
            const rgxMail = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
            const rgxPass = /^[0-9a-zA-Z]*$/
            // validation
            if (field === 'usrmail') {
                // mail 空の場合
                if (this.formData.usrmail === '') {
                    this.messageNumber = 0
                    this.validation.usrmail = false
                    return
                }
                // mail 正規表現を合わない場合
                this.messageNumber = 1
                this.validation.usrmail = rgxMail.test(this.formData.usrmail)
                return
            }
            if (field === 'pass') {
                // password 空の場合
                if (this.formData.password === '') {
                    this.messageNumber = 0
                    this.validation.password = false
                    return
                }
                // password 正規表現を合わない場合
                this.messageNumber = 1
                this.validation.password = rgxPass.test(this.formData.password)
                return
            }
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
                padding: 0 1em;
                border-radius: 10px;

                &.valid {
                    border-color: rgb(16, 138, 97);
                }

                &.invalid {
                    border-color: rgb(138, 61, 16);
                }
            }
        }
    }


}

.error {
    font-size: 0.8em;
    padding-top: 0.1em;
    height: 1em;

    span {
        color: brown;
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