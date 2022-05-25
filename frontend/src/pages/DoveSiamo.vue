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
          <div class="col-12 px-5">
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
            <div class="col-md-10 ml-auto mr-auto collections">
              <ul style="display: grid; grid-template-columns: repeat(2, 1fr)">
                <li
                  v-for="(item, index) in filteredMedia(place)"
                  :key="index"
                  style="display: inline"
                  class="m-3"
                >
                  <img style="height: 100%; width: 100%" v-bind:src="item['thumbnail_display_urls']['large']" :alt="item['dcterms:description']['@value']"/>
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

const Common = require("@/Common.vue").default;

library.add(faFlask);

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
    //FontAwesomeIcon
  },

  data() {
    return {
      imageUrl: require("../assets/images/canoe-scaled.jpg.webp"),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 16,
      center: [45.477584999712185, 7.891531998415936],
      markerLatLng: [45.477584999712185, 7.891531998415936],
      map: null,
      geojson: null,
      markers: [],
      media: [],
      allLoaded: [],
    };
  },

  created() {
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
  },

  methods: {
    filteredMedia(place) {
      return this.media.filter((pl) => pl["o:title"] === place);
    },
  },
};
</script>
<style></style>
