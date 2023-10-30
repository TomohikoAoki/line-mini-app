<template>
    <div class="register">
        <h1 class="register-title">テスト会員登録ページ</h1>
        <p>ここは実際にはアプリには実装されない。<br>他のところで会員登録した場合をシミュレーションするためのページ</p>
        <form class="form">
            <div class="form-group">
                <label>お名前</label>
                <div class="form-content">
                    <input class="input-text" v-model="formData.name">
                </div>
            </div>
            <div class="form-group">
                <label>メールアドレス</label>
                <div class="form-content">
                    <input class="input-text" v-model="formData.email">
                </div>
            </div>
            <div class="form-group">
                <label>パスワード</label>
                <div class="form-content">
                    <input class="input-text" v-model="formData.password">
                </div>
            </div>
            <div class="form-group">
                <label>ポイント</label>
                <div class="form-content">
                    <input class="input-text" v-model="formData.point">
                </div>
            </div>
            <div class="btn submit">送信</div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: null,
                email: null,
                point: null,
                password: null
            }
        }
    }
}
</script>

<style lang="scss">
.register {
    padding: 50px 0;
}

.register-title {
    font-weight: bold;
    font-size: 2em;
    text-align: center;
}

.form {
    width: 90%;
    margin: 0 auto;

    .form-group {
        margin: 0 0 2em 0;

        .form-label {}

        .form-content {
            .input-text {
                border: 1px solid #eee;
                width: 100%;
                height: 3em;
                border-radius: 10px;
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
}

.kiyaku {
    border: 1px solid;
    width: 90%;
    margin: 20px auto;
    padding: 2em;

    .kiyaku-title {
        text-align: center;
        font-weight: bold;
        padding-bottom: 2em;
    }

    .kiyaku-content {
        list-style: disc;

        li {
            font-size: 0.8em;
            margin: 0 0 1em 0;
            line-height: 1.4em;
        }
    }
}
</style>