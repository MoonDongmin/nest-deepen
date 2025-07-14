import { Socket } from 'socket.io';
import { ChatRoom } from './entity/chat-room.entity';
import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';
import { User } from '../user/entity/user.entity';
export declare class ChatService {
    private readonly chatRoomRepository;
    private readonly chatRepository;
    private readonly userRepository;
    constructor(chatRoomRepository: Repository<ChatRoom>, chatRepository: Repository<Chat>, userRepository: Repository<User>);
    private readonly connectedClients;
    registerClient(userId: number, client: Socket): void;
    removeClient(userId: number): void;
    joinUserRooms(user: {
        sub: number;
    }, client: Socket): Promise<void>;
}
