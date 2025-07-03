"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerTokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const env_const_1 = require("../../common/const/env.const");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
let BearerTokenMiddleware = class BearerTokenMiddleware {
    constructor(jwtService, configService, cacheManger) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.cacheManger = cacheManger;
    }
    async use(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            next();
            return;
        }
        try {
            const token = this.validateBearerToke(authHeader);
            const tokenKey = `TOKEN_${token}`;
            const cachedPayload = await this.cacheManger.get(tokenKey);
            if (cachedPayload) {
                req.user = cachedPayload;
                return next();
            }
            const decodedPayload = this.jwtService.decode(token);
            if (decodedPayload.type !== 'refresh' &&
                decodedPayload.type !== 'access') {
                throw new common_1.UnauthorizedException(`잘못된 토큰입니다!`);
            }
            const secretKey = decodedPayload.type === 'refresh'
                ? env_const_1.envVariableKeys.refreshTokenSecret
                : env_const_1.envVariableKeys.accessTokenSecret;
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get(secretKey),
            });
            const expiryDate = +new Date(payload['exp'] * 1000);
            const now = +Date.now();
            const differenceInSeconds = (expiryDate - now) / 1000;
            await this.cacheManger.set(tokenKey, payload, Math.max((differenceInSeconds - 30) * 1000, 1));
            req.user = payload;
            next();
        }
        catch (e) {
            if (e.name == 'TokenExpiredError') {
                throw new common_1.UnauthorizedException(`토큰이 만료됐습니다.`);
            }
            next();
        }
    }
    validateBearerToke(rawToken) {
        const basicSplit = rawToken.split(' ');
        if (basicSplit.length !== 2) {
            throw new common_1.BadRequestException(`토큰 포맷이 잘못됐습니다!`);
        }
        const [bearer, token] = basicSplit;
        if (bearer.toLowerCase() !== 'bearer') {
            throw new common_1.BadRequestException(`토큰 포맷이 잘못됐습니다!`);
        }
        return token;
    }
};
exports.BearerTokenMiddleware = BearerTokenMiddleware;
exports.BearerTokenMiddleware = BearerTokenMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        cache_manager_1.Cache])
], BearerTokenMiddleware);
//# sourceMappingURL=bearer-token.middleware.js.map