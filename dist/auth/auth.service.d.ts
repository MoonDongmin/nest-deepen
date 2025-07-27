import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from '@nestjs/cache-manager';
import { UserService } from '../user/user.service';
import { Role } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    private readonly jwtService;
    private readonly cacheManger;
    private readonly prisma;
    constructor(userService: UserService, configService: ConfigService, jwtService: JwtService, cacheManger: Cache, prisma: PrismaService);
    tokenBlock(token: string): Promise<boolean>;
    parseBasicToken(rawToken: string): {
        email: string;
        password: string;
    };
    parseBearerToken(rawToken: string, isRefreshToken: boolean): Promise<any>;
    register(rawToken: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    authenticate(email: string, password: string): Promise<{
        id: number;
        password: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    issueToken(user: {
        id: number;
        role: Role;
    }, isRefreshToken: boolean): Promise<string>;
    login(rawToken: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}
