import { registerAs } from '@nestjs/config'
import 'dotenv/config'

export const App = {
  port: process.env.APP_PORT || 3000,
  prefix: process.env.APP_PREFIX || 'api' + '/' + 'v1',
  frontendHost: process.env.FRONTEND_HOST || '*',
}

export const Admin = {
  defaultUsername: process.env.ADMIN_USERNAME || 'string',
  defaultPassword: process.env.ADMIN_PASSWORD || 'string',
  tokenExpire: process.env.TOKEN_EXPIRE || 1, // token失效时间为1天
}

export const Environment = {
  environment: process.env.NODE_ENV,
  isDevEnv: Object.is(process.env.NODE_ENV, 'development'),
  isProdEnv: Object.is(process.env.NODE_ENV, 'production'),
}

export default [
  registerAs('app', () => App),
  registerAs('admin', () => Admin),
  registerAs('environment', () => Environment),
]
