# remix

## 环境变量处理

`pnpm add cross-env --save-dev`

在 package.json 中配置:
```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production remix build",
    "dev": "cross-env NODE_ENV=development remix dev",
    "start": "cross-env NODE_ENV=production remix-serve build",
  }
}
```

## 添加 prisma

`pnpm add  prisma --save-dev`

然后运行 `npx prisma init --datasource-provider mysql` 进行初始化。
然后运行 `npx prisma db push` 进行同步数据库结构
然后运行 `pnpm add @prisma/client`
然后运行 `npx prisma generate` 生产 prisma 客户端

## esno 运行ts
`pnpm add esno --save-dev`
