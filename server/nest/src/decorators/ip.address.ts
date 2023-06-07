import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

/**
 * @Description: 从请求头中获取ip地址，需要配置nginx才能拿到ip
 */
export const IpAddress = createParamDecorator((_data: string, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest()
  const rawIp: string | undefined = req.header('x-forwarded-for') || req.socket.remoteAddress

  const ipAddress = rawIp ? rawIp!.split(',')[0] : ''
  return ipAddress
})
