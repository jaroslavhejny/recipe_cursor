<template>
  <div class="mb-8 p-4 bg-white rounded-lg shadow">
    <h2 v-if="heading" class="text-xl font-semibold mb-4">{{ heading }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  heading?: string
}

defineProps<Props>()
</script> 