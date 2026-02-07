<template>
  <div>
    <div class="container flex items-center justify-between">
      <p>{{ props.items.length }} termék összesen</p>
      <Button variant="outline" @click="isOpen = true"> ÚJ TERMÉK </Button>
    </div>
    <!-- eslint-disable-next-line vue/no-v-model-argument -->
    <Dialog v-model:open="isOpen">
      <DialogContent
        aria-describedby="undefined"
        class="sm:max-w-106.25"
        @openAutoFocus.prevent
      >
        <DialogTitle class="text-center">Új termék hozzáadása</DialogTitle>
        <DialogDescription> </DialogDescription>
        <form @submit.prevent="submitForm" class="mt-8">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Termék neve</FormLabel>
              <FormControl>
                <Input placeholder="Termék neve" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem class="mt-4">
              <FormLabel>Leírás</FormLabel>
              <FormControl>
                <Input placeholder="Leírás" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="price">
            <FormItem class="mt-4 mb-4">
              <FormLabel>kb. ár (HUF)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="18" v-bind="componentField" />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="shop" v-slot="{ value, handleChange }">
            <FormItem class="mt-4 mb-4">
              <FormLabel>Bolt Neve</FormLabel>
              <!-- eslint-disable-next-line vue/no-v-model-argument -->
              <Popover v-model:open="open">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    role="combobox"
                    class="w-50 justify-between"
                  >
                    {{ value || "Válaszd ki a boltot..." }}
                    <ChevronsUpDownIcon class="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-50 p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="shop in shops"
                          :key="shop.name"
                          :value="shop.name"
                          @select="() => handleChange(shop.name)"
                        >
                          {{ shop.name }}
                          <CheckIcon />
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          </FormField>
          <p class="mt-5" v-if="errors.length>1"> Hibás API / rossz formátum miatt nem jelenik meg</p>
          <DialogFooter class="mt-4">
            <DialogClose as-child>
              <Button variant="outline"> Mégse</Button>
            </DialogClose>
            <Button type="submit"> Mentés </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useForm } from "vee-validate";
const emit = defineEmits(["submitForm"]);
const props = defineProps(["items"]);
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
const errors = ref([]);
import { onMounted } from "vue";

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/, "Csak betűket adhatsz meg"),
    description: z
      .string()
      .max(50)
      .regex(/^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/, "Csak betűket adhatsz meg")
      .optional()
      .or(z.literal("")),
    price: z.coerce.number().min(20, "Az ár nem lehet 10-nél kisebb"),
    shop: z.string().min(1, "Válassz boltot"),
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
    shop: values.shop,
    isBought: false,
  };
  emit("submitForm", cartItems);
  form.resetForm();
  isOpen.value = false;
});
onMounted(() => {
  name();
});
async function name() {
    try{
    const response = await axios.get("https://robber.hu/proba-api/shops.php");
  console.log(response)
if (response.status === 200) {
    const responseData = response.data;
    console.log(responseData.data)
    if (responseData &&  Array.isArray(responseData.data)) {
      shops.value = responseData.data;
      errors.value.push("Nem létezik vagy rossz formátum")
    } 
  }
}
catch(error){
  errors.value.push(error)
}
}
</script>
<style></style>
