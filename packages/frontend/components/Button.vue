<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg',
      // Size variants
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'md' && 'px-4 py-2.5 text-base',
      size === 'lg' && 'px-6 py-3 text-lg',
      // Variant styles
      variant === 'primary' && 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
      variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-300',
      variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg',
      variant === 'outline' && 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
      variant === 'ghost' && 'text-gray-700 hover:bg-gray-100',
      // Disabled state
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    ]"
    :disabled="disabled"
  >
    <!-- Icon support -->
    <svg v-if="iconLeft" :class="['w-5 h-5', iconRight && 'mr-2']" fill="currentColor" viewBox="0 0 20 20">
      <slot name="icon-left" />
    </svg>

    <!-- Slot for text -->
    <slot />

    <!-- Icon support -->
    <svg v-if="iconRight" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
      <slot name="icon-right" />
    </svg>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    iconLeft?: boolean
    iconRight?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconLeft: false,
    iconRight: false,
  }
)
</script>
