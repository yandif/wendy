import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const PageQuery = createParamDecorator((data, ctx: ExecutionContext) => {
  const query = ctx.switchToHttp().getRequest().query
  const pageNumber = query.pageNumber
  const pageSize = query.pageSize
  if (pageNumber) {
    query.pageNumber = Number(pageNumber)
  }
  if (pageSize) {
    query.pageSize = Number(pageSize)
  }

  return query
})
