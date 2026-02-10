<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation -->
    <Navbar />

    <!-- Register Form -->
    <div class="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-4">
            <span class="text-white font-bold text-2xl">P</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
          <p class="text-gray-600 mt-2">Join us today</p>
        </div>

        <!-- Form Card -->
        <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-xl">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900 mb-2">
              Full Name (Optional)
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
            />
          </div>

          <!-- Error Alert -->
          <div v-if="auth.error.value" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
            <span>{{ auth.error.value }}</span>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="auth.loading.value"
            class="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {{ auth.loading.value ? 'Creating Account...' : 'Sign Up' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-600">Or</span>
          </div>
        </div>

        <!-- Login Link -->
        <p class="text-center text-gray-600 text-sm">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-indigo-600 hover:text-indigo-700 font-semibold">
            Sign In
          </NuxtLink>
        </p>
        </div>

        <!-- Back to home link -->
        <div class="text-center mt-6">
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useRouter } from '#app'

const auth = useAuth()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const handleRegister = async () => {
  const result = await auth.register(form.value.email, form.value.password, form.value.name)
  if (result.success) {
    await router.push('/profile')
  }
}

// Redirect if already logged in
onMounted(() => {
  auth.initAuth()
  if (auth.isAuthenticated.value) {
    router.push('/profile')
  }
})
</script>
