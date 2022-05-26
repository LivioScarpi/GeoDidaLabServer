<template>
  <!--TODO: risolvere problema component youtube e CORS policy-->
  <!--prima nel v-i c'era !$device.mobile-->
  <card v-if="!isLoadingImages && !isLoadingVideos" :style="[
    isLarge
      ? {
        'max-width': '28rem',
        height: '29rem',
        'max-height': '43rem',
        'border-radius': '10px',
      }
      : {
        'max-width': '28rem',
        'max-sheight': '45rem',
        'border-radius': '10px',
      },
  ]" class="mx-2 postcardattivita attivita orange pb-5">
    <!--<img
        slot="image"
        class="card-img-top"
        src="@/assets/images/bg3.jpg"
        alt="Card image cap"
        style="border-radius: 10px"
      />-->

    <!-- <swiper
      ref="mySwiper"
      class="swiper"
      navigation
      :pagination="{ clickable: true }"
      style="background-color: hsl(17, 100%, 90%); border-radius: 10px"
    >
      <swiper-slide
        :style="[isLarge ? { height: '230px' } : { height: '199px' }]"
        v-if="item.media !== undefined && item.media.length !== 0"
      >
        <img :src="item['media'][0]['o:thumbnail_urls']['large']" class="img" />
      </swiper-slide>

      <swiper-slide
        :style="[isLarge ? { height: '230px' } : { height: '199px' }]"
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
              height: 100%;
              width: 100%;
              position: absolute;
              top: 0px;
              left: 0px;
              right: 0px;
              bottom: 0px;
              border-radius: 10px;
              margin-y: auto;
            "
            height="100%"
            width="100%"
          ></iframe>
        </div>
      </swiper-slide>

      <div
        v-if="
          item.media.length > 1 ||
          item.mediaYT.length > 1 ||
          (item.media.length === 1 && item.mediaYT.length === 1)
        "
        class="swiper-button-prev"
        slot="button-prev"
        @click="swiper.slidePrev()"
      ></div>
      <div
        v-if="
          item.media.length > 1 ||
          item.mediaYT.length > 1 ||
          (item.media.length === 1 && item.mediaYT.length === 1)
        "
        class="swiper-button-next"
        slot="button-next"
        @click="swiper.slideNext()"
      ></div>
    </swiper> -->

    <!--
    <carousel :per-page="1" :navigationEnabled="true">
      <slide
        style="height: 185px"
        v-if="item.media !== undefined && item.media.length !== 0"
      >
        <img :src="item['media'][0]['o:thumbnail_urls']['large']" class="img" />
      </slide>
      <slide
        style="height: 185px"
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
    </carousel>-->
    <div class="mt-3">
      <h5 class="card-title text-center">{{ item["o:title"] }}</h5>
      <div class="postcardattivita__bar margin-auto" style="display: inline-block"></div>

      <ul class="postcardattivita__tagbox mb-4">
        <li :class="
          selectedTab === 'Panoramica'
            ? 'tag__item__selected'
            : 'tag__item__unselected'
        " v-on:click="selectedTab = 'Panoramica'">
          Panoramica
        </li>
        <li :class="
          selectedTab === 'Descrizione'
            ? 'tag__item__selected'
            : 'tag__item__unselected'
        " v-on:click="selectedTab = 'Descrizione'">
          Descrizione
        </li>
        <li :class="
          selectedTab === 'Immagini'
            ? 'tag__item__selected'
            : 'tag__item__unselected'
        " v-on:click="selectedTab = 'Immagini'">
          Immagini
        </li>
        <li :class="
          selectedTab === 'Video'
            ? 'tag__item__selected'
            : 'tag__item__unselected'
        " v-on:click="selectedTab = 'Video'">
          Video
        </li>
      </ul>

      <div :class="{ 'text-justify ': !isMobile }">
        <div v-if="selectedTab === 'Panoramica'" class="col-12">
          <div class="text-left description col-12 text-black text mt-3" style="overflow: auto; ">
            <div>
              <div class="row mx-1 mb-2">
                <h6 class="mr-2">Difficoltà:</h6>
                <h6 class="font-weight-normal">
                  {{ item["geo:ha_difficolta"][0]["display_title"] }}
                </h6>
              </div>
              <div class="row mx-1 mb-2">
                <h6 class="mr-2">
                  Interessi:
                  <span class="font-weight-normal">{{
                      getInterestList(item["geo:ha_interesse"]).join(", ")
                  }}</span>
                </h6>
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
                  {{ item["geo:situato_in"][0]["display_title"].substring(6) }}
                  <!--In questo modo si rimuove il prefisso "PIVOT_"-->
                  <i class="bi bi-pin-map-fill mr-2"></i>
                </h6>
              </div>
              <div class="row mx-1">
                <h6 class="mr-2">Strumenti usati:</h6>
                <div v-if="item['geo:usa_strumento'] !== undefined">
                  <template v-for="(strumento, index) in item['geo:usa_strumento']" style="display: inline-block">
                    <h6 class="font-weight-normal" :key="index">
                      {{ strumento["display_title"] }}
                    </h6>
                    <template v-if="index < item['geo:usa_strumento'].length - 2">
                      <h6 class="font-weight-normal" :key="index">
                        ,
                      </h6>
                    </template>

                    <template v-if="index === item['geo:usa_strumento'].length - 2">
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
          </div>
        </div>
        <div v-else-if="selectedTab === 'Descrizione'" class="col-12">
          <div class="text-justify description col-12 text-black text mt-3" style="overflow: auto; ">
            <div>
              <b>{{ item["dcterms:description"][0]["@value"] }}</b>
            </div>
          </div>
        </div>
        <div v-else-if="selectedTab === 'Immagini'" class="col-12 text-center">
          <swiper v-if="item.media !== undefined && item.media.length !== 0" ref="mySwiper" class="swiper" navigation
            :pagination="{ clickable: true }" style="background-color: hsl(17, 100%, 90%); border-radius: 10px">
            <swiper-slide v-for="(media, index) in item.media" :key="index"
              :style="[isLarge ? { height: '230px' } : { height: '199px' }]">
              <img :src="media['o:thumbnail_urls']['large']" class="img" />
            </swiper-slide>

            <!-- <swiper-slide
              :style="[isLarge ? { height: '230px' } : { height: '199px' }]"
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
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    border-radius: 10px;
                    margin-y: auto;
                  "
                  height="100%"
                  width="100%"
                ></iframe>
              </div>
            </swiper-slide> -->

            <div v-if="item.media.length > 1" class="swiper-button-prev" slot="button-prev" @click="swiper.slidePrev()">
            </div>
            <div v-if="item.media.length > 1" class="swiper-button-next" slot="button-next" @click="swiper.slideNext()">
            </div>
          </swiper>

          <div v-if="item.media === undefined || item.media.length === 0" class="mt-3 text-black">
            Non sono presenti immagini
          </div>
        </div>
        <div v-else-if="selectedTab === 'Video'" class="col-12">
          <swiper v-if="item.mediaYT !== undefined && item.mediaYT.length !== 0" ref="mySwiper" class="swiper"
            navigation :pagination="{ clickable: true }"
            style="background-color: hsl(17, 100%, 90%); border-radius: 10px">
            <swiper-slide v-for="(media, index) in item.mediaYT" :key="index"
              :style="[isLarge ? { height: '230px' } : { height: '199px' }]">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" frameborder="0" :src="videoSource()" allowfullscreen style="
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
                    margin-y: auto;
                  " height="100%" width="100%"></iframe>
              </div>
            </swiper-slide>

            <div v-if="item.mediaYT.length > 1" class="swiper-button-prev" slot="button-prev"
              @click="swiper.slidePrev()"></div>
            <div v-if="item.mediaYT.length > 1" class="swiper-button-next" slot="button-next"
              @click="swiper.slideNext()"></div>
          </swiper>

          <div v-if="item.mediaYT === undefined || item.mediaYT.length === 0" class="mt-3 text-black">
            Non sono presenti video
          </div>
        </div>

        <!-- <tabs
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
            <div
              class="text-left description col-12 text-black text"
              :class="{ 'text-justify scrollbox': !isMobile }"
            >
              <div :class="{ 'scrollbox-content': !isMobile }">
                <div class="row mx-1 mb-2">
                  <h6 class="mr-2">Difficoltà:</h6>
                  <h6 class="font-weight-normal">
                    {{ item["geo:ha_difficolta"][0]["display_title"] }}
                  </h6>
                </div>
                <div class="row mx-1 mb-2">
                  <h6 class="mr-2">
                    Interessi:
                    <span class="font-weight-normal">{{
                      getInterestList(item["geo:ha_interesse"]).join(", ")
                    }}</span>
                  </h6>
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
                      item["geo:situato_in"][0]["display_title"].substring(6)
                    }}
                    <i class="bi bi-pin-map-fill mr-2"></i>
                  </h6>
                </div>
                <div class="row mx-1">
                  <h6 class="mr-2">Strumenti usati:</h6>
                  <div v-if="item['geo:usa_strumento'] !== undefined">
                    <template
                      v-for="(strumento, index) in item['geo:usa_strumento']"
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
                        v-if="index === item['geo:usa_strumento'].length - 2"
                      >
                        <h6 class="font-weight-normal" :key="index">e</h6>
                      </template>
                    </template>
                  </div>
                  <div v-else>
                    <h6 class="font-weight-normal">Nessuno</h6>
                  </div>
                </div>
              </div>
            </div>
          </tab-pane>

          <tab-pane>
            <span slot="label">
              <i class="now-ui-icons travel_info"></i>DESCRIZIONE
            </span>
            <div
              class="text-justify description col-12 text-black text"
              :class="{ scrollbox: !isMobile }"
            >
              <div :class="{ 'scrollbox-content': !isMobile }">
                <b>{{ item["dcterms:description"][0]["@value"] }}</b>
              </div>
            </div>
          </tab-pane>

          <tab-pane>
            <span slot="label">
              <i class="now-ui-icons design_image"></i>IMMAGINI
            </span>
            <div
              class="text-justify description col-12 text-black text"
              :class="{ scrollbox: !isMobile }"
            >
              <div :class="{ 'scrollbox-content': !isMobile }">
                <b>{{ item["dcterms:description"][0]["@value"] }}</b>
              </div>
            </div>
          </tab-pane>

          <tab-pane>
            <span slot="label">
              <i class="now-ui-icons media-1_button-play"></i>VIDEO
            </span>
            <div
              class="text-justify description col-12 text-black text"
              :class="{ scrollbox: !isMobile }"
            >
              <div :class="{ 'scrollbox-content': !isMobile }">
                <b>{{ item["dcterms:description"][0]["@value"] }}</b>
              </div>
            </div>
          </tab-pane>
        </tabs> -->
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

import { Carousel, Slide } from "vue-carousel";

import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { isMobile } from "mobile-device-detect";

const Common = require("@/Common.vue").default;

export default {
  name: "esperimento",
  props: ["item"],

  components: {
    // TabPane,
    // Tabs,
    Card,
    //Carousel,
    //Slide,
    Swiper,
    SwiperSlide,
  },

  directives: {
    swiper: directive,
  },

  data() {
    return {
      selectedTab: "Panoramica",
      windowWidth: 0,
      isLoadingImages: true,
      isLoadingVideos: true,
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      isMobile: false,
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
    getInterestList(list) {
      var newList = [];

      for (var i = 0; i < list.length; i++) {
        newList.push(list[i]["display_title"]);
      }

      return newList;
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
    this.isMobile = isMobile;
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
    console.log(isMobile);

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
  object-fit: cover;
  /* cover makes the image stretch the width and height of the container */
  border-radius: 10px;
}

.text {
  height: 13rem;
  overflow: scroll;
  /*text-overflow: ellipsis;*/
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>