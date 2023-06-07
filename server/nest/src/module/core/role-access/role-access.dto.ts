import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray } from 'class-validator'

export class RoleAccessReqDto {
  @ApiProperty({ required: true, description: '资源ID数组' })
  @Type(() => Number)
  @ArrayMinSize(1, { message: '菜单资源至少一个' })
  @IsArray({ message: '资源ID列表必须是一个数组' })
  accessList: number[]
}
