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
exports.User = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const base_table_entity_1 = require("../../common/entity/base-table.entity");
const class_transformer_1 = require("class-transformer");
const movie_entity_1 = require("../../movie/entity/movie.entity");
const movie_user_like_entity_1 = require("../../movie/entity/movie-user-like.entity");
var Role;
(function (Role) {
    Role[Role["admin"] = 0] = "admin";
    Role[Role["paidUser"] = 1] = "paidUser";
    Role[Role["user"] = 2] = "user";
})(Role || (exports.Role = Role = {}));
let User = class User extends base_table_entity_1.BaseTable {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)({
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: Role,
        default: Role.user,
    }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movie_entity_1.Movie, (movie) => movie.creator),
    __metadata("design:type", Array)
], User.prototype, "createdMovies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movie_user_like_entity_1.MovieUserLike, (mul) => mul.user),
    __metadata("design:type", Array)
], User.prototype, "likedMovies", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map