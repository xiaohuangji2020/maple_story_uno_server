import { Message } from './Message';
import { UserAbstract } from '../user/UserAbstract';
import { Player } from '../user/Player';
import { CardFactory } from '../card/CardFactory';
import { MyGlobal } from '../base/MyGlobal';
import { MessageConstants } from './MessageConstants';

export class MessageManager {

  static completeMsg(msg: Message, user: UserAbstract) {
    msg.from = {
      id: user.id,
      name: user.name
    }
  }

  static deal (msg: Message, user: UserAbstract) {
    MessageManager.completeMsg(msg, user);

    switch (msg.type) {
      case 10001:
        // 初始化消息
        user.name = msg.body.name;
        // user.avatar = msg.body.avatar;
        break;
      case 10002:
        // 用户进入房间
        user.enterRoom(msg);
        break;
      case 10003:
        // 用户离开房间
        user.leaveRoom(msg);
        break;
      case 10004:
        // 出牌消息
        const card = CardFactory.getNewCard(msg.body);
        if (user instanceof Player) {
          user.playCard(card);
        }
        break;
      case 10005:
        user.speak(msg);
        break;
      case 10006:
        const rooms = MyGlobal.platform.getGameRooms();
        user.listen(MessageConstants.ROOM_INFO(rooms));
    }
  }
}