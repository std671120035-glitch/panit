<template>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-white via-indigo-50/50 to-white backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo Section -->
        <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition duration-300 group">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-600 via-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition duration-300 group-hover:scale-105">
            <span class="text-white font-bold text-xl">P</span>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Panit</h1>
            <p class="text-xs text-gray-500 font-medium">Dashboard</p>
          </div>
        </NuxtLink>

        <!-- Navigation Items -->
        <div class="flex gap-4 items-center">
          <!-- Not Authenticated -->
          <template v-if="!auth.isAuthenticated.value">
            <NuxtLink
              to="/auth/login"
              class="px-5 py-2.5 text-gray-700 font-semibold hover:text-indigo-600 transition duration-300 border border-transparent hover:border-indigo-200 rounded-lg hover:bg-indigo-50"
            >
              Sign In
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 font-semibold transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign Up
            </NuxtLink>
          </template>

          <!-- Authenticated -->
          <template v-else>
            <div class="flex gap-3 items-center pl-4 border-l-2 border-gray-300/50">
              <!-- User Profile Card -->
              <div class="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition duration-300 group">
                <!-- Avatar -->
                <div class="w-9 h-9 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {{ getInitials(auth.user.value?.name || auth.user.value?.email) }}
                </div>
                <!-- User Info -->
                <div class="hidden lg:block">
                  <p class="text-sm font-semibold text-gray-900">{{ truncate(auth.user.value?.name || auth.user.value?.email, 15) }}</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-medium text-gray-500">{{ auth.user.value?.role }}</span>
                  </div>
                </div>
              </div>

              <!-- Admin Link (if admin) -->
              <NuxtLink
                v-if="auth.isAdmin.value"
                to="/admin"
                class="hidden sm:flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition duration-300 text-sm"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.488 5.951 1.488a1 1 0 001.169-1.409l-7-14z"></path>
                </svg>
                Admin
              </NuxtLink>

              <!-- Logout Button -->
              <button
                @click="handleLogout"
                class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition duration-300 text-sm group"
              >
                <svg class="w-4 h-4 group-hover:scale-110 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span class="hidden sm:inline">Logout</span>
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

// Get initials from name or email
const getInitials = (str: string | undefined) => {
  if (!str) return 'U'
  return str
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Truncate text
const truncate = (str: string | undefined, length: number) => {
  if (!str) return ''
  return str.length > length ? str.slice(0, length) + '...' : str
}
</script>
