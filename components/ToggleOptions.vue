<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
    <div
      v-for="option in options"
      :key="option.value"
      class="relative group"
    >
      <ToggleButton
        :label="option.label"
        :selected="isSelected(option.value)"
        @click="toggleOption(option.value)"
        class="w-full transform transition-all duration-200 hover:scale-105"
      >
        <div
          class="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-200"
        />
        <div
          v-if="isSelected(option.value)"
          class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"
        />
      </ToggleButton>
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