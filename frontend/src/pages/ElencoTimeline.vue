<template>
  <div class="page-header-custom clear-filter" filter-color="white">
    {{this.timelines.length}}
    {{isLoadingTimelines}}
    <div v-if="!isLoadingTimelines && !isLoadingEvents" class="content text-black pt-3">
      <div class="centerTimePicker text-center pt-4 px-lg-5">
        <div v-if="this.timelines.length > 1">
          <div v-for="(timeline, index) in this.timelines" :key="index" class="row mx-lg-5">
            <div class="col-12">
            <div class="postcardpercorsi light orange mx-4">
              <div class="postcardpercorsi__text pt-3 mt-4">
                <div style="height: 100%">
                  <h1 class="postcardpercorsi__title orange">
                    {{timeline["geo:Titolo_it"][0]["@value"]}}
                  </h1>

                  <div class="postcardpercorsi__bar" style="height: 4px"></div>
                  <div class="postcardpercorsi__preview-txt">
                    {{timeline["dcterms:description"][0]["@value"]}}
                  </div>
                  <div :class="{ 'text-left mt-5': isLarge, 'text-center': !isLarge }">
                    <Button size="small" type="primary" v-on:click="moreInfoTimeline(index)"
                      class="textButtonColor mt-5">Ulteriori informazioni
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            </div>

          </div>
        </div>
        <div v-else>
          <div class="row mb-4 mx-3">
            <div class="col-12">
              <h2 class="title">
                {{ this.$store.getters.timelines[0]["o:title"] }}
              </h2>
              <h3 class="text-black">
                {{
                this.$store.getters.timelines[0]["geo:Titolo_it"][0]["@value"]
                }}
              </h3>
              <h4 class="description">
                <b>
                  {{
                  this.$store.getters.timelines[0]["dcterms:description"][0][
                  "@value"
                  ]
                  }}</b>
              </h4>
            </div>
          </div>

          <div class="row" style="z-index: 299;">
            <div class="col-12">
              <div id="first-section1">
                <div class="container">
                  <div class="row">
                    <div class="triangle"></div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <section id="cd-timeline" class="cd-container">
                        <div v-for="(event, index) in correctTimelines[0]" :key="index" class="cd-timeline-block">
                          <div class="cd-timeline-img cd-picture">
                            <i class="fa-solid fa-calendar-clock"></i>
                          </div>

                          <div class="
                            cd-timeline-content
                            service-box-content
                            
                            pt-0
                            px-0
                          ">
                            <div class="row postcardpercorsi                             timeline
                            orange" style="overflow: hidden">
                              <div class="col-12">
                                <div v-if="event.image !== null" class="row mb-4">
                                  <div class="col-12 px-0">
                                    <a class="postcardpercorsi__img_link">
                                      <img :src="event.image" style="width: 100%" alt="Picture" class="
                                        postcardtimeline__img
                                        px-0 mx-0
                                        rounded-top
                                      " />
                                    </a>
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-12 mb-3" style="text-align: center">
                                    <h3 class="mb-1">{{ event.year }}</h3>
                                    <div class="postcardtimeline__bar margin-auto" style=" display: inline-block;">
                                    </div>

                                    <h2 class="mb-1">{{ event.title }}</h2>
                                    <p class="px-4">
                                      {{ event.description }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



    </div>
    <!--<iframe style="display:block; width:100%; height:100vh;" seamless frameborder="0" scrolling="yes"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSIXLqLm6L5PbmO0b6Y5dNEPUoN9UpKx3rW-MWvUDjHzr14ytcqDg_H_2ZZhve2isAaVxMAEekby0QE/pubchart?oid=1795973304&amp;format=interactive"></iframe>-->
  </div>
</template>
<script>
import Timeline from "timeline-vuejs";
import store from "../store";
import Vuex from "vuex";
import { Button } from "element-ui";
import router from "../router";
import $ from "jquery";

import {
  Checkbox,
  Collapse,
  CollapseItem,
  Radio,
  Card,
  Modal,
  FormGroupInput,
} from "@/components";

const Common = require("@/Common.vue").default;

export default {
  name: "elencotimeline-page",
  bodyClass: "timeline-page",
  components: {
    //Timeline,
    [FormGroupInput.name]: FormGroupInput,
    Button
  },

  data() {
    return {
      messageWhenNoItems: "There aren't events",
      dataTimeline: [
        {
          from: new Date(2017, 5, 22),
          title: "Name",
          showDayAndMonth: true,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.",
        },
        {
          from: new Date(2017, 8, 12),
          title: "Name",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.`,
        },
        {
          from: new Date(2018, 7, 19),
          title: "Name",
          showDayAndMonth: true,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.`,
        },
      ],

      isLoadingTimelines: true,
      isLoadingEvents: true,
      timelinesReady: false,

      correctTimelines: null,

      timelines: null,

      windowWidth: 0,

    };

  },

  beforeMount() {
    // eseguo la query per gli esperimenti solo la prima volta che apro la pagina degli Esperimenti

    /**
     * 124 : class id Timelines
     * 127: class id Eventi timeline
     */

    var self = this;

    Common.getElemsByClass(this, 124, (res) => {
      store.state.timelines = res.body;
      
    });

    Common.getElemsByClass(this, 127, (res) => {
      store.state.events = res.body;

      Array.prototype.forEach.call(store.state.events, (i) => {
        i.media = [];

        Common.getElementImages(this, i, (mediaList) => {
          i.media = mediaList;

          store.commit("setTimelines");
          this.correctTimelines = this.getCorrectTimelines();

          console.log("TIMELINES");
          console.log(this.correctTimelines);

          //ordine decrescente: in cima avrò l'evento meno recente
          this.correctTimelines[0].sort((a, b) =>
            a.year > b.year ? 1 : b.year > a.year ? -1 : 0
          );

          this.isLoadingEvents = false;

          //ordine crescente: in cima avrò l'evento più recente
          //this.correctTimelines[0].sort((a,b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0))
        });
      });
    });

    this.timelines = store.state.timelines;
    console.log("STO STAMPANDO QUA");
    console.log(this.timelines);

    //TODO: SOLO PER TESTARE L'ELENCO -> decommentare questa riga se si vuole avere l'elenco di più timeline
    //this.timelines.push(this.timelines[0])

    self.isLoadingTimelines = false;
  },

  mounted() {
    console.log("TIMELINE");
    console.log(this.correctTimelines);
  },

  created(){
    this.windowWidth = $(window).width();

    $(window).resize(() => {
      this.windowWidth = $(window).width();
    });
  },

  computed: {
    ...Vuex.mapGetters([]),

    isLarge() {
      return this.windowWidth >= 768;
    },
  },

  methods: {
    getCorrectTimelines() {
      var timelines = [...Array(store.state.timelines.length)].map((x) => 0);

      Array.prototype.forEach.call(store.state.timelines, (i, index) => {
        var timeline = [];

        Array.prototype.forEach.call(i.events, (event) => {
          var date;

          if (event["geo:Data"][0]["@value"].length === 4) {
            date = new Date(event["geo:Data"][0]["@value"]);
          } else if (event["geo:Data"][0]["@value"].length > 4) {
            const [day, month, year] =
              event["geo:Data"][0]["@value"].split("/");
            date = new Date(year, month, day);
          }

          var description = event["dcterms:description"][0]["@value"];

          var e = {
            from: date,
            year: date.getFullYear(),
            title: event["geo:Titolo_it"][0]["@value"],
            showDayAndMonth: true,
            description: description,
          };

          if (event["media"] !== undefined && event["media"].length > 0) {
            e.image = event["media"][0]["o:thumbnail_urls"]["large"];
            event.image = event["media"][0]["o:thumbnail_urls"]["large"];
          } else {
            e.image = null;
            event.image = null;
          }

          timeline.push(e);
        });

        timelines[index] = timeline;
      });

      this.timelinesReady = true;

      return timelines;
    },

    moreInfoTimeline(index) {
      console.log("PASSO IL VALORE: " + index);
      router.push({
        name: "timeline",
        params: {
          index,
        },
      });
    }
  },
};
</script>
<style>
.timeline {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.page-header-custom {
  min-height: 100%;
  padding: 0;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  align-items: center;
  text-align: center;
}

/*Progress Bar circolare indeterminata -> usata nel modello D*/
.loader {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.date-item {
  visibility: hidden;
}

</style>
