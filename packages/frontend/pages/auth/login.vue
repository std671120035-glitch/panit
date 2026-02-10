<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation -->
    <Navbar />

    <!-- Login Form -->
    <div class="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-600 to-blue-600 rounded-2xl mb-4">
            <span class="text-white font-bold text-2xl">P</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p class="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <!-- Form Card -->
        <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-xl">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Field -->
          <Input
            v-model="form.email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            required
          />

          <!-- Password Field -->
          <Input
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
          />

          <!-- Error Alert -->
          <Alert v-if="auth.error.value" type="error" closeable>
            {{ auth.error.value }}
          </Alert>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="auth.loading.value"
            variant="primary"
            class="w-full"
          >
            {{ auth.loading.value ? 'Signing In...' : 'Sign In' }}
          </Button>
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

        <!-- Register Link -->
        <p class="text-center text-gray-600 text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-indigo-600 hover:text-indigo-700 font-semibold">
            Sign Up
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
import { useRouter } from '#app'
import { useAuth } from '../../composables/useAuth'

const auth = useAuth()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const result = await auth.login(form.value.email, form.value.password)
  if (result.success) {
    // Redirect after successful login
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
