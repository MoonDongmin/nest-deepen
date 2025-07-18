"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModule = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const movie_controller_1 = require("./movie.controller");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("./entity/movie.entity");
const movie_detail_entity_1 = require("./entity/movie-detail.entity");
const director_entity_1 = require("../director/entity/director.entity");
const genre_entity_1 = require("../genre/entity/genre.entity");
const common_module_1 = require("../common/common.module");
const user_entity_1 = require("../user/entity/user.entity");
const movie_user_like_entity_1 = require("./entity/movie-user-like.entity");
let MovieModule = class MovieModule {
};
exports.MovieModule = MovieModule;
exports.MovieModule = MovieModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                movie_entity_1.Movie,
                movie_detail_entity_1.MovieDetail,
                director_entity_1.Director,
                genre_entity_1.Genre,
                user_entity_1.User,
                movie_user_like_entity_1.MovieUserLike,
            ]),
            common_module_1.CommonModule,
        ],
        controllers: [movie_controller_1.MovieController],
        providers: [movie_service_1.MovieService],
    })
], MovieModule);
//# sourceMappingURL=movie.module.js.map