import { Injectable } from '@nestjs/common'
import { Auth } from '@src/util'
import * as uuid from 'uuid'

@Injectable()
export class ToolsService {
  private auth: Auth

  constructor() {
    this.auth = new Auth()
  }

  makePassword(password: string): string {
    return this.auth.makePassword(password)
  }

  checkPassword(password: string, sqlPassword: string): boolean {
    return this.auth.checkPassword(password, sqlPassword)
  }

  public get uuidToken(): string {
    return uuid.v4().replace(/-/g, '')
  }
}
