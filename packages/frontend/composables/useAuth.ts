// Auth API Composable
import axios, { AxiosInstance } from 'axios'
import { ref, computed } from 'vue'

const API_BASE_URL = 'http://localhost:3000'

interface User {
  id: number
  email: string
  name: string | null
  role: string
}

interface AuthResponse {
  token: string
  user: User
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Singleton state - shared across all components
const token = ref<string | null>(null)
const user = ref<User | null>(null)
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

export const useAuth = () => {
  // Initialize from localStorage on mount
  const initAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth.token')
      const savedUser = localStorage.getItem('auth.user')

      if (savedToken) {
        token.value = savedToken
        api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
      }

      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser)
        } catch (e) {
          // Invalid JSON, clear it
          localStorage.removeItem('auth.user')
        }
      }
    }
  }

  const register = async (email: string, password: string, name?: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<AuthResponse>('/api/auth/register', {
        email,
        password,
        name
      })

      const { token: newToken, user: newUser } = response.data
      token.value = newToken
      user.value = newUser

      if (process.client) {
        localStorage.setItem('auth.token', newToken)
        localStorage.setItem('auth.user', JSON.stringify(newUser))
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      }

      return { success: true }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Registration failed'
      error.value = errorMsg
      return { success: false, error: errorMsg }
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<AuthResponse>('/api/auth/login', {
        email,
        password
      })

      const { token: newToken, user: newUser } = response.data
      token.value = newToken
      user.value = newUser

      if (process.client) {
        localStorage.setItem('auth.token', newToken)
        localStorage.setItem('auth.user', JSON.stringify(newUser))
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      }

      return { success: true }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Login failed'
      error.value = errorMsg
      return { success: false, error: errorMsg }
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    if (!token.value) return

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      const response = await api.get<{ user: User }>('/api/auth/me')
      user.value = response.data.user
    } catch (err) {
      logout()
    }
  }

  const logout = () => {
    token.value = null
    user.value = null

    if (process.client) {
      localStorage.removeItem('auth.token')
      localStorage.removeItem('auth.user')
    }

    delete api.defaults.headers.common['Authorization']
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout,
    fetchUser,
    initAuth
  }
}
