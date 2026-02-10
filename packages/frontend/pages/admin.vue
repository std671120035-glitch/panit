<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-red-50 to-orange-100">
    <!-- Navigation -->
    <Navbar />

    <!-- Access Denied Section -->
    <template v-if="!auth.isAdmin.value">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-12 shadow-xl max-w-2xl mx-auto">
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div class="w-24 h-24 bg-linear-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 4v2M12 3a9 9 0 110 18 9 9 0 010-18z"></path>
                </svg>
              </div>
            </div>
            <h1 class="text-6xl font-bold text-red-600 mb-2">403</h1>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Forbidden</h2>
            <p class="text-lg text-red-700 mb-2">สิทธิ์ไม่ถึง</p>
            <p class="text-gray-600 mb-8 text-lg">คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้</p>
            <p class="text-gray-600 mb-8">You do not have administrator privileges to access this page.</p>
            <NuxtLink
              to="/"
              class="inline-block px-8 py-3 bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Back to Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>

    <!-- Admin Content -->
    <template v-else>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Header -->
        <div class="mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p class="text-gray-600">Welcome to the administration panel</p>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-1">Total Users</p>
            <p class="text-3xl font-bold text-gray-900">12</p>
          </div>

          <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-1">Active Users</p>
            <p class="text-3xl font-bold text-gray-900">8</p>
          </div>

          <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-1">Administrators</p>
            <p class="text-3xl font-bold text-gray-900">3</p>
          </div>
        </div>

        <!-- Admin Actions -->
        <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-lg mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-8">Admin Actions</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <button class="group p-6 bg-linear-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-xl transition duration-300">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <p class="font-bold text-gray-900 text-left">Manage Users</p>
            </button>
            <button class="group p-6 bg-linear-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-xl transition duration-300">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <p class="font-bold text-gray-900 text-left">View Logs</p>
            </button>
            <button class="group p-6 bg-linear-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-xl transition duration-300">
              <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <p class="font-bold text-gray-900 text-left">Settings</p>
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex gap-4">
          <NuxtLink
            to="/profile"
            class="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-xl text-center"
          >
            Back to Profile
          </NuxtLink>
          <NuxtLink
            to="/"
            class="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-xl text-center"
          >
            Home
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from '#app'

const auth = useAuth()
const router = useRouter()

onMounted(() => {
  auth.initAuth()

  // Redirect if not authenticated
  if (!auth.isAuthenticated.value) {
    router.push('/auth/login')
  }
})
</script>
