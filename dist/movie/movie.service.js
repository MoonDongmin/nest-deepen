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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const movie_entity_1 = require("./entity/movie.entity");
let MovieService = class MovieService {
    constructor() {
        this.movies = [];
        this.idCounter = 3;
        const movie1 = new movie_entity_1.Movie();
        movie1.id = 1;
        movie1.title = '해리포터';
        movie1.genre = 'fantasy';
        const movie2 = new movie_entity_1.Movie();
        movie2.id = 2;
        movie2.title = '반지의 제왕';
        movie2.genre = 'action';
        this.movies.push(movie1, movie2);
    }
    getManyMovies(title) {
        if (!title) {
            return this.movies;
        }
        return this.movies.filter((m) => m.title.startsWith(title));
    }
    getMovieById(id) {
        const movie = this.movies.find((m) => m.id === +id);
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        return movie;
    }
    createMovie(createMovieDto) {
        const movie = {
            id: this.idCounter++,
            ...createMovieDto,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 0,
        };
        this.movies.push(movie);
        return movie;
    }
    updateMovie(id, updateMovieDto) {
        const movie = this.movies.find((m) => m.id === +id);
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        Object.assign(movie, updateMovieDto);
        return movie;
    }
    deleteMovie(id) {
        const movieIndex = this.movies.findIndex((m) => m.id === +id);
        if (movieIndex === -1) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        this.movies.splice(movieIndex, 1);
        return id;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MovieService);
//# sourceMappingURL=movie.service.js.map