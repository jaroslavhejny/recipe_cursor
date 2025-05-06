export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Ingredient {
  name: string
  amount: number
  unit: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: string[] // Always an array of strings
  cookingTime: number // in minutes
  difficulty: Difficulty
  servings: number
  createdAt: string
  updatedAt: string
} 