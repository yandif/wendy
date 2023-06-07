import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { IpAddress } from '@src/decorators/ip.address'
import { LoginDto } from './login.dto'
import { LoginService } from './login.service'
import { LoginVo } from './login.vo'

@ApiTags('用户登录')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({
    summary: '用户登录',
    description: '用户名可以是手机号码、邮箱、用户名',
  })
  @ApiOkResponse({
    type: LoginVo,
    description: '用户登录返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  async adminLogin(@Body() loginDto: LoginDto, @IpAddress() ipAddress: string): Promise<LoginVo> {
    return this.loginService.adminLogin(loginDto, ipAddress)
  }
}
