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
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const genre_schema_1 = require("./schema/genre.schema");
const mongoose_2 = require("mongoose");
let GenreService = class GenreService {
    constructor(genreModel) {
        this.genreModel = genreModel;
    }
    async create(createGenreDto) {
        return this.genreModel.create(createGenreDto);
    }
    findAll() {
        return this.genreModel.find().exec();
    }
    async findOne(id) {
        const genre = await this.genreModel.findById(id).exec();
        if (!genre) {
            throw new common_1.NotFoundException('존재하지 않는 장르입니다!');
        }
        return genre;
    }
    async update(id, updateGenreDto) {
        const genre = await this.genreModel.findById(id).exec();
        if (!genre) {
            throw new common_1.NotFoundException(`존재하지 않는 장르입니다.`);
        }
        await this.genreModel.findByIdAndUpdate(id, updateGenreDto).exec();
        const newGenre = await this.genreModel.findById(id).exec();
        return newGenre;
    }
    async remove(id) {
        const genre = await this.genreModel.findById(id);
        if (!genre) {
            throw new common_1.NotFoundException(`존재하지 않는 장르입니다.`);
        }
        await this.genreModel.findByIdAndDelete(id);
        return id;
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(genre_schema_1.Genre.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GenreService);
//# sourceMappingURL=genre.service.js.map