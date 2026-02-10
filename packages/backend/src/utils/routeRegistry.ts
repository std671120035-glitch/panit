// Route registry for tracking all API endpoints
export interface ApiRoute {
  method: string
  path: string
  description: string
}

class RouteRegistry {
  private routes: ApiRoute[] = []

  register(method: string, path: string, description: string) {
    this.routes.push({
      method: method.toUpperCase(),
      path,
      description
    })
  }

  getRoutes(): ApiRoute[] {
    return this.routes.sort((a, b) => a.path.localeCompare(b.path))
  }

  clear() {
    this.routes = []
  }
}

export const routeRegistry = new RouteRegistry()
