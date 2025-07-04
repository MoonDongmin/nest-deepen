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
exports.Genre = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_table_entity_1 = require("../../common/entity/base-table.entity");
const movie_entity_1 = require("../../movie/entity/movie.entity");
let Genre = class Genre extends base_table_entity_1.BaseTable {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, movies: { required: true, type: () => [require("../../movie/entity/movie.entity").Movie] } };
    }
};
exports.Genre = Genre;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Genre.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Genre.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => movie_entity_1.Movie, (movie) => movie.genres),
    __metadata("design:type", Array)
], Genre.prototype, "movies", void 0);
exports.Genre = Genre = __decorate([
    (0, typeorm_1.Entity)()
], Genre);
//# sourceMappingURL=genre.entity.js.map