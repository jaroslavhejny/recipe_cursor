import { defineEventHandler } from 'h3'
import { useRecipesStore } from '~/stores/recipes'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const query = await getQuery(event)
  const { name = 'food' } = query

  if (!name) {
    return {
      status: 'error',
      error: 'Chýba meno receptu'
    }
  }

  try {
    // Use Unsplash API to get a random food image
    const url = `https://api.pexels.com/v1/search?query=${name?.replace('_', ' ')}&per_page=1`
    const imageResponse = await fetch(url,
      {
        headers: {
          'Authorization': `${config.pexelsApiKey}`
        }
      }
    )

    if (!imageResponse.ok) {
      throw new Error('Nepodarilo sa získať obrázok z Unsplash')
    }

    const imageData = await imageResponse.json()
    const imageUrl = imageData.photos[0].src.original




    if (!imageUrl) {
      throw new Error('Nepodarilo sa získať URL obrázka')
    }

    const recipesStore = useRecipesStore()
    // Update recipe with the new image URL
    recipesStore.updateRecipeImage(id || '1', imageUrl)

    return {
      status: 'success',
      data: {
        imageUrl
      }
    }

  } catch (error) {
    console.error('Chyba pri získavaní obrázka:', error)
    return {
      status: 'error',
      error: 'Nepodarilo sa získať obrázok'
    }
  }
}) 