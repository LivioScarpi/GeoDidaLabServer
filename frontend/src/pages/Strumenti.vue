<template>
  <div>
    <div class="section text-black pt-3">
      <div class="container">
        <h2 class="title pt-0">STRUMENTI</h2>
        <div class="row">
          <h5 class="description mb-0">Elenco di strumenti usati al GeoDidaLab!</h5>
        </div>
      </div>
      <div class="mt-4" v-if="allLoaded">
        <div class="row text-center">
          <div class="col-12">
            <strumento
              v-for="(item, index) in this.$store.state.strumenti"
              :key="index"
              :item="item"
            ></strumento>
          </div>
        </div>
      </div>
      <div v-else class="loader">
        <svg class="circular">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="5"
            stroke-miterlimit="10"
          ></circle>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
//width: small < 768 px

import { Tabs, TabPane } from "@/components";
import strumento from "../components/customComponents/strumento";
import strumentoMobile from "../components/customComponents/strumentoMobile";
import $ from "jquery";
import store from "../store";

const Common = require("@/Common.vue").default;

export default {
  name: "strumenti",
  bodyClass: "strumenti-esperimenti-page",
  components: {
    strumento,
    //strumentoMobile
  },
  data() {
    return {
      strumenti: [
        {
          name: "Microscopio",
          description: "Descrizione strumento",
          imgSrc: "/img/microscopio.jpg",
        },
        {
          name: "Retino plancton",
          description: "Descrizione strumento",
          imgSrc: "/img/retinoPlancton.jpg",
        },
        {
          name: "Sonda multiparametrica",
          description: "Descrizione strumento",
          imgSrc: "/img/sondaMultiparametrica.jpg",
        },
      ],
      windowWidth: 0,
      allLoaded: false,
    };
  },

  beforeMount() {
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });

    // eseguo la query per gli strumenti solo la prima volta che apro la pagina degli Strumenti

    /**
     * 123 : class id Strumento
     */

    var self = this;

    Common.getElemsByClass(this, 123, (res) => {
      store.state.strumenti = res.body;
      self.allLoaded = true;

      /*
      Array.prototype.forEach.call(store.state.strumenti, i => {
        i.media = [];

        Common.getElementImages(this, i, mediaList => {
          i.media = mediaList;


        });
      })

       */
    });

    /*
    if (store.state.strumenti.length === 0) {
      console.log("faccio la query");
      $.get('https://dev.geodidalab.unito.it/api/items?fulltext_search=&property[0][type]=eq&resource_class_id[]=123',
          {}, (data) => {
            store.state.strumenti = data;
            console.log(store.state.strumenti);

            Array.prototype.forEach.call(store.state.strumenti, i => {
              console.log(i["o:media"][0]["@id"]);

              i.media = [];

              Array.prototype.forEach.call(i["o:media"], media => {

                $.get(media["@id"],
                    {}, (data) => {
                      i.media.push(data);
                      console.log(i.media);

                    }).always(() => {
                });


              })

            })

          }).always(() => {
      });


    }

     */
  },

  mounted() {},

  computed: {
    isLarge() {
      return this.windowWidth >= 768;
    },
  },
};
</script>
<style>
</style>
