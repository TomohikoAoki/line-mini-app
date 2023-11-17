<template lang="html">
  <div class="loader-background" v-if="loading">
    <div class="loader">
      <img src="~assets/images/spinner_dark.svg">
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loader-background {
  z-index: 1001;
  position: fixed;
  background: #0a0a0a;
  opacity: 0.4;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  color: #ffffff;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  img {
    width: 100%;
    height: auto;
  }
}
</style>
