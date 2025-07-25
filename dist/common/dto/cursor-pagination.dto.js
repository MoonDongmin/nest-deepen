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
exports.CursorPaginationDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CursorPaginationDto {
    constructor() {
        this.order = ['id_DESC'];
        this.take = 2;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { cursor: { required: false, type: () => String }, order: { required: true, type: () => [String], default: ['id_DESC'] }, take: { required: true, type: () => Number, default: 2 } };
    }
}
exports.CursorPaginationDto = CursorPaginationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '페이지네이션 커서',
        example: 'eyJ2YWx1ZXMiOnsiaWQiOjJ9LCJvcmRlciI6WyJpZF9ERVNDIl19',
    }),
    __metadata("design:type", String)
], CursorPaginationDto.prototype, "cursor", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({
        each: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '내림차 또는 오름차 정렬',
        example: ['id_DESC'],
    }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value])),
    __metadata("design:type", Array)
], CursorPaginationDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: '가져올 데이터 갯수',
        example: 5,
    }),
    __metadata("design:type", Number)
], CursorPaginationDto.prototype, "take", void 0);
//# sourceMappingURL=cursor-pagination.dto.js.map