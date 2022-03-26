<template>
  <div>
    <div
      v-if="currentStep === 0"
      class="centerTimePicker text-center pt-4 px-lg-5"
    >
      <article class="postcardpercorsi light orange mx-4">
        <a class="postcardpercorsi__img_link">
          <img
            class="postcardpercorsi__img"
            src="https://media.istockphoto.com/photos/map-with-stick-pins-travel-itinerary-picture-id542818352?k=20&m=542818352&s=170667a&w=0&h=9cGGrnKDuHQB92crkOclu21UjqfNGcQB5zRLPnrfrO8="
            alt="Image Title"
          />
        </a>
        <div class="postcardpercorsi__text">
          <h1 class="postcardpercorsi__title orange">Crea un nuovo percorso</h1>
          <!--<div class="postcardpercorsi__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>-->
          <div class="postcardpercorsi__bar"></div>
          <div class="postcardpercorsi__preview-txt pb-lg-4 pb-3">
            Creando un nuovo percorso hai la possibilità di inserire le attività
            che più ti interessano e i posti che più vuoi visitare in modo tale
            da rendere la tua esperienza ancora più unica!
          </div>
          <div style="text-align: left">
            Scegli il tempo che hai a disposizione
          </div>
          <ul class="postcardpercorsi__tagbox">
            <li class="tag__item" v-on:click="enabledRadio = '1'">
              <i v-if="enabledRadio === '1'" class="fas fa-check mr-2"></i
              >Mattina
            </li>
            <li class="tag__item" v-on:click="enabledRadio = '2'">
              <i v-if="enabledRadio === '2'" class="fas fa-check mr-2"></i
              >Pomeriggio
            </li>
            <li class="tag__item" v-on:click="enabledRadio = '3'">
              <i v-if="enabledRadio === '3'" class="fas fa-check mr-2"></i>Tutta
              la giornata
            </li>
            <li class="tag__item" v-on:click="enabledRadio = '4'">
              <i v-if="enabledRadio === '4'" class="fas fa-check mr-2"></i>Altro
              (fascia oraria personalizzata)
            </li>
          </ul>

          <div v-if="enabledRadio === '4'">
            <div class="row mt-4">
              <h6 class="col-12">
                <b>Seleziona il tempo che hai a disposizione</b>
              </h6>
              <div
                v-if="!okTimeAvailable"
                class="col-12 errorMessage fade-in-text text-center"
              >
                <h5><b>Devi inserire una fascia oraria corretta!</b></h5>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                Hai selezionato di essere disponibile dalle ore
                {{ startAvailableTimeValue.HH }} e
                {{ startAvailableTimeValue.mm }} alle ore
                {{ endAvailableTimeValue.HH }} e {{ endAvailableTimeValue.mm }}.
              </div>
            </div>

            <!--TODO: inserire controllo -> il tempo non deve essere minore di tot-->
            <div class="row pt-3">
              <div class="col-12 text-center">
                <b>dalle ore</b><br />
                <vue-timepicker
                  v-model="startAvailableTimeValue"
                  format="HH:mm"
                ></vue-timepicker>
              </div>
            </div>

            <div class="row align-items-center pt-3 pb-3">
              <div class="col-12 text-center">
                <b>alle ore</b><br />
                <vue-timepicker
                  v-model="endAvailableTimeValue"
                  format="HH:mm"
                ></vue-timepicker>
              </div>
            </div>
          </div>
          <Button
            size="small"
            type="primary"
            v-on:click="createPath()"
            class="mx-1 textButtonColor mt-3"
            >Crea percorso
          </Button>
        </div>
      </article>

      <article class="postcardpercorsi light orange mx-4">
        <a class="postcardpercorsi__img_link">
          <img
            class="postcardpercorsi__img"
            src="https://kyusuf.com/images/password-visibility/thumbnail.png"
            alt="Image Title"
          />
        </a>
        <div class="postcardpercorsi__text">
          <h1 class="postcardpercorsi__title orange">
            Inserisci il codice del tuo itinerario
          </h1>
          <!--<div class="postcardpercorsi__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>-->
          <div class="postcardpercorsi__bar"></div>
          <div class="postcardpercorsi__preview-txt">
            Inserisci qua il codice dell'itinerario che hai creato per poterlo
            visualizzare!
          </div>
          <form-group-input
            class="no-border form-control-lg"
            placeholder="Codice..."
            v-model="pathCodeInserted"
            addon-left-icon="now-ui-icons objects_key-25"
          >
          </form-group-input>
          <Button
            size="small"
            type="primary"
            v-on:click="checkCodeAndGetPath()"
            class="mx-1 textButtonColor mt-2"
            >Inserisci codice
          </Button>
        </div>
      </article>

      <article class="postcardpercorsi light orange mx-4">
        <a class="postcardpercorsi__img_link">
          <img
            class="postcardpercorsi__img"
            src="https://picsum.photos/501/500"
            alt="Image Title"
          />
        </a>
        <div class="postcardpercorsi__text">
          <h1 class="postcardpercorsi__title orange">
            Seleziona un itinerario predefinito
          </h1>
          <!--<div class="postcardpercorsi__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>-->
          <div class="postcardpercorsi__bar"></div>
          <div class="postcardpercorsi__preview-txt">
            Selezionando questa opzione hai la possibilità di scegliere un
            itinerario tra i vari itinerari predefiniti già creati
            appositamente, senza il bisogno di doverlo creare da zero.
          </div>
          <Button
            size="small"
            type="primary"
            v-on:click="selectDefaultPath()"
            class="mx-1 textButtonColor"
            >Seleziona itinerario
          </Button>
        </div>
      </article>
      <!--
      <div class="row px-4">
        <div class="col-lg-4 col-sm-12">
          <card style="border-radius: 13px; height: 35rem" class="pb-4">
            <div>
              <h4 class="title text-center pt-0 mt-0">Crea nuovo percorso</h4>

              <n-radio v-model="enabledRadio" label="1">Mattina</n-radio>
              <n-radio v-model="enabledRadio" label="2">Pomeriggio</n-radio>
              <n-radio v-model="enabledRadio" label="3"
                >Tutta la giornata
              </n-radio>
              <n-radio v-model="enabledRadio" label="4">
                Altro (fascia oraria)
              </n-radio>

              <div v-if="enabledRadio === '4'">
                <div class="row text-center mt-4">
                  <h6 class="col-12">
                    <b>Seleziona il tempo che hai a disposizione</b>
                  </h6>
                  <div
                    v-if="!okTimeAvailable"
                    class="col-12 errorMessage fade-in-text text-center"
                  >
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

                <div class="row align-items-center pt-3">
                  <div class="col-12 text-center">
                    <b>dalle ore</b><br />
                    <vue-timepicker
                      v-model="startAvailableTimeValue"
                      format="HH:mm"
                    ></vue-timepicker>
                  </div>
                </div>

                <div class="row align-items-center pt-3 pb-3">
                  <div class="col-12 text-center">
                    <b>alle ore</b><br />
                    <vue-timepicker
                      v-model="endAvailableTimeValue"
                      format="HH:mm"
                    ></vue-timepicker>
                  </div>
                </div>
              </div>
              <Button
                size="small"
                type="primary"
                v-on:click="createPath()"
                class="mx-1 textButtonColor mt-3"
                >Crea percorso
              </Button>
            </div>
          </card>
        </div>
        <div class="col-lg-4 col-sm-12">
          <card style="border-radius: 13px; height: 35rem" class="pb-4">
            <div>
              <div class="row">
                <div class="col-12 px-0">
                  <img
                    class="postcardpercorsi__img px-0"
                    src="
                                    https://kyusuf.com/images/password-visibility/thumbnail.png
                                  "
                    alt="Image Title"
                  />
                </div>
              </div>
              <h4 slot="header" class="title text-center pt-0 mt-3">
                Inserisci il codice del tuo itinerario
              </h4>
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12 text-center">
                      <p>
                        Inserisci il codice del percorso nel camp sottostante e
                        premi il tasto "Inserisci"
                      </p>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-12">
                      <form-group-input
                        class="no-border form-control-lg"
                        placeholder="Codice..."
                        v-model="pathCodeInserted"
                        addon-left-icon="now-ui-icons objects_key-25"
                      >
                      </form-group-input>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                size="small"
                type="primary"
                v-on:click="checkCodeAndGetPath()"
                class="mx-1 textButtonColor"
                >Inserisci codice
              </Button>
            </div>
          </card>

          
        </div>

        <div class="col-lg-4 col-sm-12">
          <card style="border-radius: 13px; height: 35rem" class="pb-4">
            <div>
              <h4 class="title text-center pt-0 mt-0">
                Seleziona un itinerario predefinito
              </h4>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Button
                size="small"
                type="primary"
                v-on:click="selectDefaultPath()"
                class="mx-1 textButtonColor"
                >Seleziona itinerario
              </Button>
            </div>
          </card>
        </div>
      </div>-->
      <modal
            :show.sync="modals.itineraryNotReceivedWithError"
            headerClasses="justify-content-center"
            @close="modals.itineraryNotReceivedWithError = false"
          >
            <h4 slot="header" class="title title-up text-center">Errore!</h4>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-12 text-center">
                    <h6 class="itineraryCode">
                      Si è verificato un errore durante recupero del tuo
                      itinerario.
                    </h6>
                    <p>Riprovare più tardi.</p>
                  </div>
                </div>
              </div>
            </div>

            <template slot="footer">
              <Button
                size="small"
                type="danger"
                v-on:click="modals.itineraryNotReceivedWithError = false"
                class="mx-1"
                >Chiudi
              </Button>
            </template>
          </modal>

          <modal
            :show.sync="modals.itineraryCodeNotValid"
            headerClasses="justify-content-center"
            @close="modals.itineraryCodeNotValid = false"
          >
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
              <Button
                size="small"
                type="danger"
                v-on:click="modals.itineraryCodeNotValid = false"
                class="mx-1"
                >Chiudi
              </Button>
            </template>
          </modal>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import {
  LMap,
  LTileLayer,
  LMarker,
  LGeoJson,
  LPopup,
  LCircleMarker,
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import activitiesOfPOI from "../components/customComponents/activitiesOfPOI";
import { Button } from "element-ui";
import L from "leaflet";

import {
  Checkbox,
  Collapse,
  CollapseItem,
  Radio,
  Card,
  Modal,
  FormGroupInput,
} from "../components";
import moment from "moment";

import VAlertResource from "v-alert-resource";
import "v-alert-resource/dist/v-alert-resource.css";
import Notifications from "@voerro/vue-notifications";
import { Plugins } from "@capacitor/core";
import VueTimepicker from "vue2-timepicker";
import PercorsoSelezionato from "./PercorsoSelezionato.vue";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";
import store from "../store";
import Vuex from "vuex";
import router from "../router";

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
  components: {
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    Button,
    VueTimepicker,
    //Card,
    Modal,
    FormGroupInput,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 16,
      center: [45.47724690648075, 7.888264286334166],
      //markerLatLng: [51.504, -0.159],
      map: null,
      geojson: null,
      markers: [],
      coord: null,

      //TEST GEOLOCALIZATION
      location: null,
      gettingLocation: false,
      errorStr: null,
      circle: {
        center: [0, 0],
        radius: 6,
        color: "red",
      },

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
      markersCreated: false,

      currentStep: 0,
      experienceGradeRadio: "Scuola secondaria",
      stepTitle: "Seleziona il tuo grado di esperienza",

      //allActivitiesAvailable: [],
      //elenco dei tipi di interesse
      interestType: [
        {
          interestName: "interest 1",
          interestSelected: false,
        },
        {
          interestName: "interest 2",
          interestSelected: false,
        },
        {
          interestName: "interest 3",
          interestSelected: false,
        },
        {
          interestName: "interest 4",
          interestSelected: false,
        },
      ],
      experienceGrade: [
        {
          name: "Principiante",
          active: true,
        },
        {
          name: "Intermedio",
          active: false,
        },
        {
          name: "Avanzato",
          active: false,
        },
        {
          name: "Super Avanzato",
          active: false,
        },
      ],
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
    };
  },

  computed: {
    ...Vuex.mapGetters([]),

    allActivitiesAvailable: function () {
      console.log("COMPUTED allActivitiesAvailable");
      //console.log(this.$store.state.POIpivot);

      /* TODO: sistemare qua */

      //Le attività disponibili devono essere trovate per i POI filtrati: prima c'era this.$store.state.POIpivot
      var allActivitiesAvailable = [];

      for (var i = 0; i < this.filteredPOI.length; i++) {
        console.log("POI CORRENTE");
        console.log(this.filteredPOI[i]);

        //TODOù: remove me
        //console.log(this.filteredPOI[i]["mis"]["geo:Durata"].length);

        /*
        console.log("DURATE:");
        console.log(this.filteredPOI[i]["geo:Durata"]);
s
        for (var j = 0; j < this.filteredPOI[i]["mis"]["geo:Durata"].length; j++) {
          console.log(this.filteredPOI[i]["geo:Durata"][j]["@value"]);

          activityDurations[j] = this.filteredPOI.mis[i]["geo:Durata"][j]["@value"];
        }
         */

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

      //console.log(allActivitiesAvailable);

      console.log(allActivitiesAvailable);

      return allActivitiesAvailable;
    },
  },

  async created() {
    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti


    var self = this;

    /**
     * 121 : class id POI_Pivot
     */
    Common.getElemsByClass(this, 121, (res) => {
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

        poi.visitPOI = true;

        /*chiedo l'immagine dei POI*/
        Common.getElementImages(this, poi, (mediaList) => {
          poi.media = mediaList;
          //self.isLoadingImages = false;
        });
      });
    });

    // console.log("DOPO AVER CHIESTO I MEDIA dei POI PIVOT");
    // console.log(store.state.POIpivot);

    // /**
    //  * 118 : class id Misurazione
    //  * 130 : class id Attivita
    //  */

    // store.state.loadedActivitiesInPOIPivot = false;

    // //chiedo gli esperimenti perchè magari non sono mai andato nella pagina dedicata a loro prima d'ora, ma mi servono qua
    // Common.getElemsByClass(this, 130, (res) => {
    //   store.state.esperimenti = res.body;
    //   store.commit("setActivitiesInPOIPivot");
    //   //store.commit("setAvailableActivitiesInRemainingTime");

    //   store.commit("setAllExpertiseLevels");
    //   //store.commit('setAllSchoolLevels');

    //   console.log(store.state.POIpivot);

    //   console.log("metto a true loadedActivitiesInPOIPivot");
    //   store.state.loadedActivitiesInPOIPivot = true;

    //   self.activitiesLoaded = true;
    //   self.isLoadingEsperimenti = false;
    //   //console.log( store.state.POIpivot);

    //   //console.log(store.state.schoolLevels);
    // });

    // //chiedo i livelli di difficoltà
    // Common.getElemsByClass(this, 129, (res) => {
    //   store.state.difficultyLevels = res.body;

    //   //self.activitiesLoaded = true;
    //   //self.isLoadingEsperimenti = false;
    //   //console.log( store.state.POIpivot);

    //   console.log(store.state.difficultyLevels);
    // });

    // //chiedo gli interessi
    // Common.getElemsByClass(this, 128, (res) => {
    //   store.state.interestsObject = res.body;

    //   //self.activitiesLoaded = true;
    //   //self.isLoadingEsperimenti = false;
    //   //console.log( store.state.POIpivot);

    //   console.log(store.state.interestsObject);
    //   store.commit("setAllinterestOfPOI");
    // });

    /**
     * 132 : class id geo:Area
     */
    Common.getElemsByClass(this, 132, (res) => {
      console.log("HO OTTENUTO TUTTE LE AREE");
      store.state.aree = res.body;
      self.isLoadingAree = false;
      //store.commit('setAllinterestOfPOI');
                //store.commit("setAreaInPOIPivot");


      console.log(res.body);
    });

    //do we support geolocation
    /*
    if (!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    } else {
      console.log("C'E' GEOLOCATION");
    }

    this.gettingLocation = true;
    // get position
    console.log("CERCO DI AVERE LA POSIZIONE");
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.location = pos;


      console.log("SONO QUI");
      console.log(this.location);

      this.circle.center = [this.location.coords.latitude, this.location.coords.longitude];

    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;

      self.errorGettingPosition = true;

      notify('ERRORE');

      console.log("ERRORE: " + self.errorGettingPosition)
      console.log(this.errorStr);
    });

     */

    //this.id = navigator.geolocation.watchPosition(this.success, this.error, this.options);

    /*
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)

      this.circle.center = [position.coords.latitude, position.coords.longitude];

    }, error => {
      console.error(error.message)
    });

     */

    /*
    const id = navigator.geolocation.watchPosition(position => {
      //console.log(position)
    }, error => {
      //console.error(error.message)
    })

     */

    //this.coord = [[45.47607335350505, 7.886728298261983], [45.475426746787136, 7.890038503216288], [45.47760084824759, 7.894512423579778], [45.47793023411333, 7.886030790789468]];

    /*
    this.coord = [[45.47600719887373, 7.890048552583054], [45.45395018939488, 7.857276736072249]];

    for (var i = 0; i < this.coord.length; i++) {
      this.markers.push({
        marker: L.latLng(this.coord[i][0], this.coord[i][1]),
        selected: false,
        color: '#1585bd',
        strokeColor: '#1b4f88',
        circleColor: '#ffffff',
        textButton: "Seleziona"
        //TODO: sarebbe molto carino mettere un component come contenuto del marker, che mostra le varie attività che possono essere svolte nel punto
        //popupDescription: <activitiesOfPOI/>//"Sono il Marker a coordinate (" + this.coord[i][0] + ", " + this.coord[i][1] + ")"
      })
    }

    console.log(this.markers);

     */

    /*
    * Value	Status
      200	OK
      400	Bad request (error in input data)
      413	Payload too large (too many jobs or vehicles in input)
      500	Internal server error (see message key in response for details)
    * */

    /*
    $.ajax({
      url: 'https://api.openrouteservice.org/v2/directions/foot-walking/geojson',
      headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': '5b3ce3597851110001cf624857f877a781484fed8dde10c1a27d44b4'
      },
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        coordinates: self.getCorrectCoordinates(this.coord),
        preference: "shortest",
        extra_info: ["waytype", "surface"],
      }),
      success: function (result) {
        self.geojson = result;
      },
      error: function (error) {
        console.log("error: ");
        console.log(error)
      }
    });

     */

    /*
    var j = JSON.parse('[{"id":1,"service":300,"amount":[1],"location":[1.98935,48.701],"skills":[1],"time_windows":[[32400,36000]]},{"id":2,"service":300,"amount":[1],"location":[2.03655,48.61128],"skills":[1]},{"id":3,"service":300,"amount":[1],"location":[2.39719,49.07611],"skills":[2]},{"id":4,"service":300,"amount":[1],"location":[2.41808,49.22619],"skills":[2]},{"id":5,"service":300,"amount":[1],"location":[2.28325,48.5958],"skills":[14]},{"id":6,"service":300,"amount":[1],"location":[2.89357,48.90736],"skills":[14]}]');
    var v = JSON.parse('[{"id":1,"profile":"driving-car","start":[2.35044,48.71764],"end":[2.35044,48.71764],"capacity":[4],"skills":[1,14],"time_window":[28800,43200]},{"id":2,"profile":"driving-car","start":[2.35044,48.71764],"end":[2.35044,48.71764],"capacity":[4],"skills":[2,14],"time_window":[28800,43200]}]');

    $.ajax({
      url: 'https://api.openrouteservice.org/optimization',
      headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': '5b3ce3597851110001cf624857f877a781484fed8dde10c1a27d44b4'
      },
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      //      data: '{"jobs":[{"id":1,"service":300,"amount":[1],"location":[1.98935,48.701],"skills":[1],"time_windows":[[32400,36000]]},{"id":2,"service":300,"amount":[1],"location":[2.03655,48.61128],"skills":[1]},{"id":3,"service":300,"amount":[1],"location":[2.39719,49.07611],"skills":[2]},{"id":4,"service":300,"amount":[1],"location":[2.41808,49.22619],"skills":[2]},{"id":5,"service":300,"amount":[1],"location":[2.28325,48.5958],"skills":[14]},{"id":6,"service":300,"amount":[1],"location":[2.89357,48.90736],"skills":[14]}],"vehicles":[{"id":1,"profile":"driving-car","start":[2.35044,48.71764],"end":[2.35044,48.71764],"capacity":[4],"skills":[1,14],"time_window":[28800,43200]},{"id":2,"profile":"driving-car","start":[2.35044,48.71764],"end":[2.35044,48.71764],"capacity":[4],"skills":[2,14],"time_window":[28800,43200]}]}',
      data: JSON.stringify({
        jobs: j,
        vehicles: v,
      }),
      success: function (result) {
        //self.geojson = result;
        console.log("RISPOSTA: ");
        console.log(result);
      },
      error: function (error) {
        console.log("error: ");
        console.log(error)
      }
    });

     */

    //this.makeRequestsGraphHopper();
    //this.makeRequestsVROOM();
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

        //TODO: remove me
        //console.log("hAvailable: " + hAvailable + ", minAvailable: " + minAvailable)

        console.log("hAvailable: " + hAvailable);
        console.log("minAvailable: " + minAvailable);

        if (hAvailable > 0 || (hAvailable === 0 && minAvailable >= 10)) {
          this.okTimeAvailable = true;
          //this.currentStep++;

          //router.push({ path: "/creapercorso" });

          var timeMinutes = hAvailable * 60 + minAvailable; //converto l'orario inserito in minuti
          var timeAvailable = {
            hour: hAvailable,
            minutes: minAvailable,
            milliseconds: timeMinutes * 60000, //converto i minuti in millisecondi
          };

          this.$store.state.timeAvailable = timeAvailable;

          router.push({
            name: "creapercorso",
            /*params: {
            timeAvailable,
          },*/
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
      console.log("checkCodeAndGetPath");
      console.log(this.pathCodeInserted);

      if (this.pathCodeInserted.trim().length !== 0) {
        var self = this;

        $.ajax({
          url: "/geodidalab/api/itinerari/" + this.pathCodeInserted,
          type: "GET",
          success: function (result) {
            //self.geojson = result;
            console.log("RISPOSTA: ");
            console.log(result);

            var itinerario = result;

            router.push({
              name: "percorsoselezionato",
              params: {
                itinerario,
                page: "percorsi",
              },
            });
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

        /*
      var path = {
        name: "percorso",
        val: 2,
      };

       */
      } else {
        console.log("il codice inserito contiene solo spazi");
        //il codice inserito contiene solo spazi
        this.modals.itineraryCodeNotValid = true;
      }
    },

    //OLD
    getCorrectCoordinates: function (coord) {
      var coordNew = Array(coord.length);
      var j = coord.length;
      while (j--) coordNew[j] = coord[j];

      var i;

      for (i = 0; i < coordNew.length; i++) {
        var tmp = coordNew[i][0];
        coordNew[i][0] = coordNew[i][1];
        coordNew[i][1] = tmp;
      }

      return coordNew;
    },

    allCombinations: function (obj) {
      let combos = [{}];
      Object.entries(obj).forEach(([key, values]) => {
        let all = [];
        values.forEach((value) => {
          combos.forEach((combo) => {
            all.push({ ...combo, [key]: value });
          });
        });
        combos = all;
      });
      return combos;
    },
    makeRequestsGraphHopper: function () {
      var obj = {
        vehicles: [
          {
            vehicle_id: "walk",
            start_address: {
              location_id: "start_point",
              lon: 7.889806606853313,
              lat: 45.47628313260588,
            },
            latest_end: 8500,
          },
        ],
        vehicle_types: [
          {
            type_id: "walk",
            profile: "car",
          },
        ],
        services: [
          {
            id: "lago_licheni",
            name: "visita_lago_licheni",
            address: {
              location_id: "lago_licheni",
              lon: 7.8881649358450625,
              lat: 45.4763201506589,
            },
            duration: 0,
          },
          {
            id: "laboratorio",
            name: "visita_laboratorio",
            address: {
              location_id: "laboratorio",
              lon: 7.890289154415334,
              lat: 45.476701903147436,
            },
            duration: 0,
          },
          {
            id: "albero_maggiore",
            name: "visita_albero_maggiore",
            address: {
              location_id: "albero_maggiore",
              lon: 7.886135172606449,
              lat: 45.477469284654006,
            },
            duration: 0,
          },
        ],
        cost_matrices: [
          {
            type: "default",
            location_ids: [
              "start_point",
              "lago_licheni",
              "laboratorio",
              "albero_maggiore",
            ],
            data: {
              times: [
                [0, 600, 1200, 500],
                [600, 0, 500, 1200],
                [1200, 500, 0, 600],
                [500, 1200, 600, 0],
              ],
              distances: [
                [0, 600, 1200, 450],
                [600, 0, 500, 1200],
                [1200, 500, 0, 600],
                [500, 1200, 600, 0],
              ],
            },
            profile: "car",
          },
        ],
      };

      const timeOptions = {
        lago_licheni: [1200, 500, 233, 123213, 45345, 546],
        laboratorio: [4800, 2000, 453, 43, 234, 534535],
        albero_maggiore: [600, 234, 545, 123, 234, 5546, 756],
      };

      var arrayPermutationTimes = this.allCombinations(timeOptions);

      console.log(arrayPermutationTimes);

      var j;

      for (j = 0; j < arrayPermutationTimes.length; j++) {
        obj.services.find((x) => x.id === "lago_licheni").duration =
          arrayPermutationTimes[j].lago_licheni;
        obj.services.find((x) => x.id === "laboratorio").duration =
          arrayPermutationTimes[j].laboratorio;
        obj.services.find((x) => x.id === "albero_maggiore").duration =
          arrayPermutationTimes[j].albero_maggiore;

        $.ajax({
          url: "https://graphhopper.com/api/1/vrp?key=1a44f3ca-c8dc-404d-bc70-6aa195d12763",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          type: "POST",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(obj),
          success: function (result) {
            //self.geojson = result;
            console.log("RISPOSTA: ");
            console.log(result);
          },
          error: function (error) {
            console.log("error: ");
            console.log(error);
          },
        });
      }
    },
    makeRequestsVROOM: function () {
      var obj = {
        jobs: [
          {
            id: 1,
            description: "lago_licheni",
            service: 1200,
            location: [7.8881649358450625, 45.4763201506589],
            location_index: 1,
          },
          {
            id: 2,
            description: "laboratorio",
            service: 4800,
            location: [7.890289154415334, 45.476701903147436],
            location_index: 2,
          },
          {
            id: 3,
            description: "albero_maggiore",
            service: 600,
            location: [7.886135172606449, 45.477469284654006],
            location_index: 3,
          },
        ],
        vehicles: [
          {
            id: 1,
            profile: "driving-car",
            start_index: 0,
            end_index: 0,
            start: [7.8881649358450625, 45.4763201506589],
            end: [7.8881649358450625, 45.4763201506589],
            time_window: [0, 8500],
          },
        ],
        matrix: [
          [0, 600, 1200, 500],
          [600, 0, 500, 1200],
          [1200, 500, 0, 600],
          [500, 1200, 600, 0],
        ],
      };

      const timeOptions = {
        lago_licheni: [1200, 500],
        laboratorio: [4800, 2000],
        albero_maggiore: [600, 234],
      };

      var arrayPermutationTimes = this.allCombinations(timeOptions);

      console.log(arrayPermutationTimes);

      var j;

      for (j = 0; j < arrayPermutationTimes.length; j++) {
        obj.jobs.find((x) => x.description === "lago_licheni").service =
          arrayPermutationTimes[j].lago_licheni;
        obj.jobs.find((x) => x.description === "laboratorio").service =
          arrayPermutationTimes[j].laboratorio;
        obj.jobs.find((x) => x.description === "albero_maggiore").service =
          arrayPermutationTimes[j].albero_maggiore;

        $.ajax({
          url: "https://api.openrouteservice.org/optimization",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization:
              "5b3ce3597851110001cf624857f877a781484fed8dde10c1a27d44b4",
          },
          type: "POST",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(obj),
          success: function (result) {
            //self.geojson = result;
            console.log("RISPOSTA: ");
            console.log(result);
          },
          error: function (error) {
            console.log("RICHIESTA: ");
            console.log(this.data + "\n auth: " + this.headers.Authorization);
            console.log("error: ");
            console.log(error);
          },
        });
      }
    },
    /*TODO: rimuovere questa funzione se non serve più*/
    changeMarkerState(index) {
      if (!this.markers[index].selected) {
        //TODO: settare il POI come selezionato
        this.markers[index].selected = true;
        this.markers[index].color = "#38a938";
        this.markers[index].strokeColor = "#157315";
        this.markers[index].circleColor = "#ffffff";
        this.markers[index].textButton = "Deseleziona";
      } else {
        //TODO: settare il POI come NON selezionato
        this.markers[index].selected = false;
        this.markers[index].color = "#1585bd";
        this.markers[index].strokeColor = "#1b4f88";
        this.markers[index].circleColor = "#ffffff";
        this.markers[index].textButton = "Seleziona";
      }
    },
    getIcon(item) {
      return L.divIcon({
        className: "my-custom-pin",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="60" width="40">
                    <g transform="translate(-814.59595,-274.38623)">
                        <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
                            <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${item.color};stroke:${item.strokeColor};"/>
                        <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${item.circleColor};"/>
                        </g>
                    </g>
                </svg>`,
      });
    },
    incrementStep() {
      if (this.currentStep === 1) {
        this.currentStep++;
        //do nothing
      } else if (this.currentStep === 2) {
        this.currentStep++;
        //do nothing
        /*
            var ok = this.interestType.filter(obj => obj.interestSelected === true).length > 0;

            console.log(this.interestType);
            console.log(this.interestType.filter(obj => obj.interestSelected === true));
            console.log("OK: " + ok);

            if (this.currentStep === 2 && !ok) {
              this.okCheckedInterestType = false;
            } else {
              this.okCheckedInterestType = true;
              this.currentStep++;
            }
       */
      } else if (this.currentStep === 3) {
        var hAvailable =
          this.endAvailableTimeValue.HH - this.startAvailableTimeValue.HH;
        var minAvailable =
          this.endAvailableTimeValue.mm - this.startAvailableTimeValue.mm;

        console.log(
          "hAvailable: " + hAvailable + ", minAvailable: " + minAvailable
        );

        if (hAvailable > 0) {
          /*TODO: filtrare i POI*/

          // experienceGradeRadio
          // this.$store.state.interests

          console.log("POI PIVOT");
          console.log(store.state.POIpivot);

          this.filteredPOI = [];

          Array.prototype.forEach.call(store.state.POIpivot, (poi) => {
            var experiments = poi.mis;

            if (
              this.POIhasCorrectExperimentsOfDifficultiesLevels(experiments)
            ) {
              console.log("IL POI HA ESPERIMENTI DI QUESTA DIFFICOLTA");
              this.filteredPOI.push(poi);
            } else {
              console.log("IL POI NOOOOOn HA ESPERIMENTI DI QUESTA DIFFICOLTA");
            }
          });

          console.log("FILTERED POI");
          console.log(this.filteredPOI);

          var selectedInterests = this.$store.state.interests.filter(
            (x) => x.interestSelected
          );
          var interestsName;

          if (selectedInterests.length > 0) {
            interestsName = selectedInterests.map((x) => x.interestName);
          } else {
            interestsName = this.$store.state.interests.map(
              (x) => x.interestName
            );
          }

          console.log(interestsName);

          var poiWithCorrectInterestDuplicated = [];

          var poiHasCorrectInterest = false;

          Array.prototype.forEach.call(this.filteredPOI, (poi) => {
            if (
              interestsName.includes(
                poi["geo:ha_interesse"][0]["display_title"]
              )
            ) {
              poiWithCorrectInterestDuplicated.push(poi);
            }
          });

          let poiWithCorrectInterest = [
            ...new Set(poiWithCorrectInterestDuplicated),
          ];

          //this.filteredPOI = this.filteredPOI.filter(poi => interestsName.includes(poi["geo:ha_interesse"][0]["display_title"]));

          //console.log(this.filteredPOI);

          this.filteredPOI = poiWithCorrectInterest;
          console.log(poiHasCorrectInterest);

          console.log("NUOVI FILTERED POI");
          console.log(this.filteredPOI);

          /*TODO: initialize markers*/

          this.initializeMarkersOfFilteredPOI(poiWithCorrectInterest);

          this.currentStep++;
        } else {
          if (hAvailable === 0 && minAvailable > 0) {
            this.currentStep++;
          } else {
            this.okTimeAvailable = false;
          }
        }

        this.activitiesAv = this.allActivitiesAvailable;
      } else if (this.currentStep === 4) {
        //console.log("this.allActivitiesAvailable");
        console.log(this.activitiesAv);
      }

      //set new step title
      if (this.currentStep === 2) {
        this.stepTitle = "Seleziona il tipo di interesse";
      } else if (this.currentStep === 3) {
        this.stepTitle = "Seleziona il tempo che hai a disposizione";
      } else if (this.currentStep === 4) {
        this.stepTitle = "Seleziona almeno K punti sulla mappa";
      }
    },
    decrementStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        if (this.currentStep === 1) {
          this.stepTitle = "Seleziona il tuo grado di esperienza";
        } else if (this.currentStep === 2) {
          this.stepTitle = "Seleziona il tipo di interesse";
        } else if (this.currentStep === 3) {
          this.stepTitle = "Seleziona il tempo che hai a disposizione";
        } else if (this.currentStep === 4) {
          this.stepTitle = "Seleziona almeno K punti sulla mappa";
        }
      }
    },
    POIhasCorrectExperimentsOfDifficultiesLevels(experiments) {
      console.log("ESPERIMENTI");

      console.log(experiments);

      var poiHasExpOfDiffLev = false;

      Array.prototype.forEach.call(experiments, (exp) => {
        //TODO: remove me
        //console.log("DIFFICOLTA DELL'ESPERIMENTO: ");
        //console.log(exp["geo:ha_difficolta"]);

        Array.prototype.forEach.call(exp["geo:ha_difficolta"], (difficulty) => {
          //TODO: remove me
          //console.log("DIFFICOLTA: ");
          //console.log(difficulty["display_title"]);
          if (difficulty["display_title"] === this.experienceGradeRadio) {
            poiHasExpOfDiffLev = true;
          }
        });

        /*
        if(exp["geo:ha_difficolta"][0]["display_title"]=== this.experienceGradeRadio) {
          poiHasExpOfDiffLev = true;
        }
         */
      });

      //x["geo:Livello_scolastico"][0]["@value"]
      //var filteredExp = experiments.filter(x => x["geo:ha_difficolta"][0]["display_title"] === this.experienceGradeRadio);
      //filteredExp.length > 0
      return poiHasExpOfDiffLev;
    },
    initializeMarkersOfFilteredPOI(poiWithCorrectInterest) {
      this.markers = [];

      Array.prototype.forEach.call(poiWithCorrectInterest, (poi) => {
        //TODO: sistemare qua
        var experiments = [];

        Array.prototype.forEach.call(poi.mis, (exp) => {
          var difficultyLevelsPOI = exp["geo:ha_difficolta"].map(
            (d) => d["display_title"]
          );

          if (difficultyLevelsPOI.indexOf(this.experienceGradeRadio) >= 0) {
            experiments.push(exp);
          }

          console.log("Difficultylevels:");
          console.log(difficultyLevelsPOI);
        });

        console.log("Experiments:");
        console.log(experiments);

        //var mis = poi.mis.filter(m => m["geo:Livello_scolastico"][0]["@value"] === this.experienceGradeRadio);
        var misNames = experiments.map((m) => m["o:title"]);

        this.markers.push({
          marker: L.latLng(
            poi.marker["o-module-mapping:lat"],
            poi.marker["o-module-mapping:lng"]
          ),
          selected: false,
          color: "#1585bd",
          strokeColor: "#1b4f88",
          circleColor: "#ffffff",
          //textButton: "Seleziona"
          //TODO: sarebbe molto carino mettere un component come contenuto del marker, che mostra le varie attività che possono essere svolte nel punto
          //popupDescription: poi["geo:Titolo_it"][0]["@value"] + "\n Attività disponibili in questo POI: "
          POItitle: poi["geo:Titolo_it"][0]["@value"],
          POIactivities: misNames,
        });
      });

      this.markersCreated = true;
    },

    /*
    success: function (pos) {
      var crd = pos.coords;

      console.log("LAT: " + crd.latitude + ", LON: " + crd.longitude);
      this.circle.center = [crd.latitude, crd.longitude];
      /*
      if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        console.log('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(id);
      }

    },
    error: function (err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    */
  },
  watch: {
    experienceGradeRadio(newValue, oldValue) {
      console.log("before: " + oldValue + "; after: " + newValue);
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
