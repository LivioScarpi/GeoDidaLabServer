<template>
  <div>
    <div class="section text-black pt-3">
      <div class="container">
        <h2 v-if="this.itinerario !== null" class="title pt-0">{{this.itinerario["geo:Titolo_it"][0]["@value"]}}</h2>
        <h2 v-else class="title pt-0">Itinerario senza nome</h2>
        <h5 class="description mb-0">
          Sintesi dell'itinerario selezionato.
        </h5>
      </div>
      <div class="mt-4" v-if="allLoaded">
        <div class="row text-center">
          <div class="col-12">
          </div>
          <div class="col-12" v-if="itinerarioLoaded">
            <sottoitinerariopredefinito
              class="align-top"
              v-for="item in this.itinerario.poiGroupedByArea"
              :item="item"
              :areaname="item[0]['areaDiAppartenenza'][0]['display_title']"
              :key="item.name"
            ></sottoitinerariopredefinito>
          </div>
          <!-- <div class="col-12" v-else>
            Non c'è
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import store from "../store";
import $ from "jquery";
import sottoitinerariopredefinito from '../components/customComponents/sottoitinerariopredefinito.vue';

const Common = require("@/Common.vue").default;

export default {
  name: "sintesiitinerariopredefinito",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    sottoitinerariopredefinito,
  },
  data() {
    return {
      itinerario: null,
      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: true,
      itinerarioLoaded: false,
    };
  },

  mounted() {
    this.itinerario = this.$route.params.itinerario;

    console.log("Itinerario ricevuto: ");
    console.log(this.itinerario);

    this.itinerarioLoaded = true;
    //console.log(store.state.sottoitinerari);
  },

  created() {

  },

  computed: {},

  watch: {
    itinerarioLoaded(newValue, oldValue){
      console.log(newValue);
      console.log(oldValue);
    }
  },
};
</script>
<style></style>
