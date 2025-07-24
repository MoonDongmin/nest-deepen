"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsQueryRunner = void 0;
const common_1 = require("@nestjs/common");
exports.WsQueryRunner = (0, common_1.createParamDecorator)((data, context) => {
    const client = context.switchToWs().getClient();
    if (!client || !client.data || !client.data.queryRunner) {
        throw new common_1.InternalServerErrorException(`Query Runner 객체를 찾을 수 없습니다.`);
    }
    return client.data.queryRunner;
});
//# sourceMappingURL=ws-query-runner.decorator.js.map