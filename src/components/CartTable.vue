<template>
    <div>
           <Table>
      <TableCaption class="text-2xl text-black" v-if="props.items.length <= 0"
        >Üres a kosarad.</TableCaption
      >
      <TableHeader>
        <TableRow>
          <TableHead class="w-25"> Termék neve </TableHead>
          <TableHead>Leírás</TableHead>
          <TableHead>kb. ár (HUF)</TableHead>
          <TableHead>Bolt neve</TableHead>
          <TableHead class=""> Műveletek </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="item in props.items"
          :key="item.id"
          :class="{
            'line-through': item.isBought,
            'no-underline': !item.isBought,
          }"
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
              {{ item.isBought ? "Beszerezve" : "Mégse/ Nincs beszerezve" }}
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