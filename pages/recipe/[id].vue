<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="recipe" class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-4xl font-bold mb-3">{{ recipe.title }}</h1>
        <p class="text-lg text-gray-600">{{ recipe.description }}</p>
      </div>

      <!-- Recipe Card -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Recipe Meta -->
        <div class="bg-gray-50 p-6 border-b">
          <div class="flex flex-wrap items-center gap-4">
            <span class="px-4 py-2 rounded-full text-sm font-medium" 
              :class="{
                'bg-green-100 text-green-800': recipe.difficulty === 'easy',
                'bg-yellow-100 text-yellow-800': recipe.difficulty === 'medium', 
                'bg-red-100 text-red-800': recipe.difficulty === 'hard',
                'bg-gray-100 text-gray-800': !recipe.difficulty
              }">
              {{ recipe.difficulty }}
            </span>
            
            <span class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ recipe.cookingTime }} minút
            </span>

            <span class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {{ recipe.servings }} porcií
            </span>
          </div>
        </div>

        <div class="p-6 grid md:grid-cols-2 gap-8">
          <!-- Ingredients -->
          <div>
            <h3 class="text-2xl font-semibold mb-6">Ingrediencie</h3>
            <ul class="space-y-4">
              <li v-for="ingredient in recipe.ingredients" 
                  :key="ingredient.name"
                  class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="font-medium">{{ ingredient.name }}</span>
                <span class="text-gray-600">
                  {{ ingredient.amount }} {{ ingredient.unit }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Instructions -->
          <div>
            <h3 class="text-2xl font-semibold mb-6">Postup</h3>
            <div class="space-y-4">
              <div v-for="instruction in recipe.instructions"
                  :key="instruction"
                  class="flex gap-4 py-2">
                <p class="text-gray-700">{{ instruction }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="mt-8">
        <NuxtLink to="/" 
           class="inline-flex items-center px-6 py-3 text-gray-700 hover:text-gray-900 gap-2 transition-colors duration-200">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Späť na recepty
        </NuxtLink>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2">Recept sa nenašiel</h2>
      <p class="text-gray-600 mb-6">Ľutujeme, ale hľadaný recept neexistuje</p>
      <NuxtLink to="/" 
         class="inline-flex items-center px-6 py-3 text-blue-600 hover:text-blue-800 gap-2 font-medium transition-colors duration-200">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Späť na recepty
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const recipesStore = useRecipesStore()
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