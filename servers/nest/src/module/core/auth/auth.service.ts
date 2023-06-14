import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CodeEnum } from '@src/enums'
import { LoggerService } from '@src/module/shared/logger/logger.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'
import { ToolsService } from '@src/module/shared/tools/tools.service'
import * as dayjs from 'dayjs'
import { LoginDto } from './auth.dto'
import { LoginVo } from './auth.vo'
import { ICurrentUserType } from '@src/decorators/current.user'

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name)

  private readonly loggerService = new LoggerService(AuthService.name)

  constructor(private prisma: PrismaService, private tools: ToolsService, private config: ConfigService) {}

  async login(loginDto: LoginDto, ipAddress: string): Promise<LoginVo> {
    try {
      this.logger.log(`接收的登录参数:${JSON.stringify(loginDto)}`)
      const { username, password } = loginDto
      const findAccount = await this.prisma.account.findFirst({
        where: { OR: [{ username }, { email: username }, { mobile: username }] },
        include: { role: true },
      })

      if (findAccount && findAccount.password && this.tools.checkPassword(password, findAccount.password)) {
        // 记录最后登录时间和ip地址
        await this.prisma.loginlog.create({
          data: {
            accountId: findAccount.id,
            ip: ipAddress,
          },
        })

        this.logger.log(`当前用户:${JSON.stringify(Object.assign(findAccount, { password: null }), null, 2)}`)
        // 生成token存储到token表中并且返回给前端
        const token = this.tools.uuidToken
        const { id, username, email, mobile, isSuper, platform, role } = findAccount
        const tokenExpire: number = this.config.get('admin.tokenExpire')
        const accountToken = {
          accountId: id,
          username,
          email,
          mobile,
          isSuper,
          platform,
          token,
          // 设置token失效时间
          expireTime: dayjs().add(10, 'second').format(),
        }
        // 先判断之前是否有记录，有记录就更新，没记录就创建
        const findToken = await this.prisma.accountToken.findFirst({
          where: { accountId: id },
          select: { id: true },
        })

        if (findToken?.id) {
          await this.prisma.accountToken.update({
            where: { id: findToken.id },
            data: accountToken,
          })
        } else {
          await this.prisma.accountToken.create({
            data: accountToken,
          })
        }
        return {
          token,
          id,
          username,
          email,
          mobile,
          isSuper,
          platform,
          role,
        }
      } else {
        throw new HttpException(JSON.stringify({ code: CodeEnum.USERNAME_OR_PASSWORD_ERROR }), HttpStatus.OK)
      }
    } catch (e) {
      this.logger.error(e.message)
      throw new HttpException(JSON.stringify({ code: CodeEnum.USERNAME_OR_PASSWORD_ERROR }), HttpStatus.OK)
    }
  }

  async logout(userInfo: ICurrentUserType): Promise<void> {
    this.logger.log(userInfo)
  }
}
