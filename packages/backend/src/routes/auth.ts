import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { AuthRequest, LoginPayload, RegisterPayload } from '../types/auth'
import { verifyToken, generateToken } from '../middleware/auth'
import { routeRegistry } from '../utils/routeRegistry'

const router = Router()
const prisma = new PrismaClient()

// Register this module's routes
routeRegistry.register('POST', '/api/auth/register', 'User registration (email, password, name)')
routeRegistry.register('POST', '/api/auth/login', 'User login (email, password)')
routeRegistry.register('GET', '/api/auth/me', 'Get current user information [Auth required]')

// Register route
router.post('/register', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name } = req.body as RegisterPayload

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || undefined,
        role: 'USER'
      }
    })

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login route
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body as LoginPayload

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user
router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
