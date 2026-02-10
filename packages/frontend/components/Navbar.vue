<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">P</span>
          </div>
          <h1 class="text-xl font-bold text-gray-900">Panit</h1>
        </NuxtLink>

        <!-- Navigation Items -->
        <div class="flex gap-3 items-center">
          <!-- Not Authenticated -->
          <template v-if="!auth.isAuthenticated.value">
            <NuxtLink
              to="/auth/login"
              class="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Sign In
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition shadow-md hover:shadow-lg"
            >
              Sign Up
            </NuxtLink>
          </template>

          <!-- Authenticated -->
          <template v-else>
            <div class="flex gap-2 items-center pl-4 border-l border-gray-200">
              <!-- Profile Link -->
              <NuxtLink
                to="/profile"
                class="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium transition"
              >
                {{ auth.user.value?.name || auth.user.value?.email }}
              </NuxtLink>

              <!-- Admin Link (if admin) -->
              <NuxtLink
                v-if="auth.isAdmin.value"
                to="/admin"
                class="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition"
              >
                Admin
              </NuxtLink>

              <!-- Logout Button -->
              <button
                @click="handleLogout"
                class="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from '#app'

const auth = useAuth()
const router = useRouter()

// Initialize auth on mount
onMounted(() => {
  auth.initAuth()
})

const handleLogout = () => {
  auth.logout()
  router.push('/auth/login')
}
</script>
