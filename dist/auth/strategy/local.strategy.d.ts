import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
}
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, import("../../user/schema/user.schema").User, {}> & import("../../user/schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
