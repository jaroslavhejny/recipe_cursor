<template>
  <div class="w-full">
    <div class="relative w-full" ref="sliderContainer">
      <!-- Track -->
      <div class="absolute w-full h-2 bg-gray-200 rounded-full top-1/2 -translate-y-1/2"></div>
      
      <!-- Active track -->
      <div 
        class="absolute h-2 bg-blue-500 rounded-full top-1/2 -translate-y-1/2 transition-all duration-100"
        :style="{
          width: `${((modelValue - min) / (max - min)) * 100}%`
        }"
      ></div>

      <!-- Thumb -->
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        @input="updateValue"
        class="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
      >
      <div 
        class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform shadow-md"
        :class="{ 'ring-2 ring-blue-300 scale-110': isDragging }"
        :style="{ left: `${((modelValue - min) / (max - min)) * 100}%` }"
        @mousedown="startDragging($event)"
        @touchstart="startDragging($event)"
      >
        <div 
          v-if="isDragging"
          class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          {{ modelValue }}
        </div>
      </div>

      <!-- Labels -->
      <div class="flex justify-between mt-6">
        <span class="text-sm text-gray-600">{{ min }}</span>
        <span class="text-sm text-gray-600">{{ max }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const sliderContainer = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const getEventPosition = (e: MouseEvent | TouchEvent) => {
  if ('touches' in e) {
    return e.touches[0].clientX
  }
  return e.clientX
}

const startDragging = (e: MouseEvent | TouchEvent) => {
  e.preventDefault()
  isDragging.value = true
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('touchmove', handleDrag)
  document.addEventListener('mouseup', stopDragging)
  document.addEventListener('touchend', stopDragging)
}

const stopDragging = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('mouseup', stopDragging)
  document.removeEventListener('touchend', stopDragging)
}

const handleDrag = (e: MouseEvent | TouchEvent) => {
  if (!sliderContainer.value) return

  const rect = sliderContainer.value.getBoundingClientRect()
  const x = getEventPosition(e) - rect.left
  const percentage = Math.max(0, Math.min(1, x / rect.width))
  const value = Math.round((props.max - props.min) * percentage + props.min)
  
  updateValue(value)
}

const updateValue = (value: number | Event) => {
  const newValue = typeof value === 'number' ? value : Number((value.target as HTMLInputElement).value)
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
  pointer-events: none;
}

input[type="range"]::-moz-range-thumb {
  width: 0;
  height: 0;
  pointer-events: none;
}
</style> 