<template>
  <div class="space-y-2">
    <div v-for="option in options" :key="option.value" class="flex items-center">
      <button
        @click="toggleOption(option.value)"
        class="flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200"
        :class="[
          isSelected(option.value)
            ? 'bg-blue-100 hover:bg-blue-200'
            : 'bg-gray-50 hover:bg-gray-100'
        ]"
      >
        <span class="font-medium">{{ option.label }}</span>
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
          :class="[
            isSelected(option.value)
              ? 'bg-blue-500'
              : 'bg-gray-300'
          ]"
        >
          <svg
            v-if="isSelected(option.value)"
            class="w-4 h-4 text-white"
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
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  modelValue: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const isSelected = (value: string) => {
  return props.modelValue.includes(value)
}

const toggleOption = (value: string) => {
  const newSelection = isSelected(value)
    ? props.modelValue.filter(v => v !== value)
    : [...props.modelValue, value]
  
  emit('update:modelValue', newSelection)
}
</script> 