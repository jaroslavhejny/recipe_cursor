import { useRecipesStore } from '~/stores/recipes'

export default defineNuxtPlugin(() => {
  // Initialize store
  const recipesStore = useRecipesStore()

  // Load persisted state from localStorage
  if (process.client) {
    const persistedState = localStorage.getItem('recipes-store')
    if (persistedState) {
      recipesStore.$patch(JSON.parse(persistedState))
    }

    // Save state to localStorage whenever it changes
    recipesStore.$subscribe((mutation, state) => {
      localStorage.setItem('recipes-store', JSON.stringify(state))
    })
  }
}) 