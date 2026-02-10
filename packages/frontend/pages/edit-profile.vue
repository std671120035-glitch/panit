<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation -->
    <Navbar />

    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/profile" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium mb-4 inline-block">
          ← Back to Profile
        </NuxtLink>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Edit Profile</h1>
        <p class="text-gray-600">Update your personal information securely</p>
      </div>

      <!-- Alert Messages -->
      <Alert v-if="successMessage" type="success" closeable @close="successMessage = ''">
        {{ successMessage }}
      </Alert>

      <Alert v-if="errorMessage" type="error" closeable @close="errorMessage = ''">
        {{ errorMessage }}
      </Alert>

      <!-- Edit Form -->
      <div class="bg-white/50 backdrop-blur border border-white/60 rounded-2xl p-8 shadow-lg">
        <form @submit.prevent="handleUpdateProfile" class="space-y-6">
          <!-- Personal Information Section -->
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Personal Information</h2>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <Input
                v-model="formData.name"
                type="text"
                label="Full Name"
                placeholder="John Doe"
              />

              <!-- Email (Read-only) -->
              <Input
                :model-value="auth.user.value?.email || ''"
                type="email"
                label="Email Address"
                disabled
                hint="Email cannot be changed"
              />
            </div>
          </div>

          <!-- Security Section -->
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Change Password</h2>
            <p class="text-gray-600 text-sm mb-4">Leave blank if you don't want to change your password</p>

            <div class="space-y-4">
              <!-- Current Password -->
              <Input
                v-model="formData.currentPassword"
                type="password"
                label="Current Password"
                required
                placeholder="••••••••"
                hint="Required to confirm your identity"
              />

              <!-- New Password -->
              <Input
                v-model="formData.newPassword"
                type="password"
                label="New Password"
                placeholder="••••••••"
                hint="Minimum 8 characters"
              />

              <!-- Confirm Password -->
              <Input
                v-if="formData.newPassword"
                v-model="formData.confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                :error="formData.newPassword && formData.newPassword !== formData.confirmPassword ? '⚠️ Passwords do not match' : ''"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              :disabled="isLoading"
              variant="primary"
              class="flex-1"
            >
              {{ isLoading ? 'Saving...' : 'Save Changes' }}
            </Button>
            <NuxtLink
              to="/profile"
              class="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition text-center"
            >
              Cancel
            </NuxtLink>
          </div>
        </form>
      </div>

      <!-- Security Tips -->
      <div class="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-blue-900 mb-3">🔒 Security Tips</h3>
        <ul class="space-y-2 text-blue-800 text-sm">
          <li>✓ Use a strong password with numbers and special characters</li>
          <li>✓ Never share your password with anyone</li>
          <li>✓ Change your password regularly (at least every 3 months)</li>
          <li>✓ Log out from all sessions after changing password</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from '#app'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const formData = reactive({
  name: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(() => {
  auth.initAuth()

  // Redirect if not authenticated
  if (!auth.isAuthenticated.value) {
    router.push('/auth/login')
    return
  }

  // Load current name
  formData.name = auth.user.value?.name || ''
})

const handleUpdateProfile = async () => {
  // Clear messages
  successMessage.value = ''
  errorMessage.value = ''

  // Validation
  if (!formData.currentPassword) {
    errorMessage.value = 'Current password is required for security purposes'
    return
  }

  if (formData.newPassword && formData.newPassword.length < 8) {
    errorMessage.value = 'New password must be at least 8 characters'
    return
  }

  if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isLoading.value = true

  try {
    // Call API to update profile
    const response = await fetch('http://localhost:3000/api/auth/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token.value}`
      },
      body: JSON.stringify({
        name: formData.name,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword || undefined
      })
    })

    const data = await response.json()

    if (!response.ok) {
      errorMessage.value = data.error || 'Failed to update profile'
      return
    }

    // Update local auth state
    if (auth.user.value) {
      auth.user.value.name = formData.name
      localStorage.setItem('auth.user', JSON.stringify(auth.user.value))
    }

    successMessage.value = 'Profile updated successfully!'

    // Reset password fields
    formData.currentPassword = ''
    formData.newPassword = ''
    formData.confirmPassword = ''

    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/profile')
    }, 2000)
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
