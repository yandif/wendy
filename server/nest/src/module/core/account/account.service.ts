import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { defaultPageNumber, defaultPageSize, defaultPassword } from '@src/constant/index'
import { LoggerService } from '@src/module/shared/logger/logger.service'
import { PrismaService } from '@src/module/shared/prisma/prisma.service'
import { ToolsService } from '@src/module/shared/tools/tools.service'
import { AccountReqDto, CreateAccountDto, UpdateAccountDto } from './account.dto'
import { AccountListVo } from './account.vo'

@Injectable()
export class AccountService {
  private readonly logger: Logger = new Logger(AccountService.name)

  private readonly loggerService = new LoggerService(AccountService.name)

  constructor(private prisma: PrismaService, private tools: ToolsService) {}

  async create(createAccountDto: CreateAccountDto) {
    const { username, email, mobile, status, password, platform } = createAccountDto

    const findAccount = await this.prisma.account.findFirst({
      where: { OR: [{ username }, { email }, { mobile }] },
    })

    if (findAccount) {
      if (findAccount.username === username) {
        throw new HttpException('创建失败,已经存在该用户名', HttpStatus.OK)
      } else if (findAccount.mobile === mobile) {
        throw new HttpException('创建失败,已经存在该手机号码', HttpStatus.OK)
      } else if (findAccount.email === email) {
        throw new HttpException('创建失败,已经存在该邮箱号', HttpStatus.OK)
      } else {
        throw new HttpException('创建失败', HttpStatus.OK)
      }
    } else {
      await this.prisma.account.create({
        data: {
          username,
          email,
          mobile,
          status,
          platform,
          password: this.tools.makePassword(password || defaultPassword),
        },
      })
      return '创建成功'
    }
  }

  async findAll(accountReqDto: AccountReqDto): Promise<AccountListVo> {
    const {
      pageNumber = defaultPageNumber,
      pageSize = defaultPageSize,
      email,
      username,
      mobile,
      status,
      platform,
    } = accountReqDto

    const selectOption = {
      where: {
        email: { contains: email },
        username: { contains: username },
        mobile: { contains: mobile },
        status,
        platform,
      },
      select: {
        id: true,
        username: true,
        email: true,
        mobile: true,
        status: true,
        platform: true,
        createdAt: true,
        updatedAt: true,
      },
    }

    const findAccount = await this.prisma.account.findMany({
      ...selectOption,
      skip: (Number(pageNumber) - 1) * Number(pageSize),
      take: Number(pageSize),
    })

    const total = await (await this.prisma.account.findMany(selectOption)).length

    return {
      data: findAccount,
      total,
      pageSize,
      pageNumber,
    }
  }

  async resetPassword(id: number): Promise<string> {
    try {
      await this.prisma.account.update({
        where: { id },
        data: { password: this.tools.makePassword(defaultPassword) },
      })
      return '重置成功'
    } catch (e) {
      this.logger.error(`重置密码: ${e?.meta?.cause}`)
      return '重置失败，账号不存在'
    }
  }

  async destroyById(id: number): Promise<string> {
    if (id === 1) {
      throw new HttpException('系统默认生成的账号不能删除', HttpStatus.OK)
    }

    try {
      await this.prisma.account.delete({
        where: { id },
      })
      return '删除成功'
    } catch (e) {
      this.logger.error(`删除帐号: ${e?.meta?.cause}`)
      throw new HttpException('删除失败，账号不存在', HttpStatus.OK)
    }
  }

  async modifyById(id: number, updateAccountDto: UpdateAccountDto): Promise<string> {
    if (id === 1) {
      throw new HttpException('系统默认生成的账号不能修改信息', HttpStatus.OK)
    }
    const { username, email, mobile, status, platform } = updateAccountDto

    const search = []
    if (username) {
      search.push({ username })
    }
    if (email) {
      search.push({ email })
    }
    if (mobile) {
      search.push({ mobile })
    }
    const findAccount = await this.prisma.account.findFirst({
      where: {
        OR: search,
      },
    })
    if (findAccount && findAccount.id !== id) {
      if (findAccount.username === username) {
        throw new HttpException('修改失败,已经存在该用户名', HttpStatus.OK)
      } else if (findAccount.mobile === mobile) {
        throw new HttpException('修改失败,已经存在该手机号码', HttpStatus.OK)
      } else if (findAccount.email === email) {
        throw new HttpException('修改失败,已经存在该邮箱号', HttpStatus.OK)
      } else {
        throw new HttpException('修改失败', HttpStatus.OK)
      }
    } else {
      await this.prisma.account.update({
        where: { id },
        data: { username, email, mobile, status, platform },
      })
      return '修改成功'
    }
  }
}
