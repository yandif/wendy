import { Controller, UseGuards, HttpCode, HttpStatus, Get } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { CurrentUser, ICurrentUserType } from '@src/decorators/current.user'
import { AuthGuard } from '@src/guard/auth.guard'
import { MenuService } from './menu.service'
import { MenusListVo } from './menus.vo'

@ApiTags('菜单管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: '获取菜单列表',
    description: '获取菜单',
  })
  @ApiOkResponse({
    type: MenusListVo,
    isArray: true,
    description: '获取菜单返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async menusList(@CurrentUser() userInfo: ICurrentUserType): Promise<MenusListVo[]> {
    return await this.menuService.menuList(userInfo)
  }
}
