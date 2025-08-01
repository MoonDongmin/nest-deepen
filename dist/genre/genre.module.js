"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModule = void 0;
const common_1 = require("@nestjs/common");
const genre_service_1 = require("./genre.service");
const genre_controller_1 = require("./genre.controller");
const common_module_1 = require("../common/common.module");
const mongoose_1 = require("@nestjs/mongoose");
const genre_schema_1 = require("./schema/genre.schema");
let GenreModule = class GenreModule {
};
exports.GenreModule = GenreModule;
exports.GenreModule = GenreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: genre_schema_1.Genre.name,
                    schema: genre_schema_1.GenreSchema,
                },
            ]),
        ],
        controllers: [genre_controller_1.GenreController],
        providers: [genre_service_1.GenreService],
    })
], GenreModule);
//# sourceMappingURL=genre.module.js.map