import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { LoggerService } from '@src/module/shared/logger/logger.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'
import { DistributionRoleDto } from './distribution.role.dto'
import { AccountRoleListVo, RoleAccountListVo } from './account.role.vo'

@Injectable()
export class AccountRoleService {
  private readonly logger: Logger = new Logger(AccountRoleService.name)

  private readonly loggerService = new LoggerService(AccountRoleService.name)

  constructor(private prisma: PrismaService) {}

  async accountRoleListByAccountId(accountId: number): Promise<AccountRoleListVo[] | undefined> {
    const role = await this.prisma.account
      .findUnique({
        where: { id: accountId },
      })
      .role()
    return role
  }

  async distributionRole(accountId: number, distributionRoleDto: DistributionRoleDto): Promise<string> {
    try {
      const { roleList } = distributionRoleDto
      const role = roleList.map((id) => ({
        id,
      }))

      const oldRole = await this.prisma.account
        .findUnique({ where: { id: accountId } })
        .role({ select: { id: true } })

      await this.prisma.account.update({
        where: { id: accountId },
        data: {
          role: {
            disconnect: oldRole,
            connect: role,
          },
        },
      })
      return '分配角色成功'
    } catch (e) {
      this.logger.error('给账号分配角色错误', e.message)
      throw new HttpException(e, HttpStatus.OK)
    }
  }

  async roleList(): Promise<RoleAccountListVo[]> {
    return await this.prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  }
}
