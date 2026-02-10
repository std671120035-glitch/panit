import { Request } from 'express'

export interface AuthRequest extends Request {
  userId?: number
  userRole?: string
}

export interface AuthPayload {
  id: number
  email: string
  role: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  name?: string
}
