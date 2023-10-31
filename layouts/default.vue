<template>
    <div class="app">
        <Loading></Loading>
        <Nuxt />
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

<style>
.app {
    background-color: rgb(70, 53, 106);
    background-image: url(~static/images/bg.jpg);
    background-repeat: repeat-y;
    background-size: 100% auto;
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