<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Welcome to Recipe App"
        description="Browse our collection of delicious recipes"
      />

      <UPageBody>
        <UCard v-if="recipes.length === 0">
          <template #header>
            <UPageHeader
              title="No Recipes Found"
              description="Start by adding some recipes to your collection"
            />
          </template>
        </UCard>

        <UGrid v-else :cols="{ default: 1, md: 2, lg: 3 }" gap="6">
          <UCard
            v-for="recipe in recipes"
            :key="recipe.id"
            class="hover:shadow-lg transition-shadow"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <UHeading :level="2" class="text-xl font-semibold">
                  {{ recipe.title }}
                </UHeading>
                <UBadge
                  :label="recipe.difficulty"
                  :color="getDifficultyColor(recipe.difficulty)"
                  size="sm"
                />
              </div>
            </template>

            <UDescriptionList>
              <UDescriptionListItem label="Description">
                {{ recipe.description }}
              </UDescriptionListItem>
              <UDescriptionListItem label="Cooking Time">
                {{ recipe.cookingTime }} minutes
              </UDescriptionListItem>
              <UDescriptionListItem label="Servings">
                {{ recipe.servings }}
              </UDescriptionListItem>
              <UDescriptionListItem label="id">
                {{ recipe.id }}
              </UDescriptionListItem>
            </UDescriptionList>

            <template #footer>
              <div class="flex justify-end">
                <UButton
                  :to="`/recipe/${recipe.id}`"
                  color="primary"
                  variant="ghost"
                  icon="i-heroicons-arrow-right"
                >
                  View Recipe
                </UButton>
              </div>
            </template>
          </UCard>
        </UGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
const recipesStore = useRecipesStore()

// Fetch recipes when the component mounts
// Recipes are now fetched in app.vue

// Get all recipes from the store
const recipes = computed(() => recipesStore.getAllRecipes)
console.log(recipes.value);
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'green'
    case 'medium':
      return 'yellow'
    case 'hard':
      return 'red'
    default:
      return 'gray'
  }
}
</script>

<style scoped>
.recipe-list {
  margin: 2rem 0;
}

.recipe-item {
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
}

.recipe-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>