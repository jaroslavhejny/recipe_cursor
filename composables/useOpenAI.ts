import OpenAI from 'openai'

export const useOpenAI = () => {
  const config = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: config.public.openaiApiKey as string,
    dangerouslyAllowBrowser: true
  })

  const generateRecipe = async (prompt: string) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful recipe assistant. Generate recipes in a structured format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      })

      return completion.choices[0]?.message?.content
    } catch (error) {
      console.error('Error generating recipe:', error)
      throw error
    }
  }

  return {
    generateRecipe
  }
} 