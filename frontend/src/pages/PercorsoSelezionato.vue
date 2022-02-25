<template>
  <div>
    <div class="row">
      <div class="col-12">
        <!--TODO: sistemare pagine e step-->
        <i
          class="bi bi-arrow-left ml-3"
          style="font-size: 2rem; color: black; cursor: pointer"
          v-on:click="goBack()"
        ></i>
        <h4 class="text-center mt-0">
          <b>Percorso selezionato</b>
        </h4>
      </div>
    </div>
    PERCORSO SELEZIONATO - percorso ricevuto :{{ path }}
  </div>
</template>

<script>
import router from "../router";


export default {
  name: "PercorsoSelezionato",
  //props: ["test"],

  components: {},

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      path: null,
    };
  },

  mounted() {
    console.log("PERCORSO SELEZIONATO");
    console.log(this.$route);

    this.path = this.$route.params.path;
  },

  methods: {
    goBack() {
      console.log("REPLACE PATH");
      router.replace({ path: "/percorsi" });
    },
  },
};
</script>

<style>
</style>