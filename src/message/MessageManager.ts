import { Message } from './Message';
import { User } from '../base/User';
import { CardFactory } from '../card/CardFactory';

export class MessageManager {

  static deal (msg: Message, user: User) {
    switch (msg.type) {
      case 1001:
        // 初始化消息
        user.name = msg.body.name;
        user.avatar = msg.body.avatar;
        break;
      case 1002:
        // 用户进入房间
        user.enterRoom(msg);
      case 1003:
        // 用户进入房间
        user.enterRoom(msg);
      case 1004:
        // 出牌消息
        const card = CardFactory.getNewCard(msg.body);
        user.playCard(card);
        break;
      case 1005:
        // 说话消息
        break;
    }
  }
}