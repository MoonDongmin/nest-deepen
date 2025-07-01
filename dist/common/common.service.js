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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
let CommonService = class CommonService {
    constructor() { }
    applyPagePaginationParamsToQb(qb, dto) {
        const { page, take } = dto;
        const skip = (page - 1) * take;
        qb.take(take);
        qb.skip(skip);
    }
    async applyCursorPaginationParamsToQb(qb, dto) {
        const { cursor, take, order } = dto;
        if (cursor) {
        }
        for (let i = 0; i < order.length; i++) {
            const [column, direction] = order[i].split('_');
            if (direction !== 'ASC' && direction !== 'DESC') {
                throw new common_1.BadRequestException(`Order는 ASC 또는 DESC으로 입력해주세요!`);
            }
            if (i === 0) {
                qb.orderBy(`${qb.alias}.${column}`, direction);
            }
            else {
                qb.addOrderBy(`${qb.alias}.${column}`, direction);
            }
        }
        qb.take(take);
        const results = await qb.getMany();
        const nextCursor = this.generateNextCursor(results, order);
        return {
            qb,
            nextCursor,
        };
    }
    generateNextCursor(results, order) {
        if (results.length === 0)
            return null;
        const lastItem = results[results.length - 1];
        const values = {};
        order.forEach((columnOrder) => {
            const [column] = columnOrder.split('_');
            values[column] = lastItem[column];
        });
        const cursorObj = {
            values,
            order,
        };
        const nextCursor = Buffer.from(JSON.stringify(cursorObj)).toString('base64');
        return nextCursor;
    }
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CommonService);
//# sourceMappingURL=common.service.js.map