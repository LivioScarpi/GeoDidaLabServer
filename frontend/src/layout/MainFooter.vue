<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="/">
              Openalplab
            </a>
          </li>
          <li>
            <a href="/">
              About Us
            </a>
          </li>
        </ul>
      </nav>
      <!--
      <div class="copyright">
        &copy; {{ year }}, Designed by
        <a href="https:///www.invisionapp.com" target="_blank" rel="noopener"
          >Invision</a
        >.
      </div>
      -->
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>


</style>
