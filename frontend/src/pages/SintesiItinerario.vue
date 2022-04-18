<template>
  <div>
    <div class="section text-black pt-3">
      <div class="container">
        <h2 class="title pt-0">SINTESI ITINERARIO</h2>
        <h5 class="description mb-3">Sintesi dell'itinerario creato.</h5>
        <h5 class="card-title text-center" v-if="totalTimeObject.hours > 0">
          Tempo totale: {{ totalTimeObject.hours }} ore e
          {{ totalTimeObject.minutes }} minuti
        </h5>
        <h5 class="card-title text-center" v-else>
          Tempo totale: {{ totalTimeObject.minutes }} minuti
        </h5>
         <h6 class="card-title text-center">
          Il tempo totale include anche gli spostamenti in auto da un'area all'altra.
        </h6>
        <div v-if="itineraryCode === null" class="row mb-0 text-center">
        <h6 class="px-5 mx-lg-5">
          Puoi prenotare il tuo itinerario premendo il bottone "Prenota
          itinerario". Ti verrà fornito il codice identificativo del tuo
          itinerario, salvalo e conservalo per poter poi consultare nuovamente
          l'itinerario.
        </h6>
      </div>
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
import sottoitinerario from "../components/customComponents/sottoitinerario.vue";
import { Button } from "element-ui";
import { costMatrixAreas } from "../utils/costMatricesAreas";

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
      totalTimeObject: {},
    };
  },

  mounted() {
    console.log("Sotto Itinerari: ");
    console.log(store.state.sottoitinerari);
    var self = this;
    this.totalTimeObject = this.msToTime(this.totalTime);
  },

  created() {},

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

    msToTime(duration) {
      var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      var timeObject = {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
      };

      return timeObject;
    },
    //ui-1_simple-remove
  },

  computed: {
    totalTime() {
      var areas = [];
      var time = 0;

      //Recupero le aree a cui appartengono i sottoitinerari
      Array.prototype.forEach.call(
        this.$store.state.sottoitinerari,
        (sottoitinerario) => {
          var areaName = sottoitinerario.name.substring(11);
          areas.push(areaName);
        }
      );

      console.log(areas);

      //Sommo i tempi relativi ai sottoitinerari
      Array.prototype.forEach.call(
        this.$store.state.sottoitinerari,
        (sottoitinerario) => {
          console.log(sottoitinerario);
          time += sottoitinerario.totalTimeMilliseconds;
        }
      );

      //Sommo i tempi di tragitto da un'area all'altra
      for (var i = 0; i < areas.length - 1; i++) {
        var fromArea = areas[i];
        var toArea = areas[i + 1];

        var fromAreaIndex = -1;
        var toAreaIndex = -1;

        switch (fromArea) {
          case "Torino":
            fromAreaIndex = 0;
            break;
          case "Ivrea":
            fromAreaIndex = 1;
            break;
          case "GeoDidaLab - Ivrea":
            fromAreaIndex = 2;
            break;
          case "Anfiteatro Morenico d'Ivrea":
            fromAreaIndex = 3;
            break;
          default:
            fromAreaIndex = -1;
        }

        switch (toArea) {
          case "Torino":
            toAreaIndex = 0;
            break;
          case "Ivrea":
            toAreaIndex = 1;
            break;
          case "GeoDidaLab - Ivrea":
            toAreaIndex = 2;
            break;
          case "Anfiteatro Morenico d'Ivrea":
            toAreaIndex = 3;
            break;
          default:
            toAreaIndex = -1;
        }

        console.log("FROM AREA: " + fromArea + "; TO AREA: " + toArea);
        console.log("FROM AREA INDEX: " + fromAreaIndex + "; TO AREA INDEX: " + toAreaIndex);
        console.log(costMatrixAreas[fromAreaIndex][toAreaIndex]);
        console.log(costMatrixAreas);


        time += (costMatrixAreas[fromAreaIndex][toAreaIndex] * 60000); //nella matrice i valori sono espressi in minuti!
      }

      //TODO: aggiungere il tempo corretto per andare da una zona all'altra!!!
      //time += 10000;

      console.log(time);

      return time;
    },
  },

  watch: {},
};
</script>
<style></style>
