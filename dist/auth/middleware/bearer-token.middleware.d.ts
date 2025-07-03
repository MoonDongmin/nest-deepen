import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Cache } from '@nestjs/cache-manager';
export declare class BearerTokenMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly configService;
    private readonly cacheManger;
    constructor(jwtService: JwtService, configService: ConfigService, cacheManger: Cache);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    validateBearerToke(rawToken: string): string;
}
