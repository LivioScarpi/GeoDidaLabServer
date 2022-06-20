<template>
  <div>
    <div class="row mt-2">
      <div class="col-12">
        <i class="bi bi-arrow-left ml-3" style="font-size: 2rem; color: black; cursor: pointer"
          v-on:click="goBack()"></i>
        <h4 class="text-center mt-0">
          <b>{{ stepTitle[currentStep].pageTitle }}</b>
        </h4>
      </div>
    </div>

    <div v-if="currentStep === 1">
      <div class="row px-3 mb-3">
        <div class="col-2 text-center"></div>
        <div class="col-8 text-center">
          <!-- <h6>
            <b>Tempo a disposizione: </b>
            {{ $store.state.timeAvailable.hour }} ore e
            {{ $store.state.timeAvailable.minutes }} minuti
          </h6> -->
          <!-- {{ this.$store.state.totalTimeSelected }} -->

          <!-- {{ this.$store.state.areasWithSomethingSelected }}
          {{ setAreasSelected }}
          {{ timeBetweenAreas }} -->
          <h6 class="card-title text-center">
            Il tempo occupato include anche gli spostamenti in auto da un'area
            all'altra.
          </h6>

          <h6>Tempo a disposizione occupato</h6>

          <k-progress :percent="percent" color="#389e0d"></k-progress>
        </div>
        <div class="col-2 text-center"></div>
      </div>
      <div class="row my-3">
        <div class="col-12">
          <Button v-if="currentStep >= 1" size="large" round type="primary" v-on:click="incrementStep()"
            class="buttonAlignRight m-2 ">Avanti
          </Button>

          <Button v-if="currentStep >= 1" size="large" type="warning" round v-on:click="goBack()"
            class="buttonAlignLeft m-2 textButtonColor" style="background-color: #f09b56cc;">Indietro
          </Button>


        </div>
      </div>

      <div class="row px-3">
        <div class="col-lg-3 border-right">
          <h5><b>Menu</b></h5>
          <div class="row">
            <div class="col-lg-12">
              <!--Interessi-->
              <collapse>
                <collapse-item title="Interessi" name="interests">
                  <div class="row">
                    <div class="col-12">
                      <Button v-if="selectAllInterests" size="small" type="primary"
                        v-on:click="selectAllInterestsFunctions()" class="mx-1 blueButton">Deseleziona Tutto
                      </Button>
                      <Button v-if="!selectAllInterests" size="small" v-on:click="selectAllInterestsFunctions()"
                        class="mx-1 blueButton">Seleziona Tutto
                      </Button>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div style="max-height: 200px; overflow-y: auto" class="mt-2">
                        <div class="form-radio text-left px-1">
                          <n-checkbox v-for="(item, index) in this.$store.state.interests" :key="'interest' + index"
                            v-model="item.interestSelected" @input="checkInterest(index, item.interestName)">
                            {{ item.interestName }}
                          </n-checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                </collapse-item>
              </collapse>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <!--Difficoltà-->
              <collapse>
                <collapse-item title="Difficoltà" name="difficultyLevels">
                  <div class="row">
                    <div class="col-12">
                      <Button v-if="selectAllDifficulties" size="small" type="primary"
                        v-on:click="selectAllDifficultiesFunctions()" class="mx-1 blueButton">Deseleziona Tutto
                      </Button>
                      <Button v-if="!selectAllDifficulties" size="small" type="primary"
                        v-on:click="selectAllDifficultiesFunctions()" class="mx-1 blueButton">Seleziona Tutto
                      </Button>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div style="max-height: 200px; overflow-y: auto" class="mt-2">
                        <div class="row">
                          <div class="form-radio text-left col-12 ml-1">
                            <n-checkbox v-for="(item, index) in this.$store.state
                            .expertiseLevels" :key="'difficulty' + index" v-model="item.expertiseLevelSelected" @input="
    checkDifficulty(index, item.expertiseLevelName)
  ">
                              <div class="row">
                                <div class="col-12">
                                  {{ item.expertiseLevelName }}
                                  <!--(-->
                                  <svgScuolaInfanzia v-if="
                                    item.expertiseLevelName ===
                                    'Scuola dell\'Infanzia'
                                  " />
                                  <svgScuolaPrimaria v-if="
                                    item.expertiseLevelName ===
                                    'Scuola Primaria'
                                  " />
                                  <svgScuolaSecondariaPrimoGrado v-if="
                                    item.expertiseLevelName ===
                                    'Scuola Secondaria di Primo Grado'
                                  " />
                                  <svgScuolaSecondariaSecondoGrado v-if="
                                    item.expertiseLevelName ===
                                    'Scuola Secondaria di Secondo Grado'
                                  " />
                                  <svgUniversita v-if="
                                    item.expertiseLevelName === 'Università'
                                  " />
                                  <svgPerTutti v-if="
                                    item.expertiseLevelName === 'Per Tutti'
                                  " />
                                </div>
                              </div>
                            </n-checkbox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </collapse-item>
              </collapse>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <h5 class="mt-0"><b>Attività selezionate</b></h5>

              <elencoAttivitaSelezionate @changeSelection="changeSelection"
                @changeSelectionVisitPOI="changeSelectionVisitPOI" />

              <div v-if="someActivitiesSelected" class="mb-4"></div>
              <div v-else class="mb-4">Nessuna attività selezionata</div>
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="row">
            <div class="col-lg-12">
              <ul class="aree__tagbox mb-2">
                <li :class="
                  selectedTab === 'ElencoPercorsi'
                    ? 'tag__item__selected'
                    : 'tag__item__unselected'
                " v-on:click="selectedTab = 'ElencoPercorsi'">
                  Elenco delle aree e delle attività
                </li>
                <li :class="
                  selectedTab === 'Mappa'
                    ? 'tag__item__selected'
                    : 'tag__item__unselected'
                " v-on:click="selectedTab = 'Mappa'">
                  Mappa
                </li>
              </ul>
              <div class="row">
                <div class="col-lg-12" v-if="selectedTab === 'ElencoPercorsi'">
                  <div class="row mb-5">
                    <div class="col-12">
                      <h5 class="mt-0">
                        <b>Elenco delle aree e delle attività</b>
                      </h5>
                      <ul class="aree__tagbox mb-4">
                        <li :class="
                          selectedArea === area['o:title']
                            ? 'tag__item__selected'
                            : 'tag__item__unselected'
                        " v-for="(area, index) in $store.state.aree" :key="index"
                          v-on:click="selectedArea = area['o:title']">
                          {{ area["o:title"] }}
                        </li>
                      </ul>
                      <div>
                        <div v-if="somePOIVisibleInCurrentArea">
                          <div v-for="(item, index) in this.filteredPOI" :key="'filteredPOI' + (index + 300)">
                            <article class="postcard light orange" v-if="
                              selectedArea ===
                              item['geo:appartiene_a_area'][0][
                              'display_title'
                              ] && item.poiVisibleWithFilters
                            ">
                              <a class="postcard__img_link">
                                <img v-if="item.media.length > 0" class="postcard__img" :src="
                                  item['media'][0]['o:thumbnail_urls'][
                                  'large'
                                  ]
                                " alt="Image Title" />
                                <img v-else class="postcard__img" src="@/assets/images/bg3.jpg" alt="Image Title" />
                              </a>
                              <div class="postcard__text">
                                <h1 class="postcard__title red">
                                  <a>{{
                                      item["geo:Titolo_it"][0]["@value"]
                                  }}</a>
                                </h1>

                                <div class="postcard__bar"></div>
                                <div class="postcard__preview-txt">
                                  {{ item["dcterms:description"][0]["@value"] }}
                                </div>

                                <h6>
                                  Interessi:
                                  <span class="font-weight-normal">{{
                                      getInterestList(
                                        item["geo:ha_interesse"]
                                      ).join(", ")
                                  }}</span>
                                </h6>

                                <ul class="postcard__tagbox">
                                  <li class="tag__item__title mr-3">
                                    <i class="bi bi-clock mr-2"></i> Tempo di
                                    visita:

                                    <template v-if="item['geo:Durata'] !== undefined">{{ item["geo:Durata"][0]["@value"]
                                    }}
                                      minuti
                                    </template>
                                    <template v-else>10 minuti </template>
                                  </li>
                                  <li :class="
                                    item.visitPOI
                                      ? 'tag__item__selected'
                                      : 'tag__item__selected'
                                  " v-on:click="
  visitPlaceClicked(
    item['geo:Titolo_it'][0]['@value']
  )
">
                                    <!-- <i
                                      v-if="item.visitPOI"
                                      class="fas fa-check mr-2"
                                    ></i
                                    > -->
                                    <template v-if="!item.visitPOI">Seleziona la visita del luogo</template>
                                    <template v-else>Deseleziona la visita del luogo</template>
                                  </li>
                                </ul>
                                <div v-if="item['mis'].length > 0">
                                  <collapse>
                                    <collapse-item title="Aggiungi attività" name="1" class="mt-3">
                                      <div v-if="item['mis'].length > 0">
                                        <div v-if="
                                          item.poiHasSomeActivitiesVisible
                                        ">
                                          <div v-for="(it, ind) in item.mis" :key="
                                            'filteredPOIactivities' +
                                            (ind + 300)
                                          " class="pl-3">
                                            <div v-if="
                                              it.activityVisibleWithDifficultiesFilters &&
                                              it.activityVisibleWithInterestsFilters
                                            ">
                                              <div class="
                                                  row
                                                  mt-0
                                                  py-2
                                                  text-center
                                                  align-items-center
                                                ">
                                                <div class="col-lg-9 col-9 pl-0">
                                                  <activitiesOfPOI :it="it" />
                                                </div>
                                                <div class="col-lg-3 col-3">
                                                  <ul class="
                                                      activity__tagbox
                                                      float-right
                                                    ">
                                                    <li v-if="it.selected" class="
                                                        tag__item__selected
                                                      " v-on:click="
                                                        changeSelection(
                                                          item[
                                                          'geo:Titolo_it'
                                                          ][0]['@value'],
                                                          it['o:title']
                                                        )
                                                      ">
                                                      Deseleziona
                                                    </li>
                                                    <li v-else class="
                                                        tag__item__selected
                                                      " v-on:click="
                                                        changeSelection(
                                                          item[
                                                          'geo:Titolo_it'
                                                          ][0]['@value'],
                                                          it['o:title']
                                                        )
                                                      ">
                                                      Seleziona
                                                    </li>
                                                  </ul>
                                                </div>

                                                <hr v-if="
                                                  ind < item.mis.length - 1
                                                " style="
                                                    width: 100%;
                                                    text-align: center;
                                                  " class="my-0 py-0" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div v-else>
                                          Nessuna attività disponibile in base
                                          ai filtri selezionati
                                        </div>
                                      </div>
                                      <div v-else>
                                        Non ci sono attività disponibili in
                                        questo luogo
                                      </div>
                                    </collapse-item>
                                  </collapse>
                                </div>
                                <div v-else class="my-3">
                                  Non ci sono attività disponibili in questo
                                  luogo
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                        <div v-else>
                          Nessuna attività o luogo corrispondente ai filtri
                          selezionati nella zona
                          <b>{{ selectedArea.toUpperCase() }}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12" v-else>
                  <div class="row mb-5">
                    <div class="col-lg-12">
                      <h5 class="mt-0">
                        <b>Mappa</b>
                      </h5>
                      <h6 class="mt-0">
                        Per selezionare punti di interesse e attività apri il tab “Elenco delle aree e delle attività”
                      </h6>
                      <div>
                        <l-map style="height: 700px; border-radius: 10px" :zoom="zoom" :center="centerMap">
                          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                          <l-marker v-for="(marker, index) in markers" :lat-lng="marker.marker.getLatLng()"
                            :key="'marker' + index">
                            <l-icon v-if="marker.poiSelected" :icon-url="require('../icons/selectedPOI.png')"></l-icon>
                            <l-icon v-if="!marker.poiSelected" :icon-url="require('../icons/unselectedPOI.png')">
                            </l-icon>
                            <l-popup :options="anchorOptions" style="max-width : 250px">
                              <div class="px-3">
                                <div class="row">
                                  <h5>{{ marker.POItitle }}</h5>
                                </div>
                                <div class="row text-justify fadeeffect" style="max-height: 100px; overflow:scroll; ">
                                  {{ marker.description }}
                                </div>
                                <div class="row mt-3">
                                  <div class="col-12 text-center ">
                                    <img v-if="marker.image !== undefined" class="margin-auto"
                                      style="border-radius: 5px;" :src="
                                        marker.image
                                      " alt="Image Title" />
                                    <img v-else class="postcard__img" src="@/assets/images/bg3.jpg"
                                      style="border-radius: 5px;" alt="Image Title" />
                                  </div>
                                </div>
                              </div>
                            </l-popup>
                          </l-marker>

                          <l-circle-marker :lat-lng="circle.center" :radius="circle.radius" :color="circle.color">
                            <l-popup>Tu sei qui!</l-popup>
                          </l-circle-marker>

                          <l-control>
                            <div class="legend">
                              <h4>Legenda</h4>
                              <i style="background: #e35747"></i><span>Luogo selezionato</span><br />
                              <i style="background: #437fc5"></i><span>Luogo non selezionato</span><br />
                            </div>
                          </l-control>

                          <!-- <l-geo-json
                            v-for="(geoj, index) in geoJsonArray"
                            :key="index"
                            :geojson="geoj"
                          ></l-geo-json> -->
                        </l-map>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-if="!okTimeAvailable" class="col-12 errorMessage fade-in-text text-center">
          <h5><b>Devi inserire una fascia oraria corretta!</b></h5>
        </div>
      </div>
    </div>

    <modal :show.sync="modals.featureDevelopment" headerClasses="justify-content-center"
      @close="modals.featureDevelopment = false">
      <h4 slot="header" class="title title-up text-center">Attenzione!</h4>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 text-center">
              <h6 class="itineraryCode">
                Seleziona almeno una delle attività proposte oppure esplora uno
                degli itinerari predefiniti!
              </h6>
              <Button size="small" type="primary" v-on:click="goToItinerariPredefinitiPage()" class="mx-1 mt-4">Esplora
                itinerari predefiniti
              </Button>
            </div>
          </div>
        </div>
      </div>

      <template slot="footer">
        <Button size="small" type="danger" v-on:click="modals.featureDevelopment = false" class="mx-1">Chiudi
        </Button>
      </template>
    </modal>

    <modal :show.sync="modals.errorGettingSottoitinerario" headerClasses="justify-content-center"
      @close="modals.errorGettingSottoitinerario = false">
      <h4 slot="header" class="title title-up text-center">Errore!</h4>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 text-center">
              <h6 class="itineraryCode">
                Si è verificato un errore nella creazione del tuo itinerario,
                riprova più tardi.
              </h6>
            </div>
          </div>
        </div>
      </div>

      <template slot="footer">
        <Button size="small" type="danger" v-on:click="modals.errorGettingSottoitinerario = false" class="mx-1">Chiudi
        </Button>
      </template>
    </modal>

    <modal :show.sync="modals.loadingVROOMresponse" headerClasses="justify-content-center"
      @close="modals.loadingVROOMresponse = false">
      <h4 slot="header" class="title title-up text-center">
        Caricamento in corso
      </h4>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 text-center">
              <svg class="circular">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10">
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <template slot="footer">
        <Button size="small" type="danger" v-on:click="modals.loadingVROOMresponse = false" class="mx-1">Chiudi
        </Button>
      </template>
    </modal>
  </div>
</template>

<script>
import {
  LCircleMarker,
  LGeoJson,
  LMap,
  LMarker,
  LPopup,
  LIcon,
  LTileLayer,
  LControl,
} from "vue2-leaflet";
import { Button } from "element-ui";
import {
  Checkbox,
  Collapse,
  CollapseItem,
  Radio,
  Card,
  Modal,
  FormGroupInput,
} from "../components";

import VueTimepicker from "vue2-timepicker";
import store from "../store";
import * as L from "leaflet";

import "vue-collapsible-component/lib/vue-collapsible.css";
import Collapsible from "vue-collapsible-component";
import Vue from "vue";
import router from "../router";

const Common = require("@/Common.vue").default;
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet.awesome-markers";

import activitiesOfPOI from "../components/customComponents/activitiesOfPOI";

import $ from "jquery";
import TabPane from "../components/Tabs/Tab.vue";
import Tabs from "../components/Tabs/Tabs.vue";
import "../utils/costMatrices";
import { costMatrix } from "../utils/costMatrices";
import KProgress from "k-progress";
import elencoAttivitaSelezionate from "../components/customComponents/elencoAttivitaSelezionate";
import svgScuolaInfanzia from "../components/customComponents/svg/svgScuolaInfanzia";
import svgScuolaPrimaria from "../components/customComponents/svg/svgScuolaPrimaria";
import svgScuolaSecondariaPrimoGrado from "../components/customComponents/svg/svgScuolaSecondariaPrimoGrado";
import svgScuolaSecondariaSecondoGrado from "../components/customComponents/svg/svgScuolaSecondariaSecondoGrado";
import svgUniversita from "../components/customComponents/svg/svgUniversita";
import svgPerTutti from "../components/customComponents/svg/svgPerTutti";
import { costMatrixAreas } from "../utils/costMatricesAreas";

export default {
  name: "PercorsiNew",
  bodyClass: "percorsi-page",

  components: {
    //Component Leaflet map
    LMap,
    LTileLayer,
    //LGeoJson,
    LMarker,
    LPopup,
    LCircleMarker,
    LIcon,
    LControl,
    //TabPane,
    //Tabs,
    Modal,

    Button,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    Collapse,
    CollapseItem,

    activitiesOfPOI,
    //Collapsible

    KProgress,

    elencoAttivitaSelezionate,
    svgScuolaInfanzia,
    svgScuolaPrimaria,
    svgScuolaSecondariaPrimoGrado,
    svgScuolaSecondariaSecondoGrado,
    svgUniversita,
    svgPerTutti,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 11,
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

      //totalTimeSelected: 0,
      //percent: 0,

      currentPage: "createPath", //variabile usata per mostrare il component corretto in base alla scelta fatta dall'utente (riguardo a cosa fare: creare un percorso, selezionarne uno già creato, selezionarne uno di default)
      currentStep: 1, //variabile contenente il numero dello step corrente
      stepTitle: [
        //array di oggetti contenente i titoli delle pagine
        {
          pageNumber: 0,
          pageTitle: "Area percorsi",
        },
        /*
        {
          pageNumber: 1,
          pageTitle: "Seleziona il tempo che hai a disposizione",
        },
        */
        { pageNumber: 1, pageTitle: "Creazione percorso" },
      ],
      startAvailableTimeValue: {
        //oggetto contenente il l'ora di inizio di disponibilità
        HH: "09",
        mm: "30",
      },
      endAvailableTimeValue: {
        //oggetto contenente il l'ora di fine di disponibilità
        HH: "10",
        mm: "30",
      },
      okTimeAvailable: true, //variabile usata per mostrare o meno l'errore a schermo se l'utente inserisce uno slot orario erratp

      filteredPOI: [], //array di POI filtrati con i filtri

      selectAllDifficulties: false, //variabile usata per selezionare/deselezionare tutte le difficoltà
      selectAllInterests: false, //variabile usata per selezionare/deselezionare tutti gli interessi

      startDifficulties: true,
      startInterests: true,

      selectedArea: "Ivrea",

      //somePOIVisible: false, //variabile usata per capire se alcuni POI sono visibili o meno in bae ai filtri

      allDifficulties: [
        "Scuola dell'Infanzia",
        "Scuola Primaria",
        "Scuola Secondaria di Primo Grado",
        "Scuola Secondaria di Secondo Grado",
        "Università",
        "Per Tutti",
      ],

      allInterests: [
        "Storico",
        "Archeologico",
        "Architettonico",
        "Naturalistico",
        "Glaciologico",
        "Petrografico",
        "Geomorfologico",
        "Paleontologico",
        "Geochimico",
        "Idrogeologico",
        "Chimico",
        "Mineralogico",
        "Geologico",
        "Biologico",
        "Didattico",
        "Scientifico",
        "Divulgativo",
      ],

      modals: {
        //oggetto usato per mostrare i modals
        insertCodeModal: false,
        featureDevelopment: false,
        errorGettingSottoitinerario: false,
        loadingVROOMresponse: false,
      },

      pathCodeInserted: "", //variabile usata per contenere il codice del percorso inserito dell'utente

      //Test filtri
      Items: [
        {
          name: "Apple",
        },
        {
          name: "Orange",
        },
        {
          name: "Mengo",
        },
        {
          name: "Cherry",
        },
      ],
      user: {
        fruitCollection: [],
      },

      idsOfPOI: [
        /*
        {
          poiName: "Laboratorio GeoDidaLab",
          poiID: 1,
        },
        {
          poiName: "Lago San Michele",
          poiID: 2,
        },
        {
          poiName: "Parco della Polveriera",
          poiID: 3,
        },
        */
      ],

      //activitiesSelectedList: [],

      correctIdsOfPOI: [
        { poiName: "Laboratorio GeoDidaLab", poiID: 0 },
        { poiName: "Lago San Michele", poiID: 1 },
        { poiName: "Parco della Polveriera", poiID: 2 },
        { poiName: "Dosso Montonato", poiID: 3 },
        { poiName: "Affioramento MN459", poiID: 4 },
        { poiName: "Sinagoga", poiID: 5 },
        { poiName: "Chiesa Sant'Ulderico", poiID: 6 },
        { poiName: "Trattamenti superficiali Piazza Ottinetti", poiID: 7 },
        { poiName: "Museo Civico P.A. Garda", poiID: 8 },
        { poiName: "Teatro Civico Giuseppe Giacosa", poiID: 9 },
        { poiName: "Affioramento MN465", poiID: 10 },
        { poiName: "Affioramento MN464", poiID: 11 },
        { poiName: "Affioramento MN463", poiID: 12 },
        { poiName: "Affioramento MN460", poiID: 13 },
        { poiName: "Affioramento MN461", poiID: 14 },
        { poiName: "Affioramento MN462", poiID: 15 },
        { poiName: "Cattedrale Santa Maria Assunta - Duomo", poiID: 16 },
        { poiName: "Tempio dell'Immacolata dei Miracoli", poiID: 17 },
        { poiName: "Affioramento MN458", poiID: 18 },
        { poiName: "Affioramento MN466", poiID: 19 },
        { poiName: "Santuario Monte Stella", poiID: 20 },
        { poiName: "Cappella dei Tre Re", poiID: 21 },
        { poiName: "Anfiteatro romano", poiID: 22 },
        { poiName: "Torre Santo Stefano", poiID: 23 },
        { poiName: "Palazzine Olivetti", poiID: 24 },
        { poiName: "Lo sfioratore di Mazzè", poiID: 25 },
        { poiName: "Il Lago di Candia", poiID: 26 },
        { poiName: "L'itinerario dei massi erratici di Vialfrè", poiID: 27 },
        {
          poiName: "I depositi marini della Borra Grande a Peronetto",
          poiID: 28,
        },
        { poiName: "Panorama geomorfologico dal Lago Sirio", poiID: 29 },
        { poiName: "Le terre ballerine dei colli di Ivrea", poiID: 30 },
        { poiName: "La piana di Salamia ad Andrate", poiID: 31 },
        { poiName: "Sulla serra di Ivrea alla torre della Bastia", poiID: 32 },
        { poiName: "Le aurifodine della Bessa", poiID: 33 },
        { poiName: "Lo scaricatore di Zimone", poiID: 34 },
        {
          poiName: "La mostra permanente di Masino sulla geologia dell'AMI",
          poiID: 35,
        },
      ],

      totalItinerary: [],

      anchorOptions: { offset: L.point(0, -30) },

      startPoint: [45.47561994860321, 7.889627627278735],
      endPoint: [45.47548295737901, 7.888970990326549],

      geoJsonArray: [
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                stroke: "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                punto_di_partenza: "A",
                punto_di_arrivo: "B",
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [7.884825468063355, 45.47508135410783],
                  [7.884610891342162, 45.47506630756987],
                  [7.884546518325806, 45.47490079538709],
                  [7.884471416473389, 45.47472775940352],
                  [7.884482145309447, 45.47466757284988],
                  [7.8846752643585205, 45.47466757284988],
                  [7.884911298751831, 45.474652526201446],
                  [7.8851258754730225, 45.47451710618464],
                  [7.885276079177856, 45.47445691940605],
                  [7.885587215423584, 45.47455472288862],
                  [7.885844707489013, 45.47463747954898],
                  [7.88618803024292, 45.474607386232],
                  [7.886606454849243, 45.4747352827182],
                  [7.887196540832519, 45.474908318678665],
                  [7.887572050094604, 45.47490079538709],
                  [7.887979745864867, 45.474870702210715],
                  [7.888365983963013, 45.47496098169163],
                  [7.888741493225098, 45.474908318678665],
                  [7.888827323913574, 45.47478042258518],
                  [7.888709306716919, 45.47466757284988],
                  [7.888526916503907, 45.47451710618464],
                  [7.888387441635131, 45.47435159238884],
                ],
              },
            },
          ],
        },
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                stroke: "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                punto_di_partenza: "C",
                punto_di_arrivo: "D",
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [7.890737056732177, 45.475269435493445],
                  [7.89095163345337, 45.475623026798985],
                  [7.891573905944824, 45.476066893595096],
                  [7.892239093780518, 45.47651075689498],
                  [7.892400026321411, 45.476841771317304],
                  [7.8920674324035645, 45.47701480080965],
                  [7.891681194305419, 45.477187829770706],
                  [7.891402244567872, 45.47738342708687],
                  [7.8905439376831055, 45.477315720400405],
                  [7.890222072601318, 45.47751884021574],
                  [7.89017915725708, 45.47805296660624],
                ],
              },
            },
          ],
        },
      ],

      selectedTab: "ElencoPercorsi",
      // this.$store.state.areasWithSomethingSelected: [],

      timeBetweenAreas: 0,
      bestPathBetweenAreas: null,
      bestOldPath: [],
      oldTotalCostBetweenAreas: 0,

      areasIndexes: {
        Torino: 0,
        Ivrea: 1,
        "GeoDidaLab - Ivrea": 2,
        "Anfiteatro Morenico d'Ivrea": 3,
      },
    };
  },

  mounted() {
    window.addEventListener("unload", this.someMethod);

    console.log("TEMPO DISPONIBILE CREAZIONE: ");
    console.log(this.$route.params);
    console.log(this.$store.state.timeAvailable.milliseconds);

    //TODO: remove me
    //console.log("this.selectedDifficulties.length : " + this.selectedDifficulties.length);
    //console.log("this.selectedInterests.length : " + this.selectedInterests.length);

    this.selectAllDifficulties =
      this.$store.state.expertiseLevels
        .filter((expLevel) => expLevel.expertiseLevelSelected)
        .map((expLevel) => expLevel.expertiseLevelName).length ==
        this.allDifficulties.length
        ? true
        : false;

    this.selectAllInterests =
      this.$store.state.interests
        .filter((interest) => interest.interestSelected)
        .map((interest) => interest.interestName).length ==
        this.allInterests.length
        ? true
        : false;

    this.startInterests = false;

    //codice nell'altro mounted

    this.$store.state.totalTimeSelected = 0;

    this.$store.state.areasWithSomethingSelected = [];

    //SINCRONIZZO I FILTERED POI CON LA LISTA DELLE ATTIVITA SELEZIONATE
    Array.prototype.forEach.call(
      store.state.activitiesSelectedList,
      (actListItem) => {
        Array.prototype.forEach.call(this.filteredPOI, (poi) => {
          if (
            actListItem["o:title"] ===
            "Visita " + poi["geo:Titolo_it"][0]["@value"]
          ) {
            poi.visitPOI = true;
          }

          Array.prototype.forEach.call(poi.mis, (activity) => {
            if (actListItem["o:title"] === activity["o:title"]) {
              activity.selected = true;
              poi.poiHasActivitiesSelected = true;
            }
          });
        });
      }
    );

    Array.prototype.forEach.call(this.filteredPOI, (poi) => {
      console.log("POI");
      console.log(poi);

      if (poi.visitPOI) {
        this.$store.state.totalTimeSelected +=
          parseInt(poi["geo:Durata"][0]["@value"]) * 60000;

        console.log(
          "PUSHO: " + poi["geo:appartiene_a_area"][0]["display_title"]
        );
        this.$store.state.areasWithSomethingSelected.push(
          poi["geo:appartiene_a_area"][0]["display_title"]
        );
      }

      Array.prototype.forEach.call(poi.mis, (activity) => {
        if (activity.selected) {
          this.$store.state.totalTimeSelected +=
            parseInt(activity["geo:Durata"][0]["@value"]) * 60000;
          console.log(
            "PUSHO PER ATTIVITA: " +
            poi["geo:appartiene_a_area"][0]["display_title"]
          );

          this.$store.state.areasWithSomethingSelected.push(
            poi["geo:appartiene_a_area"][0]["display_title"]
          );
        }
      });
    });
  },

  async created() {
    //TODO: remove me
    //console.log("ASYNC CREATED");

    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti

    /**
     * 121 : class id POI_Pivot
     */

    console.log("STAMPO IL TEMPO");
    console.log(this.$store.state.timeAvailable);

    if(this.$store.state.timeAvailable === null) {
      this.$store.state.timeAvailable = {};
      this.$store.state.timeAvailable.hour = 6;
      this.$store.state.timeAvailable.milliseconds = 21600000;
      this.$store.state.timeAvailable.minutes = 0;
    }

    var self = this;

    /*
    window.onbeforeunload = function (e) {
      console.log("SONO QUA NELLA FUNZIONE");
      if(self.$route.path  == "/creapercorso") {
        console.log("Sono nell'if");
        e = e || window.event;
        //old browsers
        if (e) {e.returnValue = 'Changes you made may not be saved';}
        //safari, chrome(chrome ignores text)
        return 'Changes you made may not be saved';
      } else { 
                console.log("Sono nell'else");

        return null;
      }
    };
    */

    /*
    if (performance.navigation.type == 1) {
      if(this.$route.path == '/creapercorso') {
          this.$router.push({path: '/percorsi'})
        } else {
          console.log('reload page without redirect');
      }
    }
    */

    // Common.getElemsByClass(this, 121, (res) => {
    //   store.state.POIpivot = res.body;
    //   self.isLoadingPOIPivot = false;

    //   //TODO: remove me
    //   //console.log(res.body);

    //   console.log("# poi ottenuti : " + store.state.POIpivot.length);

    //   Array.prototype.forEach.call(store.state.POIpivot, (poi) => {
    //     console.log(poi['o:title']);
    //     if (poi.hasOwnProperty("o-module-mapping:marker")) {
    //       // Get module-mapping
    //       Common.getElemByUrl(
    //         self,
    //         poi["o-module-mapping:marker"][0]["@id"],
    //         (r2) => {
    //           poi.marker = r2.body;
    //         }
    //       );
    //     } else {
    //       /*Il POI non ha nessuna coordinata*/
    //     }

    //     poi.visitPOI = true;
    //   });
    // });

    //QUery che vengono fatte anche in percorsi, ma se l'utente carica questa pagina vanno fatte qua per la prima volta
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

        poi.visitPOI = false;
        poi.numberOfActivitiesSelectedInPOI = 0;

        /*chiedo l'immagine dei POI*/
        Common.getElementImages(this, poi, (mediaList) => {
          poi.media = mediaList;
          //self.isLoadingImages = false;
        });
      });



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





    /**
     * 118 : class id Misurazione
     * 130 : class id Attivita
     */

    //chiedo gli esperimenti perchè magari non sono mai andato nella pagina dedicata a loro prima d'ora, ma mi servono qua
    Common.getElemsByClass(this, 130, (res) => {
      store.state.esperimenti = res.body;
      //TODO: remove me
      //console.log(res.body);

      store.commit("setActivitiesInPOI");

      this.filteredPOI = store.state.POIpivot;
      //TODO: remove me
      //console.log(this.filteredPOI);
      this.initializeMarkersOfFilteredPOI();

      self.activitiesLoaded = true;
      self.isLoadingEsperimenti = false;
    });

    //chiedo i livelli di difficoltà
    Common.getElemsByClass(this, 129, (res) => {
      store.state.difficultyLevels = res.body;

      //TODO: remove me
      //console.log(store.state.difficultyLevels);
      store.commit("setAllExpertiseLevels");
    });

    //chiedo gli interessi
    Common.getElemsByClass(this, 128, (res) => {
      store.state.interestsObject = res.body;

      //TODO: remove me
      //console.log(store.state.interestsObject);
      store.commit("setAllinterestOfPOI");
    });
      console.log("FINE POI PIVOT");
    });
    //     /**
    //  * 132 : class id geo:Area
    //  */
    // Common.getElemsByClass(this, 132, (res) => {
    //   console.log("HO OTTENUTO TUTTE LE AREE");
    //   store.state.aree = res.body;
    //   self.isLoadingAree = false;
    //   //store.commit('setAllinterestOfPOI');
    //             //store.commit("setAreaInPOIPivot");

    //   console.log(res.body);
    // });
  },

  methods: {
    getInterestList(list) {
      var newList = [];

      for (var i = 0; i < list.length; i++) {
        newList.push(list[i]["display_title"]);
      }

      return newList;
    },
    someMethod(event) {
      // do something to let the user decide
      // then redirect if necessary
      console.log("SONO QUA NELLA FUNZIONE");

      //TODO: funziona -> se si riesce migliorarlo
      for (var i = 0; i < this.$store.state.POIpivot.length; i++) {
        this.$set(this.$store.state.POIpivot, i, this.filteredPOI[i]);
      }
    },
    /*
    getIcon(item) {
      return L.divIcon({
        className: "my-custom-pin",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="40" width="40">
                    <g transform="translate(-814.59595,-274.38623)">
                        <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
                            <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${item.color};stroke:${item.strokeColor};"/>
                        <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${item.circleColor};"/>
                        </g>
                    </g>
                </svg>`
      });
    },*/

    createPath() {
      console.log("createPath");
      var hAvailable =
        this.endAvailableTimeValue.HH - this.startAvailableTimeValue.HH;
      var minAvailable =
        this.endAvailableTimeValue.mm - this.startAvailableTimeValue.mm;

      //TODO: remove me
      //console.log("hAvailable: " + hAvailable + ", minAvailable: " + minAvailable)

      if (hAvailable > 0) {
        this.okTimeAvailable = true;
        this.currentStep++;
      } else {
        this.okTimeAvailable = false;
      }
    },

    insertPathCode() {
      console.log("insertPathCode");
      this.modals.insertCodeModal = true;
    },

    selectDefaultPath() {
      console.log("selectDefaultPath");

      this.currentPage = "selectDefaultPath";
    },

    checkCodeAndGetPath() {
      console.log("checkCodeAndGetPath");
      console.log(this.pathCodeInserted);

      this.modals.insertCodeModal = false;

      //TODO: controllare se il codice esiste ed è corretto -> in caso recuperare il percorso e mostrarlo

      this.currentPage = "selectExistingPath";
    },

    incrementStep() {
      console.log(this.$route);
      console.log(
        "timeAvailable milliseconds: " +
        this.$store.state.timeAvailable.milliseconds
      );

      this.totalItinerary = [];

      console.log(this.$store.state.totalTimeSelected);
      console.log(this.$store.state.totalTimeSelected === 0);

      if (this.$store.state.totalTimeSelected === 0) {
        //TODO: mostrare modal di avviso
        //alert("Selezionare almeno un'attività oppure scegliere uno degli itinerari predefiniti");
        this.modals.featureDevelopment = true;
      } else {
        this.modals.loadingVROOMresponse = true;

        Array.prototype.forEach.call(this.$store.state.aree, (area) => {
          var POIofArea = this.filteredPOI.filter(
            (poi) =>
              poi["geo:appartiene_a_area"][0]["display_title"] ===
              area["o:title"]
          );

          console.log("POI OF AREA " + area["o:title"]);
          console.log(POIofArea);

          if (POIofArea.length > 0) {
            var vroomObject = {
              jobs: [],
              vehicles: [
                {
                  id: 1,
                  profile: "car",
                  start_index: 0,
                  end_index: 0,
                  start: this.startPoint,
                  end: this.endPoint,
                  time_window: [
                    0,
                    this.$store.state.timeAvailable.milliseconds,
                  ], //TODO: inserire qua il tempo a disposizione in millisecondi
                },
              ],
              matrices: {
                car: {
                  durations: costMatrix,
                  costs: costMatrix,
                },
              },
            };

            console.log("FILTRO I POI");

            //oggetto contenente i POI con delle attività selezionate
            var poiWithSelectedActivities = POIofArea.filter(
              (poi) => poi.poiHasActivitiesSelected
            );

            //se nessun POI ha delle attività selezionate allora è come averle selezionate tutte
            // if (poiWithSelectedActivities.length === 0) {
            //   Array.prototype.forEach.call(POIofArea, (poi) => {
            //     Array.prototype.forEach.call(poi.mis, (activity) => {
            //       activity.selected = true;
            //     });
            //   });

            //   poiWithSelectedActivities = POIofArea;
            // }

            //TODO: remove me
            //onsole.log("poi con attività selezionate");
            console.log(poiWithSelectedActivities);

            var jobID = 1;

            var placeID = 0;
            var currentPlaceID = 0;

            var customObjTmp = [];

            Array.prototype.forEach.call(POIofArea, (poi) => {
              if (poi.visitPOI) {
                //se l'utente vuole visitare il POI viene aggiunto il Job
                var visitPOIjob = {
                  id: jobID, //1, //l'id deve essere stabilito a priori, ad esempio: lago licheni -> 1
                  description:
                    poi["geo:Titolo_it"][0]["@value"] + "_Visita del luogo",
                  service: this.getMilliseconds(poi["geo:Durata"][0]["@value"]),
                  location: [
                    poi.marker["o-module-mapping:lng"],
                    poi.marker["o-module-mapping:lat"],
                  ],
                  location_index: currentPlaceID,
                };

                vroomObject.jobs.push(visitPOIjob);

                jobID += 1;
              }
            });

            //creo i jobs per l'oggetto VROOM
            Array.prototype.forEach.call(poiWithSelectedActivities, (poi) => {
              var activitiesSelected = poi.mis.filter(
                (activity) => activity.selected
              );

              console.log("activitiesSelected");
              console.log(activitiesSelected);

              console.log(poi["geo:Titolo_it"][0]["@value"]);
              var poiIDObject = this.correctIdsOfPOI.filter(
                (p) => p.poiName === poi["geo:Titolo_it"][0]["@value"]
              );

              console.log(poiIDObject[0]);
              currentPlaceID = poiIDObject[0].poiID;

              /*
        if (poiIDObject.length === 0) {
          console.log("il POI NON c'è");
          this.idsOfPOI.push({
            poiName: poi["geo:Titolo_it"][0]["@value"],
            poiID: placeID,
          });

          customObjTmp.push({
            poiName: poi["geo:Titolo_it"][0]["@value"],
            poiID: placeID,
          });

          currentPlaceID = placeID;

          placeID += 1;
        } else {
          console.log("il POI c'è");

          currentPlaceID = this.poiIDObject[0].poiID;
        }
        */

              //TODO: sistemare poiIDObject

              // if (poi.visitPOI) {
              //   //se l'utente vuole visitare il POI viene aggiunto il Job
              //   var visitPOIjob = {
              //     id: jobID, //1, //l'id deve essere stabilito a priori, ad esempio: lago licheni -> 1
              //     description: poi["geo:Titolo_it"][0]["@value"] + "_Visita",
              //     service: this.getMilliseconds(poi["geo:Durata"][0]["@value"]),
              //     location: [
              //       poi.marker["o-module-mapping:lng"],
              //       poi.marker["o-module-mapping:lat"],
              //     ],
              //     location_index: currentPlaceID,
              //   };

              //   vroomObject.jobs.push(visitPOIjob);

              //   jobID += 1;
              // }

              Array.prototype.forEach.call(activitiesSelected, (activity) => {
                var job = {
                  id: jobID, //1, //l'id deve essere stabilito a priori, ad esempio: lago licheni -> 1
                  description:
                    poi["geo:Titolo_it"][0]["@value"] +
                    "_" +
                    activity["o:title"],
                  service: this.getMilliseconds(
                    activity["geo:Durata"][0]["@value"]
                  ),
                  location: [
                    poi.marker["o-module-mapping:lng"],
                    poi.marker["o-module-mapping:lat"],
                  ],
                  location_index: currentPlaceID,
                };

                console.log("JOB creato");

                vroomObject.jobs.push(job);

                jobID += 1;
              });
            });

            console.log("VROOM OBJECT");
            console.log(vroomObject);
            console.log(JSON.stringify(vroomObject));

            console.log("OGGETTO CON GLI ID");
            console.log(JSON.stringify(customObjTmp));

            if (vroomObject.jobs.length !== 0) {
              var vroomItineraryResponse = this.makeQueryVROOM(
                vroomObject,
                area["o:title"]
              );
            }

            //totalItinerary.push(vroomItineraryResponse);
          }
        });
      }

      console.log("TOTAL ITINERARY");
      console.log(this.totalItinerary);
      //console.log("DOPO MAKE QUERY VROOM");
      //console.log(vroomItineraryResponse);

      //TODO: remove me
      //this.modals.featureDevelopment = true;

      //var itineraryCorrectObject = this.createItineraryObject(vroomItineraryResponse);
      /*
      if (this.currentStep === 1) {
        //do nothing
      } else if (this.currentStep === 2) {
      } else if (this.currentStep === 3) {
      } else if (this.currentStep === 4) {
      }
      */
    },
    initializeMarkersOfFilteredPOI() {
      this.markers = [];

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        if (poi.poiVisibleWithFilters || poi.poiHasActivitiesSelected) {
          this.markers.push({
            marker: L.marker([
              poi.marker["o-module-mapping:lat"],
              poi.marker["o-module-mapping:lng"],
            ]),
            color: "#1585bd",
            strokeColor: "#1b4f88",
            circleColor: "#ffffff",
            POItitle: poi["geo:Titolo_it"][0]["@value"],
            poiSelected: poi.poiHasActivitiesSelected || poi.visitPOI,
            description: poi["dcterms:description"][0]["@value"],
            image: poi['media'][0] ? poi['media'][0]['o:thumbnail_urls']['large'] : undefined
          });
        }
      });

      this.markersCreated = true;
    },

    visitPlaceClicked(poiName) {
      var self = this;
      console.log("visitPlaceClicked");
      var tmpFilteredPOI = this.filteredPOI;

      console.log(poiName);

      Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
        console.log("STAMPO IL POI");
        console.log(poi);
        if (poi["geo:Titolo_it"][0]["@value"] === poiName) {
          //TODO: remove me
          console.log("POI TROVATO: " + poi["geo:Titolo_it"][0]["@value"]);
          this.$set(poi, "visitPOI", !poi.visitPOI);
          console.log(poi.visitPOI);
          console.log(poi);

          //TODO: aggiungere area alla lista delle aree con qualcosa di selezionato
          if (poi.visitPOI) {
            var timeCheck =
              this.$store.state.totalTimeSelected +
              parseInt(poi["geo:Durata"][0]["@value"]) * 60000;

            if (
              this.percent < 100 &&
              timeCheck <= this.$store.state.timeAvailable.milliseconds
            ) {
              this.$store.state.totalTimeSelected +=
                parseInt(poi["geo:Durata"][0]["@value"]) * 60000; //aggiungo la durata della visita del POI

              console.log("PUSHO");

              this.$store.state.areasWithSomethingSelected.push(
                poi["geo:appartiene_a_area"][0]["display_title"]
              );

              //l'attività è stata appena selezionata
              var activityTmp = {};
              activityTmp["geo:Durata"] = poi["geo:Durata"];
              activityTmp["geo:appartiene_a_area"] =
                poi["geo:appartiene_a_area"];
              activityTmp["geo:Titolo_it"] = poi["geo:Titolo_it"];
              activityTmp["o:title"] =
                "Visita " + poi["geo:Titolo_it"][0]["@value"];
              activityTmp.isVisit = true;

              store.state.activitiesSelectedList.unshift(activityTmp);
            } else {
              alert(
                "Errore, rimuovi qualche attività per poter inserire questa e stare nei tempi"
              );
              this.$set(poi, "visitPOI", !poi.visitPOI);
            }
          } else {
            this.$store.state.totalTimeSelected -=
              parseInt(poi["geo:Durata"][0]["@value"]) * 60000; //rimuovo la durata della visita del POI

            console.log("ELIMINO");

            //rimuovo l'attività dalla lista delle attività
            var indexOfActivity = 0;

            for (
              var i = 0;
              i < store.state.activitiesSelectedList.length;
              i++
            ) {
              console.log(store.state.activitiesSelectedList[i]["o:title"]);

              console.log("Visita " + poiName);
              if (
                store.state.activitiesSelectedList[i]["o:title"] ===
                "Visita " + poiName
              ) {
                indexOfActivity = i;
              }
            }

            console.log("INDEX: " + indexOfActivity);

            store.state.activitiesSelectedList.splice(indexOfActivity, 1);
            //ho rimosso l'attivitàà dalla lista delle attività

            var index = this.$store.state.areasWithSomethingSelected.indexOf(
              poi["geo:appartiene_a_area"][0]["display_title"]
            );
            if (index > -1) {
              this.$store.state.areasWithSomethingSelected.splice(index, 1);
            }
          }
        }
      });

      //TODO: funziona -> se si riesce migliorarlo
      for (var i = 0; i < this.filteredPOI.length; i++) {
        this.$set(this.filteredPOI, i, tmpFilteredPOI[i]);
      }

      console.log(this.filteredPOI);

      this.initializeMarkersOfFilteredPOI();
    },

    changeSelectionVisitPOI(poiName) {
      //TODO: remove me
      console.log("CHANGE SELECTION VISIT POI: " + poiName + ", ");

      var tmpFilteredPOI = this.filteredPOI;

      Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
        //console.log(poi["geo:Titolo_it"][0]["@value"]);
        if (poi["geo:Titolo_it"][0]["@value"] === poiName) {
          //TODO: remove me
          //console.log("POI TROVATO");

          var visit = poi.visitPOI;
          this.$set(poi, "visitPOI", !visit);

          //TODO: aggiungere area alla lista delle aree con qualcosa di selezionato
          if (poi.visitPOI) {
            // this.$store.state.totalTimeSelected +=
            //   parseInt(poi["geo:Durata"][0]["@value"]) * 60000; //aggiungo la durata della visita del POI
            // console.log("PUSHO");
            // this.$store.state.areasWithSomethingSelected.push(
            //   poi["geo:appartiene_a_area"][0]["display_title"]
            // );
          } else {
            this.$store.state.totalTimeSelected -=
              parseInt(poi["geo:Durata"][0]["@value"]) * 60000; //rimuovo la durata della visita del POI

            console.log("ELIMINO -> " + poiName);

            //TODO: RIMUOVERE QUA

            //rimuovo l'attività dalla lista delle attività
            var indexOfActivity = 0;

            for (
              var i = 0;
              i < store.state.activitiesSelectedList.length;
              i++
            ) {
              console.log(
                "NOME NELLA LISTA: " +
                store.state.activitiesSelectedList[i]["geo:Titolo_it"][0][
                "@value"
                ]
              );

              if (
                store.state.activitiesSelectedList[i]["geo:Titolo_it"][0][
                "@value"
                ] === poiName
              ) {
                console.log("HO TROVATO L'INDICE: " + i);
                indexOfActivity = i;
              }
            }

            store.state.activitiesSelectedList.splice(indexOfActivity, 1);
            //ho rimosso l'attivitàà dalla lista delle attività

            var index = this.$store.state.areasWithSomethingSelected.indexOf(
              poi["geo:appartiene_a_area"][0]["display_title"]
            );
            if (index > -1) {
              this.$store.state.areasWithSomethingSelected.splice(index, 1);
            }
          }
        }
      });

      //imposto se il POI ha delle attività selezionate
      Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
        var poiHasActivitiesSelected = false;

        Array.prototype.forEach.call(poi.mis, (activity) => {
          if (activity.selected) {
            poiHasActivitiesSelected = true;
            console.log("IL POI ha delle attività selezionate");
          }
        });

        // il poi ha delle attività selezionate se è selezionata la sua visita oppure delle attività da fare al suo interno
        poi.poiHasActivitiesSelected = poiHasActivitiesSelected || poi.visitPOI;
      });

      //TODO: impostare se l'area ha delle attività selezionate
      // Array.prototype.forEach.call(this.$store.state.aree, (area) => {
      //   console.log(area);
      //   var areaHasActivitiesSelected = false;

      //   Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
      //     if (
      //       poi.poiHasActivitiesSelected &&
      //       poi["geo:appartiene_a_area"][0]["display_title"] == area["o:title"]
      //     ) {
      //       areaHasActivitiesSelected = true;
      //     }
      //   });

      //   area.areaHasActivitiesSelected = areaHasActivitiesSelected;
      // });

      //TODO: funziona -> se si riesce migliorarlo
      for (var i = 0; i < this.filteredPOI.length; i++) {
        this.$set(this.filteredPOI, i, tmpFilteredPOI[i]);
      }

      console.log("stampo dopo la selezione");
      console.log(this.filteredPOI);

      this.initializeMarkersOfFilteredPOI();
    },

    changeSelection(poiName, activityName) {
      //TODO: remove me
      console.log("CHANGE SELECTION: " + poiName + ", " + activityName);

      var tmpFilteredPOI = this.filteredPOI;

      Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
        if (poi["geo:Titolo_it"][0]["@value"] === poiName) {
          //TODO: remove me
          //console.log("POI TROVATO");
          Array.prototype.forEach.call(poi.mis, (activity) => {
            //TODO: remove me
            //console.log("ACTIVITY TROVATA");

            if (activity["o:title"] === activityName) {
              console.log("ATTIVITA SELEZIONATA: " + activity.selected);

              var timeCheck =
                this.$store.state.totalTimeSelected +
                parseInt(activity["geo:Durata"][0]["@value"]) * 60000;

              if (
                activity.selected ||
                (this.percent < 100 &&
                  timeCheck <= this.$store.state.timeAvailable.milliseconds)
              ) {
                console.log("ECCOCI!!!!! : " + activity["o:title"]);

                // se l'attività è selezionata e la voglio deselezionare
                activity.selected = !activity.selected;

                if (activity.selected) {
                  console.log("SIAMO QUA!!!!! : " + activity["o:title"]);
                  if (
                    poi.numberOfActivitiesSelectedInPOI === 0 &&
                    !poi.visitPOI
                  ) {
                    console.log("PRIMO IF!!!!! : " + activity["o:title"]);

                    this.$set(poi, "visitPOI", true);
                    //se visitPOI è false e se non c'è nessuna attività selezionata e viene selezionata ora allora dobbiamo aggiungere anche il tempo di visita del POI
                    this.$store.state.totalTimeSelected +=
                      parseInt(poi["geo:Durata"][0]["@value"]) * 60000;

                    // aggiungo una volta l'area per la visita del posto
                    this.$store.state.areasWithSomethingSelected.push(
                      poi["geo:appartiene_a_area"][0]["display_title"]
                    ); // aggiungo l'area all'array delle aree con qualcosa di selezionato all'interno

                    //l'attività è stata appena selezionata
                    var activityTmp = {};
                    activityTmp["geo:Durata"] = poi["geo:Durata"];
                    activityTmp["geo:appartiene_a_area"] =
                      poi["geo:appartiene_a_area"];
                    activityTmp["geo:Titolo_it"] = poi["geo:Titolo_it"];
                    activityTmp["o:title"] =
                      "Visita " + poi["geo:Titolo_it"][0]["@value"];

                    activityTmp.isVisit = true;

                    store.state.activitiesSelectedList.unshift(activityTmp);

                    console.log("FINE PRIMO IF!!!!! : " + activity["o:title"]);
                  }

                  // aggiungo una volta l'area per l'attività selezionata
                  this.$store.state.areasWithSomethingSelected.push(
                    poi["geo:appartiene_a_area"][0]["display_title"]
                  ); // aggiungo l'area all'array delle aree con qualcosa di selezionato all'interno

                  console.log("1 : " + activity["o:title"]);

                  poi.numberOfActivitiesSelectedInPOI += 1;

                  this.$store.state.totalTimeSelected +=
                    parseInt(activity["geo:Durata"][0]["@value"]) * 60000;

                  console.log("2 : " + activity["o:title"]);

                  //l'attività è stata appena selezionata
                  var activityTmp = JSON.parse(JSON.stringify(activity));
                  activityTmp["geo:Durata"] = activity["geo:Durata"];
                  activityTmp["geo:appartiene_a_area"] =
                    poi["geo:appartiene_a_area"];
                  activityTmp["geo:Titolo_it"] = poi["geo:Titolo_it"];
                  activityTmp["o:title"] = activity["o:title"];
                  activityTmp.isVisit = false;

                  console.log("3 : " + activity["o:title"]);

                  store.state.activitiesSelectedList.unshift(activityTmp);

                  console.log("AL FONDO DELL'IF!!!!! : " + activity["o:title"]);
                } else {
                  //rimuovo l'attività dalla lista delle attività
                  var indexOfActivity = 0;

                  for (
                    var i = 0;
                    i < store.state.activitiesSelectedList.length;
                    i++
                  ) {
                    console.log("ACTIVITYNAME: " + activityName);
                    console.log(
                      "STORE NAME: " +
                      store.state.activitiesSelectedList[i]["o:title"]
                    );

                    if (
                      activityName ===
                      store.state.activitiesSelectedList[i]["o:title"]
                    ) {
                      indexOfActivity = i;
                    }
                  }

                  store.state.activitiesSelectedList.splice(indexOfActivity, 1);
                  //ho rimosso l'attivitàà dalla lista delle attività

                  poi.numberOfActivitiesSelectedInPOI -= 1;

                  this.$store.state.totalTimeSelected -=
                    parseInt(activity["geo:Durata"][0]["@value"]) * 60000;

                  console.log(
                    "DECREMENTO IL NUMERO DI ATTIVITA'" +
                    poi.numberOfActivitiesSelectedInPOI
                  );

                  //rimuovo una volta l'area  dalle aree con qualcosa di selezionato
                  var index =
                    this.$store.state.areasWithSomethingSelected.indexOf(
                      poi["geo:appartiene_a_area"][0]["display_title"]
                    );
                  if (index > -1) {
                    this.$store.state.areasWithSomethingSelected.splice(
                      index,
                      1
                    );
                  }

                  if (
                    poi.numberOfActivitiesSelectedInPOI === 0 &&
                    poi.visitPOI
                  ) {
                    this.$set(poi, "visitPOI", false); //togliamo la visita del POI

                    this.$store.state.totalTimeSelected -=
                      parseInt(poi["geo:Durata"][0]["@value"]) * 60000; //togliamo il tempo necessario a visitare il POI

                    console.log("ELIMINO LA VISITA DEL POI QUA");

                    //rimuovo l'attività dalla lista delle attività
                    var indexOfActivity = 0;

                    for (
                      var i = 0;
                      i < store.state.activitiesSelectedList.length;
                      i++
                    ) {
                      console.log(
                        "NOME NELLA LISTA: " +
                        store.state.activitiesSelectedList[i][
                        "geo:Titolo_it"
                        ][0]["@value"]
                      );

                      if (
                        store.state.activitiesSelectedList[i][
                        "geo:Titolo_it"
                        ][0]["@value"] === poiName
                      ) {
                        console.log("HO TROVATO L'INDICE: " + i);
                        indexOfActivity = i;
                      }
                    }

                    //TODO: qua

                    store.state.activitiesSelectedList.splice(
                      indexOfActivity,
                      1
                    );
                    //ho rimosso l'attivitàà dalla lista delle attività

                    //rimuovo una volta l'area  dalle aree con qualcosa di selezionato
                    var index =
                      this.$store.state.areasWithSomethingSelected.indexOf(
                        poi["geo:appartiene_a_area"][0]["display_title"]
                      );
                    if (index > -1) {
                      this.$store.state.areasWithSomethingSelected.splice(
                        index,
                        1
                      );
                    }
                  }
                }
              } else {
                alert(
                  "Questa attività ha una durata maggiore del tempo a disposizione. Rimuovere qualche attività per poter selezionare quest'ultima."
                );
              }
            }
          });
        }
      });

      //imposto se il POI ha delle attività selezionate
      Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
        var poiHasActivitiesSelected = false;

        Array.prototype.forEach.call(poi.mis, (activity) => {
          if (activity.selected) {
            poiHasActivitiesSelected = true;
            console.log("IL POI ha delle attività selezionate");
          }
        });

        poi.poiHasActivitiesSelected = poiHasActivitiesSelected;
      });

      //TODO: impostare se l'area ha delle attività selezionate
      Array.prototype.forEach.call(this.$store.state.aree, (area) => {
        console.log(area);
        var areaHasActivitiesSelected = false;

        Array.prototype.forEach.call(tmpFilteredPOI, (poi) => {
          if (
            poi.poiHasActivitiesSelected &&
            poi["geo:appartiene_a_area"][0]["display_title"] === area["o:title"]
          ) {
            areaHasActivitiesSelected = true;
          }
        });

        area.areaHasActivitiesSelected = areaHasActivitiesSelected;
      });

      //TODO: funziona -> se si riesce migliorarlo
      for (var i = 0; i < this.filteredPOI.length; i++) {
        this.$set(this.filteredPOI, i, tmpFilteredPOI[i]);
      }

      console.log("stampo dopo la selezione");
      console.log(this.filteredPOI);

      this.initializeMarkersOfFilteredPOI();
    },

    //funziona chiamata quando si seleziona/deseleziona un interesse
    checkInterest(index, interestName) {
      //TODO: remove me
      //console.log("checkInterest: " + index + ", " + interestName);

      //TODO: filtrare i POI in base all'interesse
      //TODO: remove me
      //console.log(this.selectedInterests);

      //filtro i POI in base agli interessi
      //this.filterPOIofCorrectInterests();
      this.filterActivitiesOfCorrectInterests();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    //funziona chiamata quando si seleziona/deseleziona una difficoltà
    checkDifficulty(index, difficultyName) {
      //TODO: remove me
      //console.log("checkDifficulty: " + index + ", " + difficultyName);

      //TODO: remove me
      //console.log(this.selectedDifficulties);

      //filtro i POI in base alla difficoltà
      this.filterPOIofCorrectDifficulty();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    //funziona chiamata quando si seleziona/deseleziona "Select All" in difficulties
    selectAllDifficultiesFunctions() {
      //TODO: remove me
      //console.log("selectAllDifficulties");

      this.selectAllDifficulties = !this.selectAllDifficulties;

      for (var i = 0; i < this.$store.state.expertiseLevels.length; i++) {
        this.$set(
          this.$store.state.expertiseLevels[i],
          "expertiseLevelSelected",
          this.selectAllDifficulties
        );
      }

      //filtro i POI in base alla difficoltà
      this.filterPOIofCorrectDifficulty();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    //funziona chiamata quando si seleziona/deseleziona "Select All" in interests
    selectAllInterestsFunctions() {
      //TODO: remove me
      //console.log("selectAllInterests");

      this.selectAllInterests = !this.selectAllInterests;

      for (var i = 0; i < this.$store.state.interests.length; i++) {
        this.$set(
          this.$store.state.interests[i],
          "interestSelected",
          this.selectAllInterests
        );
      }

      //filtro i POI in base agli interessi
      //this.filterPOIofCorrectInterests();
      this.filterActivitiesOfCorrectInterests();
      this.setPOIVisibilityWithInterestsSelected();

      //aggiorno i markers sulla mappa
      this.initializeMarkersOfFilteredPOI();
    },

    filterPOIofCorrectDifficulty() {
      //filtro i POI in base alla difficoltà
      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        var poiHasSomeActivitiesVisible = false;
        Array.prototype.forEach.call(poi.mis, (exp) => {
          var expHasCorrectExpertiseLevels = false;

          console.log(exp["o:title"]);

          if (
            this.selectedDifficulties.includes(
              exp["geo:ha_difficolta"][0]["display_title"]
            )
          ) {
            console.log("l'attività ha la difficoltà giusta!");
            expHasCorrectExpertiseLevels = true;
            poiHasSomeActivitiesVisible = true;
          }

          // Array.prototype.forEach.call(
          //   exp["geo:ha_difficolta"],
          //   (difficulty) => {
          //     if (
          //       this.selectedDifficulties.includes(difficulty["display_title"])
          //     ) {
          //       console.log("l'attività ha la difficoltà giusta!");
          //       expHasCorrectExpertiseLevels = true;
          //     }
          //   }
          // );

          console.log(
            "expHasCorrectExpertiseLevels: " + expHasCorrectExpertiseLevels
          );

          //exp.activityVisibleWithFilters = expHasCorrectExpertiseLevels;
          exp.activityVisibleWithDifficultiesFilters =
            expHasCorrectExpertiseLevels;
        });

        poi.poiHasSomeActivitiesVisible = poiHasSomeActivitiesVisible;
      });
    },

    filterPOIofCorrectInterests() {
      //filtro i POI in base agli interessi
      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        var poiHasCorrectInterests = false;

        Array.prototype.forEach.call(poi["geo:ha_interesse"], (interest) => {
          if (this.selectedInterests.includes(interest["display_title"])) {
            poiHasCorrectInterests = true;
          }
        });

        poi.poiVisibleWithFilters = poiHasCorrectInterests;
      });
    },

    filterActivitiesOfCorrectInterests() {
      //filtro i POI in base alla difficoltà
      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        Array.prototype.forEach.call(poi.mis, (exp) => {
          var expHasCorrectInterests = false;

          Array.prototype.forEach.call(exp["geo:ha_interesse"], (interest) => {
            if (this.selectedInterests.includes(interest["display_title"])) {
              expHasCorrectInterests = true;
            }
          });

          exp.activityVisibleWithInterestsFilters = expHasCorrectInterests;
        });
      });
    },

    setPOIVisibilityWithInterestsSelected() {
      var tmpFilteredPOI = this.filteredPOI;

      //TODO: remove me
      //console.log("setPOIVisibilityWithInterestsSelected");

      for (var i = 0; i < tmpFilteredPOI.length; i++) {
        var poiInterests = tmpFilteredPOI[i]["geo:ha_interesse"];
        var poiInterestsName = poiInterests.map(
          (interest) => interest.display_title
        );
        var poiHasCorrectInterests = false;
        var poiHasActivitiesVisible = false;

        console.log(
          "INTERESSI DEL POI: " +
          tmpFilteredPOI[i]["geo:Titolo_it"][0]["@value"]
        );
        console.log(poiInterestsName);

        Array.prototype.forEach.call(poiInterestsName, (interest) => {
          if (this.selectedInterests.includes(interest)) {
            poiHasCorrectInterests = true;
          }
        });

        if (!poiHasCorrectInterests) {
          console.log("GUARDO LE SUE ATTIVITA'");
          Array.prototype.forEach.call(tmpFilteredPOI[i].mis, (activity) => {
            if (
              activity.activityVisibleWithInterestsFilters &&
              activity.activityVisibleWithDifficultiesFilters
            ) {
              console.log("HA UN'ATTIVITA CORRETTA");

              poiHasActivitiesVisible = true;
              //TODO: remove me
              //console.log("IL POI HA ALMENO UN'ACTIVITY VISIBILE");
            }
          });
        }

        //TODO: remove me
        console.log("poiHasCorrectInterests: " + poiHasCorrectInterests);
        console.log("poiHasActivitiesVisible: " + poiHasActivitiesVisible);

        this.$set(
          tmpFilteredPOI[i],
          "poiVisibleWithFilters",
          poiHasCorrectInterests || poiHasActivitiesVisible
        );
      }

      //TODO: funziona -> se si riesce migliorarlo
      for (var i = 0; i < this.filteredPOI.length; i++) {
        this.$set(this.filteredPOI, i, tmpFilteredPOI[i]);
      }
    },
    goBack() {
      console.log("GO BACK");
      router.go(-1);

      //router.replace({ path: "/percorsi" });
    },
    getMilliseconds(minutesString) {
      var minutesInt = parseInt(minutesString);
      return minutesInt * 60000;
    },

    goToItinerariPredefinitiPage() {
      router.push({
        name: "elencopercorsi",
      });
    },

    makeQueryVROOM(vroomObject, areaName) {
      var self = this;
      var itinerary = null;

      console.log("effettuo la query");
      console.log(JSON.stringify(vroomObject));
      $.ajax({
        type: "POST",
        data: JSON.stringify(vroomObject),
        url: "https://vroom.geodidalab.unito.it/",
        contentType: "application/json",
      })
        .done(function (res) {
          console.log("res", res);
          console.log("JSON res", JSON.stringify(res));

          itinerary = self.createItineraryObject(res, areaName);
          //return itinerary;

          //return res;
          // Do something with the result :)
        })
        .fail(function () {
          self.modals.errorGettingSottoitinerario = true;
        })
        .always(function () {
          //alert("complete");
        });
    },

    createItineraryObject(vroomResponseObject, areaName) {
      //TODO: implement

      console.log("OGGETTO IN INPUT NEL METODO createItineraryObject");
      console.log(vroomResponseObject);

      var itineraryObject = {
        name: "Itinerario_" + areaName,
        poi: null,
        totalTimeMilliseconds: vroomResponseObject.summary.service,
      };

      var poiArray = [];
      var activityInPOIArray = [];

      Array.prototype.forEach.call(
        vroomResponseObject.routes[0].steps,
        (step, index) => {
          var activity = step;

          if (activity.type === "start") {
            activity.description = "Punto di partenza";
            activity.poiName = "Punto di partenza";
            activity.activityName = "Punto di partenza";

            poiArray.push({
              poiName: "Punto di partenza",
              location: activity.location,
            });
          } else if (activity.type === "end") {
            activity.description = "Punto di arrivo";
            activity.poiName = "Punto di arrivo";
            activity.activityName = "Punto di arrivo";

            poiArray.push({
              poiName: "Punto di arrivo",
              location: activity.location,
            });
          } else {
            var fields = activity.description.split("_");

            activity.poiName = fields[0];
            activity.activityName = fields[1];

            //se non esiste già un oggetto poi con lo stesso nome (ovvero rappresentante lo stesso poi), allora lo aggiungo
            var poiWithSameName = poiArray.filter(
              (poi) => poi.poiName === fields[0]
            );
            if (poiWithSameName.length === 0) {
              poiArray.push({
                poiName: fields[0],
                location: activity.location,
              });
            }
          }

          activity.index = index;

          //60000 : 1 = tmpPOI.service : x
          activity.serviceDurationMinutes = activity.service / 60000;

          activityInPOIArray.push(activity);
        }
      );

      console.log("POI ARRAY");
      console.log(poiArray);

      Array.prototype.forEach.call(poiArray, (poi, index) => {
        var activitiesInPOI = activityInPOIArray.filter(
          (activity) => activity.poiName === poi.poiName
        );
        poi.activitiesInPOI = activitiesInPOI;
      });

      /*
      let group = poiArray.reduce((r, a) => {
        //console.log("a", a);
        //console.log('r', r);
        r[a.poiName] = [...r[a.poiName] || [], a];
        return r;
      }, {});
      console.log("group", group);
      */

      itineraryObject.poi = poiArray;

      console.log("itineraryObject");
      console.log(itineraryObject);

      //TODO: mnavigare all'altra pagina
      /*
      router.push({
        name: "itinerariogenerato",
        params: {
          itineraryObject,
        },
      });*/

      var timeAvailable = this.$store.state.timeAvailable;

      console.log("TEMPO DISPONIBILE PRIMA DEL PUSH");
      console.log(timeAvailable);

      this.$store.state.itinerarioInCreazione = itineraryObject;

      console.log("CREAZIONE ITINERARIO PRIMA DEL PUSH");
      console.log(this.$store.state.itinerarioInCreazione);

      // router.push({
      //   name: "personalizzazionepercorso",
      //   /*
      //   params: {
      //     itineraryObject,
      //     //timeAvailable,
      //   },*/
      // });

      this.totalItinerary.push(itineraryObject);

      //return itineraryObject;
    },

    expandText(id, expandIcon, collapseIcon, cardHeaderID) {
      $("#" + id).addClass("truncated");
      $("#" + expandIcon).hide();
      $("#" + collapseIcon).show();

      /*
      var header = $("#" + cardHeaderID);
      console.log(header);
      //getting the next element
      var content = header.next();
      console.log(content);

      //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
      content.slideToggle(500, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
      });*/
    },

    collapseText(id, expandIcon, collapseIcon) {
      $("#" + id).removeClass("truncated");
      $("#" + expandIcon).show();
      $("#" + collapseIcon).hide();
    },

    openPOIactivities(cardHeaderID, event) {
      console.log(event.target);
      console.log(event.target.tagName.toLowerCase());

      //se event.target.tagName.toLowerCase() è === 'a' o === 'i' allora ho cliccato su "mostra descrizione" e non si deve aprire il collapse delle attività
      if (
        event.target.tagName.toLowerCase() !== "a" &&
        event.target.tagName.toLowerCase() !== "i"
      ) {
        var header = $("#" + cardHeaderID);
        console.log(header);
        //getting the next element
        var content = header.next();
        console.log(content);

        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        content.slideToggle(250, function () {
          //execute this after slideToggle is done
          //change text of header based on visibility of content div
        });
      }
    },

    permute(nums) {
      var result = [];
      var backtrack = (i, nums) => {
        if (i === nums.length) {
          result.push(nums.slice());
          return;
        }
        for (let j = i; j < nums.length; j++) {
          [nums[i], nums[j]] = [nums[j], nums[i]];
          backtrack(i + 1, nums);
          [nums[i], nums[j]] = [nums[j], nums[i]];
        }
      };
      backtrack(0, nums);
      console.log(result);
      return result;
    },

    arrayEquals(a, b) {
      return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
      );
    },
  },

  computed: {
    setAreasSelected() {
      var uniqueArray = this.$store.state.areasWithSomethingSelected.filter(
        function (item, pos, self) {
          return self.indexOf(item) == pos;
        }
      );
      return uniqueArray;
    },
    centerMap() {
      var sumLat = 0;
      var sumLng = 0;

      Array.prototype.forEach.call(this.markers, (marker) => {
        console.log(marker.marker["_latlng"]);

        sumLat += marker.marker["_latlng"].lat;
        sumLng += marker.marker["_latlng"].lng;
      });

      var middleLat = sumLat / this.markers.length;
      var middleLng = sumLng / this.markers.length;

      if (isNaN(middleLat) || isNaN(middleLng)) {
        return [45.47724690648075, 7.888264286334166];
      } else {
        return [middleLat, middleLng];
      }
    },
    percent() {
      console.log(this.bestPath);
      //totalTimeSelected : x = millisecondiTotali : 100

      var perc =
        (this.$store.state.totalTimeSelected * 100) /
        this.$store.state.timeAvailable.milliseconds;
      if (perc <= 100) {
        return Math.ceil(perc);
      } else {
        return 100;
      }
    },
    selectedInterests() {
      var mappedInterests = this.$store.state.interests
        .filter((interest) => interest.interestSelected)
        .map((interest) => interest.interestName);

      if (mappedInterests.length === 0) {
        return this.allInterests;
      } else {
        return mappedInterests;
      }
    },
    selectedDifficulties() {
      var mappedDifficulties = this.$store.state.expertiseLevels
        .filter((expLevel) => expLevel.expertiseLevelSelected)
        .map((expLevel) => expLevel.expertiseLevelName);

      if (mappedDifficulties.length === 0) {
        return this.allDifficulties;
      } else {
        return mappedDifficulties;
      }
    },

    somePOIVisible() {
      //TODO: remove me
      //console.log("somePOIVisile");
      return (
        this.filteredPOI.filter((poi) => poi.poiVisibleWithFilters).length > 0
      );
    },

    somePOIVisibleInCurrentArea() {
      //TODO: remove me
      //console.log("somePOIVisile");
      return (
        this.filteredPOI
          .filter(
            (poi) =>
              poi["geo:appartiene_a_area"][0]["display_title"] ===
              this.selectedArea
          )
          .filter((poi) => poi.poiVisibleWithFilters).length > 0
      );
    },

    someActivitiesSelected() {
      //TODO: remove me
      //console.log("someActivitiesSelected");
      // return (
      //   this.filteredPOI.filter(
      //     (poi) => poi.poiHasActivitiesSelected || poi.visitPOI
      //   ).length > 0
      // );
      return (
        this.$store.state.activitiesSelectedList.length > 0
      );
    },

    //TODO: remove me
    someActivitiesVisible() {
      var someActivitiesVisible = false;

      Array.prototype.forEach.call(this.filteredPOI, (poi) => {
        Array.prototype.forEach.call(poi.mis, (activity) => {
          if (
            activity.activityVisibleWithInterestsFilters &&
            activity.activityVisibleWithDifficultiesFilters
          ) {
            someActivitiesVisible = true;
          }
        });
      });

      return someActivitiesVisible;
    },

    bestPath() {
      var bestTime = 9999999999;
      var areas = [...new Set(this.$store.state.areasWithSomethingSelected)];

      var permutation = this.permute(areas);

      console.log(permutation);

      for (var k = 0; k < permutation.length; k++) {
        //Sommo i tempi di tragitto da un'area all'altra
        var areas = permutation[k];
        var time = 0;
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
          console.log(
            "FROM AREA INDEX: " +
            fromAreaIndex +
            "; TO AREA INDEX: " +
            toAreaIndex
          );
          console.log(costMatrixAreas[fromAreaIndex][toAreaIndex]);
          console.log(costMatrixAreas);

          time += costMatrixAreas[fromAreaIndex][toAreaIndex] * 60000; //nella matrice i valori sono espressi in minuti!
        }
        console.log(permutation[k]);

        console.log(time);

        if (time < bestTime) {
          bestTime = time;
        }
      }

      // se abbiamo solo un'area o 0 non c'è tempo di
      if (permutation.length <= 1) {
        bestTime = 0;
      }

      return bestTime;
    },
  },

  watch: {
    setAreasSelected(newValue, oldValue) {
      console.log("WATCH");
      console.log(newValue);
      var perm = this.permute(newValue);
      console.log(perm);

      var costoTotale = 9999999999;
      var bestPath = [];

      Array.prototype.forEach.call(perm, (permutation) => {
        var cost = 0;
        for (var i = 0; i < permutation.length - 1; i++) {
          var indexStartArea = this.areasIndexes[permutation[i]];
          var indexNextArea = this.areasIndexes[permutation[i + 1]];

          console.log(
            "Prenodil costo tra l'area di indice: " +
            indexStartArea +
            " e l'area di indice " +
            indexNextArea
          );

          cost += costMatrixAreas[indexStartArea][indexNextArea];
        }

        console.log(
          "Il costo per la permutazione " + permutation + " è " + cost
        );

        if (cost < costoTotale) {
          costoTotale = cost;
          bestPath = permutation;
        }
      });

      if (bestPath === []) {
        costoTotale = 0;
      }

      //TODO: set cost

      this.timeBetweenAreas = costoTotale;
      this.bestPathBetweenAreas = bestPath;

      console.log("LA MIGLIOR PERMUTAZIONE E': " + this.bestPathBetweenAreas);
      console.log("LA MIGLIOR PERMUTAZIONE HA COSTO: " + this.timeBetweenAreas);

      var timeCheck =
        this.$store.state.totalTimeSelected + this.timeBetweenAreas * 60000;

      console.log(this.bestOldPath);
      console.log(this.bestPathBetweenAreas);
      console.log(
        this.arrayEquals(this.bestOldPath, this.bestPathBetweenAreas)
      );
      if (
        !this.arrayEquals(this.bestOldPath, this.bestPathBetweenAreas) &&
        this.percent < 100 &&
        timeCheck <= this.$store.state.timeAvailable.milliseconds
      ) {
        this.$store.state.totalTimeSelected -= this.oldTotalCostBetweenAreas; //rimuovo il vecchio costo
        this.$store.state.totalTimeSelected += this.timeBetweenAreas * 60000;

        this.oldTotalCostBetweenAreas = this.timeBetweenAreas * 60000; // aggiorno il vecchio costo

        this.bestOldPath = this.bestPathBetweenAreas; // aggiorno il vecchio bestOldPath

        console.log("CI STIAMO CON I TEMPI!");
      } else {
        if (
          this.percent < 100 &&
          !(timeCheck <= this.$store.state.timeAvailable.milliseconds)
        ) {
          alert(
            "Rimuovere qualche attività per poter selezionare quest'ultima."
          );
        }
      }

      console.log(this.$store.state.totalTimeSelected);
    },
    filteredPOI(newValue, oldValue) {
      //TODO: remove me
      //console.log("FILTERED POI WATCHER");
      //console.log(newValue);
    },
    totalItinerary(newValue, oldValue) {
      console.log("TOTAL ITINERARY E' CAMBIATOO!");
      console.log(oldValue);

      console.log("PRIMA");
      console.log(newValue);

      var numbersOfAreasWithSomethingSelected = [
        ...new Set(this.$store.state.areasWithSomethingSelected),
      ];
      console.log(numbersOfAreasWithSomethingSelected);

      if (numbersOfAreasWithSomethingSelected.length !== 0) {
        if (numbersOfAreasWithSomethingSelected.length === newValue.length) {
          console.log("VADO ALLA PROSSIMA PAGINA!");

          var itineraryAlreadyExist = false;
          var itineraryCode = null;
          //TODO: provare ad ordinare la risposta sulla base del miglior percorso tra aree

          var sortOrder = [];
          sortOrder.length = this.bestPathBetweenAreas.length;
          for (var i = 0; i < this.bestPathBetweenAreas.length; i++) {
            sortOrder[i] = "Itinerario_" + this.bestPathBetweenAreas[i];
          }

          console.log("SORT ORDER");
          console.log(sortOrder);

          console.log("DOPO");

          console.log(newValue);

          newValue.sort(function (a, b) {
            return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
          });

          this.$store.state.sottoitinerari = newValue;

          router.push({
            name: "sintesiitinerario",
            params: {
              itineraryAlreadyExist,
              itineraryCode,
            },
          });
        } else {
          //alert("Si è verificato un errore");
          console.log("ERRORE NELLA LUNGHEZZA");
        }
      }
    },
  },
};
</script>

<style scoped>
.scuolaDellInfanzia {
  color: black;
}

.scuolaPrimaria {
  color: #e7d431;
}

.scuolaSecondariaDiPrimoGrado {
  color: orange;
}

.scuolaSecondariaDiSecondoGrado {
  color: darkorange;
}

.universita {
  color: orangered;
}

.perTutti {
  color: #71bd54;
}

.card a {
  color: #000000;
}

.card a:hover,
.card a:focus {
  color: #000000;
}

.textButtonColor {
  color: #2c2c2c;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* cover makes the image stretch the width and height of the container */
}

.truncate {
  position: relative;
  max-width: 20rem;
  /* need automatic multi-line height */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  float: left;
  word-wrap: break-word;
}

.truncate.truncated {
  white-space: initial;
  max-width: 20rem;
}

.truncate.truncated .helpicon {
  display: none;
}

.helpicon {
  right: 0;
  top: 0;
  position: absolute;
}

.zoom {
  transition: transform 0.2s;
  /* Animation */
  margin: 0 auto;
  cursor: pointer;
}

.zoom:hover {
  transform: scale(1.03);
}

.containerCard {
  width: 100%;
}

.containerCard div {
  width: 100%;
}

.containerCard .header {
  padding: 2px;
  cursor: pointer;
  font-weight: bold;
}

.containerCard .content {
  display: none;
  padding: 5px;
}

.blueButton {
  background-color: cornflowerblue;
  color: white;
}

html,
body {
  overflow: scroll;
}

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

.fadeeffect:after {
      /* content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 300px; /* 100% - (line-height × 3)
background: repeating-linear-gradient(rgba(255, 255, 255, 0), #ffffff 35px); */
  /* line-height */
}
</style>