<template>
  <div>
    <div class="row px-lg-5">
      <div class="col-lg-7 col-sm-12">
        <div class="row align-items-center">
          <div class="col-2 col-lg-1 text-center pr-1">
            <i
              class="bi bi-map-fill"
              style="font-size: 1.5rem; color: cornflowerblue"
            ></i>
          </div>
          <div class="col-10 col-lg-11">
            <h5 class="mb-0">{{ itinerario["name"] }}</h5>
          </div>
        </div>

        <div class="row px-2">
          <div class="col-2 col-lg-1"></div>
          <div class="col-10 col-lg-11 pl-0">
            <div
              v-for="(poi, poiIndex) in itinerario.poi"
              :key="'poiInItinerario' + poiIndex"
              class="ml-2 mb-3"
            >
              <h6>
                <i v-if="poi['poiName'] === 'Punto di partenza' || poi['poiName'] === 'Punto di arrivo'" class="bi bi-geo-fill mr-2" style="color: #82b351"></i>
                <i v-else class="bi bi-geo-fill mr-2" style="color: #437fc5"></i>{{ poiIndex }}. {{ poi["poiName"] }}
              </h6>

              <div
                v-if="
                  poi.activitiesInPOI !== undefined &&
                  poi.activitiesInPOI.length > 0
                "
              >
                <div
                  v-for="(activity, activityIndex) in poi.activitiesInPOI"
                  :key="'activityInPOI' + activityIndex"
                  class="ml-5"
                >
                  <!--
                  <div v-if="poi['poiName'] === 'Punto di partenza' || poi['poiName'] === 'Punto di arrivo' ">
                    - {{ activity["activityName"] }}
                  </div>-->
                  <!--{{poi['poiName']}}-->
                  <div
                    v-if="
                      poi['poiName'] !== 'Punto di partenza' &&
                      poi['poiName'] !== 'Punto di arrivo'
                    "
                  >
                  <i class="bi bi-clipboard-check-fill  mr-2"></i>
                    <!--{{ poiIndex }}.{{activityIndex}} - -->{{ activity["activityName"] }} (
                    <i
                      >durata
                      {{ activity["serviceDurationMinutes"] }} minuti </i
                    >)
                  </div>
                </div>
              </div>
              <div v-else>
                NESSUNA ATTIVITA' PRESENTE:
                <div v-if="poi.activitiesOfPOIPivot === undefined">
                  E' UNDEFINED
                </div>
                <div v-else>LA LUNGHEZZA E' 0</div>
              </div>
            </div>
            <Button
              size="large"
              type="warning"
              v-on:click="saveItinerary()"
              class="m-2 textButtonColor"
              >Salva itinerario
            </Button>
            QUA BISOGNA STARE ATTENTI -> O SALVO L'ITINERARIO E TORNO INDIETRO ALLA PAGINA INIZIALE (oppure disabilito i bottoni), OPPURE VADO AVANTI
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-sm-12">
        <div class="row">
          <div class="col-lg-12">
            <div class="px-4">
              <l-map style="height: 500px" :zoom="zoom" :center="center">
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
                    v-if="marker.isStartPoint"
                    :icon-url="require('../../icons/startPoint.png')"
                  ></l-icon>
                  <l-icon
                    v-else
                    :icon-url="require('../../icons/unselectedPOI.png')"
                  ></l-icon>
                  <l-popup :options="anchorOptions">
                    <div class="px-3">
                      <div class="row">
                        <h5>{{ marker.POItitle }}</h5>
                      </div>
                    </div>
                  </l-popup>
                </l-marker>

                <l-polyline
                  :lat-lngs="markersPolylines"
                  color="red"
                ></l-polyline>
                <l-geo-json :geojson="geojson"></l-geo-json>
              </l-map>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5 col-lg-6">
        <div class="row"></div>
      </div>
    </div>

    <modal
            :show.sync="modals.itineraryCodeGenerated"
            headerClasses="justify-content-center"
            @close="modals.itineraryCodeGenerated = true"
          >
            <h4 slot="header" class="title title-up text-center">Il tuo codice</h4>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-12 text-center">
                    <p>
                      Il codice dell'itinerario è:
                    </p>
                    <h6 class="itineraryCode">Hjhfds7hHDSHFD7</h6>
                    <p>Salvalo per non perderlo. Potrai inserire questo codice nella pagina "Percorsi" selezionando l'opzione "Inserisci il codice del tuo itinerario"</p>
                  </div>
                </div>
              </div>
            </div>

            <template slot="footer">
              <Button
                size="small"
                type="danger"
                v-on:click="modals.itineraryCodeGenerated = false"
                class="mx-1"
                >Chiudi
              </Button>
              <!--
              <Button
                size="small"
                type="primary"
                v-on:click="checkCodeAndGetPath()"
                class="mx-1"
                >Inserisci
              </Button>-->
            </template>
          </modal>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import {
  LCircleMarker,
  LGeoJson,
  LMap,
  LMarker,
  LPopup,
  LIcon,
  LTileLayer,
  LPolyline,
} from "vue2-leaflet";

import {
  Checkbox,
  Collapse,
  CollapseItem,
  Radio,
  Card,
  Modal,
  FormGroupInput,
} from "../";

import { Button } from "element-ui";
import $ from "jquery";


export default {
  name: "ItinerarioVROOM",
  props: ["item", "itinerario"],

  components: {
    //Component Leaflet map
    LMap,
    LTileLayer,
    LGeoJson,
    LPolyline,
    LMarker,
    LPopup,
    LIcon,
    Button,
    Modal
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
      markersPolylines: [],

      coord: null,

      anchorOptions: { offset: L.point(0, -30) },

      startPoint: [45.47561994860321, 7.889627627278735],
      endPoint: [45.47548295737901, 7.888970990326549],

      modals: {
        //oggetto usato per mostrare i modals
        itineraryCodeGenerated: false,
      },
    };
  },

  mounted() {
    this.msg = "MESSAGGIO";

    console.log("itinerario:");
    console.log(this.itinerario);

    this.createMarkerArray();
    this.initializeMarkersOfFilteredPOI();

    var self = this;

/*
    $(".ui-1_simple-remove").click( function (event) {
      self.modals.itineraryCodeGenerated = false;
    });
    */

    $(".ui-1_simple-remove").hide();

    /*
    $("modal fade show d-block").click( function (event) {
      self.modals.itineraryCodeGenerated = true;
    });
    */
  },

  methods: {
    createMarkerArray() {
      //Punto di partenza
      this.markersPolylines.push(this.startPoint);

      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {
        console.log(poi);
        var POIlat = poi["location"][0];
        var POIlng = poi["location"][1];

        var POIcoordinates = [POIlat, POIlng];

        this.markersPolylines.push(POIcoordinates);
      });

      //Punto di arrivo
      this.markersPolylines.push(this.endPoint);

      console.log(this.markersPolylines);
    },

    initializeMarkersOfFilteredPOI() {
      this.markers = [];

      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {

        //viene usato anche per il punto di arrivo
        var isStartingPoint = (poi["poiName"] === 'Punto di partenza') || (poi["poiName"] === 'Punto di arrivo');
        
        this.markers.push({
          marker: L.marker([poi["location"][0], poi["location"][1]]),
          color: "#1585bd",
          strokeColor: "#1b4f88",
          circleColor: "#ffffff",
          POItitle: poi["poiName"],
          //TODo: aggiungere attributi
          isStartPoint: isStartingPoint,
        });
      });


      this.markersCreated = true;
    },

    saveItinerary(){
      console.log("Save itinerary");

      //TODO: mandare JSON al server e recuperare ID con cui è stato salvato sul DB

      //TODO: mostrare modal con il codice

      this.modals.itineraryCodeGenerated = true;
    }

    //ui-1_simple-remove
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.textButtonColor { 
  color: #2c2c2c;
}

.itineraryCode{
  font-size: 1rem;
}
</style>
