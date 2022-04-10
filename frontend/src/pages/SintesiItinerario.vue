<template>
  <div>
    <div class="section text-black pt-3">
      <div class="container">
        <h2 class="title pt-0">SINTESI ITINERARIO</h2>
        <h5 class="description mb-3">Sintesi dell'itinerario creato.</h5>
      </div>
      <div v-if="itineraryCode === null" class="row mb-0 text-center">
        <h6 class="px-5 mx-lg-5">
          Puoi prenotare il tuo itinerario premendo il bottone "Prenota
          itinerario". Ti verrà fornito il codice identificativo del tuo
          itinerario, salvalo e conservalo per poter poi consultare nuovamente
          l'itinerario.
        </h6>
      </div>

      <div v-if="itineraryCode === null" class="row mt-3 text-center">
        <div class="col-12">
          <Button
            type="primary"
            size="large"
            v-on:click="saveItinerary()"
            class="m-2 textButtonColor"
            >Prenota itinerario
          </Button>
        </div>
      </div>

      <div v-if="itineraryCode !== null" class="row mb-0 text-center">
        <div class="col-12 px-5">
          Puoi effettuare la tua prenotazione inviando una mail premendo il
          bottone "Invia mail".
        </div>
      </div>

      <div v-if="itineraryCode !== null" class="row mt-3 text-center">
        <div class="col-12">
          <Button
            size="large"
            v-on:click="sendEmail()"
            class="m-2 textButtonColor"
            >Invia mail
          </Button>
        </div>
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
import { Button } from "element-ui";
const Common = require("@/Common.vue").default;

export default {
  name: "sintesiitinerario",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    Button,
    sottoitinerario,
  },
  data() {
    return {
      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: true,
      itineraryCode: null,
    };
  },

  mounted() {
    console.log("Sotto Itinerari: ");
    console.log(store.state.sottoitinerari);
  },

  created() {

  },
  
  methods: {
    saveItinerary() {
      console.log("Save itinerary");

      console.log("ITINERARIO: ");
      console.log(this.itinerario);

      var self = this;

self.sendEmail();

      //TODO: salvare l'itinerario sul DB

      // $.ajax({
      //   url: "/geodidalab/api/itinerari/",
      //   type: "POST",
      //   dataType: "json",
      //   contentType: "application/json",
      //   data: JSON.stringify(this.itinerario),
      //   success: function (result) {
      //     //self.geojson = result;
      //     console.log("RISPOSTA: ");
      //     console.log(result);

      //     self.itineraryCode = result;

      //     // self.modals.itineraryCodeGeneratedWithError = false;
      //     // self.modals.itineraryCodeGenerated = true;

      //     //TODO: inviare mail con il metodo send mail
      //     self.sendEmail();

      //   },
      //   error: function (error) {
      //     console.log("error: ");
      //     console.log(error);

      //     // self.modals.itineraryCodeGenerated = false;
      //     // self.modals.itineraryCodeGeneratedWithError = true;
      //   },
      // });
    },

    sendEmail() {
      var emailAddress = "test@gmail.com";
      var subject = "Prenotazione itinerario codice: " + this.itineraryCode;
      var body = "Salve, vi contatto per .....";

      var mail = document.createElement("a");
      mail.href =
        "mailto:" + emailAddress + "?subject=" + subject + "&body=" + body;
      mail.click();
    },

    //ui-1_simple-remove
  
  },

  computed: {},

  watch: {},
};
</script>
<style></style>
