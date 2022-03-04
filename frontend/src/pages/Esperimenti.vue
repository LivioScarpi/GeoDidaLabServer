<template>
  <div>
    <div class="section">
      <div class="container">
        <h2 class="title pt-0">Esperimenti</h2>
        <h5 class="description mb-0">
          An artist of considerable range, Ryan — the name taken by
          Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
          records all of his own music, giving it a warm, intimate feel with a
          solid groove structure. An artist of considerable range.
        </h5>
        <div v-if="allLoaded">
          <div class="row">
            <div class="section">
              <div class="row justify-content-md-center">
                <div>
                  <div v-for="item in this.$store.state.esperimenti" :key="item.name">
                    <esperimento :item="item"></esperimento>
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
import {Tabs, TabPane} from '@/components';
import esperimento from "../components/customComponents/esperimento";
import store from "../store";
import $ from "jquery";

const Common = require('@/Common.vue').default

export default {
  name: 'esperimenti',
  bodyClass: 'strumenti-esperimenti-page',
  components: {
    esperimento
  },
  data() {
    return {
      esperimenti: [
        {
          name: "Campionamento del plancton con retino",
          scientific_sector: "Settore Scientifico",
          school_level: "Livello Scolastico",
          description: 'Descrizione strumento',
          imgSrc: '/img/microscopio.jpg',
          videoID: 'orGM15hwA5A'
        },
        {
          name: "Misura della trasparenza dell’acqua con disco di Secchi",
          scientific_sector: "Settore Scientifico",
          school_level: "Livello Scolastico",
          description: 'Descrizione strumento',
          imgSrc: '/img/microscopio.jpg',
          videoID: 'orGM15hwA5A'
        },
        {
          name: "Test K sui licheni ",
          scientific_sector: "Settore Scientifico",
          school_level: "Livello Scolastico",
          description: 'Descrizione strumento',
          imgSrc: '/img/microscopio.jpg',
          videoID: 'orGM15hwA5A'
        },
      ],
      isLoadingImages: true,
      isLoadingVideos: true,
      allLoaded: false,
    }
  },

  mounted(){
    console.log("Esperimenti: ");
    console.log(store.state.esperimenti);
  },

  created() {
    // eseguo la query per gli esperimenti solo la prima volta che apro la pagina degli Esperimenti

    /**
     * 118 : class id Misurazione
     * 130 : class id Attivita
     */

    var self = this;

    Common.getElemsByClass(this, 130, res => {
      store.state.esperimenti = res.body;
      self.allLoaded = true;
    })
  },

  computed: {
  },

  watch: {

  }
};
</script>
<style></style>
