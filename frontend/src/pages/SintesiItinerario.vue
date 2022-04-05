<template>
  <div>
    <div class="section text-black pt-3">
      <div class="container">
        <h2 class="title pt-0">SINTESI ITINERARIO</h2>
        <h5 class="description mb-0">
          Sintesi dell'itinerario creato.
        </h5>
      </div>
      <div class="mt-4" v-if="allLoaded">
        <div class="row text-center">
          <div class="col-12">
            <sottoitinerario
              class="align-top"
              v-for="item in this.$store.state.sottoitinerari"
              :item="item"
              :key="item.name"
            ></sottoitinerario>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import store from "../store";
import $ from "jquery";
import sottoitinerario from '../components/customComponents/sottoitinerario.vue';

const Common = require("@/Common.vue").default;

export default {
  name: "sintesiitinerario",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    sottoitinerario,
  },
  data() {
    return {
      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: true,
    };
  },

  mounted() {
    console.log("Sotto Itinerari: ");
    console.log(store.state.sottoitinerari);
  },

  created() {

  },

  computed: {},

  watch: {},
};
</script>
<style></style>
