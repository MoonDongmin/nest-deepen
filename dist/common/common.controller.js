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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const common_service_1 = require("./common.service");
const bullmq_1 = require("bullmq");
const bullmq_2 = require("@nestjs/bullmq");
let CommonController = class CommonController {
    constructor(thumbnailQueue, commonService) {
        this.thumbnailQueue = thumbnailQueue;
        this.commonService = commonService;
    }
    async createVideo(movie) {
        await this.thumbnailQueue.add('thumbnail', {
            videoId: movie.filename,
            videoPath: movie.path,
        });
        return {
            fileName: movie.filename,
        };
    }
    async createPresignedUrl() {
        return {
            url: await this.commonService.createPresignedUrl(),
        };
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, common_1.Post)('video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video', {
        limits: {
            fileSize: 20000000,
        },
        fileFilter(req, file, callback) {
            if (file.mimetype !== 'video/mp4') {
                return callback(new common_1.BadRequestException(`MP4 타이만 업로드 가능합니다!`), false);
            }
            return callback(null, true);
        },
    })),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "createVideo", null);
__decorate([
    (0, common_1.Post)('presigned-url'),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "createPresignedUrl", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)('common'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, bullmq_2.InjectQueue)('thumbnail-generation')),
    __metadata("design:paramtypes", [bullmq_1.Queue,
        common_service_1.CommonService])
], CommonController);
//# sourceMappingURL=common.controller.js.map