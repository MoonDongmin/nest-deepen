import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { QueryRunner } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    private readonly authService;
    constructor(chatService: ChatService, authService: AuthService);
    handleDisconnect(client: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleMessage(body: CreateChatDto, client: Socket, qr: QueryRunner): Promise<void>;
}
