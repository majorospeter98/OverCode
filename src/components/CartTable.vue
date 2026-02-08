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
          v-for="item in currentItems"
          :key="item.id"
          class="border border-gray-400"
          :class="item.isBought ? 'bg-gray-500 line-through' : 'bg-white'"
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
      <TableCaption class="text-2xl text-black" v-if="props.items.length <= 0"
        >Üres a kosarad.</TableCaption
      >
    </Table>
      <Pagination class="mt-5"  :items-per-page="5" :total="total" :default-page="1">
      <PaginationContent>
  <PaginationPrevious @click="page > 1 && page--" />
  <PaginationItem
    v-for="p in pages"
    :key="p"
    :value="p"
    :is-active="p === page"
    @click="page = p"
  >
    {{ p }}
  </PaginationItem>
  <PaginationNext 
 @click="page < total && page++" />
</PaginationContent>
    </Pagination>
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { computed,ref } from "vue";
const emit = defineEmits(["changeStatus", "deleteItem"]);
const itemsPerPage = 5;
const page = ref(1)
const props = defineProps(["items"]);
const currentItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.items.slice(start, end);
});
function changeStatus(id) {
  emit("changeStatus", id);
}
function deleteItem(id) {
  emit("deleteItem", id);
}
const total = computed(() => Math.ceil(props.items.length / Number(import.meta.env.VITE_PAGE_SIZE)));
const pages = computed(() => {
  const list = [];
  for (let i = 1; i <= total.value; i++) {
    list.push(i);
     }
  return list;
});
</script>
