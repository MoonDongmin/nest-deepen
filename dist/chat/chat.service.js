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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_room_entity_1 = require("./entity/chat-room.entity");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entity/chat.entity");
const user_entity_1 = require("../user/entity/user.entity");
const websockets_1 = require("@nestjs/websockets");
const class_transformer_1 = require("class-transformer");
let ChatService = class ChatService {
    constructor(chatRoomRepository, chatRepository, userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.connectedClients = new Map();
    }
    registerClient(userId, client) {
        this.connectedClients.set(userId, client);
    }
    removeClient(userId) {
        this.connectedClients.delete(userId);
    }
    async joinUserRooms(user, client) {
        const chatRooms = await this.chatRoomRepository
            .createQueryBuilder('chatRoom')
            .innerJoin('chatRoom.users', 'user', 'user.id = :userId', {
            userId: user.sub,
        })
            .getMany();
        chatRooms.forEach((room) => {
            client.join(room.id.toString());
        });
    }
    async createMessage(payload, { message, room }, qr) {
        const user = await this.userRepository.findOne({
            where: {
                id: payload.sub,
            },
        });
        const chatRoom = await this.getOrCreateChatRoom(user, qr, room);
        const msgModel = await qr.manager.save(chat_entity_1.Chat, {
            author: user,
            message,
            chatRoom,
        });
        const client = this.connectedClients.get(user.id);
        client
            .to(chatRoom.id.toString())
            .emit('newMessage', (0, class_transformer_1.plainToClass)(chat_entity_1.Chat, msgModel));
        return message;
    }
    async getOrCreateChatRoom(user, qr, room) {
        if (user.role === user_entity_1.Role.admin) {
            if (!room) {
                throw new websockets_1.WsException('어드민은 room 값을 필수로 제공해야합니다.');
            }
            return qr.manager.findOne(chat_room_entity_1.ChatRoom, {
                where: { id: room },
                relations: ['users'],
            });
        }
        let chatRoom = await qr.manager
            .createQueryBuilder(chat_room_entity_1.ChatRoom, 'chatRoom')
            .innerJoin('chatRoom.users', 'user')
            .where('user.id = :userId', { userId: user.id })
            .getOne();
        if (!chatRoom) {
            const adminUser = await qr.manager.findOne(user_entity_1.User, {
                where: { role: user_entity_1.Role.admin },
            });
            chatRoom = await this.chatRoomRepository.save({
                users: [user, adminUser],
            });
            [user.id, adminUser.id].forEach((userId) => {
                const client = this.connectedClients.get(userId);
                if (client) {
                    client.emit('roomCreated', chatRoom.id);
                    client.join(chatRoom.id.toString());
                }
            });
        }
        return chatRoom;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_room_entity_1.ChatRoom)),
    __param(1, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map