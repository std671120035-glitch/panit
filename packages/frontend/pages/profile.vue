<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation -->
    <Navbar />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Profile Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p class="text-gray-600">Welcome back, {{ auth.user.value?.name || auth.user.value?.email }}!</p>
      </div>

      <!-- Main Grid -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Account Information Card -->
        <div class="md:col-span-2">
          <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">Account Information</h2>

            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  :value="auth.user.value?.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 cursor-not-allowed font-medium"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  :value="auth.user.value?.name || 'Not set'"
                  type="text"
                  disabled
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 cursor-not-allowed font-medium"
                />
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                  <input
                    :value="auth.user.value?.id"
                    type="text"
                    disabled
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 cursor-not-allowed font-mono text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <div
                    :class="{
                      'bg-red-100 text-red-800': auth.user.value?.role === 'ADMIN',
                      'bg-blue-100 text-blue-800': auth.user.value?.role === 'USER',
                      'bg-purple-100 text-purple-800': auth.user.value?.role === 'MODERATOR'
                    }"
                    class="w-full px-4 py-3 rounded-xl font-semibold text-center"
                  >
                    {{ auth.user.value?.role }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Status Card -->
        <div class="space-y-6">
          <!-- Role Card -->
          <div
            :class="{
              'from-red-500 to-red-600': auth.user.value?.role === 'ADMIN',
              'from-blue-500 to-blue-600': auth.user.value?.role === 'USER',
              'from-purple-500 to-purple-600': auth.user.value?.role === 'MODERATOR'
            }"
            class="bg-gradient-to-br rounded-2xl p-6 text-white shadow-lg"
          >
            <p class="text-sm font-medium opacity-90 mb-2">Your Role</p>
            <p class="text-3xl font-bold">{{ auth.user.value?.role }}</p>
          </div>

          <!-- Status -->
          <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <p class="text-sm font-medium opacity-90 mb-2">Status</p>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <p class="text-lg font-bold">Authenticated</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Section -->
      <div v-if="auth.isAdmin.value" class="mt-8">
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-8 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-amber-900 mb-2">Admin Access</h2>
              <p class="text-amber-800">You have administrator privileges</p>
            </div>
            <NuxtLink
              to="/admin"
              class="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg"
            >
              Admin Dashboard →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-8 flex gap-4">
        <NuxtLink
          to="/"
          class="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg text-center"
        >
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from '#app'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()

// Initialize auth on mount and check authentication
onMounted(() => {
  auth.initAuth()

  // Redirect if not authenticated
  if (!auth.isAuthenticated.value) {
    router.push('/auth/login')
  }
})
</script>
