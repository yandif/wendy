import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { QueryOptionsDto } from '@src/dto/query.options.dto'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator'

export class AccessDto {
  @ApiPropertyOptional({ required: false, description: '模块名称' })
  @MaxLength(50, { message: '长度最大为50' })
  @IsString({ message: '模块名称必须为字符串' })
  @ValidateIf((o) => o.moduleName !== '')
  @IsOptional()
  readonly moduleName?: string

  @ApiPropertyOptional({ required: false, description: '操作名称(API)' })
  @IsString({ message: '操作名称必须为字符串' })
  @IsOptional()
  readonly actionName?: string

  @ApiPropertyOptional({ required: false, description: '图标名称' })
  @IsString({ message: '图标必须为字符串' })
  @ValidateIf((o) => o.icon !== '')
  @IsOptional()
  readonly icon?: string

  @ApiPropertyOptional({ required: false, description: 'url地址' })
  @IsString({ message: 'url地址必须为字符串' })
  @ValidateIf((o) => o.url !== '')
  @IsOptional()
  readonly url?: string

  @ApiPropertyOptional({ required: false, description: '请求方式' })
  @IsString({ message: 'method请求方式必须是字符类型' })
  @ValidateIf((o) => o.method !== '')
  @IsOptional()
  readonly method?: string

  @ApiPropertyOptional({ required: false, description: '父节点模块id' })
  @IsInt({ message: '模块父节点必须是数字' })
  @Type(() => Number)
  @ValidateIf((o) => o.parentId !== '')
  @IsOptional()
  readonly parentId?: number

  @ApiPropertyOptional({ required: false, description: '排序' })
  @IsInt({ message: '排序必须是数字' })
  @Type(() => Number)
  @ValidateIf((o) => o.sort !== '')
  @IsOptional()
  readonly sort?: number

  @ApiPropertyOptional({ required: false, description: '描素' })
  @MaxLength(100, { message: '描素长度最大为100' })
  @IsString({ message: '描素必须是字符类型' })
  @ValidateIf((o) => o.description !== '')
  @IsOptional()
  readonly description?: string
}

export class AccessReqDto extends QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: '父节点ID' })
  @IsOptional()
  parentId?: number
}

export class CreateAccessDto extends AccessDto {
  @ApiProperty({
    required: true,
    description: '节点类型, 表示模块顶级模块: 1, 表示菜单: 2, 操作(API): 3',
    enum: [1, 2, 3],
  })
  @IsEnum({ 模块: 1, 菜单: 2, 操作: 3 }, { message: '资源类型必须是1、2、3其中一个' })
  @IsInt({ message: '节点类型必须是整数' })
  @Type(() => Number)
  @IsNotEmpty({ message: '节点类型不能为空' })
  readonly type: number
}

export class UpdateAccessDto extends AccessDto {
  @ApiPropertyOptional({
    required: false,
    description: '节点类型, 表示模块顶级模块: 1, 表示菜单: 2, 操作(API): 3',
    enum: [1, 2, 3],
  })
  @IsEnum({ 模块: 1, 菜单: 2, 操作: 3 }, { message: '资源类型必须是1、2、3其中一个' })
  @IsInt({ message: '节点类型必须是整数' })
  @Type(() => Number)
  // eslint-disable-next-line eqeqeq
  @ValidateIf((o) => o.moduleName !== '')
  @IsOptional()
  readonly type: number
}
