<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
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
    </div>
    <div class="section">
      <div class="container"></div>
      <div class="row">
        <div class="col-md-10 ml-auto mr-auto">
          <h4 class="title text-center">Dove siamo?</h4>
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
          pills
          class="nav-align-center"
          tab-content-classes="gallery"
          tab-nav-classes="nav-pills-just-icons"
          type="primary"
        >
          <tab-pane title="Profile">
            <i slot="label" class="now-ui-icons design_image"></i>

            <div class="col-md-10 ml-auto mr-auto">
              <div class="row collections">
                <div class="col-md-6">
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago1.jpg')"
                    class="img-raised"
                  />
                  <img
                    :src="require('../assets/images/geodidalab/lago/lago3.jpg')"
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
                    :src="require('../assets/images/geodidalab/lago/lago4.png')"
                    alt=""
                    class="img-raised"
                  />
                </div>
              </div>
            </div>
          </tab-pane>

          <tab-pane title="Home">
            <i slot="label" class="now-ui-icons location_world"></i>

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
          </tab-pane>
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import { LMap, LMarker, LPopup, LTileLayer } from "vue2-leaflet";

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
    };
  },
};
</script>
<style></style>
