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
exports.RbacGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rbac_decorator_1 = require("../decorator/rbac.decorator");
const client_1 = require("@prisma/client");
let RbacGuard = class RbacGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const role = this.reflector.get(rbac_decorator_1.RBAC, context.getHandler());
        if (!Object.values(client_1.Role).includes(role)) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }
        const roleAccessLevel = {
            [client_1.Role.admin]: 0,
            [client_1.Role.paidUser]: 1,
            [client_1.Role.user]: 2,
        };
        return roleAccessLevel[user.role] <= roleAccessLevel[role];
    }
};
exports.RbacGuard = RbacGuard;
exports.RbacGuard = RbacGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RbacGuard);
//# sourceMappingURL=rbac.guard.js.map