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
exports.MovieFilePipe = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const promises_1 = require("fs/promises");
const path_1 = require("path");
let MovieFilePipe = class MovieFilePipe {
    constructor(options) {
        this.options = options;
    }
    async transform(value, metadata) {
        if (!value) {
            throw new common_1.BadRequestException(`movie 필드는 필수입니다!`);
        }
        const byteSize = this.options.maxSize * 1000000;
        if (value.size > byteSize) {
            throw new common_1.BadRequestException(`${this.options.maxSize}MB 이하의 사이즈만 업로드 가능합니다!`);
        }
        if (value.mimetype !== this.options.mimetype) {
            throw new common_1.BadRequestException(`${this.options.mimetype} 만 업로드 가능합니다!`);
        }
        const split = value.originalname.split('.');
        let extension = 'mp4';
        if (split.length > 1) {
            extension = split[split.length - 1];
        }
        const filename = `${(0, uuid_1.v4)()}_${Date.now()}.${extension}`;
        const newPath = (0, path_1.join)(value.destination, filename);
        await (0, promises_1.rename)(value.path, newPath);
        return {
            ...value,
            filename,
            path: newPath,
        };
    }
};
exports.MovieFilePipe = MovieFilePipe;
exports.MovieFilePipe = MovieFilePipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], MovieFilePipe);
//# sourceMappingURL=movie-file.pipe.js.map