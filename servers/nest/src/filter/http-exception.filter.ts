import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { CodeEnum, CodeMessage } from '@src/enums'
import { formatDate } from '@src/util'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    // const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    let resultMessage: string, resultCode: CodeEnum
    try {
      const { code } = JSON.parse(exception.message)
      if (code) {
        resultCode = code
        resultMessage = CodeMessage[code]
      }
    } catch (e) {
      /** */
    }

    const errorResponse = {
      message: resultMessage || exception.message,
      code: resultCode || CodeEnum.FAILED, // 自定义code
      // status,
      // path: request.url, // 错误的url地址
      // method: request.method, // 请求方式
      // timestamp: new Date().toLocaleDateString(), // 错误的时间
    }

    // 打印日志
    Logger.error(
      `【${formatDate(Date.now())}】${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter'
    )

    // 设置返回的状态码、请求头、发送错误信息
    response.status(200)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
