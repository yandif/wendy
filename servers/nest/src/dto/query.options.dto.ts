import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional } from 'class-validator'

export class QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: '一页显示多少条' })
  @IsInt({ message: '分页大小要为数字' })
  @IsOptional()
  readonly pageSize?: number

  @ApiPropertyOptional({ required: false, description: '当前页' })
  @IsInt({ message: '当前页要为数字' })
  @IsOptional()
  readonly pageNumber?: number
}
