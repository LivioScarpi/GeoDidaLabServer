<template>
  <div>
    <div
      v-for="(it, index) in $store.state.activitiesSelectedList"
      :key="'activitiesSelectedList' + (index + 200)"
    >
      <div
        class="row border mr-1 mb-3 postcard orange"
        style="border-radius: 10px"
      >
        <div
          class="col-2 text-center px-0"
          style="
            background-color: indianred;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            cursor: pointer;

            display: flex;

            justify-content: center;
            align-items: center;
          "
          @click="
            !it.isVisit
              ? changeSelection(it['geo:Titolo_it'][0]['@value'], it['o:title'])
              : changeSelectionVisitPOI(it['geo:Titolo_it'][0]['@value'])
          "
        >
          <i class="bi bi-trash" style="color: white; font-size: 1.2rem"></i>
        </div>
        <div class="col-10 text-left py-2">
          <div class="row">
            <div class="col-12">
              <b>{{ it["o:title"].toUpperCase() }}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <i class="bi bi-pin-map-fill mr-2"></i
              >{{ it["geo:Titolo_it"][0]["@value"] }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <i class="bi bi-map mr-2"></i>
              {{ it["geo:appartiene_a_area"][0]["display_title"] }}
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <i class="bi bi-clock mr-2"></i
              >{{ it["geo:Durata"][0]["@value"] }} minuti
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "elencoAttivitaSelezionate",

  components: {},

  data() {
    return {};
  },
  created() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });
  },

  methods: {
    changeSelection(poiName, activity) {
      this.$emit("changeSelection", poiName, activity);
    },

    changeSelectionVisitPOI(poiName) {
      this.$emit("changeSelectionVisitPOI", poiName);
    },
  },
  computed: {},

  mounted() {},
};
</script>

<style scoped>
</style>