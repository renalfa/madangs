<template>
  <div class="hero">
    <div class="d-none d-md-block">
      <div class="row mt-5">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2><strong>Delicious Food Menu,</strong> <br />in your apps</h2>
              <p>Let's order your fav menu now</p>
              <router-link to="/menu" class="btn btn-lg btn-success">Order Now</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/hero.png" alt="hero" width="100%" />
        </div>
      </div>
    </div>

    <div class="d-block d-md-none">
      <div class="row mt-5">
        <div class="col-md-6">
          <img src="../assets/images/hero.png" alt="hero" width="100%" />
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100 mt-4">
            <div class="justify-content-center align-self-center">
              <h2><strong>Delicious Food Menu,</strong> <br />in your apps</h2>
              <p>Let's order your fav menu now</p>
              <router-link to="/menu" class="btn btn-lg btn-success">Order Now</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroComponent",
};
</script>

<style>
</style>