import { Global, Module } from '@nestjs/common'
import { ApiAuthService } from './api-auth/api-auth.service'
import { PrismaService } from './prisma/prisma.service'
import { ToolsService } from './tools/tools.service'

@Global()
@Module({
  providers: [ToolsService, PrismaService, ApiAuthService],
  exports: [ToolsService, PrismaService, ApiAuthService],
})
export class SharedModule {}
