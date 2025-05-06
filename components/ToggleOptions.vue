<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-end">
      <button
        @click="toggleAll"
        class="px-3 py-1 rounded-lg text-sm transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer"
        :class="[
          allSelected
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ allSelected ? 'Zrušiť všetko' : 'Vybrať všetko' }}
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        @click="toggleOption(option.value)"
        class="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 hover:shadow-md cursor-pointer"
        :class="[
          isSelected(option.value)
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        <img 
          v-if="option.icon && isSelected(option.value)" 
          :src="option.icon" 
          :alt="option.label"
          class="w-5 h-5 object-contain"
        />
        <span>{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string
  icon?: string // URL to the icon/image
}

interface Props {
  modelValue: string[]
  options: Option[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const allSelected = ref(false)

const toggleAll = () => {
  allSelected.value = !allSelected.value
  emit('update:modelValue', allSelected.value ? props.options.map(option => option.value) : [])
}

const isSelected = (value: string) => {
  return props.modelValue.includes(value)
}

const toggleOption = (value: string) => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(value)
  
  if (index === -1) {
    newValue.push(value)
  } else {
    newValue.splice(index, 1)
  }
  
  emit('update:modelValue', newValue)
}
</script> 