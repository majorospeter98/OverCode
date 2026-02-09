<template>
  <div>
    <Table class="w-[50%] min-w-100 container">
      <TableHeader class="bg-gray-200 divide-x divide-red-600 font-bold">
        <TableRow class="font-bold">
          <TableHead class="border border-gray-400">Termék neve </TableHead>
          <TableHead class="border border-gray-400">Leírás</TableHead>
          <TableHead class="border border-gray-400">kb. ár (HUF)</TableHead>
          <TableHead class="border border-gray-400">Bolt neve</TableHead>
          <TableHead class="border border-gray-400"> Műveletek </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="item in filteredItems"
          :key="item.id"
          class="border border-gray-400"
          :class="item.isBought ? 'bg-[#BCBFC4] line-through' : 'bg-white'"
        >
          <TableCell class="font-medium border border-gray-400">
            {{ item.name }}
          </TableCell>
          <TableCell class="border border-gray-400">{{
            item.description
          }}</TableCell>
          <TableCell class="border border-gray-400">{{ item.price }}</TableCell>
          <TableCell class="border border-gray-400">{{ item.shop }}</TableCell>
          <TableCell class="border border-gray-400">
            <Button
              variant="outline"
              size="lg"
              class="border-none outline-0"
              @click="changeStatus(item.id)"
            >
              {{ item.isBought ? " Mégse" : "Beszerezve" }}
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="border-none outline-0 ml-3.5"
              @click="deleteItem(item.id)"
            >
              Törlés
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableCaption class="text-2xl text-black" v-if="filteredItems.length <= 0"
        >Üres a listád.</TableCaption
      >
    </Table>
    <div class="flex justify-end container">
      <pagination :items="props.items" @items="filterItems"></pagination>
    </div>
  </div>
</template>
<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import Pagination from "./CartPagination.vue";
const emit = defineEmits(["changeStatus", "deleteItem"]);
const props = defineProps(["items"]);
const filteredItems = ref([]);
function changeStatus(id) {
  emit("changeStatus", id);
}
function deleteItem(id) {
  emit("deleteItem", id);
}
function filterItems(items) {
  filteredItems.value = items;
}
</script>
