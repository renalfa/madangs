<template>
  <b-navbar toggleable="lg">
    <div class="container">
      <b-navbar-brand href="#">Madangs</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="nav-link" to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-link" to="/menu">Menu</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link class="nav-link" to="/cart">
              <b-icon-cart4></b-icon-cart4>
              Cart
              <b-badge class="ml-2" variant="info"
                >{{ updateCart ? updateCart.length : qty }} <span class="sr-only">new items</span></b-badge
              >
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { listCarts } from '@/config/API';

export default {
  name: "NavbarComponent",
  data() {
    return {
      qty: 0,
    };
  },
  props: ["updateCart"],
  methods: {
    setQty(data) {
      this.qty = data;
    },
  },
  mounted() {
    listCarts().then((res) => {
      this.setQty(res.length);
    });

  },
};
</script>

<style>
</style>