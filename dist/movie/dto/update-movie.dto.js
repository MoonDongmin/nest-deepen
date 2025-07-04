"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMovieDto = void 0;
const openapi = require("@nestjs/swagger");
const create_movie_dto_1 = require("./create-movie.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateMovieDto extends (0, swagger_1.PartialType)(create_movie_dto_1.CreateMovieDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateMovieDto = UpdateMovieDto;
//# sourceMappingURL=update-movie.dto.js.map