export { default as Loading } from '../../components/Loading.vue'
export { default as ModalConnectConfirm } from '../../components/Modal/ConnectConfirm.vue'
export { default as ModalFlashMessage } from '../../components/Modal/FlashMessage.vue'
export { default as ModalUsePoint } from '../../components/Modal/UsePoint.vue'
export { default as SvgBase } from '../../components/Svg/Base.vue'
export { default as SvgDataClose } from '../../components/Svg/Data/Close.vue'
export { default as SvgDataDisplayPointBottom } from '../../components/Svg/Data/DisplayPointBottom.vue'
export { default as SvgDataDisplayPointTop } from '../../components/Svg/Data/DisplayPointTop.vue'
export { default as SvgDataIconNaviAdd } from '../../components/Svg/Data/IconNaviAdd.vue'
export { default as SvgDataIconNaviUse } from '../../components/Svg/Data/IconNaviUse.vue'
export { default as SvgDataTopImage } from '../../components/Svg/Data/TopImage.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
