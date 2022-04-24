<template>
  <div>
    <div class="section text-black pt-3">
      <div class="container">
        <h2 v-if="this.itinerario !== null" class="title pt-0">
          {{ this.itinerario["geo:Titolo_it"][0]["@value"] }}
        </h2>
        <h2 v-else class="title pt-0">Itinerario senza nome</h2>
        <h5 class="description mb-3">Sintesi dell'itinerario selezionato.</h5>
        <!--
        <h5
          class="card-title text-center"
          v-if="
            parseInt(totalTimeObject.hours) === 1 &&
            parseInt(totalTimeObject.minutes) === 0
          "
        >
          Tempo totale: {{ totalTimeObject.hours }} ora
        </h5>
        <h5
          class="card-title text-center"
          v-else-if="parseInt(totalTimeObject.hours) === 1"
        >
          Tempo totale: {{ parseInt(totalTimeObject.hours) }} ora e
          {{ parseInt(totalTimeObject.minutes) }} minuti
        </h5>
        <h5
          class="card-title text-center"
          v-else-if="parseInt(totalTimeObject.hours) > 0 && parseInt(totalTimeObject.minutes) === 0"
        >
          Tempo totale: {{ parseInt(totalTimeObject.hours) }} ore
        </h5>
        <h5
          class="card-title text-center"
          v-else-if="parseInt(totalTimeObject.hours) > 0"
        >
          Tempo totale: {{ parseInt(totalTimeObject.hours) }} ore e
          {{ parseInt(totalTimeObject.minutes) }} minuti
        </h5>
        <h5 class="card-title text-center" v-else>
          Tempo totale: {{ parseInt(totalTimeObject.minutes) }} minuti
        </h5>-->
        <!-- <h6 class="card-title text-center" v-if="this.$store.state.sottoitinerari.length > 1">
          Il tempo totale include anche gli spostamenti in auto da un'area
          all'altra.
        </h6> -->
        <div class="row mb-0 text-center">
          <h6 class="px-5 mx-lg-5">
            Puoi prenotare il tuo itinerario premendo il bottone "Prenota
            itinerario". Ti verrà fornito il codice identificativo del tuo
            itinerario, salvalo e conservalo per poter poi consultare nuovamente
            l'itinerario.
          </h6>
        </div>
      </div>

      <div class="row mt-3 text-center">
        <div class="col-12">
          <Button
            type="primary"
            size="large"
            v-on:click="sendEmail()"
            class="m-2 textButtonColor"
            >Prenota itinerario
          </Button>
        </div>
      </div>

      <div class="mt-4" v-if="allLoaded">
        <div class="row text-center">
          <div class="col-lg-5 col-sm-12 pr-0" v-if="itinerarioLoaded">
            <sottoitinerariopredefinito
              class="align-top"
              v-for="item in this.itinerario.poiGroupedByArea"
              :item="item"
              :areaname="item[0]['areaDiAppartenenza'][0]['display_title']"
              :key="item.name"
              @infoActivityClicked="showInfoAtivity"
              @infoActivityVisitPOIClicked="showInfoAtivityVisitPOI"
            ></sottoitinerariopredefinito>
          </div>
          <div class="col-lg-7 col-sm-12">
            <div class="postcardpercorsi light orange mx-4 mr-5">
              <div
                :style="[
                  isLarge
                    ? {
                        'max-height': '49rem',
                        'border-radius': '10px',
                      }
                    : {
                        'max-height': '45rem',
                        'border-radius': '10px',
                      },
                ]"
                class="postcardpercorsi__text text-left pt-3 mt-4"
              >
                <div style="height: 100%">
                  <h1 class="postcardpercorsi__title orange">
                    Dettagli -
                    {{ this.itinerario["geo:Titolo_it"][0]["@value"] }}
                  </h1>

                  <div class="postcardpercorsi__bar" style="height: 4px"></div>
                  <div
                    class="postcardpercorsi__preview-txt mb-3"
                    v-if="itinerario['dcterms:description'] !== undefined"
                  >
                    {{ itinerario["dcterms:description"][0]["@value"] }}
                  </div>
                  <div class="postcardpercorsi__preview-txt mb-3" v-else>
                    Nessuna descrizione disponibile
                  </div>

                  <h6>Interessi:</h6>
                  <template
                    v-for="(ambito, index) in itinerario[
                      'geo:appartiene_a_ambito'
                    ]"
                    style="display: inline-block"
                  >
                    {{ ambito["display_title"] }}
                    <template
                      v-if="
                        index < itinerario['geo:appartiene_a_ambito'].length - 2
                      "
                      >,</template
                    >

                    <template
                      v-if="
                        index ===
                        itinerario['geo:appartiene_a_ambito'].length - 2
                      "
                    >
                      e
                    </template>
                  </template>

                  <hr />

                  <div
                    v-if="
                      activitySelectedForInfo === null &&
                      activityVisitPOISelectedForInfo === null
                    "
                  >
                    <h6>
                      Seleziona la
                      <i class="ml-2 mt-3 bi bi-info-circle mr-2"></i> accanto
                      al nome di un'attività per vedere i dettagli
                    </h6>
                  </div>

                  <div v-if="activitySelectedForInfo === null"></div>
                  <div v-else>
                    <!-- {{activitySelectedForInfo}} -->
                    <infoEsperimento
                      class="align-top"
                      :item="activitySelectedForInfo"
                    ></infoEsperimento>
                  </div>

                  <div v-if="activityVisitPOISelectedForInfo === null"></div>
                  <div v-else>
                    <h5>{{visitPOIselectedforInfo}}</h5>
                    <!-- {{activitySelectedForInfo}} -->
                    {{ activityVisitPOISelectedForInfo }}
                  </div>

                  <!-- <div
                    :class="{
                      'text-left mt-5': isLarge,
                      'text-center': !isLarge,
                    }"
                  >
                    <Button
                      size="small"
                      type="primary"
                      v-on:click="selectDefaultPath()"
                      class="textButtonColor mt-5"
                      >Seleziona itinerario
                    </Button>
                  </div> -->
                </div>
              </div>
            </div>
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
import sottoitinerariopredefinito from "../components/customComponents/sottoitinerariopredefinito.vue";
import infoEsperimento from "../components/customComponents/infoEsperimento";

const Common = require("@/Common.vue").default;

import { Button } from "element-ui";

export default {
  name: "sintesiitinerariopredefinito",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    sottoitinerariopredefinito,
    Button,
    infoEsperimento,
  },
  data() {
    return {
      itinerario: null,
      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: true,
      itinerarioLoaded: false,
      activitySelectedForInfo: null,
      activityVisitPOISelectedForInfo: null,
      visitPOIselectedforInfo: "",
      windowWidth: 0,
    };
  },

  mounted() {
    this.itinerario = this.$route.params.itinerario;

    console.log("Itinerario ricevuto: ");
    console.log(this.itinerario);

    this.itinerarioLoaded = true;
    //console.log(store.state.sottoitinerari);
  },

  methods: {
    sendEmail() {
      var emailAddress = "test@gmail.com";
      var subject = "Prenotazione itinerario codice: " + this.itineraryCode;
      var body = "Salve, vi contatto per .....";

      var mail = document.createElement("a");
      mail.href =
        "mailto:" + emailAddress + "?subject=" + subject + "&body=" + body;
      mail.click();
    },

    showInfoAtivity(activityName, areaname) {
      console.log("SONO IN showInfoAtivity: " + activityName + "; " + areaname);

      console.log(this.itinerario.poiGroupedByArea[areaname]);

      this.activityVisitPOISelectedForInfo = null;

      Array.prototype.forEach.call(
        this.itinerario.poiGroupedByArea[areaname],
        (poi) => {
          Array.prototype.forEach.call(poi.activitiesOfPOIPivot, (activity) => {
            if (activity["o:title"] === activityName) {
              this.activitySelectedForInfo = activity;
              console.log("Activity trovata");
            }
          });
        }
      );

      console.log(this.activitySelectedForInfo);
    },

    showInfoAtivityVisitPOI(areaname, poiName) {
      console.log(
        "SONO IN showInfoAtivityVisitPOI: " + areaname + "; " + poiName
      );

      this.activitySelectedForInfo = null;
      this.visitPOIselectedforInfo = poiName;
      this.activityVisitPOISelectedForInfo =
        "La visita del " +
        poiName +
        " consiste in una visita del luogo guidati da una persona che spiegherà tutto il necessario";

      // console.log(this.itinerario.poiGroupedByArea[areaname]);

      // Array.prototype.forEach.call(
      //   this.itinerario.poiGroupedByArea[areaname],
      //   (poi) => {
      //     Array.prototype.forEach.call(poi.activitiesOfPOIPivot, (activity) => {
      //       if (activity["o:title"] === activityName) {
      //         this.activitySelectedForInfo = activity;
      //         console.log("Activity trovata");
      //       }
      //     });
      //   }
      // );

      // console.log(this.activitySelectedForInfo);
    },
  },

  created() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });
  },

  computed: {
    isLarge() {
      return this.windowWidth >= 768;
    },
  },

  watch: {
    itinerarioLoaded(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
    },
  },
};
</script>
<style></style>
