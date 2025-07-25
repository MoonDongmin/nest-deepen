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
exports.MovieDetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const movie_entity_1 = require("./movie.entity");
let MovieDetail = class MovieDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, detail: { required: true, type: () => String }, movie: { required: true, type: () => require("./movie.entity").Movie } };
    }
};
exports.MovieDetail = MovieDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovieDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MovieDetail.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => movie_entity_1.Movie, (movie) => movie.id),
    __metadata("design:type", movie_entity_1.Movie)
], MovieDetail.prototype, "movie", void 0);
exports.MovieDetail = MovieDetail = __decorate([
    (0, typeorm_1.Entity)()
], MovieDetail);
//# sourceMappingURL=movie-detail.entity.js.map