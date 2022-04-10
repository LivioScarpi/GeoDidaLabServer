<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        :style="{ 'background-image': 'url(' + imageUrl + ')' }"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img :src="require('../assets/images/squared_logo.png')" alt="" />
        </div>
        <h3 class="title">CONTATTI</h3>
        <!--
        <p class="category">Photographer</p>
        <div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>Bookmarks</p>
          </div>
        </div>
        -->
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="button-container">
          <!--
          <a href="#button" class="btn btn-primary btn-round btn-lg">Follow</a>-->
          <!-- <a
            href="#button"
            class="btn twitter-color btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Follow me on Twitter"
          >
            <i class="fab fa-twitter"></i>
          </a> -->
          <a
            href="https://www.youtube.com/watch?v=ZO0cf8fyk40"
            class="btn youtube-color btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Follow me on Instagram"
          >
            <i class="fab fa-youtube"></i>
          </a>
          <a
            href="https://it-it.facebook.com/Geodidalab/"
            class="btn facebook-color btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Vieni a trovarci su facebook!"
          >
            <i class="fab fa-facebook"></i>
          </a>
        </div>
        <h3 class="title">Il Geodidalab</h3>
        <h5 class="description">
          Il GeoDidaLab è un laboratorio di educazione ambientale e ricerca
          didattica gestito dal Dipartimento di Scienze della Terra
          dell’Università di Torino che dal 2013 propone attività didattiche per
          le scuole di ogni ordine e grado, attività di formazione per gli
          insegnanti e promuove progetti di ricerca scientifica in ambito
          geologico-ambientale e didattico.
        </h5>
        <!-- <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <h4 class="title text-center">My Portfolio</h4>
          </div>
          <tabs
            pills
            class="nav-align-center"
            tab-content-classes="gallery"
            tab-nav-classes="nav-pills-just-icons"
            type="primary"
          >
            <tab-pane title="Profile">
              <i slot="label" class="now-ui-icons design_image"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg6.jpg" class="img-raised" />
                    <img src="img/bg11.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Home">
              <i slot="label" class="now-ui-icons location_world"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg1.jpg" alt="" class="img-raised" />
                    <img src="img/bg3.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Messages">
              <i slot="label" class="now-ui-icons sport_user-run"></i>

              <div class="col-md-10 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg3.jpg" alt="" class="img-raised" />
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                    <img src="img/bg6.jpg" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>
          </tabs>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    //Tabs,
    //TabPane,
  },

  data() {
    return {
      imageUrl: require("../assets/images/canoe-scaled.jpg.webp"),
    };
  },
};
</script>
<style>
.facebook-color {
  background-color: #3b5998 !important;
}

.facebook-color:hover {
  background-color: #6388d5 !important;
}

.youtube-color {
  background-color: #e65b43 !important;
}

.youtube-color:hover {
  background-color: #e87662 !important;
}

.twitter-color {
  background-color: #1da1f2 !important;
}

.twitter-color:hover {
  background-color: #6cb3e1 !important;
}

.instagram-color {
  background-color: #e1306c !important;
}

.instagram-color:hover {
  background-color: #ee7099 !important;
}
</style>
