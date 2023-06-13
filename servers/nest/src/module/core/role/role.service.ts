import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { defaultPageNumber, defaultPageSize } from '@src/constant'
import { RoleEnum } from '@src/enums'
import { LoggerService } from '@src/module/shared/logger/logger.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'
import { CreateRoleDto, RoleReqDto, UpdateRoleDto } from './role.dto'
import { RoleListVo, RoleVo } from './role.vo'

@Injectable()
export class RoleService {
  private readonly logger: Logger = new Logger(RoleService.name)

  private readonly loggerService = new LoggerService(RoleService.name)

  constructor(private prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<string> {
    const { name, description, status, isDefault } = createRoleDto
    const findNameResult = await this.prisma.role.findFirst({
      where: { name },
      select: { id: true },
    })
    if (findNameResult) {
      throw new HttpException(`${name}当前角色已经存在,不能重复创建`, HttpStatus.OK)
    }

    // 如果是默认角色的时候要判断下
    if (Object.is(isDefault, RoleEnum.DEFAULT)) {
      const findDefault = await this.prisma.role.findFirst({
        where: { isDefault },
        select: { id: true },
      })
      if (findDefault) {
        throw new HttpException('已经存在默认角色不能重复创建', HttpStatus.OK)
      }
    }

    await this.prisma.role.create({ data: { name, description, status, isDefault } })

    return '创建角色成功'
  }

  async destroyRoleById(id: number): Promise<string> {
    // 判断当前角色是否已经被占用(有账号绑定了该角色)
    const findRole = await this.prisma.role.findUnique({
      where: { id },
      include: { account: true },
    })
    if (findRole?.account?.length > 0) {
      throw new HttpException('当前角色有账号与之绑定,不能直接删除', HttpStatus.OK)
    }

    try {
      await this.prisma.role.delete({
        where: { id },
      })
      return '删除成功'
    } catch (e) {
      this.logger.error(`删除资源: ${e?.meta?.cause}`)
      return '删除失败，角色不存在'
    }
  }

  async modifyRoleById(id: number, updateRoleDto: UpdateRoleDto): Promise<string> {
    const { name, description, status, isDefault } = updateRoleDto

    if (Object.is(isDefault, RoleEnum.DEFAULT)) {
      const findResult = await this.prisma.role.findFirst({
        where: { isDefault },
        select: { id: true },
      })
      if (findResult?.id !== id) {
        throw new HttpException('默认角色只能有一个', HttpStatus.OK)
      }
    }

    try {
      await this.prisma.role.update({
        where: { id },
        data: { name, description, status, isDefault },
      })
      return '修改成功'
    } catch (e) {
      this.logger.error(`删除资源: ${e?.meta?.cause}`)
      return '修改失败'
    }
  }

  async roleById(id: number): Promise<RoleVo | undefined> {
    return await this.prisma.role.findUnique({ where: { id } })
  }

  async roleList(roleReqDto: RoleReqDto): Promise<RoleListVo> {
    const { pageNumber = defaultPageNumber, pageSize = defaultPageSize, name, status } = roleReqDto

    const selectOption = {
      where: { name: { contains: name }, status },
    }

    const findRoles = await this.prisma.role.findMany({
      ...selectOption,
      skip: (pageNumber - 1) * Number(pageSize),
      take: Number(pageSize),
    })

    const total = await (await this.prisma.role.findMany(selectOption)).length

    return {
      data: findRoles,
      total,
      pageSize,
      pageNumber,
    }
  }
}
