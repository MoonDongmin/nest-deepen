"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const common_service_1 = require("./common.service");
const common_controller_1 = require("./common.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const tasks_service_1 = require("./tasks.service");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (0, path_1.join)(process.cwd(), 'public', 'temp'),
                    filename: (req, file, cb) => {
                        const split = file.originalname.split('.');
                        let extension = 'mp4';
                        if (split.length > 1) {
                            extension = split[split.length - 1];
                        }
                        cb(null, `${(0, uuid_1.v4)()}_${Date.now()}.${extension}`);
                    },
                }),
            }),
        ],
        controllers: [common_controller_1.CommonController],
        providers: [common_service_1.CommonService, tasks_service_1.TasksService],
        exports: [common_service_1.CommonService],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map