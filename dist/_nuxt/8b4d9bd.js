(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{542:function(e,t,o){var content=o(571);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(90).default)("28f1127f",content,!0,{sourceMap:!1})},569:function(e){e.exports=JSON.parse('{"name":"liff-starter-nuxtjs","version":"0.1.0","private":true,"scripts":{"dev":"nuxt -p 9000","build":"nuxt build","start":"nuxt start","generate":"nuxt generate"},"dependencies":{"@line/liff":"^2.16.0","@nuxtjs/axios":"^5.13.6","@nuxtjs/dotenv":"^1.4.1","core-js":"^3.15.1","nuxt":"^2.15.7"},"devDependencies":{"sass":"^1.69.0","sass-loader":"^10.4.1","webpack":"^4.46.0","webpack-cli":"^5.1.4"}}')},570:function(e,t,o){"use strict";o(542)},571:function(e,t,o){var r=o(89)(!1);r.push([e.i,"body,html{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;margin:0;padding:0}.home{padding:5rem 2rem;text-align:center}.home__title{font-size:6rem;line-height:1.15}.home__title__link{color:#06c755;text-decoration:none}.home__title__link:hover{text-decoration:underline}.home__badges{align-items:center;justify-content:center;display:flex;flex-wrap:nowrap;overflow:hidden;margin-bottom:6rem}.home__badges__badge:first-child{border-top-left-radius:2px;border-bottom-left-radius:2px}.home__badges__badge:last-child{border-top-right-radius:2px;border-bottom-right-radius:2px}.home__badges__badge{display:inline-block;padding:.3em .4em;font-size:.75rem;font-weight:700;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline}.badge--primary{color:#353a40;border:1px solid #353a40;background-color:transparent;padding-top:calc(.3em - 1px);padding-bottom:calc(.3em - 1px)}.badge--secondary{color:#fff;background-color:#353a40}.home__buttons{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;grid-gap:1rem;gap:1rem}.home__buttons__button{min-width:250px;cursor:pointer;display:inline-block;font-weight:400;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:.9375rem;line-height:1.5;border-radius:2px;text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.button--primary{color:#fff;background-color:#00b900;border-color:#00b900}.button--primary:hover{color:#fff;background-color:#009300;border-color:#008600}.button--secondary{color:#fff;background-color:#353a40;border-color:#353a40}.button--secondary:hover{color:#fff;background-color:#24272b;border-color:#1e2124}.button--tertiary{background-color:transparent;background-image:none;color:#353a40;border-color:#353a40}.button--tertiary:hover{color:#353a40;background-color:rgba(53,58,64,.1);border-color:#353a40}@media screen and (max-width:600px){html{font-size:12px}.home__title{font-size:4rem;line-height:1.15}.home__buttons__button{font-size:1.5rem}}@media screen and (max-width:930px){.home__buttons{flex-direction:column}}.test{color:#00b900}.test .test_test{color:#8a2be2}",""]),e.exports=r},575:function(e,t,o){"use strict";o.r(t);var r=o(20),n=(o(70),o(569)),l={data:function(){return{version:n.version,sdkVersion:"",liffError:""}},methods:{login:function(){return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,liff.login();case 2:case"end":return e.stop()}}),e)})))()}},mounted:function(){var e=this;this.$liffInit.then((function(){e.sdkVersion=liff.getVersion()})).catch((function(t){e.liffError=t}))}},c=(o(570),o(69)),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"home"},[o("div",[o("h1",[e._v("TOP PEGE")]),e._v(" "),o("p",[e._v("会員じゃなくても誰でも見れる")]),e._v(" "),o("button",{staticClass:"button--primary",on:{click:e.login}},[e._v("LINEでログイン")]),e._v(" "),e._m(0)])])}),[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"test"},[e._v("\n      scssテスト\n      "),o("div",{staticClass:"test_test"},[e._v("\n        テスト・テスト\n      ")])])}],!1,null,null,null);t.default=component.exports}}]);