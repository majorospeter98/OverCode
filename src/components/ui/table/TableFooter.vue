<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <tfoot
    data-slot="table-footer"
    :class="
      cn('bg-muted/50 border-t font-medium ', props.class)
    "
  >
    <slot />
  </tfoot>
</template>
