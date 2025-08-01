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
exports.BaseTable = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class BaseTable {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.BaseTable = BaseTable;
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Date)
], BaseTable.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Date)
], BaseTable.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], BaseTable.prototype, "version", void 0);
//# sourceMappingURL=base-table.entity.js.map