<template>
  <div class="completeView">
    <NavbarComponent />
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img src="../assets/images/menunggu.png" width="300" />
          <h2><strong>Success!!</strong></h2>
          <h4>Your orders will be proccess soon<br> Please waiting.</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "CompleteView",
  components: {
    NavbarComponent,
  },
};
</script>

<style>
</style>