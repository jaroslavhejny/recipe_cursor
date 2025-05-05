<template>
  <div>
    <h1>Recipes</h1>
    <div class="recipe-list">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <h2 class="recipe-title" @click="navigateTo(`/recipe/${recipe.id}`)">{{ recipe.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: recipesResponse } = await useFetch('/api/recipes')
const recipes = computed(() => recipesResponse.value?.data?.recipes || [])
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