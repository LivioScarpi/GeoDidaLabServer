<template>
  <div>
    <div class="section pt-3">
      <div class="container">
        <h2 class="title pt-0">Attività</h2>
        <h5 class="description mb-0">
          Elenco di tutte le attività da fare a GeoDidaLab!
        </h5>
      </div>
      <div class="mt-4" v-if="allLoaded">
        <div class="row text-center">
          <div class="col-12">
            <esperimento
              class="align-top"
              v-for="item in this.$store.state.esperimenti"
              :item="item"
              :key="item.name"
            ></esperimento>
            <esperimento
              class="align-top"
              v-for="item in this.$store.state.esperimenti"
              :item="item"
              :key="item.name"
            ></esperimento>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import esperimento from "../components/customComponents/esperimento";
import store from "../store";
import $ from "jquery";

const Common = require("@/Common.vue").default;

export default {
  name: "esperimenti",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    esperimento,
  },
  data() {
    return {
      esperimenti: [
        {
          name: "Campionamento del plancton con retino",
          scientific_sector: "Settore Scientifico",
          school_level: "Livello Scolastico",
          description: "Descrizione strumento",
          imgSrc: "/img/microscopio.jpg",
          videoID: "orGM15hwA5A",
        },
        {
          name: "Misura della trasparenza dell’acqua con disco di Secchi",
          scientific_sector: "Settore Scientifico",
          school_level: "Livello Scolastico",
          description: "Descrizione strumento",
          imgSrc: "/img/microscopio.jpg",
          videoID: "orGM15hwA5A",
        },
        {
          name: "Test K sui licheni ",
          scientific_sector: "Settore Scientifico",
          school_level: "Livello Scolastico",
          description: "Descrizione strumento",
          imgSrc: "/img/microscopio.jpg",
          videoID: "orGM15hwA5A",
        },
      ],
      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: false,
    };
  },

  mounted() {
    console.log("Esperimenti: ");
    console.log(store.state.esperimenti);
  },

  created() {
    // eseguo la query per gli esperimenti solo la prima volta che apro la pagina degli Esperimenti

    /**
     * 118 : class id Misurazione
     * 130 : class id Attivita
     */

    var self = this;

    Common.getElemsByClass(this, 130, (res) => {
      store.state.esperimenti = res.body;
      self.allLoaded = true;
    });
  },

  computed: {},

  watch: {},
};
</script>
<style></style>
