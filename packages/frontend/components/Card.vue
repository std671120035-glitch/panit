<template>
  <div :class="['overflow-hidden rounded-2xl', shadowClass, 'bg-white/50 backdrop-blur border border-white/60']">
    <!-- Header -->
    <div v-if="$slots.header" :class="['px-6 py-4 border-b border-gray-200/50', headerClass]">
      <slot name="header" />
    </div>

    <!-- Body -->
    <div :class="['px-6 py-6', bodyClass]">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" :class="['px-6 py-4 border-t border-gray-200/50 bg-gray-50/50', footerClass]">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    shadow?: 'none' | 'sm' | 'md' | 'lg'
    headerClass?: string
    bodyClass?: string
    footerClass?: string
  }>(),
  {
    shadow: 'lg',
  }
)

const shadowClass = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg hover:shadow-xl transition-shadow duration-300'
}
</script>
