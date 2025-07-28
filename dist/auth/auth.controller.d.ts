import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(token: string): Promise<import("mongoose").Document<unknown, {}, import("../user/schema/user.schema").User, {}> & import("../user/schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
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
