<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation -->
    <Navbar />

    <!-- Hero Section -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div class="text-center mb-20">
        <h1 class="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Welcome to <span class="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Panit</span>
        </h1>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          A modern full-stack application featuring secure JWT authentication, role-based access control, and beautiful responsive design.
        </p>

        <!-- Divider -->
        <div class="flex justify-center mb-12">
          <div class="h-1 w-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <template v-if="!auth.isAuthenticated.value">
            <NuxtLink
              to="/auth/login"
              class="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 font-semibold transition"
            >
              Create Account
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink
              to="/profile"
              class="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go to Profile
            </NuxtLink>
            <NuxtLink
              v-if="auth.isAdmin.value"
              to="/admin"
              class="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Admin Dashboard
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Feature 1 -->
        <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 hover:shadow-xl transition duration-300 group">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Secure Auth</h3>
          <p class="text-gray-600">JWT-based authentication with secure token management and password encryption.</p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 hover:shadow-xl transition duration-300 group">
          <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
          <p class="text-gray-600">Control permissions with flexible roles including Admin, User, and Moderator levels.</p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 hover:shadow-xl transition duration-300 group">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Beautiful Design</h3>
          <p class="text-gray-600">Modern UI built with Tailwind CSS for a responsive and elegant user experience.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()

onMounted(() => {
  auth.initAuth()
})
</script>
