<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useRecipes } from '~/composables/useRecipes'

const { fetchRecipes, recipes } = useRecipes()
await fetchRecipes()
</script>
