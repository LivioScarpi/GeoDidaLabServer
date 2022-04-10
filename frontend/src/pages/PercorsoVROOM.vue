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
        <!--
        <div>
          <h4 class="text-center mt-0">
            <b>Itinerario generato con VROOM</b>
          </h4>
        </div>-->
        <!--ELENCO PERCORSI:-->

        <div v-if="itinerario === null" class="loader">
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

        <div v-else class="mb-4">
          <ItinerarioVROOM :itinerario="itinerario" :page="page"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import Vuex from "vuex";
import router from "../router";
import ItinerarioVROOM from "../components/customComponents/ItinerarioVROOM.vue";
const Common = require("@/Common.vue").default;

export default {
  name: "PercorsoVROOM",
  //props: ["test"],

  components: {
    ItinerarioVROOM,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      path: null,
      itinerario: null,
      page: null,
    };
  },

  mounted() {
    console.log("MOUNTED PERCORSO VROOM");
  },

  async created() {
    console.log("CREATED PERCORSO VROOM");
    console.log(this.$route);

    this.itinerario = this.$store.state.itinerarioInCreazione; //this.$route.params.itineraryObject;
    this.page = this.$route.params.page;

      console.log("ITINERARIO IN CREAZIONE - PERCORSO VROOM: ");
      console.log(this.$store.state.itinerarioInCreazione);

    console.log(this.itinerario);
    console.log(this.$route);
    //TODO: remove me
    //console.log("ASYNC CREATED");

    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti

    /**
     * 121 : class id POI_Pivot
     */

    var self = this;

    /**
     * 117 : class id Itinerario
     */

    /*
    //chiedo gli itinerari
    Common.getElemsByClass(this, 117, (res) => {
      store.state.itinerari = res.body;
      console.log(store.state.itinerari);

      //chiedo i POI
      Common.getElemsByClass(this, 120, (res) => {
        store.state.POI = res.body;
        console.log(store.state.POI);

        //store.commit("setPOIinPivot");
        //store.commit("setPivotinItinerario");

        //da qua
        if (store.state.loadedActivitiesInPOIPivot) {
          store.commit("setActivitiesInPOI");
          store.commit("setPOIinItinerario");
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
    */
  },

  mounted() {
    /*console.log("PERCORSO SELEZIONATO");
    console.log(this.$route);

    this.path = this.$route.params.path;*/
  },

  methods: {
    goBack() {
      console.log("REPLACE PATH");

      router.go(-1);

      //router.replace({ path: "/percorsi" });
    },
  },

  computed: {
    /*
    activitiesLoadedInPOIPivot() {
      console.log(
        "computed loadedActivitiesInPOIPivot: " +
          store.state.loadedActivitiesInPOIPivot
      );
      return store.state.loadedActivitiesInPOIPivot;
    },
    */
  },

  watch: {
    /*
    activitiesLoadedInPOIPivot(newValue, oldValue) {
      console.log("sono nel watch");
      if (newValue) {
        console.log("new value è true");

        store.commit("setActivitiesInPOI");
        store.commit("setPOIinItinerario");
      }
    },*/
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