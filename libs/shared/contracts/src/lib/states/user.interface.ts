import { JwtEntity } from '../entities'

export interface UserState {
  payload?: JwtEntity
  user?: unknown
  token?: string
  isAuthenticated: boolean
  isLoading: boolean
}