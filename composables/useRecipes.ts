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

  const fetchRecipes = async () => {
    try {
      const { data } = await useFetch<ApiResponse>('/api/recipes')
      if (!data.value?.data?.recipes) {
        throw new Error('Failed to fetch recipes')
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

      // Clear existing recipes and add new ones
      recipesStore.$reset()
      apiRecipes.forEach(recipe => recipesStore.addRecipe(recipe))
    } catch (error) {
      console.error('Error fetching recipes:', error)
    }
  }

  return {
    fetchRecipes
  }
} 