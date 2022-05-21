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
          <a
            href="https://api.whatsapp.com/send?phone=393332923953&app=facebook&entry_point=page_cta"
            class="btn whatsapp-color btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Scrivici su whatsapp!"
          >
            <i class="fab fa-whatsapp"></i>
          </a>
          <a
            href="mailto: info@geodidalab.it"
            class="btn mail-color btn-round btn-lg btn-icon"
            rel="tooltip"
            title="Scrivici via mail!"
          >
            <i class="fab fa fa-envelope mt-0 pt-0"></i>
          </a>
        </div>
        <h3 class="title">Puoi contattarci nei seguenti modi</h3>
        <h5 class="text-center"><i class="bi bi-telephone-fill"></i> 333 292 3953</h5>
        <h5 class="text-center"><i class="fab fa-whatsapp"></i><a
            href="https://api.whatsapp.com/send?phone=393332923953&app=facebook&entry_point=page_cta"
          > +39 333 292 3953</a></h5>
        <h5 class="text-center">
          <i class="fa fa-envelope"></i>
          <a href="mailto: info@geodidalab.it"> info@geodidalab.it </a>
        </h5>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "contatti",
  bodyClass: "contact-page",
  components: {},

  data() {
    return {
      imageUrl: require("../assets/images/canoe-scaled.jpg.webp"),
    };
  },
};
</script>
<style>
.whatsapp-color {
  background-color: #58be67 !important;
}

.whatsapp-color:hover {
  background-color: #6daf77 !important;
}

.facebook-color {
  background-color: #3b5998 !important;
}

.facebook-color:hover {
  background-color: #6388d5 !important;
}

.mail-color {
  background-color: #b4c9f7 !important;
}

.mail-color:hover {
  background-color: rgb(131, 151, 196) !important;
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
