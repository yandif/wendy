import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { QueryOptionsDto } from '@src/dto/query.options.dto'
import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator'

export class RoleDto {
  @ApiPropertyOptional({ required: false, description: '描素' })
  @MaxLength(100, { message: '描素最长字符为100' })
  @IsString({ message: '描素必须是字符类型' })
  @ValidateIf((o) => o.description !== '')
  @IsOptional()
  readonly description?: string

  @ApiPropertyOptional({ required: false, description: '状态', enum: [0, 1] })
  @IsEnum({ 禁用: 0, 当前可用: 1 }, { message: '状态必须是(0:表示禁止,1:表示正常)的数字' })
  @Type(() => Number)
  @ValidateIf((o) => o.status !== '')
  @IsOptional()
  readonly status?: number

  @ApiPropertyOptional({ required: false, description: '是否为默认角色', enum: [0, 1] })
  @IsEnum({ 不开通: 0, 开通: 1 }, { message: '平台必须是(1表示开通,0表示不开通)的数字' })
  @Type(() => Number)
  @ValidateIf((o) => o.isDefault !== '')
  @IsOptional()
  readonly isDefault?: number
}

export class CreateRoleDto extends RoleDto {
  @ApiProperty({ required: true, description: '角色名称' })
  @IsString({ message: '角色名称必须为字符类型' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  readonly name: string
}

export class RoleReqDto extends QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: '角色名称' })
  @IsOptional()
  readonly name?: string

  @ApiPropertyOptional({ required: false, description: '状态', enum: [0, 1] })
  @IsEnum({ 禁用: 0, 当前可用: 1 }, { message: '状态必须是(0:表示禁止,1:表示正常)的数字' })
  @Type(() => Number)
  @ValidateIf((o) => o.status !== '')
  @IsOptional()
  readonly status?: number
}

export class UpdateRoleDto extends RoleDto {
  @ApiPropertyOptional({ required: false, description: '角色名称' })
  @IsString({ message: '角色名称必须为字符类型' })
  @ValidateIf((o) => o.name !== '')
  @IsOptional()
  readonly name: string
}
