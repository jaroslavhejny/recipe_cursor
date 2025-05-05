<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="recipe?.title || 'Recipe Details'"
        :description="recipe?.description"
      />

      <UPageBody>
        <UCard v-if="recipe">
          <template #header>
            <div class="flex items-center justify-between">
              <UBadge
                :label="recipe.difficulty"
                :color="getDifficultyColor(recipe.difficulty)"
                size="sm"
              />
              <div class="flex items-center gap-2">
                <UBadge
                  :label="`${recipe.cookingTime} min`"
                  color="gray"
                  variant="soft"
                  icon="i-heroicons-clock"
                />
                <UBadge
                  :label="`${recipe.servings} servings`"
                  color="gray"
                  variant="soft"
                  icon="i-heroicons-users"
                />
              </div>
            </div>
          </template>

          <div class="space-y-6">
            <UCard>
              <template #header>
                <UHeading :level="3">Ingredients</UHeading>
              </template>
              <UList>
                <UListItem
                  v-for="ingredient in recipe.ingredients"
                  :key="ingredient.name"
                >
                  <div class="flex items-center justify-between">
                    <span>{{ ingredient.name }}</span>
                    <span class="text-gray-500">
                      {{ ingredient.amount }} {{ ingredient.unit }}
                    </span>
                  </div>
                </UListItem>
              </UList>
            </UCard>

            <UCard>
              <template #header>
                <UHeading :level="3">Instructions</UHeading>
              </template>
              <UList ordered>
                <UListItem
                  v-for="(instruction, index) in recipe.instructions"
                  :key="index"
                >
                  {{ instruction }}
                </UListItem>
              </UList>
            </UCard>
          </div>

          <template #footer>
            <div class="flex justify-end">
              <UButton
                to="/"
                color="gray"
                variant="ghost"
                icon="i-heroicons-arrow-left"
              >
                Back to Recipes
              </UButton>
            </div>
          </template>
        </UCard>

        <UCard v-else>
          <template #header>
            <UPageHeader
              title="Recipe Not Found"
              description="The recipe you're looking for doesn't exist"
            />
          </template>
          <template #footer>
            <div class="flex justify-end">
              <UButton
                to="/"
                color="primary"
                variant="ghost"
                icon="i-heroicons-arrow-left"
              >
                Back to Recipes
              </UButton>
            </div>
          </template>
        </UCard>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const recipesStore = useRecipesStore()
console.log('route', route.params.id);
console.log('recipesStore', route.params.id, recipesStore.getAllRecipes);
const recipe = computed(() => recipesStore.getRecipeById(route.params.id as string))

const getDifficultyColor = (difficulty?: string) => {
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