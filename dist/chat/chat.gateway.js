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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const chat_service_1 = require("./chat.service");
const auth_service_1 = require("../auth/auth.service");
let ChatGateway = class ChatGateway {
    constructor(chatService, authService) {
        this.chatService = chatService;
        this.authService = authService;
    }
    handleDisconnect(client) {
        const user = client.data.user;
        if (user) {
            this.chatService.removeClient(user.sub);
        }
    }
    async handleConnection(client) {
        try {
            const rawToken = client.handshake.headers.authorization;
            const payload = await this.authService.parseBearerToken(rawToken, false);
            if (payload) {
                client.data.user = payload;
                this.chatService.registerClient(payload.sub, client);
                this.chatService.joinUserRooms(payload, client);
            }
            else {
                client.disconnect();
            }
        }
        catch (e) {
            console.log(e);
            client.disconnect();
        }
    }
};
exports.ChatGateway = ChatGateway;
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        auth_service_1.AuthService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map