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
exports.CreateMovieDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateMovieDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, detail: { required: true, type: () => String }, directorId: { required: true, type: () => String }, genreIds: { required: true, type: () => [String], minItems: 1 }, movieFileName: { required: true, type: () => String } };
    }
}
exports.CreateMovieDto = CreateMovieDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '영화 제목',
        example: '겨울왕국',
    }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '영화 설명',
        example: '3시간 훅가쥬?',
    }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "detail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '감독 객체 ID',
        example: 1,
    }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "directorId", void 0);
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({
        each: true,
    }),
    (0, class_transformer_1.Type)(() => String),
    (0, swagger_1.ApiProperty)({
        description: '장르 IDs',
        example: [1, 2, 3],
    }),
    __metadata("design:type", Array)
], CreateMovieDto.prototype, "genreIds", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '영화 파일 이름',
        example: 'aaa-bbb-ccc-ddd.jpg',
    }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "movieFileName", void 0);
//# sourceMappingURL=create-movie.dto.js.map