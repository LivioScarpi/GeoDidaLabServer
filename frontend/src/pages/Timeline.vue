<template>
  <div class="page-header-custom clear-filter" filter-color="white">
    <div v-if="!isLoadingTimelines && !isLoadingEvents" class="content text-black">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="title">{{ this.$store.getters.timelines[0]["o:title"] }}</h2>
            <h3 class="text-black">{{ this.$store.getters.timelines[0]["geo:Titolo_it"][0]["@value"] }}</h3>
            <h5 class="description">{{ this.$store.getters.timelines[0]["dcterms:description"][0]["@value"] }}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div v-if="timelinesReady" class="timeline">
              <Timeline
                  :timeline-items="this.correctTimelines[0]"
                  :message-when-no-items="messageWhenNoItems"
                  :unique-year="true"
                  :show-day-and-month="false"
                  order="desc"
              />
            </div>
            <div v-else class="loader">
              <svg class="circular">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5"
                        stroke-miterlimit="10"></circle>
              </svg>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div id="first-section1">
              <div class="container">
                <div class="row">
                  <div class="triangle"></div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <section id="cd-timeline" class="cd-container">
                      <div class="cd-timeline-block">
                        <div class="cd-timeline-img cd-picture">
                          <img src="../assets/images/timeline/first-icon.png" alt="Picture">
                        </div>

                        <div class="cd-timeline-content service-box-content">
                          <h2>AAA Free Web Template</h2>
                          <p>Timeline is free responsive template by <span class="blue">template</span><span class="green">mo</span>. This layout is based on Bootstrap v3.1.1 and you may use this template for any website. Credit goes to <a rel="nofollow" href="http://unsplash.com">Unsplash</a> for all images.</p>
                        </div>
                      </div>

                      <div class="cd-timeline-block">
                        <div class="cd-timeline-img cd-movie">
                          <img src="../assets/images/timeline/second-icon.png" alt="Picture">
                        </div>

                        <div class="cd-timeline-content service-box-content">
                          <h2>Top Icons</h2>
                          <p>You can easily <strong>change top icons</strong> by looking at guidelines from <a rel="nofollow" href="http://fontawesome.info/font-awesome-icon-world-map/">Font Awesome</a>. Example: <strong>&lt;i class=&quot;fa fa-camera&quot;&gt;&lt;/i&gt;</strong></p>
                        </div>
                      </div>

                      <div class="cd-timeline-block">
                        <div class="cd-timeline-img cd-icon">
                          <img src="../assets/images/timeline/third-icon.png" alt="Picture">
                        </div>

                        <div class="cd-timeline-content service-box-content">
                          <h2>Responsive Design</h2>
                          <p>Vestibulum ante ipsum priminisieru in faucibus orci luctus et ultrices posuere cubilia Curae unserd Etiam nisl dui, commodo sit amet eget, vel turpis. Suspendisse at est purus.</p>
                        </div>
                      </div>

                      <div class="cd-timeline-block">
                        <div class="cd-timeline-img cd-location">
                          <img src="../assets/images/timeline/fourth-icon.png" alt="Picture">
                        </div>

                        <div class="cd-timeline-content service-box-content">
                          <h2>Communication</h2>
                          <p>Phasellus lobortis vitae ipsum vitae luctus. Proin sodales mi a arcu iaculis, in dapibus nunc sodales. Maecenas auctor vel eros a dapibus.</p>
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
    <!--<iframe style="display:block; width:100%; height:100vh;" seamless frameborder="0" scrolling="yes"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSIXLqLm6L5PbmO0b6Y5dNEPUoN9UpKx3rW-MWvUDjHzr14ytcqDg_H_2ZZhve2isAaVxMAEekby0QE/pubchart?oid=1795973304&amp;format=interactive"></iframe>-->
  </div>
</template>
<script>
import {FormGroupInput} from '@/components';
import Timeline from 'timeline-vuejs'
import store from "../store";
import Vuex from "vuex";

const Common = require('@/Common.vue').default

export default {
  name: 'timeline-page',
  bodyClass: 'timeline-page',
  components: {
    Timeline,
    [FormGroupInput.name]: FormGroupInput
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
          description:
              `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.`,
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
    }
  },

  beforeMount() {
    // eseguo la query per gli esperimenti solo la prima volta che apro la pagina degli Esperimenti

    /**
     * 124 : class id Timelines
     * 127: class id Eventi timeline
     */

    var self = this;

    Common.getElemsByClass(this, 124, res => {
      store.state.timelines = res.body;
      self.isLoadingTimelines = false;
    })

    Common.getElemsByClass(this, 127, res => {
      store.state.events = res.body;

      Array.prototype.forEach.call(store.state.events, i => {
        i.media = [];

        Common.getElementImages(this, i, mediaList => {
          i.media = mediaList;
          this.isLoadingEvents = false;

          store.commit('setTimelines');
          this.correctTimelines = this.getCorrectTimelines();
        });
      })
    })
  },

  mounted() {
  },

  computed: {
    ...Vuex.mapGetters([]),

    /*correctTimelines() {
      var timelines = [...Array(store.getters.timelinesWithEvents.length)].map(x => 0);

      Array.prototype.forEach.call(store.getters.timelinesWithEvents, (i, index) => {

        var timeline = [];

        Array.prototype.forEach.call(i.events, event => {

          console.log("EVENTO CORRENTE:");
          console.log(event);

          const [day, month, year] = event["geo:Data"][0]["@value"].split('/');
          var description;

          console.log("MEDIA IMAGES");
          console.log(event.media);

          if (event["media"].length > 0) {
            var imageUrl = event["media"][0]['o:thumbnail_urls']['large'];
            console.log(imageUrl);
            description = `<img src="` + imageUrl + `"/>` + event["geo:Descrizione_estesa_it"][0]["@value"]
          } else {
            console.log("NON CE NE SONO");

            description = event["geo:Descrizione_estesa_it"][0]["@value"]
          }

          var e = {
            from: new Date(year, month, day),
            title: event["geo:Titolo_it"][0]["@value"],
            showDayAndMonth: true,
            description: description,
          };

          timeline.push(e);
        });

        timelines[index] = timeline;
      })

      this.setTimelinesReady();

      console.log(timelines);

      return timelines;
    }

     */
  },

  methods: {
    getCorrectTimelines() {
      var timelines = [...Array(store.state.timelines.length)].map(x => 0);

      Array.prototype.forEach.call(store.state.timelines, (i, index) => {

        var timeline = [];

        Array.prototype.forEach.call(i.events, event => {

          //TODO: remove me
          //console.log("EVENTO CORRENTE:");
          //console.log(event);

          var date;

          if(event["geo:Data"][0]["@value"].length === 4) {
            date = new Date(event["geo:Data"][0]["@value"])
          } else if(event["geo:Data"][0]["@value"].length > 4) {
            const [day, month, year] = event["geo:Data"][0]["@value"].split('/');
            date = new Date(year, month, day)
          }

          var description;

          //TODO: remove me
          //console.log("MEDIA IMAGES");
          //console.log(event.media);

          if (event["media"] !== undefined && event["media"].length > 0) {
            var imageUrl = event["media"][0]['o:thumbnail_urls']['large'];
            description = `<img src="` + imageUrl + `"/>` + event["dcterms:description"][0]["@value"]
          } else {
            description = event["dcterms:description"][0]["@value"]
          }

          var e = {
            from: date,
            title: event["geo:Titolo_it"][0]["@value"],
            showDayAndMonth: true,
            description: description,
          };

          timeline.push(e);
        });

        timelines[index] = timeline;
      })

      this.timelinesReady = true;

      return timelines;
    }
  }
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
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  align-items: center;
  text-align: center;
}

/*Progress Bar circolare indeterminata -> usata nel modello D*/
.loader{
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.date-item{
  visibility: hidden;
}



/*TODO: da qua*/


</style>
