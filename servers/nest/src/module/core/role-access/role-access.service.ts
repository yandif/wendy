import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { AccessTypeEnum } from '@src/enums'
import { LoggerService } from '@src/module/shared/logger/logger.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'
import { RoleAccessReqDto } from './role-access.dto'
import { AllApiVo, AllMenusVo, RoleAccessVo } from './role-access.vo'

@Injectable()
export class RoleAccessService {
  private readonly logger: Logger = new Logger(RoleAccessService.name)

  private readonly loggerService = new LoggerService(RoleAccessService.name)

  constructor(private prisma: PrismaService) {}

  async roleToAccess(roleId: number, roleAccessReqDto: RoleAccessReqDto): Promise<string> {
    try {
      const { accessList } = roleAccessReqDto

      const access = accessList.map((id) => ({
        id,
      }))

      const oldAccess = await this.prisma.role.findUnique({ where: { id: roleId } }).access({ select: { id: true } })

      await this.prisma.role.update({
        where: { id: roleId },
        data: {
          access: {
            disconnect: oldAccess,
            connect: access,
          },
        },
      })
      return '分配菜单权限成功'
    } catch (e) {
      throw new HttpException(e, HttpStatus.OK)
    }
  }

  async allMenus(): Promise<AllMenusVo[]> {
    const menusList = await this.prisma.access.findMany({
      where: { OR: [{ type: AccessTypeEnum.MODULE }, { type: AccessTypeEnum.MENUS }] },
      select: {
        id: true,
        moduleName: true,
        actionName: true,
        parentId: true,
      },
      orderBy: [
        {
          sort: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    })
    return menusList.map(({ id, actionName, moduleName, parentId }) => {
      return {
        id,
        key: String(id),
        title: moduleName || actionName,
        parentId,
      }
    })
  }

  async allApi(): Promise<AllApiVo[]> {
    return await this.prisma.access.findMany({
      where: { type: AccessTypeEnum.OPERATION },
      select: {
        id: true,
        apiName: true,
      },
      orderBy: [
        {
          sort: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    })
  }

  async accessListByRoleId(roleId: number): Promise<RoleAccessVo[]> {
    return await this.prisma.role
      .findUnique({
        where: { id: roleId },
      })
      .access()
  }
}
