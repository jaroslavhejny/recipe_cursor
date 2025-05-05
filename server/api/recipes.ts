import { defineEventHandler } from 'h3'
import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  console.log('Fetching recipes api')

  // Only handle GET requests
  if (event.method !== 'GET') {
    return {
      status: 'error',
      error: 'Method not allowed'
    }
  }

  const config = useRuntimeConfig()

  try {
    // Call OpenAI API to generate recipes
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    })

    const prompt = `Generate 3 unique recipes in JSON format. Each recipe should include:
- id (string)
- title (string) 
- ingredients (array of strings)
- instructions (string with numbered steps)
- preparationTime (string representing minutes)
- servings (number)
- difficulty (string: Easy, Medium, or Hard)`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "user", content: prompt}
      ],
      temperature: 0.7
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content received from OpenAI')
    }
    console.log('content', content);
    const recipes = JSON.parse(content)
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