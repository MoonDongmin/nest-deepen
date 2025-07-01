"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTimeInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ResponseTimeInterceptor = class ResponseTimeInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const reqTime = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            const respTime = Date.now();
            const diff = respTime - reqTime;
            if (diff > 1000) {
                console.log(`!!! TIMEOUT !!!![${req.method} ${req.path}] ${diff}ms`);
                throw new common_1.InternalServerErrorException(`시간이 너무 오래 걸렸습니다!`);
            }
            else {
                console.log(`[${req.method} ${req.path}] ${diff}ms`);
            }
        }));
    }
};
exports.ResponseTimeInterceptor = ResponseTimeInterceptor;
exports.ResponseTimeInterceptor = ResponseTimeInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseTimeInterceptor);
//# sourceMappingURL=response-time.interceptor.js.map