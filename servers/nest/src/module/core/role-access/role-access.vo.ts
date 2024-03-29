import { ApiProperty } from '@nestjs/swagger'

export class RoleAccessVo {
  @ApiProperty({ description: '主键ID' })
  id: number
}

export class AllMenusVo {
  @ApiProperty({ description: '主键ID' })
  id: number

  @ApiProperty({ description: 'key' })
  key: string

  @ApiProperty({ description: '标题' })
  title: string

  @ApiProperty({ description: '父节点ID' })
  parentId: number | null
}

export class AllApiVo {
  @ApiProperty({ description: '主键ID' })
  id: number

  @ApiProperty({ description: 'API名称' })
  apiName: string
}
