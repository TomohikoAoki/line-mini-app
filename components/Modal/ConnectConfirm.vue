<template>
    <div class="modal-container">
        <div class="modal-content">
            <h2 class="modal-title">ハートフル会員に連携して<br>ポイントを合算する</h2>
            <p class="first-text">
                ハートフルポイントをすでにお持ちの方でこれまで貯めていたポイントと合算してポイントを貯めたい方はID連携してください。<br>
                初めてご利用の方は会員登録なしでLINE内でハートフルポイントを貯めることができます。
            </p>
            <p class="first-text__note">※LINE内で貯めたハートフルポイントを会員連携で合算することはできませんのでご注意ください。</p>
            <p class="first-text__note">※受付予約の前に会員連携をしていただかないとポイントは付与されません。</p>
            <form class="form">
                <div class="form-group">
                    <label class="form-label">メールアドレス</label>
                    <div class="form-content">
                        <input class="input-text" v-model="formData.usrmail" type="email" @blur="fieldValidation('usrmail')"
                            :class="{ valid: validation.usrmail, invalid: validation.usrmail === false }">
                        <div class="error"><span v-if="validation.usrmail === false">{{
                            validationMessage.usrmail[messageNumber.usrmail] }}</span>
                        </div>

                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">パスワード</label>
                    <div class="form-content">
                        <input class="input-text" v-model="formData.password" type="password"
                            @blur="fieldValidation('password')"
                            :class="{ valid: validation.password, invalid: validation.password === false }">
                    </div>
                    <div class="error"><span v-if="validation.password === false">{{
                        validationMessage.password[messageNumber.password] }}</span></div>
                </div>
                <button @click.prevent="connect" class="btn" :disabled="!validation.usrmail || !validation.password"
                    :class="{ disable: !validation.usrmail || !validation.password }">
                    確認
                </button>
            </form>
            <div class="close-area">
                <p class="close-area__text">会員登録なしでLINE内でハートフルポイントを貯める場合は閉じるを押してください。</p>
                <button @click="close" class="close">
                    <span class="close-icon">
                        <SvgBase icon-name="icon-navi-add" viewBox="0 -960 960 960" iconColor="#504848;"
                            iconTitle="モーダル閉じる">
                            <IconClose></IconClose>
                        </SvgBase>
                    </span>
                    <span class="close-text">CLOSE</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    disableBodyScroll,
    clearAllBodyScrollLocks,
} from "body-scroll-lock";

import SvgBase from '../../components/Svg/Base.vue'
import IconClose from '../../components/Svg/Data/Close.vue'

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
            messageNumber: {
                usrmail: null,
                password: null
            }

        }
    },
    components: {
        SvgBase,
        IconClose
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
            const rgx = {
                usrmail: "\^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$",
                password: "\^[0-9a-zA-Z]*$"
            }

            // 空の場合
            if (this.formData[field] === '') {
                this.messageNumber[field] = 0
                this.validation[field] = false
                return
            }
            // mail 正規表現を合わない場合
            const rgxObj = new RegExp(rgx[field])
            this.validation[field] = rgxObj.test(this.formData[field])

            this.messageNumber[field] = this.validation[field] ? null : 1
        }
    },
    mounted() {
        const confirmModal = document.querySelector(".modal-container");
        disableBodyScroll(confirmModal);
    },
    beforeDestroy() {
        clearAllBodyScrollLocks();
    },
}
</script>

<style lang="scss" scoped>
.modal-container {
    width: 100vw;
    padding: 50px 0 150px 0;


    .modal-content {
        padding: 2em 1em;
        width: 90%;
        margin: 0 auto;
        min-height: 80%;
        background-color: #fff;
        border-radius: 10px;

        .modal-title {
            font-weight: bold;
            text-align: center;
            padding: 0 0 1em 0;
        }
    }
}

.first-text {
    line-height: 1.5em;
    width: 95%;
    margin: 0 auto 0.5em auto;
    font-size: 0.9em;
}

.first-text__note {
    font-size: 0.8em;
    padding: 0.3em 0;
}



.form {
    width: 90%;
    margin: 0 auto;

    .form-group {
        margin: 0.5em 0 0.5em 0;

        .form-label {
            font-weight: bold;
            font-size: 0.9em;
        }

        .form-content {
            padding-top: 0.3em;

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
    padding: 1.0em 0;
    background-color: #854b4b;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.5em;
    text-align: center;
    text-indent: 0.5em;

    &.disable {
        opacity: 0.2;
    }
}

.close-area {
    padding-top: 2em;

    .close-area__text {
        text-align: center;
        padding-bottom: 1em;
        font-size: 0.9em;
    }

    .close {
        width: 150px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        color: #504848;

        .close-icon {
            display: block;
            width: 30px;
            margin: 0 0.2em;
        }

        .close-text {
            display: block;
            font-size: 18px;
            margin: 0 0.2em;
            color: #504848;

        }
    }
}
</style>