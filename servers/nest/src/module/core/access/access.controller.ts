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
import { PageQuery } from '@src/decorators/page.query'
import { AuthGuard } from '@src/guard/auth.guard'
import { AccessService } from './access.service'
import { AccessReqDto, CreateAccessDto, UpdateAccessDto } from './access.dto'
import { AccessListVo, AccessVo } from './access.vo'

@ApiTags('资源管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiAuth()
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @ApiOperation({ summary: '创建资源', description: '创建资源' })
  @ApiOkResponse({
    type: String,
    description: '创建资源返回值',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAccess(@Body() createAccessDto: CreateAccessDto): Promise<string> {
    return await this.accessService.createAccess(createAccessDto)
  }

  @ApiOperation({ summary: '删除资源', description: '根据资源ID删除资源' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async destroyAccessById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.accessService.destroyAccessById(id)
  }

  @ApiOperation({ summary: '修改资源', description: '根据资源ID修改资源' })
  @ApiOkResponse({
    type: String,
    description: '修改资源的返回值',
  })
  @Patch(':id')
  async modifyAccessById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateAccessDto: UpdateAccessDto
  ): Promise<string> {
    return await this.accessService.modifyAccessById(id, updateAccessDto)
  }

  @ApiOperation({
    summary: '获取菜单',
    description: '获取全部的菜单(不分页,给角色分配资源使用)',
  })
  @ApiOkResponse({
    type: AccessVo,
    isArray: true,
    description: '获取全部菜单返回DTO',
  })
  @HttpCode(HttpStatus.OK)
  @Get('access_list')
  async accessList(): Promise<AccessVo[]> {
    return await this.accessService.accessList()
  }

  @ApiOperation({
    summary: '获取资源列表',
    description: '分页获取资源列表(顶层的)',
    externalDocs: {
      url: 'xxx?pageSize=10&pageNumber=1',
    },
  })
  @ApiOkResponse({
    type: AccessListVo,
    description: '分页获取资源列表',
  })
  @Get()
  async accessListPage(@PageQuery() accessReqDto: AccessReqDto): Promise<AccessListVo> {
    return await this.accessService.accessListPage(accessReqDto)
  }
}
