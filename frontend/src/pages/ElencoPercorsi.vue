<template>
  <div>
    <div class="row">
      <div class="col-12">
        <!--TODO: sistemare pagine e step-->
        <i
          class="bi bi-arrow-left ml-3"
          style="font-size: 2rem; color: black; cursor: pointer"
          v-on:click="goBack()"
        ></i>

        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <h4 class="text-center mt-0">
                  <b>Elenco itinerari</b>
                </h4>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <h6 class="text-center mt-0">
                  Clicca su un itinerario per espanderlo e vederne i dettagli
                </h6>
              </div>
            </div>
          </div>
        </div>

        <!--ELENCO PERCORSI:-->

        <div v-if="itinerari === null" class="loader">
          <svg class="circular">
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="5"
              stroke-miterlimit="10"
            ></circle>
          </svg>
        </div>
        <div v-else class="px-2 px-lg-5">
          <collapse>
            <collapse-item
              id="collapseItinerario"
              :title="itinerario['geo:Titolo_it'][0]['@value']"
              :name="itinerario['geo:Titolo_it'][0]['@value']"
              v-for="(itinerario, index) in itinerari"
              :key="'itinerario' + index"
            >
              <div>
                <Itinerario :itinerario="itinerario" />
              </div>
            </collapse-item>
          </collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import Vuex from "vuex";
import router from "../router";

import $ from "jquery";

import Itinerario from "../components/customComponents/Itinerario.vue";

import {
  Checkbox,
  Collapse,
  CollapseItem,
  Radio,
  Card,
  Modal,
  FormGroupInput,
} from "../components";

const Common = require("@/Common.vue").default;

export default {
  name: "PercorsoSelezionato",
  //props: ["test"],

  components: {
    Itinerario,
    Collapse,
    CollapseItem,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      path: null,
      itinerari: null,
    };
  },

  async created() {
    //TODO: remove me
    //console.log("ASYNC CREATED");

    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti

    /**
     * 121 : class id POI_Pivot
     */

    var self = this;

    //chiedo gli esperimenti perchè magari non sono mai andato nella pagina dedicata a loro prima d'ora, ma mi servono qua
    Common.getElemsByClass(this, 130, (res) => {
      store.state.esperimenti = res.body;
      //TODO: remove me
      //console.log(res.body);

      store.commit("setActivitiesInPOI");

      this.filteredPOI = store.state.POIpivot;
      //TODO: remove me
      //console.log(this.filteredPOI);
      //this.initializeMarkersOfFilteredPOI();
      store.state.loadedActivitiesInPOIPivot = true;

      self.activitiesLoaded = true;
      self.isLoadingEsperimenti = false;
    });

    /**
     * 117 : class id Itinerario
     */

    console.log("chiedo gli itinerari");
    //chiedo gli itinerari
    Common.getElemsByClass(this, 117, (res) => {
      store.state.itinerari = res.body;
      console.log(store.state.itinerari);

      //chiedo i POI
          console.log("chiedo i POI");

      Common.getElemsByClass(this, 120, (res) => {
        store.state.POI = res.body;
        console.log(store.state.POI);

        //store.commit("setPOIinPivot");
        //store.commit("setPivotinItinerario");

        //da qua
        if (store.state.loadedActivitiesInPOIPivot) {
                    console.log("TRUE store.state.loadedActivitiesInPOIPivot");

          store.commit("setActivitiesInPOI");
          store.commit("setPOIinItinerario");
        } else {
          console.log("FALSE store.state.loadedActivitiesInPOIPivot");
        }

        console.log(store.state.itinerari);
        this.itinerari = store.state.itinerari;

        //this.filteredPOI = store.state.POIpivot;
        //this.initializeMarkersOfFilteredPOI();
      });

      //store.commit("setActivitiesInPOI");

      //this.filteredPOI = store.state.POIpivot;
      //this.initializeMarkersOfFilteredPOI();
    });

    var self = this;

    //questo blocco serve per poter invalidare la dimensione della mappa e visualizzarla correttamente essendo in un collapse
    $(document).on("click", "a", function (event) {
      //console.log("COLLAPSE ITINERARIO CLICCATO");
      //console.log(event);
      //console.log(event.currentTarget.attributes[2].value);

      //emit event to child component
      if (event.currentTarget.attributes[2].value === "#collapseItinerario") {
        console.log("EMITTO L'EVENTO");
        self.$root.$emit("invalidateMapSize");
      }
    });

    $(document).ready(function () {
      $("#collapseItinerario").trigger("click");
    });
  },

  mounted() {},

  methods: {
    goBack() {
      console.log("GO BACK");
      router.go(-1);

      //router.replace({ path: "/percorsi" });
    },
  },

  computed: {
    activitiesLoadedInPOIPivot() {
      console.log(
        "computed loadedActivitiesInPOIPivot: " +
          store.state.loadedActivitiesInPOIPivot
      );
      return store.state.loadedActivitiesInPOIPivot;
    },
  },

  watch: {
    activitiesLoadedInPOIPivot(newValue, oldValue) {
      console.log("sono nel watch");
      if (newValue) {
        console.log("new value è true");

        store.commit("setActivitiesInPOI");
        store.commit("setPOIinItinerario");
      }
    },
  },
};
</script>

<style>
.circular {
  animation: rotate 2s linear infinite;
  height: 100px;
  position: relative;
  width: 100px;
}

.loader {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  padding-top: 5rem;
  transform: translate(-50%, -50%);
}
</style>