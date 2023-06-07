import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { LoggingInterceptor } from '@src/interceptor/logging.interceptor'
import Config from '@src/main.config'
import { ModuleModule } from '@src/module/module.module'
import { ValidationPipe } from '@src/pipe/validation.pipe'
import { join } from 'path'

@Module({
  imports: [
    // 加载静态资源
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    // 加载配置
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...Config],
    }),
    ModuleModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
