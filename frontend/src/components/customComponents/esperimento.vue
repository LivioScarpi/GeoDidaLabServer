<template>
  <div>
    <!--TODO: risolvere problema component youtube e CORS policy-->
    <!--prima nel v-i c'era !$device.mobile-->
    <card style="width: 23rem; border-radius: 10px">
      <!--<img
        slot="image"
        class="card-img-top"
        src="@/assets/images/bg3.jpg"
        alt="Card image cap"
        style="border-radius: 10px"
      />-->
      <carousel :per-page="1" navigationEnabled="true" style="height: 320px">
        <slide v-if="item.media.length !== 0">
          <img
            :src="item['media'][0]['o:thumbnail_urls']['large']"
            class="img"
          />
        </slide>
        <slide v-if="item.mediaYT.length !== 0">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              frameborder="0"
              :src="videoSource()"
              allowfullscreen
              style="
                overflow: hidden;
                overflow-x: hidden;
                overflow-y: hidden;
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                border-radius: 10px;
              "
              height="100%"
              width="100%"
            ></iframe>
          </div>
        </slide>
      </carousel>
      <div>
        <h5 class="card-title text-center">{{ item["o:title"] }}</h5>
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
                <i class="now-ui-icons design_bullet-list-67"></i>Panoramica
              </span>
              <div class="text-justify description col-12 text-black">
                <div class="row mx-1 mb-2">
                  <h6 class="mr-2">Difficoltà:</h6>
                  <h6 class="font-weight-normal">
                    {{ item["geo:ha_difficolta"][0]["display_title"] }}
                  </h6>
                </div>
                <div class="row mx-1 mb-2">
                  <h6 class="mr-2">Interessi:</h6>
                  <div
                    v-for="(interesse, index) in item['geo:ha_interesse']"
                    :key="index"
                  >
                    <h6 class="font-weight-normal">
                      {{ interesse["display_title"] }}
                      <span v-if="index < item['geo:ha_interesse'].length - 1"
                        >,
                      </span>
                    </h6>
                  </div>
                </div>
                <div class="row mx-1 mb-2">
                  <h6 class="mr-2">Durata:</h6>
                  <h6 class="font-weight-normal">
                    {{ item["geo:Durata"][0]["@value"] }} minuti
                    <i class="bi bi-clock mr-2"></i>
                  </h6>
                </div>
                <div class="row mx-1 mb-2">
                  <h6 class="mr-2">Locaton:</h6>
                  <h6 class="font-weight-normal">
                    {{
                      item["geo:situato_in"][0]["display_title"].substring(6)
                    }}
                    <!--In questo modo si rimuove il prefisso "PIVOT_"-->
                    <i class="bi bi-pin-map-fill mr-2"></i>
                  </h6>
                </div>
                <div class="row mx-1">
                  <h6 class="mr-2">Strumenti usati:</h6>
                  <h6 class="font-weight-normal">
                    {{ item["geo:ha_difficolta"][0]["display_title"] }}
                  </h6>
                </div>
              </div>
            </tab-pane>

            <tab-pane>
              <span slot="label">
                <i class="now-ui-icons travel_info"></i>Descrizione
              </span>
              <div class="text-justify description col-12 text-black">
                <b>{{ item["dcterms:description"][0]["@value"] }}</b>
              </div>
            </tab-pane>
          </tabs>
        </div>
      </div>
    </card>
    <!--
    <div v-if="!isLoadingImages && !isLoadingVideos">
      <div class="col-11 ml-auto mr-auto pt-5" v-if="isLarge">
        <div class="cardForm text-black" style="width: 20rem">
          <div class="card-body">
            <div class="row justify-content-center align-items-center">
              <div class="col-12">
                <div>
                  <h3 class="title text-left">{{ item["o:title"] }}</h3>
                  <h5 class="text-left">
                    <div class="row">
                      <div class="col-12">
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-12">
                        <b><i>Livelli di difficoltà:</i></b>
                        <div
                          v-for="(difficulty, index) in item[
                            'geo:ha_difficolta'
                          ]"
                          v-bind:key="index"
                        >
                          <i>{{ difficulty["display_title"] }}</i>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="description text-left col-12">
                        <b>{{ item["dcterms:description"][0]["@value"] }}</b>
                      </div>
                    </div>
                  </h5>
                </div>
              </div>

              <div class="col-6">
                <div class="row pb-3">
                  <div class="col-12 text-center">
                    <div v-if="item.media.length !== 0">
                      <img
                        :src="item['media'][0]['o:thumbnail_urls']['large']"
                        alt=""
                        class="img-raised img_esperimento"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div v-if="item.mediaYT.length !== 0">
                        <div class="embed-responsive embed-responsive-16by9">
                          <iframe
                            class="embed-responsive-item"
                            frameborder="0"
                            :src="videoSource()"
                            allowfullscreen
                            style="padding-bottom: 3%"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 ml-auto mr-auto" v-else>
        <div class="cardForm text-black p-2">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-12">
                <div class="row">
                  <div class="col-12">
                    <h3 class="title pt-0 mt-2">{{ item["o:title"] }}</h3>
                    <h5>
                      <div class="row">
                        <div class="col-12">
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-12">
                          <b><i>Livelli di difficoltà:</i></b>
                          <div
                            v-for="(difficulty, index) in item[
                              'geo:ha_difficolta'
                            ]"
                            v-bind:key="index"
                          >
                            <i>{{ difficulty["display_title"] }}</i>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="description col-12">
                          <b>{{ item["dcterms:description"][0]["@value"] }}</b>
                        </div>
                      </div>
                    </h5>
                  </div>
                </div>

                <div class="row pb-3 pt-3">
                  <div class="col-12 text-center">
                    <div v-if="item.media.length !== 0">
                      <img
                        :src="item['media'][0]['o:thumbnail_urls']['large']"
                        alt=""
                        class="img-raised img_esperimento"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div v-if="item.mediaYT.length !== 0">
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe
                          class="embed-responsive-item"
                          frameborder="0"
                          :src="videoSource()"
                          allowfullscreen
                          style="padding-bottom: 3%"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    -->
  </div>
</template>

<script>
import $ from "jquery";

//import Tab from "./Tab.vue";
//import Tabs from "./Tabs.vue";

import TabPane from "../Tabs/Tab.vue";
import Tabs from "../Tabs/Tabs.vue";
import Card from "../Cards/Card.vue";

import { Carousel, Slide } from "vue-carousel";

const Common = require("@/Common.vue").default;

export default {
  name: "esperimento",
  props: ["item"],

  components: {
    TabPane,
    Tabs,
    Card,
    Carousel,
    Slide,
  },

  data() {
    return {
      windowWidth: 0,
      isLoadingImages: true,
      isLoadingVideos: true,
    };
  },
  created() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });
  },

  methods: {
    playing() {
      console.log("o/ we are watching!!!");
    },

    videoSource: function () {
      if (this.item["mediaYT"][0]["o:source"].includes("youtu.be/"))
        return (
          "https://youtube.com/embed/" +
          this.item["mediaYT"][0]["o:source"].split("/").pop() +
          "?modestbranding=1&playsinline=1&rel=0"
        );
      else
        return (
          "https://youtube.com/embed/" +
          this.item["mediaYT"][0]["o:source"].split("/watch?v=").pop() +
          "?modestbranding=1&playsinline=1&rel=0"
        );
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    isLarge() {
      return this.windowWidth >= 768;
    },
    getYoutubeVideoID() {
      var url = this.item["mediaYT"][0]["o:source"];
      return url.substring(url.indexOf("=") + 1);
    },
  },

  mounted() {
    console.log("monto esperimeto: ");
    console.log(this.item);
    // console.log(this.$device);

    var self = this;

    Common.getElementImages(this, this.item, (mediaList) => {
      this.item.media = mediaList;
      self.isLoadingImages = false;
    });

    Common.getElementYTVideos(this, this.item, (ytVideoList) => {
      this.item.mediaYT = ytVideoList;
      self.isLoadingVideos = false;
    });
  },
};
</script>

<style scoped>
.img_esperimento {
  width: 80%;
  object-fit: cover;
}

@media only screen and (max-width: 768px) {
  .carouselImage {
    height: 25vh;
    width: 100%;
  }

  #carousel-1 {
    width: 75%;
  }

  .carousel-control-prev {
    margin-left: -50px;
  }

  .carousel-control-next {
    margin-right: -50px;
  }
}

@media only screen and (min-width: 768px) {
  .carouselImage {
    height: 50vh;
    width: 100%;
  }

  #carousel-1 {
    width: 50%;
  }

  .carousel-control-prev {
    margin-left: -100px;
  }

  .carousel-control-next {
    margin-right: -100px;
  }
}

/*
@media only screen and (min-width: 640px){
  iframe{
    width: 640px;
    height:360px;
  }
}
@media only screen and (max-width: 640px){
  iframe{
    width: 100%;
    aspect-ratio:64/36;
  }
}

 */

.VueCarousel-dot-container {
  margin-top: 0 !important;
}

.img {
  align-items: center;
  height: 100%;
  object-fit: cover; /* cover makes the image stretch the width and height of the container */
  border-radius: 10px;
}
</style>