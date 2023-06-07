### 提交

```bash
npm i -D commitizen cz-conventional-changelog-chinese

# add config to package.json

  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog-chinese"
    }
  },

# 和 husky hooks 一起食用更佳
```

### 配置环境变量

`npm i --save @nestjs/config`

```js
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...Config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```js
import { registerAs } from '@nestjs/config';

const config = registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 123,
  port: process.env.DATABASE_PORT || 5432,
}));

export default [config];
```

```js
@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log(1, this.configService.get("database.host"));
  }
}
```

### Swagger 文档

`$ npm install --save @nestjs/swagger swagger-ui-express`

```js
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

### `npx prisma init` 初始化 prisma

- 将 .env 文件中的 DATABASE_URL 设置为指向您现有的数据库。如果您的数据库还没有表，请阅读
  https://pris.ly/d/getting-started
- 在 schema.prisma 中指定 db 的 provider，可选：postgresql、mysql、sqlite、sqlserver 或
  mongodb。
- 运行`npx prisma db pull`将您的数据库转换为 Prisma Schema。
- 运行`npx prisma generate`来生成 Prisma 客户端。然后就可以开始查询数据库。

`npx prisma migrate dev --name 初始化`

### 依赖

| 库名                      | 作用         |
| ------------------------- | ------------ |
| @nestjs/swagger           | api 文档     |
| @nestjs/config            | 配置         |
| @nestjs/serve-static      | 静态服务     |
| dayjs                     | 日期处理     |
| class-validator           | 类型校验     |
| lodash                    | 工具库       |
| class-transformer         | 类转换为对象 |
| prisma                    | 数据库 dto   |
| uuid                      | 生成 uuid    |
| winston                   | 日志         |
| winston-daily-rotate-file | 日志记录     |
| swagger-ui-express        | api 文档 ui  |
| cross-env                 | 配置环境     |
