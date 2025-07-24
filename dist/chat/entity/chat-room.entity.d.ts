import { BaseTable } from '../../common/entity/base-table.entity';
import { User } from '../../user/entity/user.entity';
import { Chat } from './chat.entity';
export declare class ChatRoom extends BaseTable {
    id: number;
    users: User[];
    chats: Chat[];
}
