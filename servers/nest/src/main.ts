import { Logger, NestApplicationOptions } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from '@src/filter/http-exception.filter'
import { TransformInterceptor } from '@src/interceptor/transform.interceptor'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { App, Environment } from './main.config'

const logger: Logger = new Logger('main.ts')

const AppOptions: NestApplicationOptions = {
  logger: Environment.isDevEnv ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, AppOptions)
  app.enableCors({
    origin: App.frontendHost,
  })
  app.setGlobalPrefix(App.prefix)
  app.use(helmet())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  if (Environment.isDevEnv) {
    const DocOptions = new DocumentBuilder()
      .setTitle('api文档')
      .setDescription('api接口文档')
      .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
      .setVersion('0.0.1')
      .build()
    const document = SwaggerModule.createDocument(app, DocOptions)
    SwaggerModule.setup(`${App.prefix}/docs`, app, document)
  }

  await app.listen(App.port)
}

bootstrap().then(() => {
  logger.warn(
    `\n接口:http://localhost:${App.port}/${App.prefix}\n文档:http://localhost:${App.port}/${App.prefix}/docs\n`
  )
})
