import { Message } from './Message';
import { UserAbstract } from '../user/UserAbstract';
import { Player } from '../user/Player';
import { CardFactory } from '../card/CardFactory';
import { MyGlobal } from '../base/MyGlobal';
import { MessageFactory } from './MessageFactory';

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
        MessageManager.tellUserEnterRoomSuccess(user);
        MessageManager.tellUserCurRoomInfo(user);
        // todo 应该不需要告知全部房间信息了
        MessageManager.tellUserRoomsInfo(user);
        MessageManager.broadcastUserEnter(user);
        break;
      case 10003:
        // 用户离开房间
        user.leaveRoom(msg);
        MessageManager.tellUserEnterRoomSuccess(user);
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
      case 10011:
        MessageManager.dealUserReady(user, msg);
        break;
      case 10012:
        MessageManager.dealUserReady(user, msg);
        break;
    }
  }

  static dealUserReady(user: UserAbstract, msg: Message) {
    if (!(user instanceof Player)) {
      // 这里可以发送错误信息
      return;
    }
    const curRoom = MyGlobal.platform.getGameRoom(user.curRoomId)
    if (!curRoom) {
      // 这里可以发送错误信息
      return;
    }
    switch(msg.type) {
      case 10011:
        user.getReady();
        curRoom.broadcastMsg(MessageFactory.USER_READY(user), [user.id]);
        break;
      case 10012:
        user.cancelReady();
        curRoom.broadcastMsg(MessageFactory.USER_CANCEL_READY(user), [user.id]);
        break;
    }
  }

  static broadcastUserEnter(user: UserAbstract) {
    const curRoom = MyGlobal.platform.getGameRoom(user.curRoomId) || MyGlobal.platform;
    curRoom.getUsers().forEach(eachUser => {
      if (eachUser.id === user.id) {
        return;
      }
      eachUser.listen(MessageFactory.USER_ENTER(user));
      MessageManager.tellUserCurRoomInfo(eachUser);
      MessageManager.tellUserRoomsInfo(eachUser);
    })
  }

  static tellUserRoomsInfo(user: UserAbstract) {
    const rooms = MyGlobal.platform.getGameRooms();
    user.listen(MessageFactory.ROOM_INFO(rooms));
  }

  static tellUserCurRoomInfo(user: UserAbstract) {
    user.listen(MessageFactory.CUR_ROOM_INFO(MyGlobal.platform.getGameRoom(user.curRoomId) || MyGlobal.platform));
  }

  static tellUserEnterRoomSuccess(user: UserAbstract) {
    user.listen(MessageFactory.ENTER_ROOM_SUCCESS(user.curRoomId));
  }
}