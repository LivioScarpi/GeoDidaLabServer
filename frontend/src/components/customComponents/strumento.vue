<template>
  <card v-if="!isLoadingImages" :style="[
    isLarge
      ? {
        'max-width': '28rem',
        height: '27rem',
        'max-height': '34rem',
        'border-radius': '10px',
      }
      : {
        'max-width': '28rem',
        'max-sheight': '45rem',
        'border-radius': '10px',
      },
  ]" class="mx-2 postcardattivita attivita orange pb-5">
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
        <!-- <li
            :class="
              selectedTab === 'Video'
                ? 'tag__item__selected'
                : 'tag__item__unselected'
            "
            v-on:click="selectedTab = 'Video'"
          >
            Video
          </li> -->
      </ul>

      <div :class="{ 'text-justify ': !isMobile }">


        <div v-if="selectedTab === 'Panoramica'" class="col-12">
          <div class="text-left description col-12 text-black text mt-3" style="overflow: auto">
            <div>
              <div class="row mx-1 mb-2">
                <h6 class="mr-2">Situato in:</h6>
                <h6 class="font-weight-normal">
                  {{ item["geo:situato_in"][0]["display_title"].substring(6) }}
                  <!--In questo modo si rimuove il prefisso "PIVOT_"-->
                  <i class="bi bi-pin-map-fill mr-2"></i>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="selectedTab === 'Descrizione'" class="col-12">
          <!-- <div class="text-justify description col-12 text-black text mt-3" style="overflow: auto">
            <div>
              <b>{{ item["dcterms:description"][0]["@value"] }}</b>
            </div>
          </div> -->

          <div class="text-justify description col-12 text-black text mt-3" style="overflow: auto">
            <div>
              <div class="row mx-1 mb-2">
                <b>
                  {{ item["dcterms:description"][0]["@value"] }}
                </b>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'Immagini'" class="col-12 text-center">
          <swiper v-if="item.media !== undefined && item.media.length !== 0" ref="mySwiperStrumenti" class="swiper"
            navigation :pagination="{ clickable: true }"
            style="background-color: hsl(17, 100%, 90%); border-radius: 10px">
            <swiper-slide style="height: 185px" v-for="(media, index) in item['media']" :key="index">
              <img :src="media['o:thumbnail_urls']['large']" class="img" />
            </swiper-slide>

            <div v-if="
              item.media.length > 1 ||
              item.mediaYT.length > 1 ||
              (item.media.length === 1 && item.mediaYT.length === 1)
            " class="swiper-button-prev" slot="button-prev" @click="swiper.slidePrev()"></div>
            <div v-if="item.media.length > 1" class="swiper-button-next" slot="button-next" @click="swiper.slideNext()">
            </div>
          </swiper>

          <div v-if="item.media === undefined || item.media.length === 0" class="mt-3 text-black">
            Non sono presenti immagini
          </div>
        </div>
        <!-- <div v-else-if="selectedTab === 'Video'" class="col-12">
          <swiper
            v-if="item.mediaYT !== undefined && item.mediaYT.length !== 0"
            ref="mySwiper"
            class="swiper"
            navigation
            :pagination="{ clickable: true }"
            style="background-color: hsl(17, 100%, 90%); border-radius: 10px"
          >
            <swiper-slide
              v-for="(media, index) in item.mediaYT"
              :key="index"
              :style="[isLarge ? { height: '210px' } : { height: '145px' }]">
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
              v-if="item.mediaYT.length > 1"
              class="swiper-button-prev"
              slot="button-prev"
              @click="swiper.slidePrev()"
            ></div>
            <div
              v-if="item.mediaYT.length > 1"
              class="swiper-button-next"
              slot="button-next"
              @click="swiper.slideNext()"
            ></div>
          </swiper>

          <div
            v-if="item.mediaYT === undefined || item.mediaYT.length === 0"
            class="mt-3 text-black"
          >
            Non sono presenti video
          </div>
        </div> 
      </div>-->
      </div>
    </div>
  </card>
</template>

<script>
import TabPane from "../Tabs/Tab.vue";
import Tabs from "../Tabs/Tabs.vue";
import Card from "../Cards/Card.vue";
import $ from "jquery";

import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

const Common = require("@/Common.vue").default;

export default {
  name: "strumento",
  props: ["item"],

  components: {
    //TabPane,
    //Tabs,
    Card,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      selectedTab: "Panoramica",
      isLoadingImages: true,
      windowWidth: 0,
    };
  },

  created() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });

    console.log("WIDTH: " + this.windowWidth);
  },

  mounted() {
    var self = this;

    Common.getElementImages(this, this.item, (mediaList) => {
      this.item.media = mediaList;
      self.isLoadingImages = false;
    });
  },

  computed: {
    swiper() {
      return this.$refs.mySwiperStrumenti.$swiper;
    },
    isLarge() {
      return this.windowWidth >= 768;
    },
  },
};
</script>

<style scoped>
.img_strumento {
  float: left;
  width: 100%;
  object-fit: cover;
}

.img {
  align-items: center;
  height: 100%;
  object-fit: cover;
  /* cover makes the image stretch the width and height of the container */
  border-radius: 10px;
}

.text {
  overflow: scroll;
  /*text-overflow: ellipsis;*/
  display: -webkit-box;
  -webkit-line-clamp: 4;
  /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
