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
        <h4 class="text-center mt-0">
          <b>Percorso selezionato</b>
        </h4>
      </div>
    </div>

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
</template>

<script>
import router from "../router";

import ItinerarioVROOM from "../components/customComponents/ItinerarioVROOM.vue";

export default {
  name: "PercorsoSelezionato",
  //props: ["test"],

  components: {
    ItinerarioVROOM
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      itinerario: null,
      page: null,
    };
  },

  mounted() {
    console.log("PERCORSO SELEZIONATO");
    console.log(this.$route);

    this.itinerario = this.$route.params.itinerario;
    this.page = this.$route.params.page;

        console.log("PAGE PERS: " + this.page);

  },

  methods: {
    goBack() {
      console.log("REPLACE PATH");
      router.replace({ path: "/percorsi" });
    },
  },
};
</script>

<style>
</style>