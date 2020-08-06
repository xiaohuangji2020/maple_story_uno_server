import { Message } from './Message';
import { User } from '../base/User';

export class MessageManager {

  static deal (msg: Message, user: User) {
    switch (msg.type) {
      case 1001:
        // 初始化消息
        user.name = msg.data.name;
        user.avatar = msg.data.avatar;
        break;
      case 1002:
        // 出牌消息
        user.playCard(msg);
        break;
      case 1003:
        // 用户进入房间
        user.enterRoom(msg);
    }
  }
}