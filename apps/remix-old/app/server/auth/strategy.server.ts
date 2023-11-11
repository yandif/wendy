import type { AppLoadContext, SessionStorage } from '@remix-run/node';
import type { AuthenticateOptions } from 'remix-auth';
import { Strategy } from 'remix-auth';

export interface Params {
  form: FormData;
  context?: AppLoadContext;
}

export class FormStrategy<User> extends Strategy<User, Params> {
  name = 'form';

  async authenticate(
    request: Request,
    sessionStorage: SessionStorage,
    options: AuthenticateOptions,
  ): Promise<User> {
    const form = await request.formData();

    const data: { failed: boolean; data: User; message?: string } =
      (await this.verify({ form, context: options.context })) as any;
    if (data?.failed) {
      return data as any;
    } else {
      return this.success(data.data, request, sessionStorage, options);
    }
  }
}
