import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

const logger: Logger = new Logger('网络请求')

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const method = request.method
    const url = request.url
    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        logger.log(`[${context.getClass().name}] ${method} ${url} ${Date.now() - now}ms `)
      })
    )
  }
}
