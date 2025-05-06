import { defineEventHandler } from 'h3'
import OpenAI from 'openai'
import { cache } from '~/utils/cache'

export default defineEventHandler(async (event) => {
  console.log('Načítavanie receptov z API')

  // Only handle GET requests
  if (event.method !== 'GET') {
    return {
      status: 'error',
      error: 'Metóda nie je povolená'
    }
  }

  const config = useRuntimeConfig()
  // Need to await getQuery since it returns a promise
  const query = await getQuery(event)
  const { maxLength, difficulty, filters } = query
  // Generate cache key based on filter params
  const cacheKey = `recipes-${maxLength}-${difficulty}-${filters}`
  // Check cache first
  const cachedRecipes = cache.get(cacheKey) as { recipes: any[] }

  if (cachedRecipes?.recipes?.length) {
    console.log('Vracam recepty z cache')
    return {
      status: 'success',
      data: {
        recipes: cachedRecipes
      }
    }
  }

  try {
    // Call OpenAI API to generate recipes
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    })

    let prompt = `Vygeneruj 3 unikátne recepty v JSON formáte v slovenskom jazyku. Výstup musí byť čistý JSON vo formáte: [ { ... }, { ... }, { ... } ].
 Každý recept musí obsahovať:
- id (string)
- title (string) 
- description (string)
- ingredients (array of strings)
- instructions (string with numbered steps)
- preparationTime (string representing minutes)
- servings (number)
- difficulty (string: Easy, Medium, or Hard)`

    if (maxLength) {
      prompt += `\nČas prípravy by nemal presiahnuť ${maxLength} minút`
    }

    if (difficulty) {
      prompt += `\nVšetky recepty by mali byť ${difficulty} náročnosti`
    }

    if (filters) {
      console.log('filters', filters)
      prompt += `\nVšetky recepty by mali byť ${filters}`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "user", content: prompt}
      ],
      temperature: 0.7
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('Nepodarilo sa získať obsah z OpenAI')
    }
    const recipes = JSON.parse(content)
    // Cache the recipes with the filter-specific key
    cache.set(cacheKey, recipes)

    return {
      status: 'success', 
      data: {
        recipes
      }
    }

  } catch (error) {
    console.error('Chyba pri načítaní receptov:', error)
    return {
      status: 'error',
      error: 'Nepodarilo sa načítať recepty'
    }
  }
})