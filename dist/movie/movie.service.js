"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
let MovieService = class MovieService {
    constructor() {
        this.movies = [
            {
                id: 1,
                title: '해리포터',
            },
            {
                id: 2,
                title: '반지의 제왕',
            },
        ];
        this.idCounter = 3;
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
    createMovie(title) {
        const movie = {
            id: this.idCounter++,
            title: title,
        };
        this.movies.push(movie);
        return movie;
    }
    updateMovie(id, title) {
        const movie = this.movies.find((m) => m.id === +id);
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        Object.assign(movie, { title });
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
    (0, common_1.Injectable)()
], MovieService);
//# sourceMappingURL=movie.service.js.map