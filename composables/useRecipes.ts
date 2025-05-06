import { useRecipesStore } from '~/stores/recipes'
import type { Difficulty } from '~/types/recipe'

interface ApiRecipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string
  preparationTime: string
  servings: number
  difficulty: string
}

interface ApiResponse {
  status: string
  data?: {
    recipes: ApiRecipe[]
  }
  message?: string
  error?: string
}

const mapDifficulty = (difficulty: string): Difficulty => {
  const difficultyMap: Record<string, Difficulty> = {
    'easy': 'easy' as Difficulty,
    'medium': 'medium' as Difficulty,
    'hard': 'hard' as Difficulty
  }
  return difficultyMap[difficulty.toLowerCase()] || 'medium' as Difficulty
}

export const useRecipes = () => {
  const recipesStore = useRecipesStore()
  const loading = ref(false)

  const fetchRecipes = async (cookingTime?: number, difficulty?: string, filters?: string[], cuisine?: string[]) => {
    console.log('Načítavanie receptov', cookingTime, difficulty, filters, cuisine)
    try {
      loading.value = true
      const { data, error } = await useFetch<ApiResponse>('/api/recipes', {
        query: {
          maxLength: cookingTime,
          difficulty,
          filters,
          cuisine
        }
      })

      if (error.value) {
        throw new Error(`Chyba API: ${error.value}`)
      }

      if (!data.value) {
        throw new Error('Nepodarilo sa získať dáta z API')
      }

      if (!data.value.data?.recipes) {
        console.warn('Nenašli sa žiadne recepty v odpovedi:', data.value)
        return
      }


      const apiRecipes = data.value.data.recipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.title,
        ingredients: recipe.ingredients?.map(ingredient => ({
          name: ingredient,
          amount: 1,
          unit: 'ks'
        })),
        instructions: recipe.instructions.split('\n'),
        cookingTime: parseInt(recipe.preparationTime),
        difficulty: mapDifficulty(recipe.difficulty),
        servings: recipe.servings
      }))

      recipesStore.$reset()
      apiRecipes.forEach(recipe => recipesStore.addRecipe(recipe))
      recipesStore.setLastFetchTime()
    } catch (error) {
      console.error('Chyba pri načítaní receptov:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    fetchRecipes,
    loading
  }
} 