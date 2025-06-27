import { Role, User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly configService;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, configService: ConfigService, jwtService: JwtService);
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
