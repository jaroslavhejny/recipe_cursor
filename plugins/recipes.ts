import { useRecipes } from '~/composables/useRecipes'

export default defineNuxtPlugin(async () => {
  const { fetchRecipes } = useRecipes()
  await fetchRecipes()
}) 