<template>
  <div>

    <div class="centerTimePicker text-center pt-4 px-lg-5">
      <h4>Scegli un nostro itinerario oppure crealo tu</h4>


      <div class="postcardpercorsi light orange mx-4">
        <!-- <div
          :style="[
            isLarge
              ? {
                  overflow: 'hidden',
                  'border-radius': '0px 10px 10px 0px',
                }
              : {
                  overflow: 'hidden',
                  'border-radius': '10px 10px 0px 0px',
                  width: '100%',
                  'max-height': '250px',
                },
          ]"
        >
          <a class="postcardpercorsi__img_link">
            <img
              class="postcardpercorsi__img"
              src="https://picsum.photos/501/500"
              alt="Image Title"
            />
          </a>
        </div> -->
        <div class="postcardpercorsi__text pt-3 mt-4">
          <div style="height: 100%">
            <h1 class="postcardpercorsi__title orange">
              Seleziona un itinerario predefinito
            </h1>

            <div v-if="isLarge" class="postcardpercorsi__bar" style="height: 4px"></div>
            <div class="postcardpercorsi__preview-txt">
              Selezionando questa opzione hai la possibilità di scegliere un
              itinerario tra i vari itinerari predefiniti già creati
              appositamente, senza il bisogno di doverlo creare da zero.
            </div>
            <div :class="{ 'text-left mt-5': isLarge, 'text-center': !isLarge }">
              <Button size="small" type="primary" v-on:click="selectDefaultPath()"
                class="textButtonColor mt-5">Seleziona itinerario
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="postcardpercorsi light orange mx-4 d-none d-lg-block">
        <!-- <div
          :style="[
            isLarge
              ? {
                  overflow: 'hidden',
                  'border-radius': '10px 0px 0px 10px',
                }
              : {
                  overflow: 'hidden',
                  'border-radius': '10px 10px 0px 0px',
                  width: '100%',
                },
          ]"
        >
          <a class="postcardpercorsi__img_link">
            <img
              class="postcardpercorsi__img"
              style="height: 100%"
              src="https://media.istockphoto.com/photos/map-with-stick-pins-travel-itinerary-picture-id542818352?k=20&m=542818352&s=170667a&w=0&h=9cGGrnKDuHQB92crkOclu21UjqfNGcQB5zRLPnrfrO8="
              alt="Image Title"
            />
          </a>
        </div> -->

        <div class="postcardpercorsi__text py-5">
          <!-- <h4 class="orange my-1" style="text-align: left">
            Esplora itinerari
          </h4> -->
          <!-- <ul class="userchoice__tagbox mb-3">
            <li
              v-on:click="enabledRadioCreatePathOrInsertCode = '1'"
              :class="
                enabledRadioCreatePathOrInsertCode === '1'
                  ? 'mr-1 tag__item__selected'
                  : 'mr-1 tag__item__unselected'
              "
            >

              Crea un nuovo percorso
            </li>
            <li
              :class="
                enabledRadioCreatePathOrInsertCode === '2'
                  ? 'ml-2 tag__item__selected'
                  : 'ml-2 tag__item__unselected'
              "
              v-on:click="enabledRadioCreatePathOrInsertCode = '2'"
            >

              Inserisci il codice di un itinerario
            </li>
          </ul> -->
          <div class="row" v-if="enabledRadioCreatePathOrInsertCode === '1'">
            <div class="col-6">
              <h1 class="postcardpercorsi__title orange">
                Crea un nuovo percorso 
              </h1>
              <div v-if="isLarge" class="postcardpercorsi__bar" style="height: 4px"></div>
              <div class="postcardpercorsi__preview-txt mb-3">
                Creando un nuovo percorso hai la possibilità di inserire le
                attività che più ti interessano e i posti che più vuoi visitare
                in modo tale da rendere la tua esperienza ancora più unica!
              </div>
              <div style="text-align: left">
                Scegli il tempo che hai a disposizione
              </div>
              <ul class="postcardpercorsi__tagbox">
                <li :class="
                    enabledRadio === '1'
                      ? 'tag__item__selected'
                      : 'tag__item__unselected'
                  " v-on:click="enabledRadio = '1'">
                  <i v-if="enabledRadio === '1'" class="fas fa-check mr-2"></i>Mattina
                </li>
                <li :class="
                    enabledRadio === '2'
                      ? 'tag__item__selected'
                      : 'tag__item__unselected'
                  " v-on:click="enabledRadio = '2'">
                  <i v-if="enabledRadio === '2'" class="fas fa-check mr-2"></i>Pomeriggio
                </li>
                <li :class="
                    enabledRadio === '3'
                      ? 'tag__item__selected'
                      : 'tag__item__unselected'
                  " v-on:click="enabledRadio = '3'">
                  <i v-if="enabledRadio === '3'" class="fas fa-check mr-2"></i>Tutta la giornata
                </li>
                <li :class="
                    enabledRadio === '4'
                      ? 'tag__item__selected'
                      : 'tag__item__unselected'
                  " v-on:click="enabledRadio = '4'">
                  <i v-if="enabledRadio === '4'" class="fas fa-check mr-2"></i>Altro (fascia oraria personalizzata)
                </li>
              </ul>

              <div v-if="enabledRadio === '4'">
                <div class="row mt-4">
                  <h6 class="col-12">
                    <b>Seleziona il tempo che hai a disposizione</b>
                  </h6>
                  <div v-if="!okTimeAvailable" class="col-12 errorMessage fade-in-text text-center">
                    <h5><b>Devi inserire una fascia oraria corretta!</b></h5>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    Hai selezionato di essere disponibile dalle ore
                    {{ startAvailableTimeValue.HH }} e
                    {{ startAvailableTimeValue.mm }} alle ore
                    {{ endAvailableTimeValue.HH }} e
                    {{ endAvailableTimeValue.mm }}.
                  </div>
                </div>

                <!--TODO: inserire controllo -> il tempo non deve essere minore di tot-->
                <div class="row pt-3">
                  <div class="col-12 text-center">
                    <b>dalle ore</b><br />
                    <vue-timepicker v-model="startAvailableTimeValue" format="HH:mm"></vue-timepicker>
                  </div>
                </div>

                <div class="row align-items-center pt-3 pb-3">
                  <div class="col-12 text-center">
                    <b>alle ore</b><br />
                    <vue-timepicker v-model="endAvailableTimeValue" format="HH:mm"></vue-timepicker>
                  </div>
                </div>
              </div>
              <!-- <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                <Button
                  size="small"
                  type="primary"
                  v-on:click="createPath()"
                  class="textButtonColor mt-3"
                  >Crea percorso
                </Button>
              </div> -->
            </div>
            <div class="col-6">
              <div class="">
                <h1 class="postcardpercorsi__title orange">
                  Inserisci il codice del tuo itinerario
                </h1>

                <div v-if="isLarge" class="postcardpercorsi__bar" style="height: 4px"></div>
                <div class="postcardpercorsi__preview-txt mb-3">
                  Inserisci qua il codice dell'itinerario che hai creato per
                  poterlo visualizzare!
                </div>
                <form-group-input class="no-border form-control-lg px-0" placeholder="Codice..."
                  v-model="pathCodeInserted" addon-left-icon="now-ui-icons objects_key-25">
                </form-group-input>
                <!-- <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                <Button
                  size="small"
                  type="primary"
                  v-on:click="checkCodeAndGetPath()"
                  class="textButtonColor mt-3"
                  >Inserisci codice
                </Button>
              </div> -->
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                <Button size="small" type="primary" v-on:click="createPath()" class="textButtonColor mt-3">Crea percorso
                </Button>
              </div>
            </div>
            <div class="col-6">
              <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                <Button size="small" type="primary" v-on:click="checkCodeAndGetPath()"
                  class="textButtonColor mt-3">Inserisci codice
                </Button>
              </div>
            </div>
          </div>

          <!-- <div v-else>
            <div class="">
              <h1 class="postcardpercorsi__title orange">
                Inserisci il codice del tuo itinerario
              </h1>

              <div class="postcardpercorsi__bar" style="height: 4px"></div>
              <div class="postcardpercorsi__preview-txt mb-3">
                Inserisci qua il codice dell'itinerario che hai creato per
                poterlo visualizzare!
              </div>
              <form-group-input
                class="no-border form-control-lg px-0"
                placeholder="Codice..."
                v-model="pathCodeInserted"
                addon-left-icon="now-ui-icons objects_key-25"
              >
              </form-group-input>
              <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                <Button
                  size="small"
                  type="primary"
                  v-on:click="checkCodeAndGetPath()"
                  class="textButtonColor mt-3"
                  >Inserisci codice
                </Button>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <!--Component mobile-->

      <div class="d-block d-lg-none">
        <div class="postcardpercorsi light orange mx-4">
          <div class="postcardpercorsi__text py-5">
            <div class="row" v-if="enabledRadioCreatePathOrInsertCode === '1'">
              <div class="col-12">
                <h1 class="postcardpercorsi__title orange">
                  Crea un nuovo percorso
                </h1>
                <div v-if="isLarge" class="postcardpercorsi__bar" style="height: 4px"></div>
                <div class="postcardpercorsi__preview-txt mb-3">
                  Creando un nuovo percorso hai la possibilità di inserire le
                  attività che più ti interessano e i posti che più vuoi
                  visitare in modo tale da rendere la tua esperienza ancora più
                  unica!
                </div>
                <div style="text-align: left">
                  Scegli il tempo che hai a disposizione
                </div>
                <ul class="postcardpercorsi__tagbox">
                  <li :class="
                      enabledRadio === '1'
                        ? 'tag__item__selected'
                        : 'tag__item__unselected'
                    " v-on:click="enabledRadio = '1'">
                    <i v-if="enabledRadio === '1'" class="fas fa-check mr-2"></i>Mattina
                  </li>
                  <li :class="
                      enabledRadio === '2'
                        ? 'tag__item__selected'
                        : 'tag__item__unselected'
                    " v-on:click="enabledRadio = '2'">
                    <i v-if="enabledRadio === '2'" class="fas fa-check mr-2"></i>Pomeriggio
                  </li>
                  <li :class="
                      enabledRadio === '3'
                        ? 'tag__item__selected'
                        : 'tag__item__unselected'
                    " v-on:click="enabledRadio = '3'">
                    <i v-if="enabledRadio === '3'" class="fas fa-check mr-2"></i>Tutta la giornata
                  </li>
                  <li :class="
                      enabledRadio === '4'
                        ? 'tag__item__selected'
                        : 'tag__item__unselected'
                    " v-on:click="enabledRadio = '4'">
                    <i v-if="enabledRadio === '4'" class="fas fa-check mr-2"></i>Altro (fascia oraria personalizzata)
                  </li>
                </ul>

                <div v-if="enabledRadio === '4'">
                  <div class="row mt-4">
                    <h6 class="col-12">
                      <b>Seleziona il tempo che hai a disposizione</b>
                    </h6>
                    <div v-if="!okTimeAvailable" class="col-12 errorMessage fade-in-text text-center">
                      <h5><b>Devi inserire una fascia oraria corretta!</b></h5>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      Hai selezionato di essere disponibile dalle ore
                      {{ startAvailableTimeValue.HH }} e
                      {{ startAvailableTimeValue.mm }} alle ore
                      {{ endAvailableTimeValue.HH }} e
                      {{ endAvailableTimeValue.mm }}.
                    </div>
                  </div>

                  <!--TODO: inserire controllo -> il tempo non deve essere minore di tot-->
                  <div class="row pt-3">
                    <div class="col-12 text-center">
                      <b>dalle ore</b><br />
                      <vue-timepicker v-model="startAvailableTimeValue" format="HH:mm"></vue-timepicker>
                    </div>
                  </div>

                  <div class="row align-items-center pt-3 pb-3">
                    <div class="col-12 text-center">
                      <b>alle ore</b><br />
                      <vue-timepicker v-model="endAvailableTimeValue" format="HH:mm"></vue-timepicker>
                    </div>
                  </div>
                </div>
                <!-- <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                <Button
                  size="small"
                  type="primary"
                  v-on:click="createPath()"
                  class="textButtonColor mt-3"
                  >Crea percorso
                </Button>
              </div> -->
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                  <Button size="small" type="primary" v-on:click="createPath()" class="textButtonColor mt-3">Crea
                    percorso
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="postcardpercorsi light orange mx-4">
          <div class="postcardpercorsi__text py-5">
            <div class="row" v-if="enabledRadioCreatePathOrInsertCode === '1'">
              <div class="col-12">
                <h1 class="postcardpercorsi__title orange">
                  Inserisci il codice del tuo itinerario
                </h1>

                <div v-if="isLarge" class="postcardpercorsi__bar" style="height: 4px"></div>
                <div class="postcardpercorsi__preview-txt mb-3">
                  Inserisci qua il codice dell'itinerario che hai creato per
                  poterlo visualizzare!
                </div>
                <form-group-input class="no-border form-control-lg px-0" placeholder="Codice..."
                  v-model="pathCodeInserted" addon-left-icon="now-ui-icons objects_key-25">
                </form-group-input>
                <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                  <Button size="small" type="primary" v-on:click="checkCodeAndGetPath()"
                    class="textButtonColor mt-3">Inserisci codice
                  </Button>
                </div>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-12">
                <div :class="{ 'text-left': isLarge, 'text-center': !isLarge }">
                  <Button
                    size="small"
                    type="primary"
                    v-on:click="createPath()"
                    class="textButtonColor mt-3"
                    >Crea percorso
                  </Button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!--Fine component mobile-->



      <modal :show.sync="modals.itineraryNotReceivedWithError" headerClasses="justify-content-center"
        @close="modals.itineraryNotReceivedWithError = false">
        <h4 slot="header" class="title title-up text-center">Errore!</h4>
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 text-center">
                <h6 class="itineraryCode">
                  Si è verificato un errore durante recupero del tuo itinerario.
                </h6>
                <p>Riprovare più tardi.</p>
              </div>
            </div>
          </div>
        </div>

        <template slot="footer">
          <Button size="small" type="danger" v-on:click="modals.itineraryNotReceivedWithError = false"
            class="mx-1">Chiudi
          </Button>
        </template>
      </modal>

      <modal :show.sync="modals.itineraryCodeNotValid" headerClasses="justify-content-center"
        @close="modals.itineraryCodeNotValid = false">
        <h4 slot="header" class="title title-up text-center">Errore!</h4>
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12 text-center">
                <h6 class="itineraryCode">
                  Il codice inserito non è valido, si prega di inserire un
                  codice corretto.
                </h6>
              </div>
            </div>
          </div>
        </div>

        <template slot="footer">
          <Button size="small" type="danger" v-on:click="modals.itineraryCodeNotValid = false" class="mx-1">Chiudi
          </Button>
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

import "leaflet/dist/leaflet.css";
import { Button } from "element-ui";
import L from "leaflet";

import { Checkbox, Radio, Modal, FormGroupInput } from "../components";

import "v-alert-resource/dist/v-alert-resource.css";
import { Plugins } from "@capacitor/core";
import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";
import store from "../store";
import Vuex from "vuex";
import router from "../router";
import { config } from "../utils/config";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const { Geolocation } = Plugins;

const Common = require("@/Common.vue").default;

export default {
  name: "Percorsi",
  bodyClass: "percorsi-page",

  components: {
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    Button,
    VueTimepicker,
    Modal,
    FormGroupInput,
  },

  data() {
    return {
      errorGettingPosition: false,

      idNavigator: 0,
      options: {
        enableHighAccuracy: false,
        timeout: 0.1,
        maximumAge: 1000,
      },

      isLoadingAree: true,

      isLoadingEsperimenti: true,
      isLoadingPOIPivot: true,

      filteredPOI: [],

      startAvailableTimeValue: {
        HH: "09",
        mm: "30",
      },
      endAvailableTimeValue: {
        HH: "10",
        mm: "15",
      },
      okCheckedInterestType: true,
      okTimeAvailable: true,
      activitiesLoaded: false,
      activitiesAv: [],

      modals: {
        //oggetto usato per mostrare i modals
        insertCodeModal: false,
        itineraryNotReceivedWithError: false,
        itineraryCodeNotValid: false,
      },

      pathCodeInserted: "", //variabile usata per contenere il codice del percorso inserito dell'utente

      enabledRadio: "1",
      enabledRadioCreatePathOrInsertCode: "1",

      windowWidth: 0,
    };
  },

  computed: {
    ...Vuex.mapGetters([]),

    isLarge() {
      return this.windowWidth >= 768;
    },

    allActivitiesAvailable: function () {
      console.log("COMPUTED allActivitiesAvailable");

      //Le attività disponibili devono essere trovate per i POI filtrati: prima c'era this.$store.state.POIpivot
      var allActivitiesAvailable = [];

      for (var i = 0; i < this.filteredPOI.length; i++) {
        console.log("POI CORRENTE");
        console.log(this.filteredPOI[i]);

        for (var j = 0; j < this.filteredPOI[i].mis.length; j++) {
          var activityDurations = new Array(
            this.filteredPOI[i].mis[j]["geo:Durata"].length
          );

          activityDurations[j] = this.filteredPOI[i].mis[j]["geo:Durata"];

          allActivitiesAvailable.push({
            activityName: this.filteredPOI[i].mis[j]["o:title"],
            activityID: this.filteredPOI[i].mis[j]["o:id"],
            activityDurations: activityDurations,
            activitySelected: false,
          });
        }
      }

      console.log(allActivitiesAvailable);

      return allActivitiesAvailable;
    },
  },

  async created() {
    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti

    var self = this;

    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });

    /**
     * 121 : class id POI_Pivot
     */
    Common.getElemsByClass(this, config.omekaIDpoiPIVOT, (res) => {
      store.state.POIpivot = res.body;
      self.isLoadingPOIPivot = false;
      //store.commit('setAllinterestOfPOI');

      console.log(res.body);

      Array.prototype.forEach.call(store.state.POIpivot, (poi) => {
        if (poi.hasOwnProperty("o-module-mapping:marker")) {
          // Get module-mapping
          Common.getElemByUrl(
            self,
            poi["o-module-mapping:marker"][0]["@id"],
            (r2) => {
              poi.marker = r2.body;
            }
          );
        } else {
          /*Il POI non ha nessuna coordinata*/
        }

        poi.visitPOI = false;
        poi.numberOfActivitiesSelectedInPOI = 0;

        /*chiedo l'immagine dei POI*/
        Common.getElementImages(this, poi, (mediaList) => {
          poi.media = mediaList;
          //self.isLoadingImages = false;
        });
      });
    });

    /**
     * 132 : class id geo:Area
     */
    Common.getElemsByClass(this, config.omekaIDarea, (res) => {
      console.log("HO OTTENUTO TUTTE LE AREE");
      store.state.aree = res.body;
      self.isLoadingAree = false;
      //store.commit('setAllinterestOfPOI');
      //store.commit("setAreaInPOIPivot");

      console.log(res.body);
    });
  },

  mounted() {},

  methods: {
    createPath() {
      console.log("createPath");

      if (this.enabledRadio === "1") {
        var timeMinutes = 6 * 60; //6 ore in minuti
        var timeAvailable = {
          hour: 6,
          minutes: 0,
          milliseconds: timeMinutes * 60000, //converto i minuti in millisecondi
        };

        this.$store.state.timeAvailable = timeAvailable;

        router.push({
          name: "creapercorso",
        });
      } else if (this.enabledRadio === "2") {
        var timeMinutes = 1 * 60; //6 ore in minuti
        var timeAvailable = {
          hour: 1,
          minutes: 0,
          milliseconds: timeMinutes * 60000, //converto i minuti in millisecondi
        };

        this.$store.state.timeAvailable = timeAvailable;

        router.push({
          name: "creapercorso",
        });
      } else if (this.enabledRadio === "3") {
        var timeMinutes = 12 * 60; //6 ore in minuti
        var timeAvailable = {
          hour: 12,
          minutes: 0,
          milliseconds: timeMinutes * 60000, //converto i minuti in millisecondi
        };

        this.$store.state.timeAvailable = timeAvailable;

        router.push({
          name: "creapercorso",
        });
      } else if (this.enabledRadio === "4") {
        var timeStartHourAndMinutes =
          this.startAvailableTimeValue.HH +
          ":" +
          this.startAvailableTimeValue.mm +
          ":00";
        var timeEndHourAndMinutes =
          this.endAvailableTimeValue.HH +
          ":" +
          this.endAvailableTimeValue.mm +
          ":00";

        console.log(timeStartHourAndMinutes);
        console.log(timeEndHourAndMinutes);

        var timeStart = new Date(
          "Mon Jan 01 2007 " + timeStartHourAndMinutes + " GMT+0530"
        ).getTime();
        var timeEnd = new Date(
          "Mon Jan 01 2007 " + timeEndHourAndMinutes + " GMT+0530"
        ).getTime();
        var hourDiff = timeEnd - timeStart; //in ms
        var secDiff = hourDiff / 1000; //in s
        var minDiff = hourDiff / 60 / 1000; //in minutes
        var hDiff = hourDiff / 3600 / 1000; //in hours
        var humanReadable = {};
        humanReadable.hours = Math.floor(hDiff);
        humanReadable.minutes = minDiff - 60 * humanReadable.hours;
        console.log(humanReadable); //{hours: 0, minutes: 30}

        var hAvailable = humanReadable.hours;
        var minAvailable = humanReadable.minutes;

        console.log("hAvailable: " + hAvailable);
        console.log("minAvailable: " + minAvailable);

        if (hAvailable > 0 || (hAvailable === 0 && minAvailable >= 10)) {
          this.okTimeAvailable = true;

          var timeMinutes = hAvailable * 60 + minAvailable; //converto l'orario inserito in minuti
          var timeAvailable = {
            hour: hAvailable,
            minutes: minAvailable,
            milliseconds: timeMinutes * 60000, //converto i minuti in millisecondi
          };

          this.$store.state.timeAvailable = timeAvailable;

          router.push({
            name: "creapercorso",
          });
        } else {
          this.okTimeAvailable = false;
        }
      }
    },

    insertPathCode() {
      console.log("insertPathCode");
      this.modals.insertCodeModal = true;
    },

    selectDefaultPath() {
      console.log("selectDefaultPath");

      this.currentPage = "selectDefaultPath";

      router.push({ path: "/elencopercorsi" });
    },

    checkCodeAndGetPath() {
      console.log("checkCodeAndGetPath SONO QUA!!!!");
      console.log(this.pathCodeInserted);

      if (this.pathCodeInserted.trim().length !== 0) {
        var self = this;

        $.ajax({
          url: "/geodidalab/api/itinerari/" + this.pathCodeInserted,
          type: "GET",
          success: function (result) {
            console.log("RISPOSTA: ");
            console.log(result);
            console.log(result === null);
            console.log("STAMPO ANCHE QUESTO!");

            if (result !== null) {
              var itinerario = result;

              store.state.sottoitinerari[0] = itinerario;
              var itineraryAlreadyExist = true;
              var itineraryCode = self.pathCodeInserted;
              router.push({
                name: "sintesiitinerario",
                params: {
                  itineraryAlreadyExist,
                  itineraryCode,
                },
              });
            } else {
              console.log("L'itinerario non esiste!");
              self.modals.itineraryCodeNotValid = true;
            }
          },
          error: function (error) {
            console.log("error: ");
            console.log(error);

            self.modals.itineraryNotReceivedWithError = true;
          },
        });

        this.modals.insertCodeModal = false;

        //TODO: controllare se il codice esiste ed è corretto -> in caso recuperare il percorso e mostrarlo

        this.currentPage = "selectExistingPath";
      } else {
        console.log("il codice inserito contiene solo spazi");
        //il codice inserito contiene solo spazi
        this.modals.itineraryCodeNotValid = true;
      }
    },
  },
};
</script>

<style>
#map {
  height: 500px;
}

.markerPopup {
  width: 10rem;
}

.buttonAlignRight {
  float: right;
}

.buttonAlignLeft {
  float: left;
}

.cardForm {
  border: 0;
  border-radius: 20px;
  display: inline-block;
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  -webkit-box-shadow: 5px 5px 10px 0px #a3a3a3;
  -moz-box-shadow: 5px 5px 10px 0px #a3a3a3;
  -o-box-shadow: 5px 5px 10px 0px #a3a3a3;
  box-shadow: 5px 5px 10px 0px #a3a3a3;
}

.centerTimePicker {
  margin-left: auto;
  margin-right: auto;
}

.errorMessage {
  color: #e95e38;
}

.fade-in-text {
  display: inline-block;
  animation: fadeIn linear 0.5s;
  -webkit-animation: fadeIn linear 0.5s;
  -moz-animation: fadeIn linear 0.5s;
  -o-animation: fadeIn linear 0.5s;
  -ms-animation: fadeIn linear 0.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background: #e3913b;
  color: #fff;
  border-radius: 20px;
}

.vue__time-picker-dropdown,
.vue__time-picker .dropdown {
  border-radius: 5px;
}

.vue__time-picker input.display-time {
  border-radius: 5px;
}

.customTitle {
  font-family: "Sofia Pro";
  font-style: normal;
  font-weight: 600;
}
</style>
