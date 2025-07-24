"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailGenerationProcess = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const path_1 = require("path");
const process_1 = require("process");
const ffmpegFluent = require("fluent-ffmpeg");
let ThumbnailGenerationProcess = class ThumbnailGenerationProcess extends bullmq_1.WorkerHost {
    async process(job, token) {
        const { videoPath, videoId } = job.data;
        console.log(`영상 트랜스코딩중... ID: ${videoId}`);
        const outputDirectory = (0, path_1.join)((0, process_1.cwd)(), 'public', 'thumbnail');
        ffmpegFluent(videoPath)
            .screenshots({
            count: 1,
            filename: `${videoId}.png`,
            folder: outputDirectory,
            size: '320x240',
        })
            .on('end', () => {
            console.log(`썸내일 생성 완료! ID: ${videoId}`);
        })
            .on('error', (error) => {
            console.log(error);
            console.log(`썸네일 생성 실패! ID: ${videoId}`);
        });
        return 0;
    }
};
exports.ThumbnailGenerationProcess = ThumbnailGenerationProcess;
exports.ThumbnailGenerationProcess = ThumbnailGenerationProcess = __decorate([
    (0, bullmq_1.Processor)('thumbnail-generation')
], ThumbnailGenerationProcess);
//# sourceMappingURL=thumbnail-generation.worker.js.map