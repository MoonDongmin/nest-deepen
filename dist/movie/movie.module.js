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
const common_module_1 = require("../common/common.module");
const mongoose_1 = require("@nestjs/mongoose");
const movie_schema_1 = require("./schema/movie.schema");
const movie_detail_schema_1 = require("./schema/movie-detail.schema");
const movie_user_like_schema_1 = require("./schema/movie-user-like.schema");
const director_schema_1 = require("../director/schema/director.schema");
const genre_schema_1 = require("../genre/schema/genre.schema");
const user_schema_1 = require("../user/schema/user.schema");
let MovieModule = class MovieModule {
};
exports.MovieModule = MovieModule;
exports.MovieModule = MovieModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: movie_schema_1.Movie.name,
                    schema: movie_schema_1.MovieSchema,
                },
                {
                    name: movie_detail_schema_1.MovieDetail.name,
                    schema: movie_detail_schema_1.MovieDetailSchema,
                },
                {
                    name: movie_user_like_schema_1.MovieUserLike.name,
                    schema: movie_user_like_schema_1.MovieUserLikeSchema,
                },
                {
                    name: director_schema_1.Director.name,
                    schema: director_schema_1.DirectorSchema,
                },
                {
                    name: genre_schema_1.Genre.name,
                    schema: genre_schema_1.GenreSchema,
                },
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
            ]),
            common_module_1.CommonModule,
        ],
        controllers: [movie_controller_1.MovieController],
        providers: [movie_service_1.MovieService],
    })
], MovieModule);
//# sourceMappingURL=movie.module.js.map