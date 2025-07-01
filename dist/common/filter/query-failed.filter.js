"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFailedExceptionFilter = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let QueryFailedExceptionFilter = class QueryFailedExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = 400;
        let message = '데이터베이스 에러 발생!';
        if (exception.message.includes('duplicate key')) {
            message = '중복 키 에러!';
        }
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
};
exports.QueryFailedExceptionFilter = QueryFailedExceptionFilter;
exports.QueryFailedExceptionFilter = QueryFailedExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], QueryFailedExceptionFilter);
//# sourceMappingURL=query-failed.filter.js.map