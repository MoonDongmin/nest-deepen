import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(token: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    loginUser(token: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    blockToken(token: string): Promise<boolean>;
    rotatedAccessToken(req: any): Promise<{
        accessToken: string;
    }>;
    loginUserPassport(req: any): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
}
