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
        MessageManager.tellUserCurRoomInfo(user);
        MessageManager.tellUserRoomsInfo(user);
        break;
      case 10002:
        // 用户进入房间
        user.enterRoom(msg);
        MessageManager.tellUserCurRoomInfo(user);
        MessageManager.tellUserRoomsInfo(user);
        MessageManager.broadcastUserEnter(user);
        break;
      case 10003:
        // 用户离开房间
        user.leaveRoom(msg);
        MessageManager.tellUserCurRoomInfo(user);
        MessageManager.tellUserRoomsInfo(user);
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
        MessageManager.tellUserRoomsInfo(user);
        break;
      case 10007:
        MessageManager.tellUserCurRoomInfo(user);
        break;
      case 10008:
        break;
      case 10009:
        break;
      case 10010:
        if (msg.body.roomId !== '1001') {
          user.enterRoom(msg);
          MessageManager.tellUserCurRoomInfo(user);
          MessageManager.tellUserRoomsInfo(user);
          MessageManager.broadcastUserEnter(user);
        }
        break;
    }
  }

  static broadcastUserEnter(user) {
    const curRoom = MyGlobal.platform.getGameRoom(user.curRoomId) || MyGlobal.platform;
    curRoom.getUsers().forEach(eachUser => {
      if (eachUser.id === user.id) {
        return;
      }
      eachUser.listen(MessageConstants.USER_ENTER(user));
      MessageManager.tellUserCurRoomInfo(eachUser);
      MessageManager.tellUserRoomsInfo(eachUser);
    })
  }

  static tellUserRoomsInfo(user) {
    const rooms = MyGlobal.platform.getGameRooms();
    user.listen(MessageConstants.ROOM_INFO(rooms));
  }

  static tellUserCurRoomInfo(user) {
    user.listen(MessageConstants.CUR_ROOM_INFO(MyGlobal.platform.getGameRoom(user.curRoomId) || MyGlobal.platform));
  }
}