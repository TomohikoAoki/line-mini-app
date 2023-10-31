import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _745c1ca2 = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _4d06450e = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _e3de38be = () => interopDefault(import('../pages/terms.vue' /* webpackChunkName: "pages/terms" */))
const _50e0f2e8 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _30ec8ae5 = () => interopDefault(import('../pages/testscan.vue' /* webpackChunkName: "pages/testscan" */))
const _37d9b528 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/privacy",
    component: _745c1ca2,
    name: "privacy"
  }, {
    path: "/register",
    component: _4d06450e,
    name: "register"
  }, {
    path: "/terms",
    component: _e3de38be,
    name: "terms"
  }, {
    path: "/test",
    component: _50e0f2e8,
    name: "test"
  }, {
    path: "/testscan",
    component: _30ec8ae5,
    name: "testscan"
  }, {
    path: "/",
    component: _37d9b528,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
