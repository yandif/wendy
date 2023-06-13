import { ApiProperty } from '@nestjs/swagger'

export class AccountRoleListVo {
  @ApiProperty({ required: true, description: '角色ID' })
  id?: number
}

export class RoleAccountListVo {
  @ApiProperty({ required: true, description: '角色ID' })
  id: number

  @ApiProperty({ required: true, description: '角色名称' })
  name: string
}
