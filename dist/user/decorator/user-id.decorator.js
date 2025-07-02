"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const common_1 = require("@nestjs/common");
exports.UserId = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (!request || !request.user || !request.user.sub) {
        throw new common_1.UnauthorizedException(`사용자 정보를 찾을 수 없습니다.`);
    }
    return request.user.sub;
});
//# sourceMappingURL=user-id.decorator.js.map