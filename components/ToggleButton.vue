<template>
  <button
    @click="$emit('click')"
    class="flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200"
    :class="[
      selected
        ? 'bg-blue-100 hover:bg-blue-200'
        : 'bg-gray-50 hover:bg-gray-100'
    ]"
  >
    <span class="font-medium">{{ label }}</span>
    <div
      class="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
      :class="[
        selected
          ? 'bg-blue-500'
          : 'bg-gray-300'
      ]"
    >
      <svg
        v-if="selected"
        class="w-4 h-4 text-white transform transition-transform duration-200"
        :class="{ 'scale-100': selected, 'scale-0': !selected }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  selected: boolean
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.scale-0 {
  transform: scale(0);
}

.scale-100 {
  transform: scale(1);
}
</style> 