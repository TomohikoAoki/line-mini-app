<template>
  <div class="home">
    <div class="top-image">
      <SvgBase icon-name="top-image" viewBox="0 0 352 352" iconColor="#efb94b" iconTitle="トップイメージ">
        <TopImage></TopImage>
      </SvgBase>
    </div>
    <p class="top-text">ラインと連携したハートフルのアプリ。<br>ポイントの確認や、ポイント付与、ポイントの利用ができます</p>
    <div class="login-area">
      <button @click="login" class="home__buttons__button button--primary">LINEでログイン</button>
    </div>

  </div>
</template>

<script>
import SvgBase from "../components/Svg/Base.vue"
import TopImage from "../components/Svg/Data/TopImage.vue"

export default {
  data: function () {
    return {
      sdkVersion: "",
      liffError: ""
    };
  },
  components: {
    SvgBase,
    TopImage
  },
  methods: {
    async login() {
      await liff.login()
    }
  },
  mounted() {
    // mounted() is rendered when DOM is rendered
    // wait liff.init()
    this.$liffInit
      .then(() => {
        this.sdkVersion = liff.getVersion();

        const token = liff.getIDToken();
        const profileData = liff.getDecodedIDToken()

        //storeにLINEのtokenとprofileを保存
        this.$store.dispatch('setToken', token)
        this.$store.dispatch('setProfile', profileData)

        this.$router.push('/top')
      })
      .catch((error) => {
        this.liffError = error;
      });
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  margin: 0;
  padding: 0;
}

.home {
  padding: 5rem 2rem;
  text-align: center;
  background-color: rgb(70, 53, 106);
  background-image: url(~static/images/bg.jpg);
  background-repeat: repeat-y;
  background-size: 100% auto;
  min-height: 100vh;
}

.top-text {
  font-size: 16px;
  color: #efb94b;
  padding: 2em 0;
  line-height: 1.7em;
}

.home__buttons__button {
  min-width: 250px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  border-radius: 2px;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.button--primary {
  color: #fff;
  background-color: #00b900;
  border-color: #00b900;
}

.button--primary:hover {
  color: #fff;
  background-color: #009300;
  border-color: #008600;
}

@media screen and (max-width: 600px) {
  html {
    font-size: 12px;
  }

  .home__buttons__button {
    font-size: 1.5rem;
  }
}
</style>


