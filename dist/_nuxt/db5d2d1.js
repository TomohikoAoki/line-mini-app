(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{541:function(t,e,n){var content=n(568);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(90).default)("26c6dea3",content,!0,{sourceMap:!1})},567:function(t,e,n){"use strict";n(541)},568:function(t,e,n){var o=n(89)(!1);o.push([t.i,".app-main{position:relative}.point-area{width:90%;margin:0 auto;padding:50px 10px;filter:drop-shadow(0 0 5px #999);border-radius:10px}.point-area .point-title{text-align:center;background-color:#d99090;font-weight:700;color:#fff;padding:1em;border-radius:10px 10px 0 0}.point-content{background-color:#fff;padding:3em;text-align:center;border-radius:0 0 10px 10px}.point-content .point-display .point{color:#751528;font-weight:700;font-size:3em}.point-content .point-display .pt{font-weight:700;font-size:1.3em}.navi{display:flex;justify-content:center}.navi .navi-item{width:150px;padding:70px 0;text-align:center;background-color:#d99090;color:#fff;font-weight:700;border-radius:10px;margin:0 .4em}.navi .navi-item.disable{opacity:.2}.navi .navi-item a{width:100%;height:100%;display:inline-block}.btn{display:block;width:100px;margin:20px auto;padding:1.2em 0;text-align:center;background-color:#854b4b;border-radius:10px;color:#fff;font-weight:700}",""]),t.exports=o},574:function(t,e,n){"use strict";n.r(e);n(72),n(59),n(71),n(118),n(60),n(119);var o=n(20),r=n(56),c=(n(70),n(154),n(114)),l=n(531),d=n.n(l);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h={data:function(){return{modalFlag:!1,point:0}},components:{},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)({token:"getToken",memberId:"getMemberId",lineProfile:"getProfile"})),watch:{token:function(t){var e=this;t&&($nuxt.$loading.start(),d.a.get("https://sysf.heartful.work/epoints/verifyLineToken/?id_token=".concat(this.token)).then((function(t){e.response=t.data,$nuxt.$loading.finish()})).catch((function(t){e.err=t.response,402===t.response.status&&(e.modalFlag=!0),$nuxt.$loading.finish()})))}},methods:{connectMember:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.modalFlag=!1,$nuxt.$loading.start(),n.next=4,d.a.get("https://uranai.heartf.com/Public/epoints/linkmember/?usrmail=".concat(t.usrmail,"&password=").concat(t.password,"&id_token=").concat(e.token)).catch((function(t){return t.response?t.response:(e.err=t,e.message="ネットワークエラー。ステータスコード拾えない",t)}));case 4:o=n.sent,e.response=o.data,200===o.status?e.message="紐づけが完了しました":404===o.status?e.message="情報が見つかりませんでした。":e.message="まだ設定していないエラーです",$nuxt.$loading.finish();case 8:case"end":return n.stop()}}),n)})))()},readingQrCode:function(){var t=this;$nuxt.$loading.start(),liff.scanCodeV2().then((function(t){})).catch((function(e){t.message=e.message||"エラーが発生しました。"})),$nuxt.$loading.finish()},closeMessage:function(){this.message=null}},mounted:function(){var t=this;this.$liffInit.then((function(){var e=liff.getIDToken(),n=liff.getDecodedIDToken();t.$store.dispatch("setToken",e),t.$store.dispatch("setProfile",n)})).catch((function(e){t.error=e}))}},m=h,v=(n(567),n(69)),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-main"},[n("div",{attrs:{className:"App"}},[n("header",{attrs:{className:"App-header"}},[n("h1",{staticClass:"point-title"},[t._v("ハートフルポイント")]),t._v(" "),n("div",{staticClass:"navi"},[n("div",{staticClass:"navi-item",on:{click:t.readingQrCode}},[t._v("ポイントを貯める")])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);