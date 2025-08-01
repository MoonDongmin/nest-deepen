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
exports.DirectorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const director_schema_1 = require("./schema/director.schema");
const mongoose_2 = require("mongoose");
let DirectorService = class DirectorService {
    constructor(directorModel) {
        this.directorModel = directorModel;
    }
    create(createDirectorDto) {
        return this.directorModel.create(createDirectorDto);
    }
    findAll() {
        return this.directorModel.find();
    }
    findOne(id) {
        return this.directorModel.findById(id);
    }
    async update(id, updateDirectorDto) {
        const director = await this.directorModel.findById(id);
        if (!director) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        await this.directorModel.findByIdAndUpdate(id, updateDirectorDto).exec();
        const newDirector = await this.directorModel.findById(id);
        return newDirector;
    }
    async remove(id) {
        const director = await this.directorModel.findById(id);
        if (!director) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        await this.directorModel.findByIdAndDelete(id);
        return id;
    }
};
exports.DirectorService = DirectorService;
exports.DirectorService = DirectorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(director_schema_1.Director.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DirectorService);
//# sourceMappingURL=director.service.js.map