<template>
  <div class="container mx-auto px-4">
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
const recipesStore = useRecipesStore()

// Fetch recipes when the component mounts
// Recipes are now fetched in app.vue

// Get all recipes from the store
const recipes = computed(() => recipesStore.getAllRecipes)
console.log(recipes.value);
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