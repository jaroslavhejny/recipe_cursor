<template>
  <div class="w-full">
    <div class="flex justify-between gap-4">
      <button
        v-for="difficulty in difficulties"
        :key="difficulty"
        class="flex-1 py-2 px-4 rounded-full font-medium transition-all duration-200 border-2 cursor-pointer hover:scale-105"
        :class="[
          modelValue === difficulty ? [
            getDifficultyColor(difficulty, 'bg'),
            'text-white'
          ] : [
            'bg-white',
            getDifficultyColor(difficulty, 'text'),
            getDifficultyColor(difficulty, 'border')
          ],
          'hover:opacity-90'
        ]"
        @click="emit('update:modelValue', difficulty)"
      >
        {{ difficulty }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Difficulty } from '~/types/recipe'

interface Props {
  modelValue: Difficulty
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: Difficulty]
}>()

const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

const sliderContainer = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const getDifficultyIndex = (difficulty: Difficulty): number => {
  return difficulties.indexOf(difficulty)
}

const getDifficultyColor = (difficulty: Difficulty, type: 'bg' | 'border' | 'text' = 'bg'): string => {
  const colors = {
    'easy': {      
      bg: 'bg-green-500',
      border: 'border-green-500',
      text: 'text-green-500'
    },
    'medium': {
      bg: 'bg-yellow-500',
      border: 'border-yellow-500',
      text: 'text-yellow-500'
    },
    'hard': {
      bg: 'bg-red-500',
      border: 'border-red-500',
      text: 'text-red-500'
    }
  }

  return colors[difficulty][type]
}

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
  const index = Math.round((difficulties.length - 1) * percentage)
  
  updateValue(index)
}

const updateValue = (value: number | Event) => {
  const index = typeof value === 'number' ? value : Number((value.target as HTMLInputElement).value)
  emit('update:modelValue', difficulties[index])
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