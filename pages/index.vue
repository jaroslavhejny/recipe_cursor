<template>
  <div>
    <div class="py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Cooking Time Slider -->
        <CardWrapper :heading="`Maximálný čas prípravy: ${cookingTime} minút`">
          <Slider
            v-model="cookingTime"
            :min="10"
            :max="150"
            :step="5"
          />
        </CardWrapper>

        <!-- Difficulty Filter -->
        <CardWrapper heading="Nastavte úroveň náročnosti">
          <DifficultySlider
            v-model="difficultyLevel"
          />
        </CardWrapper>

        <!-- Filter Options -->
        <CardWrapper heading="Filtre">
          <div class="flex flex-col gap-2">
            <ToggleOptions
              v-model="selectedFilters"
              :options="filterOptions"
            />
          </div>
        </CardWrapper>

        <!-- Cuisine Filter -->
        <CardWrapper heading="Typ kuchyne">
          <div class="flex flex-col gap-2">
            <ToggleOptions
              v-model="selectedCuisine"
              :options="cuisineOptions"
            />
          </div>
        </CardWrapper>
      </div>

      <div class="mt-8">
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
        @click="clickFetchRecipes()"
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

// Example options for the toggle component
const filterOptions = [
  { label: 'Vegetariánske', value: 'vegetarian' },
  { label: 'Bezlepkové', value: 'gluten-free' },
  { label: 'Bez laktózy', value: 'lactose-free' },
  { label: 'Nízko sacharidové', value: 'low-carb' }
]
const cuisineOptions = [
  { 
    label: 'Slovenská', 
    value: 'slovak',
    icon: 'https://flagcdn.com/w40/sk.png'
  },
  { 
    label: 'Česká',
    value: 'czech', 
    icon: 'https://flagcdn.com/w40/cz.png'
  },
  { 
    label: 'Maďarská',
    value: 'hungarian',
    icon: 'https://flagcdn.com/w40/hu.png'
  },
  { 
    label: 'Poľská',
    value: 'polish',
    icon: 'https://flagcdn.com/w40/pl.png'
  },
  { 
    label: 'Čínska', 
    value: 'chinese',
    icon: 'https://flagcdn.com/w40/cn.png'
  },
  { 
    label: 'Itálska', 
    value: 'italian',
    icon: 'https://flagcdn.com/w40/it.png'
  },
  { 
    label: 'Americká', 
    value: 'american',
    icon: 'https://flagcdn.com/w40/us.png'
  },
  { 
    label: 'Japonská', 
    value: 'japanese',
    icon: 'https://flagcdn.com/w40/jp.png'
  },
  {
    label: 'Grécka',
    value: 'greek',
    icon: 'https://flagcdn.com/w40/gr.png'
  },
  {
    label: 'Mexická',
    value: 'mexican',
    icon: 'https://flagcdn.com/w40/mx.png'
  },
  {
    label: 'Indická',
    value: 'indian',
    icon: 'https://flagcdn.com/w40/in.png'
  },
  {
    label: 'Thajská',
    value: 'thai',
    icon: 'https://flagcdn.com/w40/th.png'
  },
  {
    label: 'Iné',
    value: 'other',
    icon: 'https://flagcdn.com/w40/sc.png'
  }
]

const selectedFilters = ref<string[]>([])
const selectedCuisine = ref<string[]>([])
// Get all recipes from the store
const recipes = computed(() => recipesStore.getAllRecipes)

// Filter recipes based on cooking time and difficulty
const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => 
    recipe.cookingTime <= cookingTime.value &&
    recipe.difficulty === difficultyLevel.value
  )
})

const clickFetchRecipes = () => {
  fetchRecipes(cookingTime.value, difficultyLevel.value, selectedFilters.value, selectedCuisine.value)
}

onMounted(() => {
  loading.value = false
  if (!recipes.value.length) {
    clickFetchRecipes()
  }
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