<template>
  <div class="w-full">
    <div class="relative w-full" ref="sliderContainer">
      <!-- Track -->
      <div class="absolute w-full h-2 bg-gray-200 rounded-full top-1/2 -translate-y-1/2"></div>
      
      <!-- Active track -->
      <div 
        class="absolute h-2 bg-blue-500 rounded-full top-1/2 -translate-y-1/2 transition-all duration-100"
        :style="{
          left: `${(modelValue[0] - min) / (max - min) * 100}%`,
          width: `${(modelValue[1] - modelValue[0]) / (max - min) * 100}%`
        }"
      ></div>

      <!-- Thumb for min value -->
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue[0]"
        @input="updateMinValue"
        class="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
      >
      <div 
        class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform shadow-md"
        :class="{ 'ring-2 ring-blue-300 scale-110': isDraggingMin }"
        :style="{ left: `${(modelValue[0] - min) / (max - min) * 100}%` }"
        @mousedown="startDragging('min', $event)"
        @touchstart="startDragging('min', $event)"
      >
        <div 
          v-if="isDraggingMin"
          class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          {{ modelValue[0] }}
        </div>
      </div>

      <!-- Thumb for max value -->
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue[1]"
        @input="updateMaxValue"
        class="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
      >
      <div 
        class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform shadow-md"
        :class="{ 'ring-2 ring-blue-300 scale-110': isDraggingMax }"
        :style="{ left: `${(modelValue[1] - min) / (max - min) * 100}%` }"
        @mousedown="startDragging('max', $event)"
        @touchstart="startDragging('max', $event)"
      >
        <div 
          v-if="isDraggingMax"
          class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
        >
          {{ modelValue[1] }}
        </div>
      </div>
    </div>

    <!-- Value labels -->
    <div class="flex justify-between mt-2 text-sm text-gray-600">
      <span>{{ modelValue[0] }}</span>
      <span>{{ modelValue[1] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: [number, number]
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
  'update:modelValue': [value: [number, number]]
}>()

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const sliderContainer = ref<HTMLElement | null>(null)
const isDraggingMin = ref(false)
const isDraggingMax = ref(false)
let activeThumb: 'min' | 'max' | null = null

const getEventPosition = (e: MouseEvent | TouchEvent) => {
  if ('touches' in e) {
    return e.touches[0].clientX
  }
  return e.clientX
}

const startDragging = (thumb: 'min' | 'max', e: MouseEvent | TouchEvent) => {
  e.preventDefault()
  activeThumb = thumb
  if (thumb === 'min') {
    isDraggingMin.value = true
  } else {
    isDraggingMax.value = true
  }
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('touchmove', handleDrag)
  document.addEventListener('mouseup', stopDragging)
  document.addEventListener('touchend', stopDragging)
}

const stopDragging = () => {
  activeThumb = null
  isDraggingMin.value = false
  isDraggingMax.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('mouseup', stopDragging)
  document.removeEventListener('touchend', stopDragging)
}

const handleDrag = (e: MouseEvent | TouchEvent) => {
  if (!activeThumb || !sliderContainer.value) return

  const rect = sliderContainer.value.getBoundingClientRect()
  const x = getEventPosition(e) - rect.left
  const percentage = Math.max(0, Math.min(1, x / rect.width))
  const value = Math.round((props.max - props.min) * percentage + props.min)
  
  if (activeThumb === 'min') {
    updateMinValue(value)
  } else {
    updateMaxValue(value)
  }
}

const updateMinValue = (value: number | Event) => {
  const newValue = typeof value === 'number' ? value : Number((value.target as HTMLInputElement).value)
  if (newValue < props.min || newValue > modelValue.value[1]) return
  emit('update:modelValue', [newValue, modelValue.value[1]])
}

const updateMaxValue = (value: number | Event) => {
  const newValue = typeof value === 'number' ? value : Number((value.target as HTMLInputElement).value)
  if (newValue > props.max || newValue < modelValue.value[0]) return
  emit('update:modelValue', [modelValue.value[0], newValue])
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