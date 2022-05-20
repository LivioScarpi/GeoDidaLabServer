<template>
  <div @click="goToPage">
    <div
      class="card zoom text-black"
      style="width: 20rem; margin: 10px; border-radius: 10px"
    >
      <!--TODO: riuovere l'attributo style inline-->
      <img
        slot="image"
        class="card-img-top card-img bg-light"
        style="border-radius: 10px 10px 0 0"
        :src="item.imgSrc"
        alt="Card image cap"
      />
      <div class="card-body">
        <h4 class="card-title">
          <b>{{ item.title }}</b>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import router from "../../router";

export default {
  name: "card",
  props: ["item"],
  methods: {
    mounted() {
    },
    goToPage() {
      document.body.scrollTop = 0;

      if (router.history.current.name !== this.item.pageDestination) {
        router.push({ path: this.item.pageDestination });
      }
    },
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.zoom {
  transition: transform 0.2s; /* Animation */
  margin: 0 auto;
  cursor: pointer;
}

.zoom:hover {
  transform: scale(
    1.08
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.card-img-top {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}
</style>
