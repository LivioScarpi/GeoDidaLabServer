<template>
  <div>
    <!-- <div class="section text-black pt-3">
      <div class="container">
        <h2 class="title pt-0">SINTESI ITINERARIO</h2>
        <h5 class="description mb-3">Sintesi dell'itinerario creato.</h5>
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
        </h5>
        <h6 class="card-title text-center" v-if="this.$store.state.sottoitinerari.length > 1">
          Il tempo totale include anche gli spostamenti in auto da un'area
          all'altra.
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
    </div> -->

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
          <div class="col-lg-4 col-sm-12 px-5" v-if="allLoaded">
            <div style="height: 100%; text-align: left">
              <h5 class="postcardpercorsi__title orange">
                <b>Dettagli itinerario creato (codice: 
                  <template v-if="itineraryCode !== null">{{ itineraryCode }}</template>
                  <template v-else>Codice non conosciuto</template>
                  )</b>

                <!-- <b v-if="this.itinerario !== null" class="title pt-0">
                  {{ this.itinerario["name"] }}
                </b>
                <b v-else class="title pt-0">Itinerario senza nome</b> -->
              </h5>

              Il tempo totale include anche gli spostamenti in auto da un'area
              all'altra.

              <div class="mt-3 postcardpercorsi__bar" style="height: 4px"></div>
              <!-- <h6>Descrizione</h6> -->

              <!-- <div
                class="postcardpercorsi__preview-txt mb-3"
                v-if="itinerario['dcterms:description'] !== undefined"
              >
                {{ itinerario["dcterms:description"][0]["@value"] }}
              </div>
              <div class="postcardpercorsi__preview-txt mb-3" v-else>
                Nessuna descrizione disponibile
              </div> -->

              <!-- <h6>Interessi:</h6>
              <template
                v-for="(ambito, index) in itinerario['geo:appartiene_a_ambito']"
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
                    index === itinerario['geo:appartiene_a_ambito'].length - 2
                  "
                >
                  e
                </template>
              </template> -->

              <!--TODO: riaggiungere questo-->
              <div>
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

              <div v-if="itineraryCode === null" class="row mt-3">
                <div class="col-12">
                  <Button
                      type="primary"
                      size="small"
                      v-on:click="bookItinerary()"
                      class="textButtonColor"
                  >Prenota itinerario
                  </Button>
                </div>
              </div>

              <!--<div v-if="itineraryCode !== null" class="row mb-0 ">
                <div class="col-12">
                  Puoi effettuare la tua prenotazione inviando una mail premendo il
                  bottone "Invia mail".
                </div>
              </div>-->

              <div v-if="itineraryCode !== null" class="row mt-3 ">
                <div class="col-12">
                  <Button
                      type="primary"
                      size="small"
                      v-on:click="sendEmail()"
                      class="textButtonColor"
                  >Prenota Itinerario
                  </Button>
                </div>
              </div>

              <hr/>

              <ul class="aree__tagbox mb-4">
                <li
                    :class="
                    selectedArea === index
                      ? 'tag__item__selected'
                      : 'tag__item__unselected'
                  "
                    v-for="(sottoitinerario, index) in $store.state
                    .sottoitinerari"
                    :key="index"
                    v-on:click="selectItinerario(index)"
                >
                  <!--<i v-if="item.visitPOI" class="fas fa-check mr-2"></i
                          >-->{{ sottoitinerario.name.substring(11) }}
                </li>
              </ul>

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
                <div class="mb-4">
                  <h6>
                    Tempo sottoitinerario -
                    {{
                      $store.state.sottoitinerari[selectedArea].name.substring(11)
                    }}
                  </h6>
                  <h6
                      class="card-title"
                      v-if="
                    parseInt(totalTimeSelectedArea.hours) === 1 &&
                    parseInt(totalTimeSelectedArea.minutes) === 0
                  "
                  >
                    <i class="bi bi-clock mr-2"></i>
                    {{ totalTimeSelectedArea.hours }} ora
                  </h6>
                  <h6
                      class="card-title"
                      v-else-if="parseInt(totalTimeSelectedArea.hours) === 1"
                  >
                    <i class="bi bi-clock mr-2"></i>
                    {{ parseInt(totalTimeSelectedArea.hours) }} ora e
                    {{ parseInt(totalTimeSelectedArea.minutes) }} minuti
                  </h6>
                  <h6
                      class="card-title"
                      v-else-if="
                    parseInt(totalTimeSelectedArea.hours) > 0 &&
                    parseInt(totalTimeSelectedArea.minutes) === 0
                  "
                  >
                    <i class="bi bi-clock mr-2"></i>
                    {{ parseInt(totalTimeSelectedArea.hours) }} ore
                  </h6>
                  <h6
                      class="card-title"
                      v-else-if="parseInt(totalTimeSelectedArea.hours) > 0"
                  >
                    <i class="bi bi-clock mr-2"></i>
                    {{ parseInt(totalTimeSelectedArea.hours) }} ore e
                    {{ parseInt(totalTimeSelectedArea.minutes) }} minuti
                  </h6>
                  <h6 class="card-title" v-else>
                    <i class="bi bi-clock mr-2"></i>
                    {{ parseInt(totalTimeSelectedArea.minutes) }} minuti
                  </h6>
                </div>
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
                          v-for="(poi, index) in this.itinerario.poi"
                          :key="'poi' + (index + 200)"
                      >
                        <div
                            v-for="(it, ind) in poi.activitiesInPOI"
                            :key="'availableActivities' + (ind + 200)"
                            class=""
                        >
                          <div
                              v-if="
                              poi.poiName !== 'Punto di partenza' &&
                              poi.poiName !== 'Punto di arrivo'
                            "
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
                                  <b>{{ it["activityName"].toUpperCase() }}</b>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-12">
                                  <i class="bi bi-pin-map-fill mr-2"></i
                                  >{{ poi["poiName"] }}
                                </div>
                              </div>
                              <!-- <div class="row">
                                <div class="col-12">
                                  <i class="bi bi-map mr-2"></i>
                                  {{
                                    poi["areaDiAppartenenza"][0][
                                      "display_title"
                                    ]
                                  }}
                                </div>
                              </div> -->

                              <div class="row">
                                <div class="col-12">
                                  <i class="bi bi-clock mr-2"></i
                                  >{{ it["serviceDurationMinutes"] }} minuti
                                </div>
                              </div>

                              <div class="row">
                                <Button
                                    type="primary"
                                    size="small"
                                    class="m-2 textButtonColor"
                                    v-on:click="
                                    selectMarkerOnMap(
                                      poi['poiName'],
                                      it['activityName']
                                    )
                                  "
                                >Visualizza dettagli
                                </Button>
                              </div>

                              <!-- v-on:click="
                                    selectMarkerOnMap(
                                      poi['geo:Titolo_it'][0]['@value'],
                                      it['o:title'],
                                      poi['areaDiAppartenenza'][0][
                                        'display_title'
                                      ]
                                    )
                                  " -->
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
                          ><span>Luogo con l'attività selezionata</span><br/>
                          <i style="background: #437fc5"></i
                          ><span>Luogo presente nell'itinerario</span><br/>
                        </div>
                      </l-control>
                    </l-map>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <h6>
                  Tempo sottoitinerario -
                  {{
                    $store.state.sottoitinerari[selectedArea].name.substring(11)
                  }}
                </h6>
                <h6
                    class="card-title"
                    v-if="
                    parseInt(totalTimeSelectedArea.hours) === 1 &&
                    parseInt(totalTimeSelectedArea.minutes) === 0
                  "
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ totalTimeSelectedArea.hours }} ora
                </h6>
                <h6
                    class="card-title"
                    v-else-if="parseInt(totalTimeSelectedArea.hours) === 1"
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeSelectedArea.hours) }} ora e
                  {{ parseInt(totalTimeSelectedArea.minutes) }} minuti
                </h6>
                <h6
                    class="card-title"
                    v-else-if="
                    parseInt(totalTimeSelectedArea.hours) > 0 &&
                    parseInt(totalTimeSelectedArea.minutes) === 0
                  "
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeSelectedArea.hours) }} ore
                </h6>
                <h6
                    class="card-title"
                    v-else-if="parseInt(totalTimeSelectedArea.hours) > 0"
                >
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeSelectedArea.hours) }} ore e
                  {{ parseInt(totalTimeSelectedArea.minutes) }} minuti
                </h6>
                <h6 class="card-title" v-else>
                  <i class="bi bi-clock mr-2"></i>
                  {{ parseInt(totalTimeSelectedArea.minutes) }} minuti
                </h6>
              </div>

              <div class="d-none d-lg-block">
                <div
                    v-if="!showDetails"
                    style="max-height: 480px; overflow-y: scroll"
                    class="mb-4"
                >
                  <div
                      v-for="(poi, index) in this.itinerario.poi"
                      :key="'poi' + (index + 200)"
                  >
                    <div
                        v-for="(it, ind) in poi.activitiesInPOI"
                        :key="'availableActivities' + (ind + 200)"
                        class=""
                    >
                      <div
                          v-if="
                          poi.poiName !== 'Punto di partenza' &&
                          poi.poiName !== 'Punto di arrivo'
                        "
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
                              <b>{{ it["activityName"].toUpperCase() }}</b>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12">
                              <i class="bi bi-pin-map-fill mr-2"></i
                              >{{ poi["poiName"] }}
                            </div>
                          </div>
                          <!--
                          <div class="row">
                            <div class="col-12">
                              <i class="bi bi-map mr-2"></i>
                              {{
                                poi["areaDiAppartenenza"][0]["display_title"]
                              }}
                            </div>
                          </div> -->

                          <div class="row">
                            <div class="col-12">
                              <i class="bi bi-clock mr-2"></i
                              >{{ it["serviceDurationMinutes"] }} minuti
                            </div>
                          </div>

                          <div class="row">
                            <Button
                                type="primary"
                                size="small"
                                v-on:click="
                                selectMarkerOnMap(
                                  poi['poiName'],
                                  it['activityName']
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
                      ><span>Luogo con l'attività selezionata</span><br/>
                      <i style="background: #437fc5"></i
                      ><span>Luogo presente nell'itinerario</span><br/>
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
import {Tabs, TabPane} from "@/components";
import store from "../store";
import $ from "jquery";
import sottoitinerario from "../components/customComponents/sottoitinerario.vue";
import {Button} from "element-ui";
import {costMatrixAreas} from "../utils/costMatricesAreas";
import router from "../router";
import esperimento from "../components/customComponents/esperimento";

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

const Common = require("@/Common.vue").default;

export default {
  name: "sintesiitinerario",
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

    Button,
    //sottoitinerario,

    esperimento,
  },
  data() {
    return {
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
      anchorOptions: {offset: L.point(0, -30)},

      coord: null,

      showDetails: false,

      selectedTab: "ElencoAttività",

      selectedArea: 0,

      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: false,
      itineraryCode: null,
      totalTimeObject: {},
      totalTimeSelectedArea: {},

      itinerario: null,
    };
  },

  mounted() {
    console.log("Sotto Itinerari: ");
    console.log(store.state.sottoitinerari);
    var self = this;
    this.totalTimeObject = this.msToTime(this.totalTime);

    this.itinerario = store.state.sottoitinerari[0];

    this.totalTimeSelectedArea = this.msToTime(
        this.itinerario.totalTimeMilliseconds
    );

    console.log("this.itinerario");
    console.log(this.itinerario);

    this.createMarkerArray();
    this.initializeMarkersOfFilteredPOI();
    console.log("STAMPO I PARAMS");
    console.log(this.$route.params);
    var itineraryAlreadyExist = this.$route.params.itineraryAlreadyExist;

    if (!itineraryAlreadyExist) {
      this.saveItinerary();
    } else {
      console.log("STAMPO I PARAMS");
      console.log(this.$route.params);
      this.itineraryCode = this.$route.params.itineraryCode;
    }

    this.allLoaded = true;
  },

  created() {
  },

  methods: {
    goBack() {
      console.log("GO BACK");
      router.go(-1);

      //router.replace({ path: "/percorsi" });
    },

    selectMarkerOnMap(poiName, activityName) {
      console.log("POI NAME: " + poiName);

      this.showDetails = true;
      Array.prototype.forEach.call(this.markers, (marker) => {
        if (marker.POItitle === poiName) {
          marker.poiSelected = true;
        } else {
          marker.poiSelected = false;
        }
      });

      this.showInfoAtivity(poiName, activityName);
    },

    showInfoAtivity(poiName, activityName) {
      console.log("SONO IN showInfoAtivity: " + activityName + "; ");

      if (activityName !== "Visita del luogo") {
        // console.log(this.itinerario.poiGroupedByArea[areaname]);

        this.activityVisitPOISelectedForInfo = null;

        Array.prototype.forEach.call(store.state.esperimenti, (activity) => {
          console.log("activity title");
          console.log(activity["o:title"]);
          if (activity["o:title"] === activityName) {
            this.activitySelectedForInfo = activity;
            console.log("Activity trovata");
          }
        });

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

    selectItinerario(index) {
      this.itinerario = store.state.sottoitinerari[index];
      this.totalTimeSelectedArea = this.msToTime(
          this.itinerario.totalTimeMilliseconds
      );

      this.selectedArea = index;

      this.createMarkerArray();
      this.initializeMarkersOfFilteredPOI();
    },
    goBackAndResetMarkersIcon() {
      this.showDetails = false;
      Array.prototype.forEach.call(this.markers, (marker) => {
        marker.poiSelected = false;
      });
    },
    bookItinerary() {
      console.log("Book Itinerary");

      console.log("ITINERARIO: ");
      console.log(this.itinerario);

      var self = this;

      self.sendEmail();
    },
    saveItinerary() {
      console.log("Save itinerary");

      console.log("ITINERARIO: ");
      console.log(this.itinerario);

      var self = this;

      //self.sendEmail();

      //TODO: salvare l'itinerario sul DB
      console.log("FACCIO LA QUERY");

      $.ajax({
        url: "/geodidalab/api/itinerari/",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(this.itinerario),
        success: function (result) {
          //self.geojson = result;
          console.log("RISPOSTA: ");
          console.log(result);

          self.itineraryCode = result;

          // self.modals.itineraryCodeGeneratedWithError = false;
          // self.modals.itineraryCodeGenerated = true;

          //TODO: inviare mail con il metodo send mail
          //self.sendEmail();

        },
        error: function (error) {
          console.log("error: ");
          console.log(error);

          // self.modals.itineraryCodeGenerated = false;
          // self.modals.itineraryCodeGeneratedWithError = true;
        },
      });

      console.log("FINE QUERY");
    },

    createMarkerArray() {
      //Punto di partenza
      //this.markersPolylines.push(this.startPoint);
      console.log("createMarkerArray");
      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {
        console.log(poi);
        var POIlat = poi["location"][0];
        var POIlng = poi["location"][1];

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
            marker: L.marker([poi["location"][0], poi["location"][1]]),
            color: "#1585bd",
            strokeColor: "#1b4f88",
            circleColor: "#ffffff",
            POItitle: poi["poiName"],
            //TODo: aggiungere attributi
            isStartPoint: isStartingPoint,
            poiSelected: false,
          });
        } else {
          this.markers.push({
            marker: L.marker([poi["location"][1], poi["location"][0]]),
            color: "#1585bd",
            strokeColor: "#1b4f88",
            circleColor: "#ffffff",
            POItitle: poi["poiName"],
            //TODo: aggiungere attributi
            isStartPoint: isStartingPoint,
            poiSelected: false,
          });
        }
      });

      console.log(this.markers);

      this.markersCreated = true;
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
