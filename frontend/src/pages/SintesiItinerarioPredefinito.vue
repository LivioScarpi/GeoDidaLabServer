<template>
  <div>
    <div class="section text-black pt-3">
      <i
        class="bi bi-arrow-left ml-3"
        style="font-size: 2rem; color: black; cursor: pointer"
        v-on:click="goBack()"
      ></i>
      <div class="container">
        <!-- <div class="row mb-0 text-center">
          <h6 class="px-5 mx-lg-5">
            Puoi prenotare il tuo itinerario premendo il bottone "Prenota
            itinerario". Ti verrà fornito il codice identificativo del tuo
            itinerario, salvalo e conservalo per poter poi consultare nuovamente
            l'itinerario.
          </h6>
        </div> -->
      </div>

      <!-- <div class="row mt-3 text-center">
        <div class="col-12">
          <Button
            type="primary"
            size="large"
            v-on:click="sendEmail()"
            class="m-2 textButtonColor"
            >Prenota itinerario
          </Button>
        </div>
      </div> -->

      <div class="mt-4" v-if="allLoaded">
        <div class="row text-center">
          <div class="col-lg-4 col-sm-12 px-5" v-if="itinerarioLoaded">
            <div style="height: 100%; text-align: left">
              <h5 class="postcardpercorsi__title orange">
                <b>Dettagli - </b>

                <b v-if="this.itinerario !== null" class="title pt-0">
                  {{ this.itinerario["geo:Titolo_it"][0]["@value"] }}
                </b>
                <b v-else class="title pt-0">Itinerario senza nome</b>
              </h5>

              Il tempo totale include anche gli spostamenti in auto da un'area
              all'altra.

              <div class="mt-3 postcardpercorsi__bar" style="height: 4px"></div>
              <h6>Descrizione</h6>

              <div
                class="postcardpercorsi__preview-txt mb-3"
                v-if="itinerario['dcterms:description'] !== undefined"
              >
                {{ itinerario["dcterms:description"][0]["@value"] }}
              </div>
              <div class="postcardpercorsi__preview-txt mb-3" v-else>
                Nessuna descrizione disponibile
              </div>

              <h6>
                Interessi:
                <span class="font-weight-normal">{{
                  getInterestList(itinerario["geo:appartiene_a_ambito"]).join(
                    ", "
                  )
                }}</span>
              </h6>

                            <div class="mt-3" v-if="totalTimeObject.hours === undefined || totalTimeObject.minutes === undefined">
                              <h6><i class="bi bi-clock mr-2"></i> Tempo non conosciuto </h6>
                            </div>
              <div v-else class="mt-3">
                <h6
                  class="card-title"
                  v-if="
                    parseInt(totalTimeObject.hours) === 1 &&
                    parseInt(totalTimeObject.minutes) === 0
                  "
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ totalTimeObject.hours }} ora
                </h6>
                <h6
                  class="card-title"
                  v-else-if="parseInt(totalTimeObject.hours) === 1"
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeObject.hours) }} ora e
                  {{ parseInt(totalTimeObject.minutes) }} minuti
                </h6>
                <h6
                  class="card-title"
                  v-else-if="
                    parseInt(totalTimeObject.hours) > 0 &&
                    parseInt(totalTimeObject.minutes) === 0
                  "
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeObject.hours) }} ore
                </h6>
                <h6
                  class="card-title"
                  v-else-if="parseInt(totalTimeObject.hours) > 0"
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeObject.hours) }} ore e
                  {{ parseInt(totalTimeObject.minutes) }} minuti
                </h6>
                <h6 class="card-title" v-else>
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeObject.minutes) }} minuti
                </h6>
              </div>

              <hr />

              <!-- <div
                v-if="
                  activitySelectedForInfo === null &&
                  activityVisitPOISelectedForInfo === null
                "
              >
                <h6>
                  Seleziona la
                  <i class="ml-2 mt-3 bi bi-info-circle mr-2"></i> accanto al
                  nome di un'attività per vedere i dettagli
                </h6>
              </div> -->

              <div class="col-lg-8 col-sm-12 pr-3 d-block d-lg-none mb-4">
                <div class="row">
                  <div class="col-12 d-flex">
                    <ul class="aree__tagbox mb-2 mx-auto mt-0">
                      <li
                        :class="
                          selectedTab === 'ElencoAttività'
                            ? 'tag__item__selected'
                            : 'tag__item__unselected'
                        "
                        v-on:click="selectedTab = 'ElencoAttività'"
                      >
                        Elenco delle attività
                      </li>
                      <li
                        :class="
                          selectedTab === 'Mappa'
                            ? 'tag__item__selected'
                            : 'tag__item__unselected'
                        "
                        v-on:click="selectedTab = 'Mappa'"
                      >
                        Mappa
                      </li>
                    </ul>
                  </div>

                  <div
                    class="col-12 px-0"
                    v-if="selectedTab === 'ElencoAttività'"
                  >
                    <div
                      v-if="!showDetails"
                      style="max-height: 480px; overflow-y: scroll"
                      class="mb-4"
                    >
                      <div
                        v-for="(poi, index) in itinerario.poi"
                        :key="'poi' + (index + 200)"
                      >
                        <div
                          class="row border mr-1 mb-3 postcard orange"
                          style="border-radius: 10px; cursor: pointer"
                          v-on:click="
                            selectMarkerOnMap(
                              poi['geo:Titolo_it'][0]['@value'],
                              'Visita del luogo',
                              poi['areaDiAppartenenza'][0]['display_title']
                            )
                          "
                        >
                          <div
                            class="col-2 text-center px-0"
                            style="
                              background-color: #4f9bff;
                              border-top-left-radius: 10px;
                              border-bottom-left-radius: 10px;
                              cursor: pointer;

                              display: flex;

                              justify-content: center;
                              align-items: center;
                              color: #ffffff;
                            "
                          >
                            <h5>{{ index }}</h5>
                          </div>
                          <div class="col-10 text-left py-2">
                            <div class="row">
                              <div class="col-12">
                                <b>VISITA DEL LUOGO</b>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <i class="bi bi-pin-map-fill mr-2"></i
                                >{{ poi["geo:Titolo_it"][0]["@value"] }}
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <i class="bi bi-map mr-2"></i>
                                {{
                                  poi["areaDiAppartenenza"][0]["display_title"]
                                }}
                              </div>
                            </div>

                            <div class="row">
                              <div class="col-12">
                                <i class="bi bi-clock mr-2"></i
                                >{{ poi["geo:Durata"][0]["@value"] }} minuti
                              </div>
                            </div>

                            <div class="row">
                              <Button
                                type="primary"
                                size="small"
                                v-on:click="
                                  selectMarkerOnMap(
                                    poi['geo:Titolo_it'][0]['@value'],
                                    'Visita del luogo',
                                    poi['areaDiAppartenenza'][0][
                                      'display_title'
                                    ]
                                  )
                                "
                                class="m-2 textButtonColor"
                                >Visualizza dettagli
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div
                          v-for="(it, ind) in poi.activitiesOfPOIPivot"
                          :key="'availableActivities' + (ind + 200)"
                          class=""
                        >
                          <div
                            class="row border mr-1 mb-3 postcard orange"
                            style="border-radius: 10px"
                          >
                            <div
                              class="col-2 text-center px-0"
                              style="
                                background-color: #4f9bff;
                                border-top-left-radius: 10px;
                                border-bottom-left-radius: 10px;
                                cursor: pointer;

                                display: flex;

                                justify-content: center;
                                align-items: center;
                                color: #ffffff;
                              "
                            >
                              <h5><i class="fa fa-thermometer-three-quarters fa-lg px-1"></i></h5>
                            </div>
                            <div class="col-10 text-left py-2">
                              <div class="row">
                                <div class="col-12">
                                  <b>{{ it["o:title"].toUpperCase() }}</b>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-12">
                                  <i class="bi bi-pin-map-fill mr-2"></i
                                  >{{ poi["geo:Titolo_it"][0]["@value"] }}
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-12">
                                  <i class="bi bi-map mr-2"></i>
                                  {{
                                    poi["areaDiAppartenenza"][0][
                                      "display_title"
                                    ]
                                  }}
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-12">
                                  <i class="bi bi-clock mr-2"></i
                                  >{{ it["geo:Durata"][0]["@value"] }} minuti
                                </div>
                              </div>

                              <div class="row">
                                <Button
                                  type="primary"
                                  size="small"
                                  v-on:click="
                                    selectMarkerOnMap(
                                      poi['geo:Titolo_it'][0]['@value'],
                                      it['o:title'],
                                      poi['areaDiAppartenenza'][0][
                                        'display_title'
                                      ]
                                    )
                                  "
                                  class="m-2 textButtonColor"
                                  >Visualizza dettagli
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- </div> -->
                      </div>
                    </div>
                    <div v-else>
                      <div class="row mt-2">
                        <div class="col-12">
                          <!--TODO: sistemare pagine e step-->
                          <i
                            class="bi bi-arrow-left ml-3 mb-5"
                            style="
                              font-size: 1.5rem;
                              color: black;
                              cursor: pointer;
                            "
                            v-on:click="showDetails = false"
                          >
                            Visualizza elenco attività</i
                          >
                          <div class="mt-4">
                            <esperimento
                              class="align-top text-center"
                              :item="activitySelectedForInfo"
                              v-if="activitySelectedForInfo !== null"
                            ></esperimento>
                            <div class="row mx-2 mt-3 mb-4">
                              {{ activityVisitPOISelectedForInfo }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12" v-if="selectedTab === 'Mappa'">
                    <l-map
                      style="height: 400px; border-radius: 10px"
                      :zoom="zoom"
                      :center="centerMap"
                      ref="mappaSottoItinerario"
                    >
                      <l-tile-layer
                        :url="url"
                        :attribution="attribution"
                      ></l-tile-layer>
                      <l-marker
                        v-for="(marker, index) in markers"
                        :lat-lng="marker.marker.getLatLng()"
                        :key="'marker' + index"
                      >
                        <l-icon
                          v-if="marker.poiSelected"
                          :icon-url="require('../icons/selectedPOI.png')"
                        ></l-icon>
                        <l-icon
                          v-if="!marker.poiSelected"
                          :icon-url="require('../icons/unselectedPOI.png')"
                        ></l-icon>
                        <l-popup :options="anchorOptions">
                          <div class="px-3">
                            <div class="row">
                              <h5>{{ marker.POItitle }}</h5>
                            </div>
                          </div>
                        </l-popup>
                      </l-marker>

                      <l-control>
                        <div class="legend">
                          <h4>Legenda</h4>
                          <i style="background: #e35747"></i
                          ><span>Luogo con l'attività selezionata</span><br />
                          <i style="background: #437fc5"></i
                          ><span>Luogo presente nell'itinerario</span><br />
                        </div>
                      </l-control>
                    </l-map>
                  </div>
                </div>
              </div>

              <div class="d-none d-lg-block">
                <div
                  v-if="!showDetails"
                  style="max-height: 480px; overflow-y: scroll"
                  class="mb-4"
                >
                  <div
                    v-for="(poi, index) in itinerario.poi"
                    :key="'poi' + (index + 200)"
                  >
                    <div
                      class="row border mr-1 mb-3 postcard orange"
                      style="border-radius: 10px; cursor: pointer"
                      v-on:click="
                        selectMarkerOnMap(
                          poi['geo:Titolo_it'][0]['@value'],
                          'Visita del luogo',
                          poi['areaDiAppartenenza'][0]['display_title']
                        )
                      "
                    >
                      <div
                        class="col-2 text-center px-0"
                        style="
                          background-color: #4f9bff;
                          border-top-left-radius: 10px;
                          border-bottom-left-radius: 10px;
                          cursor: pointer;

                          display: flex;

                          justify-content: center;
                          align-items: center;
                          color: #ffffff;
                        "
                      >
                        <h5>{{ index }}</h5>
                      </div>
                      <div class="col-10 text-left py-2">
                        <div class="row">
                          <div class="col-12">
                            <b>VISITA DEL LUOGO</b>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <i class="bi bi-pin-map-fill mr-2"></i
                            >{{ poi["geo:Titolo_it"][0]["@value"] }}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <i class="bi bi-map mr-2"></i>
                            {{ poi["areaDiAppartenenza"][0]["display_title"] }}
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-12">
                            <i class="bi bi-clock mr-2"></i
                            >{{ poi["geo:Durata"][0]["@value"] }} minuti
                          </div>
                        </div>

                        <div class="row">
                          <Button
                            type="primary"
                            size="small"
                            v-on:click="
                              selectMarkerOnMap(
                                poi['geo:Titolo_it'][0]['@value'],
                                'Visita del luogo',
                                poi['areaDiAppartenenza'][0]['display_title']
                              )
                            "
                            class="m-2 textButtonColor"
                            >Visualizza dettagli
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div
                      v-for="(it, ind) in poi.activitiesOfPOIPivot"
                      :key="'availableActivities' + (ind + 200)"
                      class=""
                    >
                      <div
                        class="row border mr-1 mb-3 postcard orange"
                        style="border-radius: 10px"
                      >
                        <div
                          class="col-2 text-center px-0"
                          style="
                            background-color: #4f9bff;
                            border-top-left-radius: 10px;
                            border-bottom-left-radius: 10px;
                            cursor: pointer;

                            display: flex;

                            justify-content: center;
                            align-items: center;
                            color: #ffffff;
                          "
                        >
                          <h5>{{ index }}</h5>
                        </div>
                        <div class="col-10 text-left py-2">
                          <div class="row">
                            <div class="col-12">
                              <b>{{ it["o:title"].toUpperCase() }}</b>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <i class="bi bi-pin-map-fill mr-2"></i
                              >{{ poi["geo:Titolo_it"][0]["@value"] }}
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <i class="bi bi-map mr-2"></i>
                              {{
                                poi["areaDiAppartenenza"][0]["display_title"]
                              }}
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-12">
                              <i class="bi bi-clock mr-2"></i
                              >{{ it["geo:Durata"][0]["@value"] }} minuti
                            </div>
                          </div>

                          <div class="row">
                            <Button
                              type="primary"
                              size="small"
                              v-on:click="
                                selectMarkerOnMap(
                                  poi['geo:Titolo_it'][0]['@value'],
                                  it['o:title'],
                                  poi['areaDiAppartenenza'][0]['display_title']
                                )
                              "
                              class="m-2 textButtonColor"
                              >Visualizza dettagli
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- </div> -->
                  </div>
                </div>
                <div v-else>
                  <div class="row mt-2">
                    <div class="col-12">
                      <!--TODO: sistemare pagine e step-->
                      <i
                        class="bi bi-arrow-left ml-3"
                        style="font-size: 1.5rem; color: black; cursor: pointer"
                        v-on:click="goBackAndResetMarkersIcon()"
                      >
                        Visualizza elenco attività</i
                      >

                      <div class="mt-4">
                        <esperimento
                          class="align-top text-center"
                          :item="activitySelectedForInfo"
                          v-if="activitySelectedForInfo !== null"
                        ></esperimento>
                        <div class="row mx-2 mt-3 mb-4">
                          {{ activityVisitPOISelectedForInfo }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

            <!-- <sottoitinerariopredefinito
              class="align-top"
              v-for="item in this.itinerario.poiGroupedByArea"
              :item="item"
              :areaname="item[0]['areaDiAppartenenza'][0]['display_title']"
              :key="item.name"
              @infoActivityClicked="showInfoAtivity"
              @infoActivityVisitPOIClicked="showInfoAtivityVisitPOI"
            ></sottoitinerariopredefinito> -->
          </div>
          <div class="col-lg-8 col-sm-12 pr-3 d-none d-lg-block">
            <div class="row px-4">
              <div class="col-12">
                <l-map
                  style="height: 700px; border-radius: 10px"
                  :zoom="zoomLarge"
                  :center="centerMap"
                  ref="mappaSottoItinerario"
                >
                  <l-tile-layer
                    :url="url"
                    :attribution="attribution"
                  ></l-tile-layer>
                  <l-marker
                    v-for="(marker, index) in markers"
                    :lat-lng="marker.marker.getLatLng()"
                    :key="'marker' + index"
                  >
                    <l-icon
                      v-if="marker.poiSelected"
                      :icon-url="require('../icons/selectedPOI.png')"
                    ></l-icon>
                    <l-icon
                      v-if="!marker.poiSelected"
                      :icon-url="require('../icons/unselectedPOI.png')"
                    ></l-icon>
                    <l-popup :options="anchorOptions">
                      <div class="px-3">
                        <div class="row">
                          <h5>{{ marker.POItitle }}</h5>
                        </div>
                      </div>
                    </l-popup>
                  </l-marker>

                  <l-control>
                    <div class="legend">
                      <h4>Legenda</h4>
                      <i style="background: #e35747"></i
                      ><span>Luogo con l'attività selezionata</span><br />
                      <i style="background: #437fc5"></i
                      ><span>Luogo presente nell'itinerario</span><br />
                    </div>
                  </l-control>
                </l-map>
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
import esperimento from "../components/customComponents/esperimento";
import router from "../router";

const Common = require("@/Common.vue").default;

import { Button } from "element-ui";

import { indexPOIitinerario1 } from "../utils/itinerarioIvreaStones/indexPOIitinerario1.js";
import { costItinerario1 } from "../utils/itinerarioIvreaStones/itinerario1.js";

export default {
  name: "sintesiitinerariopredefinito",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    //Component Leaflet map
    LMap,
    LTileLayer,
    //LGeoJson,
    LMarker,
    LPopup,
    //LCircleMarker,
    LIcon,
    LControl,

    //sottoitinerariopredefinito,
    Button,
    //infoEsperimento,
    esperimento,
  },
  data() {
    return {
      counter: 0,
      itinerario: null,
      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: true,
      itinerarioLoaded: false,
      activitySelectedForInfo: null,
      activityVisitPOISelectedForInfo: null,
      visitPOIselectedforInfo: "",
      windowWidth: 0,

      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 16,
      zoomLarge: 11,
      center: [45.47724690648075, 7.888264286334166],
      //markerLatLng: [51.504, -0.159],
      map: null,
      geojson: null,
      markers: [],
      markersPolylines: [],
      anchorOptions: { offset: L.point(0, -30) },

      coord: null,

      showDetails: false,

      selectedTab: "ElencoAttività",

      costBetweenPOI: null,
      indexesCostPOI: null,
      totalTimeObject: {},
    };
  },

  mounted() {
    this.itinerario = this.$route.params.itinerario;

    console.log("Itinerario ricevuto: ");
    console.log(this.itinerario);

    this.itinerarioLoaded = true;
    //console.log(store.state.sottoitinerari);

    if (
      this.itinerario["geo:Titolo_it"][0]["@value"].includes("Ivrea Stones")
    ) {
      console.log("prendo i costi dell'itinerario 1");
      this.costBetweenPOI = costItinerario1;
      this.indexesCostPOI = indexPOIitinerario1;
    }

    console.log(this.costBetweenPOI);
    console.log(this.indexesCostPOI);

    this.createMarkerArray();
    this.initializeMarkersOfFilteredPOI();

    this.totalTimeObject = this.msToTime(this.totalTime);
  },

  methods: {
    getInterestList(list) {
      var newList = [];

      for (var i = 0; i < list.length; i++) {
        newList.push(list[i]["display_title"]);
      }

      return newList;
    },
    incrementCounter() {
      this.counter = this.counter + 1;
    },
    goBack() {
      console.log("GO BACK");
      router.go(-1);

      //router.replace({ path: "/percorsi" });
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

    showInfoAtivity(poiName, activityName, areaname) {
      console.log("SONO IN showInfoAtivity: " + activityName + "; " + areaname);

      if (activityName !== "Visita del luogo") {
        console.log(this.itinerario.poiGroupedByArea[areaname]);

        this.activityVisitPOISelectedForInfo = null;

        Array.prototype.forEach.call(
          this.itinerario.poiGroupedByArea[areaname],
          (poi) => {
            Array.prototype.forEach.call(
              poi.activitiesOfPOIPivot,
              (activity) => {
                console.log("activity title");
                console.log(activity["o:title"]);
                if (activity["o:title"] === activityName) {
                  this.activitySelectedForInfo = activity;
                  console.log("Activity trovata");
                }
              }
            );
          }
        );

        this.activityVisitPOISelectedForInfo = "";

        console.log(this.activitySelectedForInfo);
      } else {
        this.activityVisitPOISelectedForInfo =
          "La visita del " +
          poiName +
          " consiste in una visita del luogo guidati da una persona che spiegherà tutto il necessario";

        this.activitySelectedForInfo = null;
      }
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

    createMarkerArray() {
      //Punto di partenza
      //this.markersPolylines.push(this.startPoint);
      console.log("createMarkerArray");
      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {
        console.log(poi);
        var POIlat = poi["marker"]["o-module-mapping:lat"];
        var POIlng = poi["marker"]["o-module-mapping:lng"];

        var POIcoordinates = [POIlat, POIlng];

        this.markersPolylines.push(POIcoordinates);
      });

      //Punto di arrivo
      //this.markersPolylines.push(this.endPoint);

      //console.log(this.markersPolylines);
    },

    initializeMarkersOfFilteredPOI() {
      console.log("initializeMarkersOfFilteredPOI");
      this.markers = [];

      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {
        //viene usato anche per il punto di arrivo
        var isStartingPoint =
          poi["poiName"] === "Punto di partenza" ||
          poi["poiName"] === "Punto di arrivo";

        if (isStartingPoint) {
          this.markers.push({
            marker: L.marker([
              poi["marker"]["o-module-mapping:lat"],
              poi["marker"]["o-module-mapping:lng"],
            ]),
            color: "#1585bd",
            strokeColor: "#1b4f88",
            circleColor: "#ffffff",
            POItitle: poi["geo:Titolo_it"][0]["@value"],
            //TODo: aggiungere attributi
            isStartPoint: isStartingPoint,
            poiSelected: false,
          });
        } else {
          this.markers.push({
            marker: L.marker([
              poi["marker"]["o-module-mapping:lat"],
              poi["marker"]["o-module-mapping:lng"],
            ]),
            color: "#1585bd",
            strokeColor: "#1b4f88",
            circleColor: "#ffffff",
            POItitle: poi["geo:Titolo_it"][0]["@value"],
            //TODo: aggiungere attributi
            isStartPoint: isStartingPoint,
            poiSelected: false,
          });
        }
      });

      console.log(this.markers);

      this.markersCreated = true;
    },

    selectMarkerOnMap(poiName, activityName, areaName) {
      console.log("POI NAME: " + poiName);

      this.showDetails = true;
      Array.prototype.forEach.call(this.markers, (marker) => {
        if (marker.POItitle === poiName) {
          marker.poiSelected = true;
        } else {
          marker.poiSelected = false;
        }
      });

      this.showInfoAtivity(poiName, activityName, areaName);
    },

    goBackAndResetMarkersIcon() {
      this.showDetails = false;
      Array.prototype.forEach.call(this.markers, (marker) => {
        marker.poiSelected = false;
      });
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

    totalTime() {
      var totalTimePOI = 0;
      console.log("totalTimeActivities");
      console.log(this.itinerario.poi);

      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {
        totalTimePOI += parseInt(poi["geo:Durata"][0]["@value"]) * 60000; // convertiamo i minuti in millisecondi

        Array.prototype.forEach.call(poi.activitiesOfPOIPivot, (activity) => {
          totalTimePOI += activity.durataMillisecondi;
        });
      });

      console.log("INIZIO A SOMMARE GLI SPOSTAMENTI");
      console.log(this.indexesCostPOI);

      //Sommo i tempi di tragitto da un'area all'altra
      for (var i = 0; i < this.itinerario.poi.length - 1; i++) {
        console.log("CICLO " + i);
        var fromIndex = 0;
        var toIndex = 0;

        Array.prototype.forEach.call(this.indexesCostPOI, (poiIndexes) => {
          if (poiIndexes.poiName == this.itinerario.poi[i]["o:title"]) {
            console.log("HO TROVATO L'INDICE FROM");
            fromIndex = poiIndexes.poiID;
          }

          if (poiIndexes.poiName == this.itinerario.poi[i + 1]["o:title"]) {
            console.log("HO TROVATO L'INDICE TO");
            toIndex = poiIndexes.poiID;
          }
        });

        console.log("FROM INDEX: " + fromIndex);
        console.log("TO INDEX: " + toIndex);

        totalTimePOI += this.costBetweenPOI[fromIndex][toIndex] * 60000; // convertiamo i tempi da minuti in millisecondi

        //fromIndex = this.indexPOIitinerario1[]
      }

      //console.log(totalTimePOI);

      return totalTimePOI;
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
