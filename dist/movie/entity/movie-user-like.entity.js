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
exports.MovieUserLike = void 0;
const typeorm_1 = require("typeorm");
const movie_entity_1 = require("./movie.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let MovieUserLike = class MovieUserLike {
};
exports.MovieUserLike = MovieUserLike;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: 'movieId',
        type: 'int8',
    }),
    (0, typeorm_1.ManyToOne)(() => movie_entity_1.Movie, (movie) => movie.likedUsers),
    __metadata("design:type", movie_entity_1.Movie)
], MovieUserLike.prototype, "movie", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: 'userId',
        type: 'int8',
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.likedMovies),
    __metadata("design:type", user_entity_1.User)
], MovieUserLike.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], MovieUserLike.prototype, "isLike", void 0);
exports.MovieUserLike = MovieUserLike = __decorate([
    (0, typeorm_1.Entity)()
], MovieUserLike);
//# sourceMappingURL=movie-user-like.entity.js.map