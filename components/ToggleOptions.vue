<template>
  <div class="space-y-2">
    <div v-for="option in options" :key="option.value" class="flex items-center">
      <ToggleButton
        :label="option.label"
        :selected="isSelected(option.value)"
        @click="toggleOption(option.value)"
      />
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