import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { instanceToPlain } from 'class-transformer'
import { CodeEnum, CodeMessage } from '@src/enums'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          data: instanceToPlain(data),
          code: CodeEnum.SUCCESS,
          message: CodeMessage[CodeEnum.SUCCESS],
        }
      })
    )
  }
}
