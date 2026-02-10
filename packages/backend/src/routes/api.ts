import { Router, Response } from 'express'
import { AuthRequest } from '../types/auth'
import { routeRegistry } from '../utils/routeRegistry'

const router = Router()

// API endpoint that returns all registered endpoints
router.get('/apis', (req: AuthRequest, res: Response) => {
  const routes = routeRegistry.getRoutes()
    .filter(r => r.path !== '/apis') // Exclude this endpoint

  res.status(200).json({
    message: 'Available API endpoints',
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    totalEndpoints: routes.length,
    endpoints: routes,
    note: 'Endpoints are registered in the route registry'
  })
})

export default router
