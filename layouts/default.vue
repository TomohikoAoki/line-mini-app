<template>
    <div class="app">
        <Loading></Loading>
        <Nuxt />
        <footer class="footer">
            <p class="copy-right">Copyright © 2023 占いハートフル All Rights Reserved.</p>
            <p class="footer-name">心占株式会社</p>
            <p class="footer-address">〒112-0001 東京都文京区白山2-30-2 平林ビル1F</p>
            <p class="footer-tel">03-3868-0349</p>
        </footer>
    </div>
</template>

<script>
import Loading from '../components/Loading.vue';

export default {
    components: {
        Loading
    }
}

</script>

<style lang="scss">
$baseColor : #c3c1c5;

.app {
    background-color: rgb(43, 32, 74);
    background-image: url(~static/images/bg.jpg);
    background-repeat: repeat-y;
    background-size: 100% auto;

    .footer {
        color: $baseColor;
        padding: 1em 0;
        background-color: rgb(23, 13, 36);

        .copy-right {
            font-size: 0.75em;
            text-align: center;
        }

        .footer-name {
            text-align: center;
            color: $baseColor;
            padding: 0.4em;
            font-size: 0.9em;

        }

        .footer-address {
            text-align: center;
            color: $baseColor;
            font-size: 0.80em;
        }

        .footer-tel {
            text-align: center;
            color: $baseColor;
            font-size: 0.80em;
            padding-top: 0.2em;
        }
    }
}



.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s;
}

.page-enter,
.page-leave-active {
    opacity: 0;
}
</style>