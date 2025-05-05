import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  console.log('Fetching recipes api')

  // Only handle GET requests
  if (event.method !== 'GET') {
    return {
      status: 'error',
      error: 'Method not allowed'
    }
  }
  try {
    // Example recipes data
    const recipes = [
      {
        id: '1',
        title: 'Spaghetti Carbonara',
        ingredients: [
          '400g spaghetti',
          '200g pancetta or guanciale',
          '4 large eggs',
          '100g Pecorino Romano cheese',
          '100g Parmigiano Reggiano',
          'Black pepper',
          'Salt'
        ],
        instructions: '1. Cook pasta in salted water until al dente\n2. Fry pancetta until crispy\n3. Mix eggs and grated cheese\n4. Combine hot pasta with pancetta, then mix in egg mixture\n5. Season with black pepper',
        preparationTime: '25',
        servings: 4,
        difficulty: 'Medium'
      },
      {
        id: '2',
        title: 'Classic Caesar Salad',
        ingredients: [
          'Romaine lettuce',
          'Croutons',
          'Parmesan cheese',
          '2 cloves garlic',
          'Anchovy fillets',
          'Egg yolk',
          'Olive oil',
          'Lemon juice'
        ],
        instructions: '1. Make dressing by blending garlic, anchovies, egg yolk, and lemon juice\n2. Slowly whisk in olive oil\n3. Tear lettuce into bite-sized pieces\n4. Toss lettuce with dressing\n5. Top with croutons and shaved parmesan',
        preparationTime: '15',
        servings: 2,
        difficulty: 'Easy'
      }
    ]

    return {
      status: 'success',
      data: {
        recipes
      }
    }
  } catch (error) {
    console.error('Error in recipes API:', error)
    return {
      status: 'error',
      error: 'Failed to fetch recipes'
    }
  }
}) 