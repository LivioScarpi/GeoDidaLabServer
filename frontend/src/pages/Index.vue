<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <!--filter-color="orange"-->
      <parallax
        class="page-header-image"
        :style="{'background-image' : 'url(' + imageUrl + ')'}"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <!--<img class="n-logo" src="img/now-logo.png" alt="" />-->
          <h1 class="h1-seo">GEODIDALAB</h1>
          <h3>{{ description }}</h3>
        </div>
      </div>
    </div>
    <div class="main"></div>

    <!--
    <basic-elements></basic-elements>
    <navigation></navigation>
    <tabs-section></tabs-section>
    <progress-pagination></progress-pagination>
    <notifications></notifications>
    <typography></typography>
    <javascript-components></javascript-components>
    <carousel-section></carousel-section>
    <nucleo-icons-section></nucleo-icons-section>
    -->

    <!--
    <div class="section">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title">Completed with examples</h2>
            <h5 class="description">
              The kit comes with three pre-built pages to help you get started

            </h5>
          </div>
        </div>
      </div>
    </div>
    -->

    <!--
    <div class="card-group mx-auto">
      <div v-for="item in cardObject" :key="item.title">
        <card :item="item"></card>
      </div>
    </div>
    -->

    <div class="section">
      <div class="row justify-content-center">
        <div class="card-group justify-content-center">
          <div v-for="item in cardObject" :key="item.title">
            <card :item="item"></card>
          </div>
        </div>
      </div>
    </div>

    <!--
    <signup-form></signup-form>
    <examples-section></examples-section>
    <download-section></download-section>
    -->
  </div>
</template>
<script>
import { Parallax } from "@/components";
import card from "../components/customComponents/card";

require("@/assets/images/canoe-scaled.jpg.webp");

/*

import BasicElements from './components/BasicElementsSection';
import Navigation from './components/Navigation';
import TabsSection from './components/Tabs';
import ProgressPagination from './components/ProgressPagination';
import Notifications from './components/Notifications';
import Typography from './components/Typography';
import JavascriptComponents from './components/JavascriptComponents';
import CarouselSection from './components/CarouselSection';
import NucleoIconsSection from './components/NucleoIconsSection';
import SignupForm from './components/SignupForm';
import ExamplesSection from './components/ExamplesSection';
import DownloadSection from './components/DownloadSection';

 */

export default {
  name: "index",
  bodyClass: "index-page",
  components: {
    Parallax,
    card,
    /*
    BasicElements,
    Navigation,
    TabsSection,
    ProgressPagination,
    Notifications,
    Typography,
    JavascriptComponents,
    CarouselSection,
    NucleoIconsSection,
    SignupForm,
    ExamplesSection,
    DownloadSection
     */
  },
  mounted() {
    //console.log(this.$device) // true
  },

  data() {
    return {
      cardObject: [
        {
          title: "Timeline",
          message: "Questa è la card 1",
          imgSrc: require("@/assets/images/timelineImg2.png"),
          pageDestination: "/timeline",
        },
        {
          title: "Percorsi",
          message: "Questa è la card 2",
          imgSrc: require("@/assets/images/percorsi.jpg"),
          pageDestination: "/percorsi",
        },
        {
          title: "Esperimenti",
          message: "Questa è la card 3",
          imgSrc: require("@/assets/images/esperimenti.jpg"),
          pageDestination: "/esperimenti",
        },
        {
          title: "Strumenti",
          message: "Questa è la card 4",
          imgSrc: require("@/assets/images/strumenti.jpg"),
          pageDestination: "/strumenti",
        },
      ],
      description:
        "Il GeoDidaLab è un laboratorio di educazione\n" +
        "ambientale e ricerca didattica gestito dal\n" +
        "Dipartimento di Scienze della Terra\n" +
        "dell’Università di Torino che dal 2013 propone\n" +
        "attività didattiche per le scuole di ogni ordine\n" +
        "e grado, attività di formazione per gli\n" +
        "insegnanti e promuove progetti di ricerca\n" +
        "scientifica in ambito geologico-ambientale e\n" +
        "didattico.",
      imageUrl: require("../assets/images/canoe-scaled.jpg.webp"),
    };
  },
};
</script>
<style>
</style>
