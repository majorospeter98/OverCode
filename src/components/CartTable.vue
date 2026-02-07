<template>
    <div>
           <Table  class="w-[50%] min-w-100 border border-gray-300 container">
     
      <TableHeader class="bg-gray-200">
        <TableRow>
          <TableHead class="w-25"> Termék neve </TableHead>
          <TableHead>Leírás</TableHead>
          <TableHead>kb. ár (HUF)</TableHead>
          <TableHead>Bolt neve</TableHead>
          <TableHead class=""> Műveletek </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="border-t border-gray-700" >
        <TableRow
         
          v-for="item in props.items"
          :key="item.id"
          :class="item.isBought ? 'bg-gray-300 line-through' : ''"
        >
          <TableCell class="font-medium">
            {{ item.name }}
          </TableCell>
          <TableCell>{{ item.description }}</TableCell>
          <TableCell>{{ item.price }}</TableCell>
          <TableCell>{{ item.shop }}</TableCell>
          <TableCell>
            <Button
              variant="outline"
              size="lg"
              class="rounded-full"
              @click="changeStatus(item.id)"
            >
              {{ item.isBought ? " Mégse / Nincs beszerezve" : "Beszerezve" }}
            </Button>
            |
            <Button
              variant="outline"
              size="lg"
              class="rounded-full"
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
import { Button } from "@/components/ui/button";
const emit = defineEmits(["changeStatus", "deleteItem"])
const props= defineProps(["items"])
function changeStatus(id) {
     emit("changeStatus", id)
 }
function deleteItem(id) {
 emit("deleteItem", id)
}
</script>

<style>

</style>