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
import { CreateRoleDto, RoleReqDto, UpdateRoleDto } from './role.dto'
import { RoleService } from './role.service'
import { RoleListVo, RoleVo } from './role.vo'

@ApiTags('角色管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '创建角色',
    description: '创建角色',
  })
  @ApiOkResponse({
    type: String,
    description: '创建角色返回值',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<string> {
    return await this.roleService.createRole(createRoleDto)
  }

  @ApiOperation({ summary: '删除角色', description: '根据角色id删除角色' })
  @ApiOkResponse({
    type: String,
    description: '删除角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyRoleById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.roleService.destroyRoleById(id)
  }

  @ApiOperation({ summary: '修改角色', description: '根据角色id修改角色' })
  @ApiOkResponse({
    type: String,
    description: '修改角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyRoleById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<string> {
    return await this.roleService.modifyRoleById(id, updateRoleDto)
  }

  @ApiOperation({ summary: '查询角色', description: '根据角色id查询角色' })
  @ApiOkResponse({
    type: RoleVo,
    description: '查询单条角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async roleById(@Param('id', new ParseIntPipe()) id: number): Promise<RoleVo | undefined> {
    return await this.roleService.roleById(id)
  }

  @ApiOperation({
    summary: '查询角色列表',
    description: '查询角色',
    externalDocs: {
      url: 'xx?pageSize=10&pageNumber=1&name=x&status=0',
    },
  })
  @ApiOkResponse({
    type: RoleListVo,
    description: '分页查询角色返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async roleList(@PageQuery() roleReqDto: RoleReqDto): Promise<RoleListVo> {
    return await this.roleService.roleList(roleReqDto)
  }
}
