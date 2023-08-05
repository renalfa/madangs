<template>
  <div class="cartView">
    <NavbarComponent :updateCart="carts" />
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
              <li class="breadcrumb-item active">Cart</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>
            My
            <strong>Cart</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Menu</th>
                  <th scope="col">Noted</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.id">
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="cart.menus.gambar"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ cart.menus.nama }}</strong>
                  </td>
                  <td>{{ cart.noted ? cart.noted : "-" }}</td>
                  <td>{{ cart.qty }}</td>
                  <td align="right">Rp. {{ cart.menus.harga }}</td>
                  <td align="right">
                    <strong>Rp. {{ cart.menus.harga * cart.qty }}</strong>
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="removeCart(cart.cId)"></b-icon-trash>
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Price Total :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalHarga }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row justify-content-end">
            <div class="col-md-4">
              <form class="mt-4" v-on:submit.prevent>
                <div class="form-group">
                  <label for="nama">Name :</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="orders.nama"
                  />
                </div>
                <div class="form-group">
                  <label for="noMeja">Table Number :</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="orders.noMeja"
                  />
                </div>

                <button
                  type="submit"
                  class="btn btn-success float-right"
                  @click="checkout"
                >
                  <b-icon-cart></b-icon-cart>Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import { listCarts, deleteCart, deleteAllCart, addOrders } from "@/config/API";

export default {
  name: "DetailView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      carts: [],
      orders: {},
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
    setCarts(data) {
      this.carts = data;
    },
    removeCart(cId) {
      deleteCart(cId).then(() => {
        this.carts = this.carts.filter((cart) => cart.cId !== cId);
        this.status = "success";
        this.msg.type = "Delete Success";
        this.msg.text = "Delete Cart Success";
        this.dismissCountDown = this.dismissSecs;
      })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    checkout() {
      if (this.orders.nama && this.orders.noMeja) {
        this.orders.carts = this.carts;
        addOrders(this.orders).then(() => {
          deleteAllCart().then(() => {
            this.status = "success";
            this.msg.type = "Order Success";
            this.msg.text = "Thank you for your order";
            this.dismissCountDown = this.dismissSecs;
            setTimeout(() => {
              this.$router.push({ path: "/orders" });
            }, 3000);
          });
        })
      } else {
        this.status = "danger";
        this.msg.type = "Order Failed";
        this.msg.text = "Name and Table number must be filled";
        this.dismissCountDown = this.dismissSecs;
      }
    },
  },
  mounted() {
    listCarts().then((res) => {
      this.setCarts(res);
    });
  },
  computed: {
    totalHarga() {
      return this.carts.reduce(function (items, data) {
        return items + data.menus.harga * data.qty;
      }, 0);
    },
  },
};
</script>

<style>
</style>