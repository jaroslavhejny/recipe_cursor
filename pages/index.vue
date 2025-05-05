<template>
  <div class="container mx-auto px-4">
    <button 
      @click="fetchRecipes()"
      class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
      :disabled="loading"
    >
      <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loading ? 'Loading...' : 'Fetch Recipes' }}
    </button>
    <div class="py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Welcome to Recipe App</h1>
        <p class="text-gray-600">Browse our collection of delicious recipes</p>
      </div>

      <div>
        <div v-if="recipes.length === 0" class="bg-white rounded-lg shadow-md p-6">
          <div class="mb-6">
            <h2 class="text-2xl font-bold">No Recipes Found</h2>
            <p class="text-gray-600">Start by adding some recipes to your collection</p>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="recipe in recipes"
            :key="recipe.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold">
                {{ recipe.title }}
              </h2>
              <span class="px-2 py-1 text-sm rounded-full" 
                :class="{
                  'bg-green-100 text-green-800': recipe.difficulty === 'easy',
                  'bg-yellow-100 text-yellow-800': recipe.difficulty === 'medium',
                  'bg-red-100 text-red-800': recipe.difficulty === 'hard',
                  'bg-gray-100 text-gray-800': !recipe.difficulty
                }">
                {{ recipe.difficulty }}
              </span>
            </div>

            <dl class="space-y-4">
              <div>
                <dt class="font-medium text-gray-700">Description</dt>
                <dd class="mt-1 text-gray-600">{{ recipe.description }}</dd>
              </div>
              <div>
                <dt class="font-medium text-gray-700">Cooking Time</dt>
                <dd class="mt-1 text-gray-600">{{ recipe.cookingTime }} minutes</dd>
              </div>
              <div>
                <dt class="font-medium text-gray-700">Servings</dt>
                <dd class="mt-1 text-gray-600">{{ recipe.servings }}</dd>
              </div>
              <div>
                <dt class="font-medium text-gray-700">id</dt>
                <dd class="mt-1 text-gray-600">{{ recipe.id }}</dd>
              </div>
            </dl>

            <div class="flex justify-end mt-4">
              <a :href="`/recipe/${recipe.id}`" 
                 class="inline-flex items-center px-4 py-2 text-primary-600 hover:text-primary-800 gap-2">
                View Recipe
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipes } from '~/composables/useRecipes'

const { fetchRecipes,loading } = useRecipes()
const recipesStore = useRecipesStore()

// Fetch recipes when component mounts
onMounted(async () => {
  try {
    await fetchRecipes()
    console.log('Recipes fetched:', recipesStore.getAllRecipes)
  } catch (error) {
    console.error('Failed to fetch recipes:', error) 
  }
})

// Get all recipes from the store
const recipes = computed(() => recipesStore.getAllRecipes)
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'green'
    case 'medium':
      return 'yellow'
    case 'hard':
      return 'red'
    default:
      return 'gray'
  }
}
</script>

<style scoped>
.recipe-list {
  margin: 2rem 0;
}

.recipe-item {
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
}

.recipe-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>