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
exports.PagePaginationDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PagePaginationDto {
    constructor() {
        this.page = 1;
        this.take = 5;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Number, default: 1 }, take: { required: true, type: () => Number, default: 5 } };
    }
}
exports.PagePaginationDto = PagePaginationDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PagePaginationDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PagePaginationDto.prototype, "take", void 0);
//# sourceMappingURL=page-pagination.dto.js.map