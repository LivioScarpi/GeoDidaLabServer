<template>
  <div>
    <!--TODO: risolvere problema component youtube e CORS policy-->
    <!--prima nel v-i c'era !$device.mobile-->
    <div v-if="!isLoadingImages && !isLoadingVideos">
      <div class="col-11 ml-auto mr-auto pt-5" v-if="isLarge ">
        <div class="cardForm text-black p-2">
          <div class="card-body">
            <div class="row justify-content-center align-items-center">
              <div class="col-6">
                <div>
                  <h3 class="title text-left">{{ item["o:title"] }}</h3>
                  <h5 class="text-left">
                    <div class="row">
                      <div class="col-12">
                        <!--TODO: sistemare qua: l'oggetto non ha più l'attributo appartiene a ambito-->
                        <!--<b><i>{{ item["geo:appartiene_a_ambito"][0]["display_title"] }}</i></b>-->
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-12">
                        <b><i>Livelli di difficoltà:</i></b>
                        <div v-for="(difficulty, index) in item['geo:ha_difficolta']" v-bind:key="index">
                          <i>{{ difficulty["display_title"] }}</i>
                        </div>
                        <!--<b><i>{{ item["geo:Livello_scolastico"][0]["@value"] }}</i></b>-->
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
                      <img :src="item['media'][0]['o:thumbnail_urls']['large']" alt=""
                           class=" img-raised img_esperimento"/>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">

                    <div v-if="item.mediaYT.length !== 0">
                      <!--<youtube :video-id="this.getYoutubeVideoID" ref="youtube" @playing="playing"
                               width="100%"></youtube>-->

                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" frameborder="0" :src="videoSource()" allowfullscreen
                                style="padding-bottom:3%;"></iframe>
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
                <div class="row ">
                  <div class="col-12">
                    <h3 class="title pt-0 mt-2">{{ item["o:title"] }} </h3>
                    <h5>
                      <div class="row">
                        <div class="col-12">
                          <!--TODO: sistemare qua: l'oggetto non ha più l'attributo appartiene a ambito-->
                          <!--<b><i>{{ item["geo:appartiene_a_ambito"][0]["display_title"] }}</i></b>-->
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-12">
                          <b><i>Livelli di difficoltà:</i></b>
                          <div v-for="(difficulty, index) in item['geo:ha_difficolta']" v-bind:key="index">
                            <i>{{ difficulty["display_title"] }}</i>
                          </div>
                          <!--<b><i>{{ item["geo:Livello_scolastico"][0]["@value"] }}</i></b>-->
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
                      <img :src="item['media'][0]['o:thumbnail_urls']['large']" alt=""
                           class=" img-raised img_esperimento"/>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div v-if="item.mediaYT.length !== 0">
                      <!--<youtube :video-id="this.getYoutubeVideoID" ref="youtube" @playing="playing"
                               width="100%"></youtube>-->
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" frameborder="0" :src="videoSource()" allowfullscreen
                                style="padding-bottom:3%;"></iframe>
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
  </div>
</template>

<script>
import $ from "jquery";

const Common = require('@/Common.vue').default

export default {
  name: "esperimento",
  props: ['item'],

  data() {
    return {
      windowWidth: 0,
      isLoadingImages: true,
      isLoadingVideos: true,
    }
  },
  created() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });
  },

  methods: {

    playing() {
      console.log('\o/ we are watching!!!')
    },

    videoSource: function () {
      if (this.item['mediaYT'][0]['o:source'].includes("youtu.be/"))
        return "https://youtube.com/embed/" + this.item['mediaYT'][0]['o:source'].split("/").pop() + "?modestbranding=1&playsinline=1&rel=0"
      else
        return "https://youtube.com/embed/" + this.item['mediaYT'][0]['o:source'].split("/watch?v=").pop() + "?modestbranding=1&playsinline=1&rel=0"
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
    isLarge() {
      return this.windowWidth >= 768;
    },
    getYoutubeVideoID() {
      var url = this.item['mediaYT'][0]['o:source'];
      return url.substring(url.indexOf('=') + 1);
    }
  },

  mounted() {
    console.log("monto esperimeto: ");
    console.log(this.item);
    // console.log(this.$device);

    var self = this;

    Common.getElementImages(this, this.item, mediaList => {
      this.item.media = mediaList;
      self.isLoadingImages = false;
    });

    Common.getElementYTVideos(this, this.item, ytVideoList => {
      this.item.mediaYT = ytVideoList;
      self.isLoadingVideos = false;
    });
  }
}
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

</style>