<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
    <div v-if="loading" class="animate-pulse">
      <div class="flex items-center justify-between mb-4">
        <div class="h-6 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div class="space-y-4">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div class="flex justify-end mt-4">
        <div class="h-8 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
    <div v-else>
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
          <dt class="font-medium text-gray-700">Popis</dt>
          <dd class="mt-1 text-gray-600">{{ recipe.description }}</dd>
        </div>
        <div>
          <dt class="font-medium text-gray-700">Čas prípravy</dt>
          <dd class="mt-1 text-gray-600">{{ recipe.cookingTime }} minút</dd>
        </div>
        <div>
          <dt class="font-medium text-gray-700">Porcie</dt>
          <dd class="mt-1 text-gray-600">{{ recipe.servings }}</dd>
        </div>
      </dl>

      <div class="flex justify-end mt-4">
        <NuxtLink :to="`/recipe/${recipe.id}`" 
           class="inline-flex items-center px-4 py-2 text-primary-600 hover:text-primary-800 gap-2">
          Zobraziť recept
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe'

defineProps<{
  recipe: Recipe
  loading?: boolean
}>()
</script> 