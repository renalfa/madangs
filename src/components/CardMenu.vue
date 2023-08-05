<template>
  <div class="cardMenu">
    <b-card
      class="border-0 bg-light mt-4"
      :title="menu.nama"
      :img-src="menu.gambar"
      :img-alt="menu.nama"
      img-top
    >
      <b-card-text> Price: IDR {{ menu.harga }} </b-card-text>
      <router-link class="btn btn-success" :to="'/menu/' + menu.mId">Let's Order</router-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CardMenu",
  props: ["menu"],
};
</script>

<style>
</style>