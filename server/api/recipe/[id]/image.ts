import { defineEventHandler } from 'h3'
import { useRecipesStore } from '~/stores/recipes'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const query = await getQuery(event)
  const { name } = query

  if (!name) {
    return {
      status: 'error',
      error: 'Chýba meno receptu'
    }
  }

  try {
    // Use Unsplash API to get a random food image
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(name + ' food')}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${config.unsplashAccessKey}`
        }
      }
    )


    if (!unsplashResponse.ok) {
      throw new Error('Nepodarilo sa získať obrázok z Unsplash')
    }

    const imageData = await unsplashResponse.json()
    const imageUrl = imageData.urls.regular

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