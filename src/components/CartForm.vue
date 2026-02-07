<template>
    <div>
  <p>{{ props.items.length }} termék összesen</p>
    <!-- eslint-disable-next-line vue/no-v-model-argument -->
    <Dialog v-model:open="isOpen">
      <Button variant="outline" @click="isOpen = true"> ÚJ TERMÉK </Button>
      <DialogContent aria-describedby="undefined" class="sm:max-w-106.25">
        <DialogTitle class="text-center">Új termék hozzáadása</DialogTitle>
        <DialogDescription> </DialogDescription>
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
            <FormItem class="mt-4">
              <FormLabel>Leírás</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="price">
            <FormItem class="mt-4 mb-4">
              <FormLabel>Életkor</FormLabel>
              <FormControl>
                <Input type="number" placeholder="18" v-bind="componentField" />
              </FormControl>
              <FormDescription> Csak számot adhatsz meg. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <!-- eslint-disable-next-line vue/no-v-model-argument -->
          <Popover v-model:open="open">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-50 justify-between"
              >
                {{ selectedShop?.name || "Válaszd ki a boltot..." }}
                <ChevronsUpDownIcon class="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-50 p-0">
              <Command>
                <CommandInput class="h-9" placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      v-for="shop in shops"
                      :key="shop.name"
                      :value="shop.name"
                      @select="
                        (ev) => {
                          selectShop(ev.detail.value);
                        }
                      "
                    >
                      {{ shop.name }}
                      <CheckIcon />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <DialogFooter class="mt-4">
            <DialogClose as-child>
              <Button variant="outline"> Cancel </Button>
            </DialogClose>
            <Button type="submit"> Save changes </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
const value = ref("");
const emit= defineEmits(["submitForm"])
const props= defineProps(["items"])
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
import { CheckIcon, ChevronsUpDownIcon } from "lucide-vue-next";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
const isOpen = ref(false);
const shops = ref([]);
const open = ref(false);
import { onMounted } from "vue";
const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/, "Csak betűket adhatsz meg"),
    description: z.string().min(2).max(50),
    price: z.coerce.number().min(20, "Az ár nem lehet 10-nél kisebb"),
  }),
);
const form = useForm({
  validationSchema: formSchema,
});
const submitForm = form.handleSubmit((values) => {
  const cartItems = {
    id: crypto.randomUUID(),
    name: values.name,
    description: values.description,
       price: values.price,
    shop:selectedShop.value.name,
    isBought:false
   };
   emit("submitForm", cartItems)
    form.resetForm();
  isOpen.value = false;
});
onMounted(() => {
   name();
  selectedShop.value;
});
const selectedShop = computed(() =>
  shops.value.find((shop) => shop.name === value.value),
);
function selectShop(selectedValue) {
  console.log(selectedValue);
  value.value = selectedValue === value.value ? "" : selectedValue;
  console.log(value.value);
  open.value = false;
}
async function name() {
  const response = await axios.get("https://robber.hu/proba-api/shops.php");
  const items = await response.data;
   shops.value = items.data;
 }
</script>

<style>
</style>