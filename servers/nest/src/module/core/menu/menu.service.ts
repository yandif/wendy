import { Injectable, Logger } from '@nestjs/common'
import { ICurrentUserType } from '@src/decorators/current.user'
import { AccessTypeEnum, AdminIdentityEnum } from '@src/enums'
import { LoggerService } from '@src/module/shared/logger/logger.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'

import { uniqWith } from '@src/util'
import { MenusListVo } from './menus.vo'

interface IAccessList {
  id: number
  moduleName: string
  actionName: string
  parentId: number
  url: string
  sort: number
  icon: string
}

@Injectable()
export class MenuService {
  private readonly logger: Logger = new Logger(MenuService.name)

  private readonly loggerService = new LoggerService(MenuService.name)

  constructor(private prisma: PrismaService) {}

  async menuList(userInfo: ICurrentUserType): Promise<MenusListVo[]> {
    /**
     * 根据用户权限来返回菜单
     * 1.查询全部的菜单
     * 2.如果是超级管理员就返回全部菜单
     * 3.非超级管理员，根据当前用户拥有的角色去查询(角色资源)表获取全部的资源
     */

    const { id, isSuper } = userInfo
    // 超级管理员就全部返回
    if (Object.is(isSuper, AdminIdentityEnum.SUPPER)) {
      // 1.查询全部的菜单(模块和菜单)
      const accessList = await this.prisma.access.findMany({
        where: { OR: [{ type: AccessTypeEnum.MODULE }, { type: AccessTypeEnum.MENUS }] },
      })
      // 1.1格式化菜单
      return this.formatMenus(accessList)
    } else {
      // 2.根据当前账号id查询已经授权的角色
      const authRoleList = await this.prisma.account
        .findUnique({
          where: { id },
        })
        .role()
      const authRoleIdList: number[] = authRoleList.map((item) => item.id)

      // 3.根据角色ID列表获取当前账号拥有的资源id
      const findRoles = await this.prisma.role.findMany({
        where: {
          id: {
            in: authRoleIdList,
          },
        },
        include: { access: true },
      })
      this.logger.log('授权的资源列表', findRoles)

      // 4.根据资源id去查询菜单并且格式化返回
      const accessList = []
      findRoles.forEach(({ access }) => {
        accessList.push(...access)
      })
      uniqWith(accessList, 'id')
      return this.formatMenus(accessList)
    }
  }

  private formatMenus(accessList: IAccessList[]): MenusListVo[] {
    return accessList.map((item: IAccessList) => {
      const { id, moduleName, actionName, parentId, url, sort, icon } = item
      return {
        id,
        name: moduleName || actionName,
        parentId,
        url,
        sort,
        icon,
      }
    })
  }
}
