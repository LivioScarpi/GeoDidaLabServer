<template>
  <!--TODO: risolvere problema component youtube e CORS policy-->
  <!--prima nel v-i c'era !$device.mobile-->
  <div class="row">
    <div class="col-lg-6 px-1">
      <div class="mt-3">
        <h5 class="card-title text-left ml-2">{{ item["o:title"] }}</h5>
        <div
          class="postcardattivita__bar margin-auto"
          style="display: inline-block"
        ></div>

        <div class="row">
          <div class="col-12 pl-0">
            <div class="row">
              <tabs
                type="primary"
                tabContentClasses="tab-subcategories"
                square
                centered
                style="padding-bottom: 0"
              >
                <tab-pane>
                  <span slot="label">
                    <i class="now-ui-icons design_bullet-list-67"></i>PANORAMICA
                  </span>
                  <div
                    class="px-0 text-justify description col-12 text-black text"
                  >
                    <div class="row mx-1 mb-2">
                      <h6 class="mr-2">Descrizione:</h6>
                      <h6 class="font-weight-normal">
                        {{ item["dcterms:description"][0]["@value"] }}
                      </h6>
                    </div>
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
                          <span
                            v-if="index < item['geo:ha_interesse'].length - 1"
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
                      <h6 class="mr-2">Location:</h6>
                      <h6 class="font-weight-normal">
                        {{
                          item["geo:situato_in"][0]["display_title"].substring(
                            6
                          )
                        }}
                        <!--In questo modo si rimuove il prefisso "PIVOT_"-->
                        <i class="bi bi-pin-map-fill mr-2"></i>
                      </h6>
                    </div>
                    <div class="row mx-1">
                      <h6 class="mr-2">Strumenti usati:</h6>
                      <div v-if="item['geo:usa_strumento'] !== undefined">
                        <template
                          v-for="(strumento, index) in item[
                            'geo:usa_strumento'
                          ]"
                          style="display: inline-block"
                        >
                          <h6 class="font-weight-normal" :key="index">
                            {{ strumento["display_title"] }}
                          </h6>
                          <template
                            v-if="index < item['geo:usa_strumento'].length - 2"
                            ><h6 class="font-weight-normal" :key="index">
                              ,
                            </h6></template
                          >

                          <template
                            v-if="
                              index === item['geo:usa_strumento'].length - 2
                            "
                          >
                            <h6 class="font-weight-normal" :key="index">e</h6>
                          </template>
                        </template>
                      </div>
                      <div v-else>
                        <h6 class="font-weight-normal">Nessuno</h6>
                      </div>
                      <!-- <h6
                  class="font-weight-normal"
                  v-if="item['geo:usa_strumento'] !== undefined"
                >
                  {{ item["geo:usa_strumento"][0]["display_title"] }}
                </h6> -->
                    </div>
                  </div>
                </tab-pane>

                <!-- <tab-pane>
            <span slot="label">
              <i class="now-ui-icons travel_info"></i>DESCRIZIONE
            </span>
            <div class="text-justify description col-12 text-black">
              <b>{{ item["dcterms:description"][0]["@value"] }}</b>
            </div>
          </tab-pane> -->
              </tabs>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-lg-6 text-center"
      style="margin-top: auto; margin-bottom: auto"
    >
      <ssr-carousel
        show-dots
        show-arrows
        :style="[
          isLarge
            ? {
                margin: 'auto',
              }
            : {},
        ]"
      >
        <div
          class="slide text-center"
          v-for="media in item['media']"
          :key="media"
        >
          <img :src="media['o:thumbnail_urls']['large']" class="img" />
        </div>
        <div
          class="slide text-center"
          style="margin-top: auto; margin-bottom: auto"
          v-for="(media, index) in item['mediaYT']"
          :key="media"
        >
          <div
            style="margin-top: auto; margin-bottom: auto"
            class="slide embed-responsive embed-responsive-16by9"
          >
            <iframe
              class="embed-responsive-item"
              frameborder="0"
              :src="videoSource(index)"
              allowfullscreen
              style="
                overflow: hidden;
                overflow-x: hidden;
                overflow-y: hidden;
                position: absolute;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                border-radius: 10px;
              "
            ></iframe>
          </div>
        </div>
      </ssr-carousel>

      <!-- <swiper
                        :style="[
                  isLarge
                    ? {
                        'border-radius': '10px',
                        height: '30rem',
                      }
                    : {
                        height: '30rem',

                        'border-radius': '10px',
                      },
                ]"
          ref="mySwiper"
          class="swiper"
          navigation
          :pagination="{ clickable: true }"
          style="background-color: hsl(17, 100%, 90%); border-radius: 10px"
          v-if="!isLoadingImages && !isLoadingVideos"
        >
          <swiper-slide
            v-if="item.media !== undefined && item.media.length !== 0"
          >
            <img
              :src="item['media'][0]['o:thumbnail_urls']['large']"
              class="img"
            />
          </swiper-slide>

          <swiper-slide
            v-if="item.mediaYT !== undefined && item.mediaYT.length !== 0"
          >
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
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  right: 0px;
                  bottom: 0px;
                  border-radius: 10px;
                "
              ></iframe>
            </div>
          </swiper-slide>



          <div
              v-if="
                item.media !== undefined &&
                item.mediaYT !== undefined &&
                (item.media.length > 1 ||
                  item.mediaYT.length > 1 ||
                  (item.media.length === 1 && item.mediaYT.length === 1))
              "
              class="swiper-button-prev"
              slot="button-prev"
              @click="swiper.slidePrev()"
            ></div>
            <div
              v-if="
                item.media !== undefined &&
                item.mediaYT !== undefined &&
                (item.media.length > 1 ||
                  item.mediaYT.length > 1 ||
                  (item.media.length === 1 && item.mediaYT.length === 1))
              "
              class="swiper-button-next"
              slot="button-next"
              @click="swiper.slideNext()"
            ></div> 
        </swiper> -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";

//import Tab from "./Tab.vue";
//import Tabs from "./Tabs.vue";

import TabPane from "../Tabs/Tab.vue";
import Tabs from "../Tabs/Tabs.vue";
import Card from "../Cards/Card.vue";

import SsrCarousel from "vue-ssr-carousel";
import Slide from "vue-ssr-carousel";

import ssrCarouselCss from "vue-ssr-carousel/index.css";

import { config } from "../../utils/config";


// import { Carousel, Slide } from "vue-carousel";

import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

const Common = require("@/Common.vue").default;

export default {
  name: "infoEsperimento",
  props: ["item"],

  components: {
    TabPane,
    Tabs,
    //Card,
    //Carousel,
    //Slide,
    // Swiper,
    // SwiperSlide,
    SsrCarousel,
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

    videoSource: function (index) {
      if (this.item["mediaYT"][index]["o:source"].includes("youtu.be/"))
        return (
          "https://youtube.com/embed/" +
          this.item["mediaYT"][index]["o:source"].split("/").pop() +
          "?modestbranding=1&playsinline=1&rel=0"
        );
      else
        return (
          "https://youtube.com/embed/" +
          this.item["mediaYT"][index]["o:source"].split("/watch?v=").pop() +
          "?modestbranding=1&playsinline=1&rel=0"
        );
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
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

    console.log("MOUNTED");
    console.log(this);
    //console.log("Current Swiper instance object", this.swiper);
    //this.swiper.slideTo(3, 1000, false);
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

.text {
  height: 19rem;
  overflow: scroll;
  /*text-overflow: ellipsis;*/
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.tab-space {
  padding-bottom: 0px;
}
</style>