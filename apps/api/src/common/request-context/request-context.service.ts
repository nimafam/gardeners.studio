import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { RequestContext } from './request-context.interface';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  run<T>(context: RequestContext, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  get(): RequestContext | undefined {
    return this.storage.getStore();
  }

  getUserId(): string | undefined {
    return this.get()?.userId;
  }

  getIpAddress(): string | undefined {
    return this.get()?.ipAddress;
  }

  getUserAgent(): string | undefined {
    return this.get()?.userAgent;
  }
}
