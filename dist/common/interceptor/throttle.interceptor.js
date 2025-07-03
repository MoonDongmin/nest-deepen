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
exports.ThrottleInterceptor = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const throttle_decorator_1 = require("../decorator/throttle.decorator");
let ThrottleInterceptor = class ThrottleInterceptor {
    constructor(cacheManager, reflector) {
        this.cacheManager = cacheManager;
        this.reflector = reflector;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const userId = request?.user?.sub;
        if (!userId) {
            return next.handle();
        }
        const throttleOptions = this.reflector.get(throttle_decorator_1.Throttle, context.getHandler());
        if (!throttleOptions) {
            return next.handle();
        }
        const date = new Date();
        const minute = date.getMinutes();
        const key = `${request.method}_${request.path}_${userId}_${minute}`;
        const count = await this.cacheManager.get(key);
        console.log(key);
        console.log(count);
        if (count && count >= throttleOptions.count) {
            throw new common_1.ForbiddenException(`요청 가능 횟수를 넘어섰습니다!`);
        }
        return next.handle().pipe((0, rxjs_1.tap)(async () => {
            const count = (await this.cacheManager.get(key)) ?? 0;
            this.cacheManager.set(key, count + 1, 60000);
        }));
    }
};
exports.ThrottleInterceptor = ThrottleInterceptor;
exports.ThrottleInterceptor = ThrottleInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cache_manager_1.Cache,
        core_1.Reflector])
], ThrottleInterceptor);
//# sourceMappingURL=throttle.interceptor.js.map