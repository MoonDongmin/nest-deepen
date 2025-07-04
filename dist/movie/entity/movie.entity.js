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
exports.Movie = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_table_entity_1 = require("../../common/entity/base-table.entity");
const movie_detail_entity_1 = require("./movie-detail.entity");
const director_entity_1 = require("../../director/entity/director.entity");
const genre_entity_1 = require("../../genre/entity/genre.entity");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../user/entities/user.entity");
const movie_user_like_entity_1 = require("./movie-user-like.entity");
let Movie = class Movie extends base_table_entity_1.BaseTable {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, creator: { required: true, type: () => require("../../user/entities/user.entity").User }, title: { required: true, type: () => String }, genres: { required: true, type: () => [require("../../genre/entity/genre.entity").Genre] }, likeCount: { required: true, type: () => Number }, dislikeCount: { required: true, type: () => Number }, detail: { required: true, type: () => require("./movie-detail.entity").MovieDetail }, movieFilePath: { required: true, type: () => String }, director: { required: true, type: () => require("../../director/entity/director.entity").Director }, likedUsers: { required: true, type: () => [require("./movie-user-like.entity").MovieUserLike] } };
    }
};
exports.Movie = Movie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Movie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdMovies),
    __metadata("design:type", user_entity_1.User)
], Movie.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genre_entity_1.Genre, (genre) => genre.movies),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Movie.prototype, "genres", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Movie.prototype, "likeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0,
    }),
    __metadata("design:type", Number)
], Movie.prototype, "dislikeCount", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => movie_detail_entity_1.MovieDetail, (movieDetail) => movieDetail, {
        cascade: true,
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", movie_detail_entity_1.MovieDetail)
], Movie.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Transform)(({ value }) => `http://localthost:3000/${value}`),
    __metadata("design:type", String)
], Movie.prototype, "movieFilePath", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => director_entity_1.Director, (director) => director.id, {
        cascade: true,
        nullable: false,
    }),
    __metadata("design:type", director_entity_1.Director)
], Movie.prototype, "director", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movie_user_like_entity_1.MovieUserLike, (mul) => mul.movie),
    __metadata("design:type", Array)
], Movie.prototype, "likedUsers", void 0);
exports.Movie = Movie = __decorate([
    (0, typeorm_1.Entity)()
], Movie);
//# sourceMappingURL=movie.entity.js.map