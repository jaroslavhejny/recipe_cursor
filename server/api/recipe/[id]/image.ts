import { defineEventHandler } from 'h3'
import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id

  if (!id) {
    return {
      status: 'error',
      error: 'Chýba ID receptu'
    }
  }

  try {
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    })

    // Get recipe details from the store
    const recipesStore = useRecipesStore()
    const recipe = recipesStore.getRecipeById(id)

    if (!recipe) {
      return {
        status: 'error',
        error: 'Recept nebol nájdený'
      }
    }

    const imagePrompt = `Create a beautiful, appetizing photo of ${recipe.title}. The dish should be presented on a clean plate with professional food photography lighting. Style: realistic, high-quality food photography.`
    
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    })

    const imageUrl = imageResponse.data?.[0]?.url

    if (!imageUrl) {
      throw new Error('Nepodarilo sa vygenerovať obrázok')
    }

    // Update recipe with the new image URL
    recipesStore.updateRecipeImage(id, imageUrl)

    return {
      status: 'success',
      data: {
        imageUrl
      }
    }

  } catch (error) {
    console.error('Chyba pri generovaní obrázka:', error)
    return {
      status: 'error',
      error: 'Nepodarilo sa vygenerovať obrázok'
    }
  }
}) 