export interface ResourceAccess {
  [key: string]: { roles: string[]}
}



export interface JwtEntity {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: string
  azp: string
  session_state: string
  acr: string
  'allowed-origins': string[]
  realm_acces: {
    roles: string[]
  }
  resource_access: ResourceAccess
  scope: string
  sid: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
  [key: string]: any
}