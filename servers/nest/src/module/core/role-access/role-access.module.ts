import { Module } from '@nestjs/common'
import { RoleAccessController } from './role-access.controller'
import { RoleAccessService } from './role-access.service'

@Module({
  controllers: [RoleAccessController],
  providers: [RoleAccessService],
})
export class RoleAccessModule {}
