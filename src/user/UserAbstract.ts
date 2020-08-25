import { Message } from '../message/Message';
import { MessageConstants } from '../message/MessageConstants';
import { MessageManager } from '../message/MessageManager';
import { MyGlobal } from '../base/MyGlobal';
import { RoomAbstract } from '../room/RoomAbstract';

export class UserAbstract {
  id: string;
  name: string;
  avatar: string;

  conn: any;
  
  curRoomId: string;

  constructor (conn: any) {
    this.id = 'user' + Date.now() + Math.random() * 1000;
    // 默认都去大厅
    this.curRoomId = '1001';
    this.conn = conn;
    this.init();
  }

  init () {
    this.onMessage();
    this.onClose();
    this.onError();
  }
  // 用户发出消息
  speak (message: Message) {
    let curRoom: RoomAbstract = MyGlobal.platform.getGameRoom(this.curRoomId)
    if (!curRoom) {
      // 当前房间不存在，则默认为大厅
      curRoom = MyGlobal.platform;
    }
    curRoom.broadcastMsg(message)
  }

  // 用户接收消息
  listen (message: Message) {
    this.sendMessage(MessageConstants.IS_YOUR_TURN())
  }

  enterRoom (message: Message) {
    this.curRoomId = message.body.roomId;
    let curRoom = MyGlobal.platform.getGameRoomIfNot(message.body.roomId)
    curRoom.addUser(this)
  }

  sendMessage (message: Message) {
    this.conn.sendText(JSON.stringify(message));
  }

  onMessage() {
    this.conn.on('text', (str: string) => {
      console.log('收到的信息为:' + str)
      const msg = new Message(str);
      MessageManager.deal(msg, this);
    });
  }

  onClose() {
    this.conn.on('close', (code: number, reason: string) => {
      console.log(`关闭连接, code${code}, ${reason}, ${this.name}离开了`)
    });
  }

  onError() {
    this.conn.on('error', (code: number, reason: string) => {
      console.log(`异常关闭, code${code}, ${reason}, ${this.name}离开了`)
    });
  }
}
