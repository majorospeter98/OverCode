<template>
  <div class="mt-3">
    <cart-form :items="items" @submit-form="submitForm"></cart-form>
    <cart-table class="mt-8"
      :items="items"
      @change-status="changeStatus"
      @delete-item="deleteItem"
    ></cart-table>
  </div>
</template>
<script setup>
import CartTable from "./CartTable.vue";
import CartForm from "./CartForm.vue";
import { ref } from "vue";
import { onMounted } from "vue";
const items = ref([]);

onMounted(() => {
  const cartItems = JSON.parse(localStorage.getItem("items") || "[]");
  items.value = cartItems;
});
function deleteItem(id) {
  items.value = items.value.filter((item) => item.id !== id);
  localStorage.setItem("items", JSON.stringify(items.value));
}
function changeStatus(id) {
  const searchedItem = items.value.find((item) => item.id === id);
  searchedItem.isBought = !searchedItem.isBought;
}
function submitForm(item) {
  const parsedItems = JSON.parse(localStorage.getItem("items") || "[]");
  console.log(parsedItems);
  parsedItems.push(item);
  items.value.push(item);

  localStorage.setItem("items", JSON.stringify(parsedItems));
}
</script>
<style></style>
