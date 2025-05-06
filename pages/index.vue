<template>
  <div class="container mx-auto px-4">
    
    <div class="py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Vitajte v Receptovej aplikácii</h1>
        <p class="text-gray-600">Prezrite si našu zbierku chutných receptov</p>
      </div>

      <!-- Cooking Time Slider -->
      <div class="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Nastavte čas prípravy (minúty)</h2>
        <Slider
          v-model="cookingTime"
          :min="0"
          :max="120"
          :step="5"
        />
      </div>
      <!-- Difficulty Filter -->
      <div class="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Nastavte úroveň náročnosti</h2>
        <DifficultySlider
          v-model="difficultyLevel"
        />
      </div>

      <div>
        <div v-if="recipes.length === 0" class="bg-white rounded-lg shadow-md p-6">
          <div class="mb-6">
            <h2 class="text-2xl font-bold">Nenašli sa žiadne recepty</h2>
            <p class="text-gray-600">Začnite pridaním receptov do vašej zbierky</p>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
            :loading="loading"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-8 mb-8">
      <button 
        @click="fetchRecipes(cookingTime, difficultyLevel)"
        class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
        :disabled="loading"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Načítava sa...' : 'Získať recepty' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipes } from '~/composables/useRecipes'
import type { Difficulty } from '~/types/recipe'

const { fetchRecipes, loading } = useRecipes()
const recipesStore = useRecipesStore()

// Cooking time filter
const cookingTime = ref(60)
const difficultyLevel = ref<Difficulty>('medium')

// Get all recipes from the store
const recipes = computed(() => recipesStore.getAllRecipes)

// Filter recipes based on cooking time and difficulty
const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => 
    recipe.cookingTime <= cookingTime.value &&
    recipe.difficulty === difficultyLevel.value
  )
})
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