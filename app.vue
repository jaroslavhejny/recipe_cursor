<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useRecipes } from '~/composables/useRecipes'

const { fetchRecipes } = useRecipes()

onMounted(async () => {
  console.log('Fetching recipes')
  await fetchRecipes()
})
</script>
