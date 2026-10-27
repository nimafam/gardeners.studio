import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { RequestContextService } from './request-context.service';

interface AuthenticatedRequest extends Request {
  user?: {
    id?: string;
    sub?: string;
  };
}

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  constructor(private readonly context: RequestContextService) {}

  intercept(
    executionContext: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = executionContext
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();

    const userId = request.user?.id ?? request.user?.sub;

    return this.context.run(
      {
        userId,
        ipAddress: this.getIpAddress(request),
        userAgent: request.headers['user-agent'],
      },
      () => next.handle(),
    );
  }

  private getIpAddress(request: AuthenticatedRequest): string | undefined {
    const forwardedFor = request.headers['x-forwarded-for'];

    if (typeof forwardedFor === 'string') {
      return forwardedFor.split(',')[0]?.trim();
    }

    if (Array.isArray(forwardedFor)) {
      return forwardedFor[0];
    }

    return request.ip;
  }
}
