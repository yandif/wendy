import { Module } from '@nestjs/common'
import { AccessModule } from './access/access.module'
import { AccountRoleModule } from './account-role/account-role.module'
import { AccountModule } from './account/account.module'
import { LoginModule } from './login/login.module'
import { MenuModule } from './menu/menu.module'
import { RoleAccessModule } from './role-access/role-access.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [AccountModule, AccessModule, RoleModule, RoleAccessModule, AccountRoleModule, LoginModule, MenuModule],
})
export class CoreModule {}
