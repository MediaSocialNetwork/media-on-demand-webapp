import authRoutes from './auth'
import unauthRoutes from './unauth'

export const overlay = []
export const content = []
export const still = []
export { authRoutes as authRoutes }
export { unauthRoutes as unauthRoutes }

Object.entries(unauthRoutes).forEach(
  ([ path, { component } ]) => {
    overlay.push({ path, component, exact: true })
  }
)

Object.entries(authRoutes).forEach(
  ([ path, { component: { Content, Still } } ]) => {
    content.push({ path, component: Content, exact: true })
    still.push({ path, component: Still, exact: true })
  }
)
