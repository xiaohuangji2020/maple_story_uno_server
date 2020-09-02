import { Message } from './Message';
import { GameRoom } from '../room/GameRoom';
import { RoomAbstract } from '../room/RoomAbstract';
import { UserAbstract } from '../user/UserAbstract';

export class MessageFactory {
  static readonly IS_YOUR_TURN = () => {
    return new Message({
      code: 0,
      type: 10008,
      body: {}
    }) 
  }

  static readonly TEXT_MESSAGE = (text: string) => {
    return new Message({
      code: 0,
      type: 10005,
      body: { text }
    })
  }

  static readonly ROOM_INFO = (rooms: GameRoom[]) => {
    return new Message({
      code: 0,
      type: 10006,
      body: {
        roomIds: rooms.map((room) => {
          return room.id;
        })
      }
    })
  }

  static readonly CUR_ROOM_INFO = (room: RoomAbstract) => {
    return new Message({
      code: 0,
      type: 10007,
      body: {
        curRoom: {
          id: room.id,
          userCount: room.userCount()
        }
      }
    })
  }

  static readonly USER_ENTER = (user: UserAbstract) => {
    return new Message({
      code: 0,
      type: 10009,
      body: {
        username: user.name
      }
    })
  }

  static readonly USER_READY = (user: UserAbstract) => {
    return new Message({
      code: 0,
      type: 10012,
      body: {
        text: `玩家${user.name}已准备` 
      }
    })
  }

  static readonly USER_CANCEL_READY = (user: UserAbstract) => {
    return new Message({
      code: 0,
      type: 10013,
      body: {
        text: `玩家${user.name}取消准备` 
      }
    })
  }

  static readonly ALL_USER_READY = () => {
    return new Message({
      code: 0,
      type: 10014,
      body: {
        text: '所有玩家准备完毕，即将开始游戏'
      }
    })
  }
}