import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator'
import { Type } from 'class-transformer'
import { QueryOptionsDto } from '@src/dto/query.options.dto'

export class AccountDto {
  @ApiPropertyOptional({ required: false, description: '手机号码' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  @ValidateIf((o) => o.mobile !== '')
  @IsOptional()
  readonly mobile?: string

  @ApiPropertyOptional({ required: false, description: '手机号码' })
  @IsEmail({}, { message: '邮箱格式错误' })
  @ValidateIf((o) => o.email !== '')
  @IsOptional()
  readonly email?: string

  @ApiPropertyOptional({ required: false, description: '状态', enum: [0, 1] })
  @IsEnum({ 禁用: 0, 当前可用: 1 }, { message: '状态必须是(0:表示禁止,1:表示正常)的数字' })
  @Type(() => Number)
  @ValidateIf((o) => o.status !== '')
  @IsOptional()
  readonly status?: number

  @ApiPropertyOptional({ required: false, description: '平台', enum: [0, 1, 2] })
  @IsEnum(
    { 普通用户: 0, 运营管理: 1, 商家入驻: 2 },
    { message: '平台必须是(0表示普通用户(没权限),1表示为运营管理,2表示入住商家)的数字' }
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform !== '')
  @IsOptional()
  readonly platform?: number
}

export class AccountReqDto extends QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: '用户名' })
  @IsOptional()
  readonly username?: string

  @ApiPropertyOptional({ required: false, description: '手机号码' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  @ValidateIf((o) => o.mobile !== '')
  @IsOptional()
  readonly mobile?: string

  @ApiPropertyOptional({ required: false, description: '邮箱' })
  @IsEmail({}, { message: '邮箱格式错误' })
  @ValidateIf((o) => o.email !== '')
  @IsOptional()
  readonly email?: string

  @ApiPropertyOptional({ required: false, description: '状态', enum: [0, 1] })
  @IsEnum({ 禁用: 0, 当前可用: 1 }, { message: '状态必须是(0:表示禁止,1:表示正常)的数字' })
  @Type(() => Number)
  @ValidateIf((o) => o.status !== '')
  @IsOptional()
  readonly status?: number

  @ApiPropertyOptional({ required: false, description: '平台', enum: [0, 1, 2] })
  @IsEnum(
    { 普通用户: 0, 运营管理: 1, 商家入驻: 2 },
    { message: '平台必须是(0表示普通用户(没权限),1表示为运营管理,2表示入住商家)的数字' }
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform !== '')
  @IsOptional()
  readonly platform?: number
}

export class CreateAccountDto extends AccountDto {
  @ApiProperty({ required: true, description: '用户名' })
  @IsString({ message: '用户名必须为字符类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string

  @ApiProperty({ required: true, description: '密码' })
  @IsString({ message: '密码必须为字符类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string
}

export class ResetPasswordDto {
  @ApiProperty({ required: true, description: 'id' })
  @IsNumber()
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: number
}

export class UpdateAccountDto extends AccountDto {
  @ApiPropertyOptional({ required: false, description: '用户名' })
  @IsString({ message: '用户名必须为字符类型' })
  @ValidateIf((o) => o.username !== '')
  @IsOptional()
  readonly username: string
}
