<template>
  <div>
    <Pagination v-if="props.items.length>0"
      class="mt-5"
      :items-per-page="itemsPerPage"
      :total="props.items.length"
      :default-page="1"
    >
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
        <PaginationNext @click="page < total && page++" />
      </PaginationContent >
    </Pagination>
    
  </div>
</template>

<script setup>
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { computed, ref, watch } from "vue";
const props = defineProps(["items"]);
const emit= defineEmits(["items"]);
const itemsPerPage = Number(import.meta.env.VITE_PAGE_SIZE);  // Copilot kellett segítség a paginationhoz.
const page = ref(1);
const currentItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  console.log(start)
  const end = start + itemsPerPage;
  return props.items.slice(start, end);
});
watch(currentItems, (val) => {
  emit("items", val);
});
const total = computed(() => Math.ceil(props.items.length / itemsPerPage)); // Copilot kellett segítség a paginationhoz.
const pages = computed(() => { 
  const list = [];
  for (let i = 1; i <= total.value; i++) {
    list.push(i);
  }
  return list;
});
</script>
