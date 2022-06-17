<template>
  <div>
    <div class="section text-black pt-3">
      <div class="container">
        <h2 class="title pt-0">STRUMENTI</h2>
        <div class="row">
          <h5 class="description mb-0">
            Elenco di strumenti usati al GeoDidaLab!
          </h5>
        </div>
      </div>
      <div class="mt-4" v-if="allLoaded">
        <div class="row text-center d-none d-lg-block">
          <div class="col-12">
            <strumento class="align-top" v-for="(item, index) in this.$store.state.strumenti" :key="index" :item="item"
              :indexOfStrumento="index + 1"></strumento>
          </div>
        </div>

        <div class="row mx-3" style="text-align: center" v-for="(item, index) in this.$store.state.strumenti"
          :key="index">
          <div class="col-12 d-block d-lg-none">
            <strumento class="align-top" :key="index" :item="item" :indexOfStrumento="index + 1"></strumento>
          </div>
        </div>
      </div>
      <div v-else class="loader">
        <svg class="circular">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
//width: small < 768 px

import strumento from "../components/customComponents/strumento";
import $ from "jquery";
import store from "../store";

const Common = require("@/Common.vue").default;

export default {
  name: "strumenti",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    strumento,
  },
  data() {
    return {
      strumenti: [
        {
          name: "Microscopio",
          description: "Descrizione strumento",
          imgSrc: "/img/microscopio.jpg",
        },
        {
          name: "Retino plancton",
          description: "Descrizione strumento",
          imgSrc: "/img/retinoPlancton.jpg",
        },
        {
          name: "Sonda multiparametrica",
          description: "Descrizione strumento",
          imgSrc: "/img/sondaMultiparametrica.jpg",
        },
      ],
      windowWidth: 0,
      allLoaded: false,
    };
  },

  beforeMount() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });

    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti

    /**
     * 123 : class id Strumento
     */

    var self = this;

    Common.getElemsByClass(this, 123, (res) => {
      store.state.strumenti = res.body;
      self.allLoaded = true;
    });
  },

  mounted() {},

  computed: {
    isLarge() {
      return this.windowWidth >= 768;
    },
  },
};
</script>
<style>
</style>