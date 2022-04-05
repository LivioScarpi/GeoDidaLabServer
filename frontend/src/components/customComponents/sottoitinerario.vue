<template>
  <!--TODO: risolvere problema component youtube e CORS policy-->
  <!--prima nel v-i c'era !$device.mobile-->

  <card
    :style="[
      isLarge
        ? {
            'max-width': '28rem',
            height: '42rem',
            'max-height': '43rem',
            'border-radius': '10px',
          }
        : {
            'max-width': '28rem',
            'max-sheight': '45rem',
            'border-radius': '10px',
          },
    ]"
    class="mx-2 postcardattivita attivita orange"
  >
    <div class="mt-3">
      <h5 class="card-title text-center">
        {{ item["name"].replace("Itinerario_", "") }}
      </h5>
      <div
        class="postcardattivita__bar margin-auto"
        style="display: inline-block"
      ></div>


      <h6 class="card-title text-center">
        Tempo totale: {{ item.totalTimeMilliseconds }}
      </h6>

      <div class="row">
        <tabs
          type="primary"
          tabContentClasses="tab-subcategories"
          square
          centered
          class="row"
        >
          <tab-pane>
            <span slot="label">
              <i class="now-ui-icons design_bullet-list-67"></i>PANORAMICA
            </span>
            <div class="slider">
              <div class="slides">
                <div
                  v-for="(poi, poiIndex) in item.poi"
                  :id="poi['poiName'] + 'slide-' + poiIndex"
                  :key="poiIndex"
                >
                  <div>
                    <h6 class="mt-4 mb-0 mx-5">
                      <i class="bi bi-pin-map-fill mr-2"></i
                      >{{ poi["poiName"] }}
                    </h6>

                    <h4
                      v-if="
                        poi['poiName'] !== 'Punto di partenza' &&
                        poi['poiName'] !== 'Punto di arrivo'
                      "
                      class="mb-3 mt-0"
                    >
                      Attività
                    </h4>

                    <div
                      v-for="(activity, activityIndex) in poi.activitiesInPOI"
                      :key="'activityInPOI' + activityIndex"
                      class="mx-3"
                    >
                      <div
                        v-if="
                          poi['poiName'] !== 'Punto di partenza' &&
                          poi['poiName'] !== 'Punto di arrivo'
                        "
                        class="mb-3"
                      >
                        <!--<i
                                        class="bi bi-clipboard-check-fill mr-2"
                                      ></i>-->
                        <!--{{ poiIndex }}.{{activityIndex}} - -->
                        <h6>{{ activity["activityName"] }}</h6>
                        <i class="bi bi-clock mr-2"></i>
                        {{ activity["serviceDurationMinutes"] }} minuti
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div id="slide-2">2</div>
                <div id="slide-3">3</div>
                <div id="slide-4">4</div>
                <div id="slide-5">5</div> -->
              </div>

                <a
                 class="mt-2"
                  v-for="(poi, poiIndex) in item.poi"
                  :href="'#' + poi['poiName'] + 'slide-' + poiIndex"
                  :key="poiIndex"
                  >{{ poiIndex + 1 }}</a
                >
            </div>
          </tab-pane>

          <tab-pane>
            <span slot="label" @click="invalidateMapSizeMethod()">
              <i class="now-ui-icons travel_info"></i>MAPPA
            </span>
            <div class="text-justify description col-12 text-black">
              <l-map
                style="width: 370px; height: 400px; border-radius: 10px"
                :zoom="zoom"
                :center="center"
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
                  <l-popup :options="anchorOptions">
                    <div class="px-3">
                      <div class="row">
                        <h5>{{ marker.POItitle }}</h5>
                      </div>
                    </div>
                  </l-popup>
                </l-marker>

                <l-circle-marker
                  :lat-lng="circle.center"
                  :radius="circle.radius"
                  :color="circle.color"
                >
                  <l-popup>Tu sei qui!</l-popup>
                </l-circle-marker>

              
              </l-map>
            </div>
          </tab-pane>
        </tabs>
      </div>
    </div>
  </card>
</template>

<script>
import $ from "jquery";

//import Tab from "./Tab.vue";
//import Tabs from "./Tabs.vue";

import TabPane from "../Tabs/Tab.vue";
import Tabs from "../Tabs/Tabs.vue";
import Card from "../Cards/Card.vue";

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
import { Carousel, Slide } from "vue-carousel";

import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

const Common = require("@/Common.vue").default;

export default {
  name: "sottoitinerario",
  props: ["item"],

  components: {
    //Component Leaflet map
    LMap,
    LTileLayer,
    //LGeoJson,
    LMarker,
    LPopup,
    LCircleMarker,
    //LIcon,
    //LControl,

    TabPane,
    Tabs,
    Card,
    //Carousel,
    //Slide,
  },

  directives: {
    swiper: directive,
  },

  data() {
    return {
      windowWidth: 0,
      isLoadingImages: true,
      isLoadingVideos: true,
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },

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
    };
  },
  created() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });
  },

  methods: {
    invalidateMapSizeMethod(){
      console.log("ECOOMI");

            if (this.$refs.mappaSottoItinerario !== undefined) {
              console.log("SONO QUA");
        this.$refs.mappaSottoItinerario.mapObject.invalidateSize(true);
        
      }
    }
  },
  computed: {
    isLarge() {
      return this.windowWidth >= 768;
    },
  },

  mounted() {
    console.log("monto sottoitinerario: ");
    console.log(this.item);
  },
};
</script>

<style scoped>
.text {
  height: 13rem;
  /*text-overflow: ellipsis;*/
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.slider {
  width: 395px;
  height: 100%;
  text-align: center;
  overflow: hidden;
}

.slides {
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.slides > div {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 385px;
  margin-left: 10px;
    margin-right: 10px;

  height: 400px;
  border-radius: 10px;
  background: #eee;
  transform-origin: center center;
  transition: transform 0.5s;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  /*font-size: 100px;*/
}
.slides > div:target {
}
.author-info {
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.75rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
}
.author-info a {
  color: white;
}
img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slider > a {
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  background: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  position: relative;
}
.slider > a:active {
  top: 1px;
}
.slider > a:focus {
  background: #000;
}
</style>