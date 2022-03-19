<template>
  <!--
  <div v-if="!isLoadingImages">
    <div class="col-10 ml-auto mr-auto">
      <div class="row justify-content-center align-items-center">
        <div class="col-6">
          <div>
            <h3 class="title text-left">{{ item["o:title"] }}</h3>
            <h5 class="description text-left">
              <b>{{ item["dcterms:description"][0]["@value"] }}</b>
            </h5>
          </div>
        </div>
        <div class="col-6">
          <img :src="item['media'][0]['o:thumbnail_urls']['large']" alt="" class="img-raised img_strumento"/>
        </div>
      </div>
    </div>
  </div>-->

  <card
    v-if="!isLoadingImages"
    style="width: 28rem; border-radius: 10px"
    class="mx-2"
  >
    <!--
    <img
      slot="image"
      class="img"
      :src="item['media'][0]['o:thumbnail_urls']['large']"
      alt="Card image cap"
      style="border-radius: 10px"
    />-->

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
            <div class="text-justify description col-12 text-black">
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
    };
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
</style>
