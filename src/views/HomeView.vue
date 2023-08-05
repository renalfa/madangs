<template>
  <div class="home">
    <NavbarComponent />
    <div class="container">
      <HeroComponent />
      <div class="row mt-5">
        <div class="col">
          <h4>Best<strong>Menus</strong></h4>
        </div>
        <div class="col">
          <router-link to="/menu" class="btn btn-success float-right">See more</router-link>
        </div>
      </div>
      <div class="row mt-4 mb-4">
        <div class="col-md-4 mt-2" v-for="menu in menus" :key="menu.id">
          <CardMenu :menu="menu" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarComponent from "@/components/NavbarComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";
import CardMenu from "@/components/CardMenu.vue";
import { listMenuFav } from "@/config/API";

export default {
  name: "HomeView",
  components: {
    NavbarComponent,
    HeroComponent,
    CardMenu,
  },
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    setMenu(data) {
      this.menus = data
    }
  },
  mounted() {
    listMenuFav().then((res) => {
      this.setMenu(res);
    });
  }
};
</script>
