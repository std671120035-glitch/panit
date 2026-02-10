<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

// Initialize auth on app mount
const auth = useAuth()

onMounted(() => {
    auth.initAuth()
})
</script>
