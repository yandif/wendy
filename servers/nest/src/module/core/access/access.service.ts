import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { defaultPageNumber, defaultPageSize } from '@src/constant'
import { LoggerService } from '@src/module/shared/logger/logger.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'
import { AccessReqDto, CreateAccessDto, UpdateAccessDto } from './access.dto'
import { AccessListVo, AccessVo } from './access.vo'

@Injectable()
export class AccessService {
  private readonly logger: Logger = new Logger(AccessService.name)

  private readonly loggerService = new LoggerService(AccessService.name)

  constructor(private prisma: PrismaService) {}

  async createAccess(createAccessDto: CreateAccessDto): Promise<string> {
    const { moduleName, actionName, icon, url, method, parentId, sort, description, type } = createAccessDto

    const findAccess = await this.prisma.access.findFirst({
      where: { OR: [{ moduleName }, { actionName }] },
    })

    if (findAccess) {
      if (findAccess.moduleName === moduleName) {
        throw new HttpException(`${moduleName}当前模块名已经存在,不能重复创建`, HttpStatus.OK)
      } else {
        throw new HttpException(`${actionName}当前操作名已经存在,不能重复创建`, HttpStatus.OK)
      }
    }

    await this.prisma.access.create({
      data: { moduleName, actionName, icon, url, method, parentId, sort, description, type },
    })

    return '创建成功'
  }

  async destroyAccessById(id: number): Promise<string> {
    // if (id <= 8) {
    //   throw new HttpException('系统默认生成的资源不能删除', HttpStatus.OK);
    // }
    // 1.判断是否有角色关联到当前资源
    const findAccess = await this.prisma.access.findUnique({
      where: { id },
      include: { role: true },
    })

    if (findAccess?.role?.length > 0) {
      throw new HttpException('当前资源已经被角色绑定不能直接删除', HttpStatus.OK)
    }
    // 2.查看该节点下是否有子节点
    const childNode = await this.prisma.access.findFirst({
      where: { parentId: id },
    })

    if (childNode) {
      throw new HttpException('当前节点下含子节点,不能直接删除', HttpStatus.OK)
    }

    try {
      await this.prisma.access.delete({
        where: { id },
      })
      return '删除成功'
    } catch (e) {
      this.logger.error(`删除资源: ${e?.meta?.cause}`)
      return '删除失败，资源不存在'
    }
  }

  async modifyAccessById(id: number, updateAccessDto: UpdateAccessDto): Promise<string> {
    const { moduleName, actionName, icon, url, method, parentId, sort, description, type } = updateAccessDto
    // if (id <= 8) {
    //   throw new HttpException('系统默认生成的资源不能修改', HttpStatus.OK);
    // }
    try {
      await this.prisma.access.update({
        where: { id },
        data: { moduleName, actionName, icon, url, method, parentId, sort, description, type },
      })
      return '修改成功'
    } catch (e) {
      this.logger.error(`删除资源: ${e?.meta?.cause}`)
      return '修改失败'
    }
  }

  async accessList(): Promise<AccessVo[]> {
    return await this.prisma.access.findMany({
      where: { OR: [{ type: 1 }, { type: 2 }] },
      select: {
        id: true,
        moduleName: true,
        actionName: true,
        sort: true,
        parentId: true,
        url: true,
      },
    })
  }

  async accessListPage(accessReqDto: AccessReqDto): Promise<AccessListVo> {
    const { pageNumber = defaultPageNumber, pageSize = defaultPageSize, parentId = 0 } = accessReqDto

    const selectOption = {
      where: { parentId },
      select: {
        id: true,
        moduleName: true,
        actionName: true,
        sort: true,
        parentId: true,
        url: true,
      },
    }

    const findAccesss = await this.prisma.access.findMany({
      ...selectOption,
      skip: (pageNumber - 1) * Number(pageSize),
      take: Number(pageSize),
    })

    const total = await (await this.prisma.access.findMany(selectOption)).length

    return {
      data: findAccesss,
      total,
      pageSize,
      pageNumber,
    }
  }
}
