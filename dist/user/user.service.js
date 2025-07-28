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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const env_const_1 = require("../common/const/env.const");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(configService, userModel) {
        this.configService = configService;
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const { email, password } = createUserDto;
        const user = await this.userModel.findOne({ email }).exec();
        if (user) {
            throw new common_1.BadRequestException(`이미 가입한 이메일 입니다!`);
        }
        const hash = await bcrypt.hash(password, this.configService.get(env_const_1.envVariableKeys.hashRounds));
        await this.userModel.create({
            email,
            password: hash,
        });
        return this.userModel
            .findOne({ email }, {
            createdMovies: 0,
            likedMovies: 0,
            chats: 0,
            chatRooms: 0,
        })
            .exec();
    }
    findAll() {
        return this.userModel.find().exec();
    }
    async findOne(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const { password } = updateUserDto;
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        let input = {
            ...updateUserDto,
        };
        if (password) {
            const hash = await bcrypt.hash(password, this.configService.get(env_const_1.envVariableKeys.hashRounds));
            input = {
                ...input,
                password: hash,
            };
        }
        await this.userModel.findByIdAndUpdate(id, input).exec();
        return this.userModel.findById(id);
    }
    async remove(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        await this.userModel.findByIdAndDelete(id);
        return id;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map