import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { IpAddress } from '@src/decorators/ip.address'
import { LoginDto } from './auth.dto'
import { AuthService } from './auth.service'
import { LoginVo } from './auth.vo'
import { CurrentUser, ICurrentUserType } from '@src/decorators/current.user'

@ApiTags('鉴权服务')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '用户登录',
    description: '用户名可以是手机号码、邮箱、用户名',
  })
  @ApiOkResponse({
    type: LoginVo,
    description: '用户登录返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async adminLogin(@Body() loginDto: LoginDto, @IpAddress() ipAddress: string): Promise<LoginVo> {
    return this.authService.login(loginDto, ipAddress)
  }

  @ApiOperation({
    summary: '退出登录',
    description: '在所有平台退出登录',
  })
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async menusList(@CurrentUser() userInfo: ICurrentUserType): Promise<void> {
    return await this.authService.logout(userInfo)
  }
}
