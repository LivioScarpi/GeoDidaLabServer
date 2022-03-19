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
        <!--<p class="category">Dove siamo?</p>-->
        <!--<div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>Bookmarks</p>
          </div>
        </div>-->
      </div>
    </div>
    <div class="section">
      <div class="container">
        <!--<div class="button-container">
          <a href="#button" class="btn btn-primary btn-round btn-lg">Follow</a>
          <a
            href="#button"
            class="btn btn-default btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Follow me on Twitter"
          >
            <i class="fab fa-twitter"></i>
          </a>
          <a
            href="#button"
            class="btn btn-default btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Follow me on Instagram"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </div>-->
        <!--<h3 class="title">About me</h3>
        <h5 class="description">
          An artist of considerable range, Ryan — the name taken by
          Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
          records all of his own music, giving it a warm, intimate feel with a
          solid groove structure. An artist of considerable range.
        </h5>-->
        <!--<div class="row">
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
                    <img :src="require('../assets/images/geodidalab/lago/lago1.jpg')" class="img-raised" />
                    <img :src="require('../assets/images/geodidalab/lago/lago3.jpg')" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img :src="require('../assets/images/geodidalab/lago/lago2.jpg')" alt="" class="img-raised" />
                    <img :src="require('../assets/images/geodidalab/lago/lago4.png')" alt="" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Home">
              <i slot="label" class="now-ui-icons location_world"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img :src="require('../assets/images/geodidalab/ivrea/ivrea2.jpg')" alt="" class="img-raised" />
                    <img :src="require('../assets/images/geodidalab/ivrea/ivrea1.jpg')" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img :src="require('../assets/images/geodidalab/ivrea/ivrea3.jpg')" alt="" class="img-raised" />
                    <img :src="require('../assets/images/geodidalab/ivrea/ivrea4.jpg')" alt="" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Messages">
              <i slot="label" class="now-ui-icons sport_user-run"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img :src="require('../assets/images/bg3.jpg')" alt="" class="img-raised" />
                    <img :src="require('../assets/images/bg8.jpg')" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img :src="require('../assets/images/bg7.jpg')" alt="" class="img-raised" />
                    <img :src="require('../assets/images/bg6.jpg')" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>
          </tabs>
        </div>
      </div>-->
      </div>
      <div class="row">
        <div class="col-md-10 ml-auto mr-auto">
          <h4 class="title text-center">Dove siamo?</h4>
        <div class="col-12 px-5">
          <l-map
            style="height: 500px; border-radius: 10px"
            :zoom="zoom"
            :center="center"
          >
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
       
                          <l-marker
                            :lat-lng="markerLatLng"
                          >
                          
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
                    class="img-raised"
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

          <!--<tab-pane title="Messages">
            <i slot="label" class="now-ui-icons sport_user-run"></i>

            <div class="col-md-10 ml-auto mr-auto">
              <div class="row collections">
                <div class="col-md-6">
                  <img
                    :src="require('../assets/images/bg3.jpg')"
                    alt=""
                    class="img-raised"
                  />
                  <img
                    :src="require('../assets/images/bg8.jpg')"
                    alt=""
                    class="img-raised"
                  />
                </div>
                <div class="col-md-6">
                  <img
                    :src="require('../assets/images/bg7.jpg')"
                    alt=""
                    class="img-raised"
                  />
                  <img
                    :src="require('../assets/images/bg6.jpg')"
                    class="img-raised"
                  />
                </div>
              </div>
            </div>
          </tab-pane>-->
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
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

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    Tabs,
    TabPane,
    LMap,
    LTileLayer,
    LMarker,
    LPopup
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
