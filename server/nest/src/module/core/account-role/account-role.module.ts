import { Module } from '@nestjs/common'
import { AccountRoleController } from './account-role.controller'
import { AccountRoleService } from './account-role.service'

@Module({
  controllers: [AccountRoleController],
  providers: [AccountRoleService],
})
export class AccountRoleModule {}
