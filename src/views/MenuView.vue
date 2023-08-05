<template>
  <div>
    <NavbarComponent />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h4>All list <strong>Menu</strong></h4>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search Menu..."
              aria-label="search"
              aria-describedby="basic-addon1"
              @keyup="searchMenu"
            />
            <span class="input-group-text" id="basic-addon1">
              <b-icon-search></b-icon-search>
            </span>
          </div>
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
import NavbarComponent from "@/components/NavbarComponent.vue";
import CardMenu from "@/components/CardMenu.vue";
import { listMenus, searchMenus } from "@/config/API";

export default {
  name: "MenuView",
  components: {
    NavbarComponent,
    CardMenu,
  },
  data() {
    return {
      menus: [],
      search: "",
    };
  },
  methods: {
    setMenu(data) {
      this.menus = data;
    },
    searchMenu() {
      if (this.search === "") {
        listMenus().then((res) => {
          this.setMenu(res);
        });
      } else {
        searchMenus(this.search).then((res) => {
          this.setMenu(res);
        });
      }
    },
  },
  mounted() {
    listMenus().then((res) => {
      this.setMenu(res);
    });
  },
};
</script>

<style>
</style>