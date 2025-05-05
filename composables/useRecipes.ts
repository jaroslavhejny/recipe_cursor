import { useRecipesStore } from '~/stores/recipes'

interface ApiRecipe {
  id: string
  title: string
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

export const useRecipes = () => {
  const recipesStore = useRecipesStore()
  console.log('useRecipes')

  const fetchRecipes = async () => {
    console.log('Starting to fetch recipes...')
    try {
      const { data, error } = await useFetch<ApiResponse>('/api/recipes', {
        baseURL: '/api'
      })
      console.log('API Response:', data.value)
      console.log('API Error:', error.value)

      if (error.value) {
        throw new Error(`API Error: ${error.value}`)
      }

      if (!data.value) {
        throw new Error('No data received from API')
      }

      if (!data.value.data?.recipes) {
        console.warn('No recipes found in response:', data.value)
        return
      }

      const apiRecipes = data.value.data.recipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.title, // Using title as description since API doesn't provide one
        ingredients: recipe.ingredients.map(ingredient => ({
          name: ingredient,
          amount: 1, // Default amount since API doesn't provide amounts
          unit: 'unit' // Default unit since API doesn't provide units
        })),
        instructions: recipe.instructions.split('\n'),
        cookingTime: parseInt(recipe.preparationTime), 
        difficulty: recipe.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
        servings: recipe.servings
      }))

      console.log('Processed recipes:', apiRecipes)

      // Clear existing recipes and add new ones
      recipesStore.$reset()
      apiRecipes.forEach(recipe => recipesStore.addRecipe(recipe))
      console.log('Recipes added to store:', recipesStore.recipes)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      throw error
    }
  }

  return {
    fetchRecipes
  }
} 