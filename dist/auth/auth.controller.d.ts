import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(token: string): Promise<import("../user/entities/user.entity").User>;
    loginUser(token: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    loginUserPassport(req: any): any;
}
