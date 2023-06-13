import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ICurrentUserType } from '@src/decorators/current.user'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ApiAuthService {
  constructor(private prisma: PrismaService) {}

  public async apiAuth(user: ICurrentUserType, method: string, url: string): Promise<boolean> {
    const { isSuper, id } = user
    // 1.如果是超级管理员就直接返回true
    if (isSuper) {
      return true
    } else {
      // 2.根据当前账号id获取当前账号拥有的角色id
      const authRoleList = await this.prisma.account
        .findUnique({
          where: { id },
        })
        .role()
      // console.log(authRoleList, 111);
      const authRoleIdList: number[] = authRoleList.map((item) => item.id)
      // console.log(authRoleIdList, 222);
      if (!authRoleIdList.length) {
        throw new HttpException(`当前账号没操作: ${method}-${url} 的权限`, HttpStatus.OK)
      }
      // 3.根据角色ID列表获取当前账号拥有的资源id
      const findRoles = await this.prisma.role.findMany({
        where: {
          id: {
            in: authRoleIdList,
          },
        },
        include: { access: true },
      })
      const accessList = []
      findRoles.forEach(({ access }) => {
        accessList.push(...access)
      })
      // console.log(accessList, 333);
      // console.log(method, url, 444);
      const formatUrl = this.formatUrl(method, url)
      // 4.根据请求方式和路径去查询数据
      // console.log(method, formatUrl, 555);
      const accessResult = await this.prisma.access.findFirst({
        where: { method, url: formatUrl },
        select: { id: true, type: true },
      })
      // console.log(accessResult, 666);
      const isExist = accessList.find(
        (item) => item.id === accessResult?.id && Number(item.type) === Number(accessResult?.type)
      )
      if (isExist) {
        return true
      } else {
        throw new HttpException(`当前账号没操作: ${method}-${url} 的权限`, HttpStatus.OK)
      }
    }
  }

  private formatUrl(method: string, url: string): string {
    switch (method) {
      case 'GET':
        // 去除问号后面的
        return url.split('?')[0]
      case 'DELETE':
      case 'PATCH':
      case 'PUT':
        // url最后一个改为*通配符
        return url.replace(/(.*?\/)\d+$/, '$1*')
      default:
        return url
    }
  }
}
