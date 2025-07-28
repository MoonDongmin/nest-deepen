import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from '@nestjs/cache-manager';
import { UserService } from '../user/user.service';
import { Role } from '@prisma/client';
import { User } from '../user/schema/user.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    private readonly jwtService;
    private readonly cacheManger;
    private readonly userModel;
    constructor(userService: UserService, configService: ConfigService, jwtService: JwtService, cacheManger: Cache, userModel: Model<User>);
    tokenBlock(token: string): Promise<boolean>;
    parseBasicToken(rawToken: string): {
        email: string;
        password: string;
    };
    parseBearerToken(rawToken: string, isRefreshToken: boolean): Promise<any>;
    register(rawToken: string): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    authenticate(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    issueToken(user: {
        _id: any;
        role: Role;
    }, isRefreshToken: boolean): Promise<string>;
    login(rawToken: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}
