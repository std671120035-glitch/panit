import { Router, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, AuthPayload } from '../types/auth'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload
    req.userId = decoded.id
    req.userRole = decoded.role
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}

export const generateToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}
