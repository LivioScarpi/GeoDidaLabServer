<template>
  <div>
    <!-- <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        :style="{ 'background-image': 'url(' + imageUrl + ')' }"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img :src="require('../assets/images/squared_logo.png')" alt="" />
        </div>
        <h3 class="title">GEODIDALAB</h3>
      </div>
    </div> -->
    <div class="section pt-0">
      <div class="container"></div>
      <div class="row">
        <div class="col-md-10 ml-auto mr-auto">
          <h4 class="title text-center">Dove siamo?</h4>
          <div class="col-12 text-center mb-3">
            <i class="fa fa-map-pin fa-sm px-1" style="color: indianred"></i> Ci
            puoi trovare in
            <u
              ><a
                href="https://www.google.com/maps/dir/?api=1&amp;destination=45.477466179593%2C7.8914880752563"
                >Via Lago S. Michele, 15 10015 Ivrea, Piemonte</a
              ></u
            >
          </div>
          <div class="col-12 px-lg-5">
            <l-map
              style="height: 500px; border-radius: 10px"
              :zoom="zoom"
              :center="center"
            >
              <l-tile-layer
                :url="url"
                :attribution="attribution"
              ></l-tile-layer>

              <l-marker :lat-lng="markerLatLng">
                <l-popup>
                  <div class="px-3">
                    <div class="row">
                      <h5>Geodidalab</h5>
                    </div>
                  </div>
                </l-popup>
              </l-marker>
            </l-map>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <h4 class="title text-center">I nostri luoghi</h4>
        </div>

        <!-- <Panorama source="pano.jpg" caption="Awesome Panorama"/> -->
        <!-- <vue-three-sixty :amount="4"
          imagePath="https://thumbs.dreamstime.com/b/panorama-panoramico-della-paris-difensiva-panoramiche-difesa-grattacieli-moderni-contro-il-cielo-azzurro-con-nuvole-bianche-206836216.jpg"
          fileName="panorama-panoramico-della-paris-difensiva-panoramiche-difesa-grattacieli-moderni-contro-il-cielo-azzurro-con-nuvole-bianche-206836216.jpg" /> -->

        <tabs
          tabContentClasses="tab-subcategories"
          square
          centered
          type="primary"
        >
          <tab-pane
            v-for="(place, index) in places"
            :key="index"
            :title="place"
          >
            <span slot="label"> {{ place }} </span>

            <div
              class="container my-3 text-center"
              :class="isLarge ? '' : 'mx-3'"
            >
              <h5>Esplora i nostri luoghi a 360 gradi!</h5>
              <div
                class="container"
                :style="isLarge ? 'height: 700px' : 'height: 300px; width: 90%'"
              >
                <Pano
                  source="https://video.360cities.net/mikealbright/01881815_UTAH_SKI_360_2880_compressed-1024x512.jpg"
                >
                </Pano>
              </div>
            </div>

            <div v-if="isLarge" class="col-md-10 ml-auto mr-auto collections">
              <ul
                style="display: grid; grid-template-columns: repeat(2, 1fr)"
                class="p-0"
              >
                <li
                  v-for="(item, index) in filteredMedia(place)"
                  :key="index"
                  style="display: inline"
                  class="m-3"
                >
                  <img
                    style="height: 100%; width: 100%"
                    v-bind:src="item['thumbnail_display_urls']['large']"
                    :alt="item['dcterms:description']['@value']"
                  />
                </li>
              </ul>

              <!-- <div
                v-for="ind in getIndex(place)"
                :key="ind"
                class="row collections"
              >
                <div class="col-md-6 text-right">
                  <img
                    :src="media[ind]['thumbnail_display_urls']['large']"
                    class="img-raised"
                  />
                </div>
                <div class="col-md-6 text-right">
                  <img
                    :src="media[ind]['thumbnail_display_urls']['large']"
                    alt=""
                    class="img-raised"
                  />
                </div>
              </div> -->
            </div>
            <div v-else class="collections p-0">
              <div
                v-for="(item, index) in filteredMedia(place)"
                :key="index"
                style="display: inline"
                class="row mx-auto"
              >
                <img
                  style="height: 100%; width: 100%"
                  v-bind:src="item['thumbnail_display_urls']['large']"
                  :alt="item['dcterms:description']['@value']"
                />
              </div>
            </div>
          </tab-pane>
          <!-- <tab-pane title="Geodidalab">
            <span slot="label"> GEODIDALAB </span>
            <div class="col-md-10 ml-auto mr-auto">
              <div class="row collections">
                <div class="col-md-6 text-right">
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago1.jpg')"
                    class="img-raised"
                  />
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago3.jpg')"
                    alt=""
                    class="img-raised"
                  />
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago5.jpg')"
                    alt=""
                    class="img-raised"
                  />
                </div>
                <div class="col-md-6">
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago2.jpg')"
                    alt=""
                    class="img-raised"
                  />
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago4.jpg')"
                    alt=""
                    class="img-raised"
                  />
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago6.jpg')"
                    alt=""
                    class="img-raised"
                  />
                </div>
              </div>
            </div>
          </tab-pane> -->

          <!-- <tab-pane title="Ivrea">
            <span slot="label"> IVREA </span>
            <div class="col-md-10 ml-auto mr-auto">
              <div class="row collections">
                <div class="col-md-6">
                  <img
                    :src="
                      require('../assets/images/geodidalab/ivrea/ivrea2.jpg')
                    "
                    alt=""
                    class="img-raised"
                  />
                  <img
                    :src="
                      require('../assets/images/geodidalab/ivrea/ivrea1.jpg')
                    "
                    alt=""
                    class="img-raised float-right"
                  />
                </div>
                <div class="col-md-6">
                  <img
                    :src="
                      require('../assets/images/geodidalab/ivrea/ivrea3.jpg')
                    "
                    alt=""
                    class="img-raised"
                  />
                  <img
                    :src="
                      require('../assets/images/geodidalab/ivrea/ivrea4.jpg')
                    "
                    alt=""
                    class="img-raised"
                  />
                </div>
              </div>
            </div>
          </tab-pane> -->
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import { LMap, LMarker, LPopup, LTileLayer } from "vue2-leaflet";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Pano } from "vuejs-vr";
import { Panorama } from "vuejs-panorama";

const Common = require("@/Common.vue").default;

library.add(faFlask);
import $ from "jquery";

import Vue from "vue";
import VueThreeSixty from "vue-360";

import "vue-360/dist/css/style.css";

Vue.use(VueThreeSixty);

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    Tabs,
    TabPane,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    Pano,
    //Panorama
    //FontAwesomeIcon
  },

  data() {
    return {
      imageUrl: require("../assets/images/canoe-scaled.jpg.webp"),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 16,
      center: [45.47597654352459, 7.889857414848962],
      markerLatLng: [45.47597654352459, 7.889857414848962],
      map: null,
      geojson: null,
      markers: [],
      media: [],
      allLoaded: [],
      windowWidth: 0,
    };
  },

  created() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });

    // eseguo la query per gli esperimenti solo la prima volta che apro la pagina degli Esperimenti

    /**
     * 118 : class id Misurazione
     * 130 : class id Attivita
     */

    var self = this;

    Common.getElemsByClass(this, 134, (res) => {
      self.media = res.body;
      self.allLoaded = true;
    });
  },

  computed: {
    places() {
      return [...new Set(this.media.map((place) => place["o:title"]))];
    },
    isLarge() {
      return this.windowWidth >= 768;
    },
  },

  methods: {
    filteredMedia(place) {
      return this.media.filter((pl) => pl["o:title"] === place);
    },
  },
};
</script>
<style></style>
