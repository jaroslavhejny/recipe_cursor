import { defineStore } from 'pinia'
import type { Recipe, Ingredient } from '~/types/recipe'

interface RecipesState {
  recipes: Recipe[]
  totalRecipes: number
}

export const useRecipesStore = defineStore('recipes', {
  state: (): RecipesState => ({
    recipes: [],
    totalRecipes: 0
  }),

  getters: {
    getAllRecipes: (state) => state.recipes,
    getRecipeById: (state) => (id: string) => {
      const recipe = state.recipes.find(recipe => {
        return String(recipe.id) === String(id)
      })
      return recipe
    },
    getTotalRecipes: (state) => state.totalRecipes,
    getRecipesByDifficulty: (state) => (difficulty: Recipe['difficulty']) =>
      state.recipes.filter(recipe => recipe.difficulty === difficulty)
  },

  actions: {
    addRecipe(recipe: Omit<Recipe, 'createdAt' | 'updatedAt'>) {
      const newRecipe: Recipe = {
        ...recipe,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      this.recipes.push(newRecipe)
      this.totalRecipes++
    },

    removeRecipe(id: string) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id)
      this.totalRecipes--
    },

    updateRecipe(id: string, updatedRecipe: Partial<Omit<Recipe, 'createdAt'>>) {
      const index = this.recipes.findIndex(r => r.id === id)
      if (index !== -1) {
        this.recipes[index] = {
          ...this.recipes[index],
          ...updatedRecipe,
          updatedAt: new Date().toISOString()
        }
      }
    },

    addIngredient(recipeId: string, ingredient: Ingredient) {
      const recipe = this.recipes.find(r => r.id === recipeId)
      if (recipe) {
        recipe.ingredients.push(ingredient)
        recipe.updatedAt = new Date().toISOString()
      }
    },

    removeIngredient(recipeId: string, ingredientName: string) {
      const recipe = this.recipes.find(r => r.id === recipeId)
      if (recipe) {
        recipe.ingredients = recipe.ingredients.filter(
          ing => ing.name !== ingredientName
        )
        recipe.updatedAt = new Date().toISOString()
      }
    }
  }
}) 