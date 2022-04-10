<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="/geodidalab"> Openalplab </a>
          </li>
          <li>
            <a v-on:click="goToContattiPage()" style="cursor: pointer;"> Contatti </a>
          </li>
        </ul>
      </nav>
      <!--
      <div class="copyright">
        &copy; {{ year }}, Designed by
        <a href="https:///www.invisionapp.com" target="_blank" rel="noopener"
          >Invision</a
        >.
      </div>
      -->
    </div>
  </footer>
</template>
<script>
import router from "../router";

export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },

  methods: {
    goToContattiPage() {
      if (router.history.current.name !== "contatti") {
        router.push({ path: "/contatti" });
      }
    },
  },
};
</script>
<style>
</style>
