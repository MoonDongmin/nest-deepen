import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class ThrottleInterceptor implements NestInterceptor {
    private readonly cacheManager;
    private readonly reflector;
    constructor(cacheManager: Cache, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
