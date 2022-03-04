<template>
  <div>
    <div class="section p-4">
      <div class="container">
        <h2 class="title">Strumenti</h2>
        <div class="row">
          <h5 class="description">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </h5>
        </div>
        <div class="row pb-4">
          <div class="col-12">
          <div v-if="allLoaded">
            <div v-if="isLarge">
              <div class="row">
                <div class="section">
                  <div class="row justify-content-md-center">
                    <div v-for="(item, index) in this.$store.state.strumenti" :key="index">
                      <div class="cardForm text-black p-2">
                        <div class="card-body">
                          <strumento :item="item"></strumento>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row">
                <div v-for="(item, index) in this.$store.state.strumenti" :key="index">
                  <div class="cardForm text-black p-2">
                    <div class="card-body">
                      <strumentoMobile :item="item"></strumentoMobile>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="loader">
            <svg class="circular">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5"
                      stroke-miterlimit="10"></circle>
            </svg>
          </div>
        </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
//width: small < 768 px

import {Tabs, TabPane} from '@/components';
import strumento from "../components/customComponents/strumento";
import strumentoMobile from "../components/customComponents/strumentoMobile";
import $ from 'jquery'
import store from "../store";

const Common = require('@/Common.vue').default


export default {
  name: 'strumenti',
  bodyClass: 'strumenti-esperimenti-page',
  components: {
    strumento,
    strumentoMobile
  },
  data() {
    return {
      strumenti: [
        {name: "Microscopio", description: 'Descrizione strumento', imgSrc: '/img/microscopio.jpg'},
        {name: "Retino plancton", description: 'Descrizione strumento', imgSrc: '/img/retinoPlancton.jpg'},
        {
          name: "Sonda multiparametrica",
          description: 'Descrizione strumento',
          imgSrc: '/img/sondaMultiparametrica.jpg'
        },
      ],
      windowWidth: 0,
      allLoaded: false,

    }
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

    Common.getElemsByClass(this, 123, res => {
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
    })

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

  mounted(){
  },

  computed: {
    isLarge() {
      return this.windowWidth >= 768;
    },
  }
};
</script>
<style></style>
