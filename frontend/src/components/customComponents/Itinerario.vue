<template>
  <div id="collapseDiv">
    <div class="row">
      <div class="col-lg-7 col-sm-12">
        <div class="row align-items-center">
          <div class="col-2 col-lg-1 text-center pr-1">
            <i
              class="bi bi-map-fill"
              style="font-size: 1.5rem; color: cornflowerblue"
            ></i>
          </div>
          <div class="col-10 col-lg-11">
            <h5 class="mb-0">{{ itinerario["geo:Titolo_it"][0]["@value"] }}</h5>
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
                <i class="bi bi-geo-fill mr-2"></i
                >{{ poi["geo:Titolo_it"][0]["@value"] }} - posizione in
                itinerario:
                {{ poi["geo:Posizione_itinerario"][0]["@value"] }}
              </h6>

              <div
                v-if="
                  poi.activitiesOfPOIPivot !== undefined &&
                  poi.activitiesOfPOIPivot.length > 0
                "
              >
                <div
                  v-for="(activity, activityIndex) in poi.activitiesOfPOIPivot"
                  :key="'activityInPOI' + activityIndex"
                  class="ml-5"
                >
                  - {{ activity["o:title"] }}
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
              v-on:click="selezionaItinerario()"
              class="m-2 textButtonColor"
              >Seleziona itinerario
            </Button>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-sm-12">
        <div class="row">
          <div class="col-lg-12">
            <div class="px-4">
              <l-map
                style="height: 500px"
                :zoom="zoom"
                :center="center"
                ref="mymap"
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
                              v-if="marker.isStartPoint"
                              :icon-url="require('../../icons/startPoint.png')"
                            ></l-icon>
                            <l-icon
                              v-else-if="marker.poiHasActivitiesInItinerary"
                              :icon-url="require('../../icons/selectedPOI.png')"
                            ></l-icon>
                            <l-icon
                              v-else-if="!marker.poiHasActivitiesInItinerary"
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

import { Button } from "../";
import $ from "jquery";

export default {
  name: "Itinerario",
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
    };
  },

  mounted() {
    var self = this;
    this.$root.$on("invalidateMapSize", function () {
      console.log("invalidateMapSize");

      if (self.$refs.mymap !== undefined) {
        self.$refs.mymap.mapObject.invalidateSize();
      }
    });

    this.msg = "MESSAGGIO";

    console.log("itinerario:");
    console.log(this.itinerario);

    this.createMarkerArray();
    this.initializeMarkersOfFilteredPOI();
  },

  computed: {},

  watch: {},

  methods: {
    createMarkerArray() {
      //Punto di partenza
      this.markersPolylines.push(this.startPoint);

      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {
        var POIlat = poi["marker"]["o-module-mapping:lat"];
        var POIlng = poi["marker"]["o-module-mapping:lng"];

        var POIcoordinates = [POIlat, POIlng];

        this.markersPolylines.push(POIcoordinates);
      });

      //Punto di partenza
      this.markersPolylines.push(this.endPoint);

      console.log(this.markersPolylines);
    },

    initializeMarkersOfFilteredPOI() {
      this.markers = [];

      //marker punto di partenza
      this.markers.push({
        marker: L.marker(this.startPoint),
        color: "#1585bd",
        strokeColor: "#1b4f88",
        circleColor: "#ffffff",
        POItitle: "Punto di partenza",
        poiHasActivitiesInItinerary: false,
        isStartPoint: true,
      });

      Array.prototype.forEach.call(this.itinerario.poi, (poi) => {
        this.markers.push({
          marker: L.marker([
            poi.marker["o-module-mapping:lat"],
            poi.marker["o-module-mapping:lng"],
          ]),
          color: "#1585bd",
          strokeColor: "#1b4f88",
          circleColor: "#ffffff",
          POItitle: poi["geo:Titolo_it"][0]["@value"],
          poiSelected: poi.poiHasActivitiesSelected,
        });
      });

      //marker punto di partenza
      this.markers.push({
        marker: L.marker(this.endPoint),
        color: "#1585bd",
        strokeColor: "#1b4f88",
        circleColor: "#ffffff",
        POItitle: "Punto di partenza",
        poiHasActivitiesInItinerary: false,
        isStartPoint: true,
      });

      this.markersCreated = true;
    },

    selezionaItinerario() {
      console.log("INVALIDO LA DIMENSIONE");
      this.$refs.mymap.mapObject.invalidateSize();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.textButtonColor {
  color: #2c2c2c;
}
</style>
