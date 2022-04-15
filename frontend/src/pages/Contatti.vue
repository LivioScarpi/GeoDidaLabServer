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
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="button-container">
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
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
