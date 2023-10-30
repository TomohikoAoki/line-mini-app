<template>
    <div>
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
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s;
}

.page-enter,
.page-leave-active {
    opacity: 0;
}
</style>