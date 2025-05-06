<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="animate-pulse">
      <div class="h-96 bg-gray-200 rounded-lg mb-8"></div>
      <div class="space-y-4">
        <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div v-else-if="recipe" class="max-w-4xl mx-auto">
      <div class="mb-8">
        <div v-if="imageUrl" class="relative h-96 mb-8">
          <img 
            :src="imageUrl" 
            :alt="recipe.title"
            class="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div v-else class="relative h-96 mb-8 bg-gray-100 rounded-lg flex items-center justify-center">
          <button 
            @click="generateImage" 
            class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            :disabled="generatingImage"
          >
            <svg v-if="generatingImage" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ generatingImage ? 'Generujem obrázok...' : 'Vygenerovať obrázok' }}
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold">{{ recipe.title }}</h1>
          <span class="px-3 py-1 rounded-full text-sm" 
            :class="{
              'bg-green-100 text-green-800': recipe.difficulty === 'easy',
              'bg-yellow-100 text-yellow-800': recipe.difficulty === 'medium',
              'bg-red-100 text-red-800': recipe.difficulty === 'hard'
            }">
            {{ recipe.difficulty }}
          </span>
        </div>

        <p class="text-gray-600 mb-8">{{ recipe.description }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-xl font-semibold mb-4">Ingrediencie</h2>
            <ul class="space-y-2">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient.name" class="flex items-center gap-2">
                <span class="text-gray-600">{{ ingredient.amount }} {{ ingredient.unit }}</span>
                <span>{{ ingredient.name }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-4">Postup</h2>
            <ol class="space-y-4">
              <li v-for="(instruction, index) in recipe.instructions" :key="index" class="flex gap-4">
                <span class="text-gray-500 font-medium">{{ index + 1 }}.</span>
                <span>{{ instruction }}</span>
              </li>
            </ol>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200">
          <div class="flex items-center justify-between text-gray-600">
            <div class="flex items-center gap-4">
              <span>Čas prípravy: {{ recipe.cookingTime }} minút</span>
              <span>•</span>
              <span>{{ recipe.servings }} porcií</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-800">Recept nebol nájdený</h2>
      <NuxtLink to="/" class="text-blue-500 hover:text-blue-600 mt-4 inline-block">
        Späť na zoznam receptov
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe'

const route = useRoute()
const recipesStore = useRecipesStore()
const loading = ref(true)
const generatingImage = ref(false)
const imageUrl = ref('');

const recipe = computed(() => {
  const id = route.params.id as string
  return recipesStore.getRecipeById(id)
})

const generateImage = async () => {
  if (!recipe.value) return
  
  try {
    generatingImage.value = true
    const { data, error } = await useFetch(`/api/recipe/${recipe.value.id}/image`, {
      query: {
        name: recipe.value.title
      }
    })
    
    if (error.value) {
      throw new Error(error.value.message)
    }

    if (!data.value?.data?.imageUrl) {
      throw new Error('Nepodarilo sa vygenerovať obrázok')
    }

    imageUrl.value = data.value.data.imageUrl;

    // The store will be updated automatically through the API
  } catch (error) {
    console.error('Chyba pri generovaní obrázka:', error)
  } finally {
    generatingImage.value = false
  }
}

onMounted(() => {
  loading.value = false
  if (!imageUrl.value) {
    generateImage()
  }
})
</script> 