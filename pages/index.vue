<template>
  <div class="home">
    <div class="top-image">
      <SvgBase icon-name="top-image" viewBox="0 0 352 352" iconColor="#efb94b" iconTitle="トップイメージ">
        <TopImage></TopImage>
      </SvgBase>
    </div>
    <p class="top-text">ラインと連携したハートフルのアプリ。<br>ポイントの確認や、ポイント付与、ポイントの利用ができます</p>

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
  mounted() {
    // mounted() is rendered when DOM is rendered
    // wait liff.init()
    this.$liffInit
      .then(async () => {
        this.sdkVersion = liff.getVersion();

        const token = await liff.getIDToken();
        const profileData = await liff.getDecodedIDToken()

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
}

.button--primary {
  color: #fff;
  background-color: #06C755;
  display: flex;
  width: 250px;
  margin: 0 auto;
  align-items: center;
  position: relative;
  border-radius: 10px;

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    z-index: 1;
    display: block;
  }

  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &:active {
    &::before {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  .line-login-image {
    width: 50px;
    height: 50px;
    background-image: url(assets/images/line_132.png);
    background-size: contain;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 2;
  }

  .line-login-text {
    flex: 1;
    text-align: center;
    padding: 0 40px;
    z-index: 3;
  }
}

.button--primary:hover {
  color: #fff;
  background-color: #06C755;
  border-color: #06C755;
}

@media screen and (max-width: 600px) {
  html {
    font-size: 12px;
  }
}
</style>


