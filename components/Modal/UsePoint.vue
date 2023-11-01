<template>
    <div class="modal-container">
        <div class="modal-content">
            <h2 class="modal-title">ポイントを使用する</h2>
            <p class="first-text">
                現在の保有ポイント: {{ totalPoint }}
            </p>
            <div class="use-point-main">
                <Transition name="fade">
                    <form class="form" v-if="!confirmFlag">
                        <div class="form-group">
                            <label class="form-label">利用ポイント入力</label>
                            <div class="form-content">
                                <input class="input-text" v-model="formData.point" type="text" inputmode="numeric"
                                    @blur="fieldValidation('point')"
                                    :class="{ valid: validation.point, invalid: validation.point === false }">
                                <div class="error"><span v-if="validation.point === false">{{
                                    validationMessage.point[messageNumber.point] }}</span>
                                </div>
                            </div>
                        </div>
                        <button @click.prevent="confirm" class="btn" :disabled="!validation.point"
                            :class="{ disable: !validation.point }">
                            確認
                        </button>
                    </form>
                    <div v-else class="confirm">
                        <div class="confirm-text-area">
                            <p><span>{{ formData.point }}&nbsp;point</span><br>を利用します。</p>
                            <p>よろしいですか？</p>
                        </div>
                        <div class="confirm-btn-area">
                            <button @click.prevent="connect" class="btn2 connect">
                                送信
                            </button>
                            <button @click.prevent="correction" class="btn2 correction">
                                修正
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="close-area">
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
            formData: {
                point: null,
            },
            // validation flag
            validation: {
                point: null,
            },
            // validetion message
            validationMessage: {
                point: ['必ず入力してください。', '半角数字で整数を入力してください。', '利用できるポイントを超えています'],
            },
            // messageのための番号
            messageNumber: {
                point: null,
            },
            confirmFlag: false,
        }
    },
    components: {
        SvgBase,
        IconClose
    },
    props: {
        totalPoint: {
            type: Number,
            require: true,
        }
    },
    methods: {
        usePoint() {
            $emit('usePoint', this.formData.point)
        },
        confirm() {
            this.confirmFlag = true
        },
        correction() {
            this.confirmFlag = false
        },
        close() {
            this.$emit('input', false)
        },
        // validation
        fieldValidation(field) {
            // validationの形式
            const rgx = {
                point: "\^[1-9][0-9]*$"
            }

            // 空の場合
            if (this.formData[field] === '') {
                this.messageNumber[field] = 0
                this.validation[field] = false
                return
            }
            // 使用ポイントがtotalPointを超えた場合
            if (this.totalPoint < this.formData[field]) {
                this.messageNumber[field] = 2
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
        position: relative;

        .modal-title {
            font-weight: bold;
            text-align: center;
            padding: 0 0 1em 0;
        }
    }
}

.first-text {
    width: 95%;
    margin: 0 auto 0.5em auto;
    font-size: 1.1em;
    text-align: center;
}

.use-point-main {
    position: relative;
}

.form {
    width: 90%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

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

.confirm {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .confirm-text-area {
        text-align: center;

        p {
            span {
                font-weight: bold;
                font-size: 1.3em;
            }
        }

        p:last-child {
            padding: 1em 0;
        }
    }

    .confirm-btn-area {
        display: flex;
        justify-content: space-around;
        width: 100%;
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

.btn2 {
    width: 100px;
    margin: 0 auto;
    padding: 0.8em 0;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.5em;
    text-align: center;
    text-indent: 0.5em;

    &.connect {
        background-color: #854b4b;
    }

    &.correction {
        background-color: #4b6385;

    }
}

.close-area {
    position: absolute;
    bottom: 2em;
    width: 150px;
    left: 50%;
    transform: translateX(-50%);


    .close {
        width: 150px;
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

.fade-enter {
    /*開始の状態を指定する*/
    opacity: 0;
}

.fade-enter-to {
    /*終了の状態を指定する*/
    opacity: 1;
}

.fade-enter-active {
    /*動作（イージングや時間）を指定する*/
    transition: opacity 250ms ease-out;
}

.fade-leave {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

.fade-leave-active {
    transition: opacity 50ms ease-out;
}
</style>
