<template>
  <div class="container mx-auto px-4">
    <div class="py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">{{ recipe?.title || 'Recipe Details' }}</h1>
        <p class="text-gray-600">{{ recipe?.description }}</p>
      </div>

      <div>
        <div v-if="recipe" class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6">
            <span class="px-3 py-1 text-sm rounded-full" 
              :class="{
                'bg-green-100 text-green-800': recipe.difficulty === 'easy',
                'bg-yellow-100 text-yellow-800': recipe.difficulty === 'medium', 
                'bg-red-100 text-red-800': recipe.difficulty === 'hard',
                'bg-gray-100 text-gray-800': !recipe.difficulty
              }">
              {{ recipe.difficulty }}
            </span>
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ recipe.cookingTime }} min
              </span>
              <span class="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {{ recipe.servings }} servings
              </span>
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-semibold mb-4">Ingredients</h3>
              <ul class="space-y-3">
                <li v-for="ingredient in recipe.ingredients" 
                    :key="ingredient.name"
                    class="flex items-center justify-between py-2">
                  <span>{{ ingredient.name }}</span>
                  <span class="text-gray-500">
                    {{ ingredient.amount }} {{ ingredient.unit }}
                  </span>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-xl font-semibold mb-4">Instructions</h3>
              <ol class="list-decimal list-inside space-y-3">
                <li v-for="(instruction, index) in recipe.instructions"
                    :key="index"
                    class="py-2">
                  {{ instruction }}
                </li>
              </ol>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <a href="/" 
               class="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 gap-2">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Recipes
            </a>
          </div>
        </div>

        <div v-else class="bg-white rounded-lg shadow-md p-6">
          <div class="mb-6">
            <h2 class="text-2xl font-bold">Recipe Not Found</h2>
            <p class="text-gray-600">The recipe you're looking for doesn't exist</p>
          </div>
          <div class="flex justify-end">
            <a href="/" 
               class="inline-flex items-center px-4 py-2 text-primary-600 hover:text-primary-800 gap-2">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Recipes
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const recipesStore = useRecipesStore()
console.log('route', route.params.id);
console.log('recipesStore', route.params.id, recipesStore.getAllRecipes);
const recipe = computed(() => recipesStore.getRecipeById(route.params.id as string))

const getDifficultyColor = (difficulty?: string) => {
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