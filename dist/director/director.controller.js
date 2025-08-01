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
exports.DirectorController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const director_service_1 = require("./director.service");
const create_director_dto_1 = require("./dto/create-director.dto");
const update_director_dto_1 = require("./dto/update-director.dto");
const swagger_1 = require("@nestjs/swagger");
let DirectorController = class DirectorController {
    constructor(directorService) {
        this.directorService = directorService;
    }
    findAll() {
        return this.directorService.findAll();
    }
    findOne(id) {
        return this.directorService.findOne(id);
    }
    create(createDirectorDto) {
        return this.directorService.create(createDirectorDto);
    }
    update(id, updateDirectorDto) {
        return this.directorService.update(id, updateDirectorDto);
    }
    remove(id) {
        return this.directorService.remove(id);
    }
};
exports.DirectorController = DirectorController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_director_dto_1.CreateDirectorDto]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_director_dto_1.UpdateDirectorDto]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "remove", null);
exports.DirectorController = DirectorController = __decorate([
    (0, common_1.Controller)('director'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [director_service_1.DirectorService])
], DirectorController);
//# sourceMappingURL=director.controller.js.map