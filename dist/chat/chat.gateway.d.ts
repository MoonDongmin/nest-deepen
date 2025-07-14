import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { QueryRunner } from 'typeorm';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    private readonly authService;
    constructor(chatService: ChatService, authService: AuthService);
    handleDisconnect(client: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleMessage(body: {
        message: string;
    }, client: Socket, qr: QueryRunner): Promise<void>;
}
