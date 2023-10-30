<template>
    <div class="modal-container">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$emit('close')
        }
    },
    mounted() {
        setTimeout(() => {
            this.close()
        }, 2000)
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

    .modal-content {
        position: absolute;
        padding: 2em 1em;
        width: 90%;
        background-color: #cacaca;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-align: center;

    }
}
</style>