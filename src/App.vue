<template>
  <div>
  <header>

    <div class="wrapper">
    </div>
  </header>

  <main>
<cart></cart>
    </main>
  </div>
</template>

<script setup>
import Cart from "./components/Cart.vue"
</script>

<style>
*{
   box-sizing: border-box;
 font-family: "Lato", sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.65;
}
.container{
max-width: 1000px;
width: 80%;
margin: 0 auto;
}
</style>
