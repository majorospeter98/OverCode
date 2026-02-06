<template>
  <div class="ml-8">
    <p>{{ items.length }} termék összesen</p>
    <Dialog ref="isOpen">
      <DialogTrigger as-child>
        <Button variant="outline" @click="isOpen = true"> ÚJ TERMÉK </Button>
      </DialogTrigger>

      <DialogContent class="sm:max-w-[425px]">
        <form @submit.prevent="submitForm" class="mt-8">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Termék neve</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="price">
            <FormItem>
              <FormLabel>Életkor</FormLabel>
              <FormControl>
                <Input type="number" placeholder="18" v-bind="componentField" />
              </FormControl>
              <FormDescription> Csak számot adhatsz meg. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline"> Cancel </Button>
            </DialogClose>
            <Button type="submit"> Save changes </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <Table>
      <TableCaption class="text-2xl text-black" v-if="items.length <= 0"
        >Üres a kosarad.</TableCaption
      >
      <TableHeader>
        <TableRow>
          <TableHead class="w-25"> Termék neve </TableHead>
          <TableHead>Leírás</TableHead>
          <TableHead>kb. ár (HUF)</TableHead>
          <TableHead class=""> Műveletek </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="item in items"
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
import { ref, computed } from "vue";
import { onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
const isOpen = ref(false);
const shops = ref([]);
const items = ref([]);
function deleteItem(id) {
  items.value = items.value.filter((item) => item.id !== id);
}
const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/, "Csak betűket adhatsz meg"),
    description: z.string().min(2).max(50),
    price: z.coerce.number().min(20, "Az ár nem lehet 0"),
  }),
);
function changeStatus(id) {
  const searchedItem = items.value.find((item) => item.id === id);
  searchedItem.isBought = !searchedItem.isBought;
}
const form = useForm({
  validationSchema: formSchema,
});
const submitForm = form.handleSubmit((values) => {
  const cartItems = {
    id: crypto.randomUUID(),
    name: values.name,
    description: values.description,
    price: values.price,
  };
  const parsedItems = JSON.parse(localStorage.getItem("items") || "[]");
  parsedItems.push(cartItems);
  items.value.push(cartItems);
  localStorage.setItem("items", JSON.stringify(parsedItems));
  form.resetForm();
  isOpen.value = false;
});
onMounted(() => {
  const cartItems = JSON.parse(localStorage.getItem("items") || "[]");
  items.value = cartItems;
  name();
});

async function name() {
  const response = await axios.get("https://robber.hu/proba-api/shops.php");
  const items = response.data;
  console.log(items)
}
</script>

<style></style>
