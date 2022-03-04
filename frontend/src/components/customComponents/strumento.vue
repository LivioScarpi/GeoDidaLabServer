<template>
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
  </div>
</template>

<script>

const Common = require('@/Common.vue').default

export default {
  name: "strumento",
  props: ['item'],

  data() {
    return {
      isLoadingImages: true,
    }
  },

  mounted() {
    var self = this;

    Common.getElementImages(this, this.item, mediaList => {
      this.item.media = mediaList;
      self.isLoadingImages = false;
    });
  }
}


</script>

<style scoped>

.img_strumento {
  float: left;
  width: 100%;
  object-fit: cover;
}


</style>