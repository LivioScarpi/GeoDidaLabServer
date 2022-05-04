<template>
  <card
    v-if="!isLoadingImages"
    :style="[
      isLarge
        ? {
            'max-width': '28rem',
            height: '32rem',
            'max-height': '32rem',
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
    <swiper
      ref="mySwiperStrumenti"
      class="swiper"
      navigation
      :pagination="{ clickable: true }"
      style="background-color: hsl(17, 100%, 90%); border-radius: 10px"
      v-if="item.media !== undefined && item.media.length !== 0"
    >
      <swiper-slide
        style="height: 185px"
        v-for="(media, index) in item['media']"
        :key="index"
      >
        <img :src="media['o:thumbnail_urls']['large']" class="img" />
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
        v-if="item.media.length > 1"
        class="swiper-button-next"
        slot="button-next"
        @click="swiper.slideNext()"
      ></div>
    </swiper>

    <div class="mt-3">
      <h5 class="card-title text-center">{{ item["o:title"] }}</h5>
      <div
        class="postcardattivita__bar margin-auto"
        style="display: inline-block"
      ></div>
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
            <div class="text-justify description col-12 text-black">
              <div class="row mx-1 mb-2">
                <h6 class="mr-2">Situato in:</h6>
                <h6 class="font-weight-normal">
                  {{ item["geo:situato_in"][0]["display_title"].substring(6) }}
                  <!--In questo modo si rimuove il prefisso "PIVOT_"-->
                  <i class="bi bi-pin-map-fill mr-2"></i>
                </h6>
              </div>
            </div>
          </tab-pane>

          <tab-pane>
            <span slot="label">
              <i class="now-ui-icons travel_info"></i>DESCRIZIONE
            </span>
            <div class="text-justify description col-12 text-blacl text">
              <b>{{ item["dcterms:description"][0]["@value"] }}</b>
            </div>
          </tab-pane>
        </tabs>
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
    TabPane,
    Tabs,
    Card,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
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
  object-fit: cover; /* cover makes the image stretch the width and height of the container */
  border-radius: 10px;
}

.text {
  overflow: scroll;
  /*text-overflow: ellipsis;*/
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
