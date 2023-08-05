<template>
  <div class="detail">
    <NavbarComponent />
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="status"
      @dismiss-count-down="countDownChanged"
    >
      <strong>{{ msg.type }}</strong> {{ msg.text }}.
    </b-alert>
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/menu" class="text-dark">Menu</router-link>
              </li>
              <li class="breadcrumb-item active">Menu Detail</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <img :src="menu.gambar" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ menu.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Price : <strong> IDR {{ menu.harga }}</strong>
          </h4>
          <form v-on:submit.prevent>
            <div class="form-grup">
              <label for="qty">Quantity Orders</label>
              <input v-model="order.qty" type="number" class="form-control" />
            </div>
            <div class="form-grup mt-2">
              <label for="noted">Noted</label>
              <textarea
                v-model="order.noted"
                class="form-control"
                placeholder="example : Hot Level 2"
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-success mt-4"
              @click="setOrder"
            >
              <b-icon-cart></b-icon-cart> Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import { getMenu, addCarts } from "@/config/API";

export default {
  name: "DetailView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      menu: {},
      order: {},
      dismissSecs: 3,
      dismissCountDown: 0,
      status: "",
      msg: {
        type: "",
        text: "",
      },
    };
  },
  methods: {
    setMenu(data) {
      this.menu = data;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    setOrder() {
      if (this.order.qty) {
        this.order.menus = this.menu;
        addCarts(this.order).then(() => {
          this.status = "success";
          this.msg.type = "Add Cart Success";
          this.msg.text = "Menu has been added to cart";
          this.dismissCountDown = this.dismissSecs;
          setTimeout(() => {
            this.$router.push("/cart");
          }, 3000);
        });
      } else {
        this.status = "danger";
        this.msg.type = "Order Failed";
        this.msg.text = "Quantity must be filled";
        this.dismissCountDown = this.dismissSecs;
      }
    },
  },
  mounted() {
    getMenu(this.$route.params.id).then((res) => {
      this.setMenu(res);
    });
  },
};
</script>

<style>
</style>