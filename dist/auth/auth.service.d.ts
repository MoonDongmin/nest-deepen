import { Role, User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from '@nestjs/cache-manager';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly userService;
    private readonly configService;
    private readonly jwtService;
    private readonly cacheManger;
    constructor(userRepository: Repository<User>, userService: UserService, configService: ConfigService, jwtService: JwtService, cacheManger: Cache);
    tokenBlock(token: string): Promise<boolean>;
    parseBasicToken(rawToken: string): {
        email: string;
        password: string;
    };
    parseBearerToken(rawToken: string, isRefreshToken: boolean): Promise<any>;
    register(rawToken: string): Promise<User>;
    authenticate(email: string, password: string): Promise<User>;
    issueToken(user: {
        id: number;
        role: Role;
    }, isRefreshToken: boolean): Promise<string>;
    login(rawToken: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}
