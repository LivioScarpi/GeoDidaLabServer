<template>
  <div id="app" class="flex-wrapper">
    <router-view name="header"/>
    <div class="wrapper">
      <router-view/>
    </div>
    <router-view name="footer"/>
  </div>
</template>
<script>
export default {};

import Vue from 'vue'
import VueRouter from 'vue-router'
import device from "vue-device-detector"
import VueYoutube from 'vue-youtube'
import $ from 'jquery'
import store from './store'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(VueRouter)
Vue.use(device)
Vue.use(VueYoutube)

</script>
<style>

/*
#app {
  height: 100%;
  position: relative;
}
 */

.flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
}

.footer {
  margin-top: auto;
}

</style>
