import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { API_AUTH_KEY } from '@src/constant'
import { ICurrentUserType } from '@src/decorators/current.user'
import { CodeEnum } from '@src/enums'
import { ApiAuthService } from '@src/module/shared/api-auth/api-auth.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'
import { getUrlQuery } from '@src/util'
import * as dayjs from 'dayjs'

const logger: Logger = new Logger('auth.guard')

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly apiAuthService: ApiAuthService,
    private prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // if (Environment.isDevEnv) {
    //   return true
    // }
    const request = context.switchToHttp().getRequest()
    const token =
      context.switchToRpc().getData().headers?.token ||
      context.switchToHttp().getRequest().body?.token ||
      getUrlQuery(request.url, 'token')

    logger.log(`当前的token: ${token}`)
    const methodAuth = Reflect.getMetadata(API_AUTH_KEY, context.getHandler())
    const classAuth = Reflect.getMetadata(API_AUTH_KEY, context.getClass())

    if (token) {
      try {
        // 1.从数据库查询是否存在记录
        const accountInfo = await this.prisma.accountToken.findFirst({
          where: { token },
          select: {
            accountId: true,
            username: true,
            mobile: true,
            expireTime: true,
            platform: true,
            email: true,
            isSuper: true,
          },
        })

        const isExpire: boolean = dayjs(accountInfo?.expireTime).isAfter(new Date())

        if (accountInfo && isExpire) {
          const user: ICurrentUserType = Object.assign(accountInfo, { id: accountInfo.accountId })
          request.user = accountInfo
          if (methodAuth || classAuth) {
            const method = request.method
            const url = request.url
            return this.apiAuthService.apiAuth(user, method, url)
          } else {
            return true
          }
        } else {
          throw new HttpException(JSON.stringify({ code: CodeEnum.TOKEN_ERROR }), HttpStatus.OK)
        }
      } catch (e) {
        Logger.error(e, 'auth')
        throw new HttpException(e, e.status)
      }
    } else {
      throw new HttpException(JSON.stringify({ code: CodeEnum.NO_TOKEN }), HttpStatus.OK)
    }
  }
}
