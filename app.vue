<template>
  <UContainer>
    <UPage>
      <NuxtPage />
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
import { useRecipes } from '~/composables/useRecipes'

const { fetchRecipes } = useRecipes()

onMounted(async () => {
  await fetchRecipes()
})
</script>
