import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiAuth } from '@src/decorators/api.auth'
import { CurrentUser, ICurrentUserType } from '@src/decorators/current.user'
import { PageQuery } from '@src/decorators/page.query'
import { AuthGuard } from '@src/guard/auth.guard'
import { AccountService } from './account.service'
import { AccountReqDto, CreateAccountDto, ResetPasswordDto, UpdateAccountDto } from './account.dto'
import { AccountListVo } from './account.vo'

@ApiTags('账号管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiAuth()
  @ApiOperation({
    summary: '创建账号',
    description: '创建账号',
  })
  @ApiOkResponse({
    type: String,
    description: '创建账号返回值',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<string> {
    return await this.accountService.create(createAccountDto)
  }

  @ApiAuth()
  @ApiOperation({ summary: '重置为默认密码', description: '根据id重置默认密码' })
  @ApiOkResponse({ type: String, description: '重置密码返回值' })
  @HttpCode(HttpStatus.OK)
  @Post('reset_password')
  async resetPassword(@Body() data: ResetPasswordDto): Promise<string> {
    const { id } = data
    return await this.accountService.resetPassword(id)
  }

  // @ApiOperation({ summary: '修改密码', description: '根据账号自己的密码' })
  // @ApiOkResponse({
  //   type: String,
  //   description: '修改账号密码返回值',
  // })
  // @HttpCode(HttpStatus.OK)
  // @Post('modify_password')
  // async modifyPassWordById(
  //   @CurrentUser() userInfo: ICurrentUserType,
  //   @Body() modifyPasswordDto: ModifyPasswordDto,
  // ): Promise<string> {
  //   const { id } = userInfo;
  //   return await this.accountService.modifyPassWordById(id, modifyPasswordDto);
  // }

  @ApiAuth()
  @ApiOperation({ summary: '删除账号', description: '根据id删除账号' })
  @ApiOkResponse({
    type: String,
    description: '删除帐号返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.accountService.destroyById(id)
  }

  @ApiAuth()
  @ApiOperation({
    summary: '查询账号列表',
    description: '根据条件查询账号列表',
    externalDocs: {
      url: 'xx?pageSize=10&pageNumber=1&username=xx&email=xx&mobile=xx&status=0&platform=1',
    },
  })
  @ApiOkResponse({
    type: AccountListVo,
    description: '分页查询账号返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@PageQuery() accountReqDto: AccountReqDto): Promise<AccountListVo> {
    return await this.accountService.findAll(accountReqDto)
  }

  @ApiAuth()
  @ApiOperation({ summary: '修改账号信息', description: '根据账号id修改账号信息' })
  @ApiOkResponse({
    type: String,
    description: '修改账号返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateAccountDto: UpdateAccountDto
  ): Promise<string> {
    return await this.accountService.modifyById(id, updateAccountDto)
  }

  @ApiOperation({
    summary: '获取当前用户信息',
    description: '获取当前用户信息',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async menusList(@CurrentUser() userInfo: ICurrentUserType): Promise<ICurrentUserType> {
    return userInfo
  }
}
