<template>
    <div class="register">
        <h1 class="register-title">会員登録</h1>
        <div class="kiyaku">
            <h2 class="kiyaku-title">規約</h2>
            <ul class="kiyaku-content">
                <li>規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら。</li>
                <li>規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら。</li>
                <li>規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら。</li>
                <li>規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら。</li>
                <li>規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら。</li>
                <li>規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら規約はうんたらかんたら。</li>
            </ul>
        </div>
        <form class="form">
            <div class="form-group">
                <label>お名前</label>
                <div class="form-content">
                    <input class="input-text">
                </div>
            </div>
            <div class="form-group">
                <label>メールアドレス</label>
                <div class="form-content">
                    <input class="input-text">
                </div>
            </div>
            <div class="btn submit">送信</div>
        </form>
    </div>
</template>

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