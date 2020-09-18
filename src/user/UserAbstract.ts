import { Message } from '../message/Message';
import { MessageManager } from '../message/MessageManager';
import { MyGlobal } from '../base/MyGlobal';
import { RoomAbstract } from '../room/RoomAbstract';

export class UserAbstract {
  id: string;
  name: string;
  avatar?: string;

  conn: any;
  
  curRoomId: string;

  constructor (conn: any) {
    this.id = 'user' + Date.now() + Math.random() * 1000;
    // 默认都去大厅
    this.curRoomId = MyGlobal.PLATFORM_ID;
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
    curRoom.broadcastMsg(message);
  }

  // 用户接收消息
  listen (message: Message) {
    this.sendMessage(message);
  }

  enterRoom (message: Message) {
    this.clearLastRoomIfNeed();
    let curRoom = MyGlobal.platform.getGameRoomIfNot(message.body.roomId, message.body.roomName)
    this.curRoomId = curRoom.id;
    curRoom.addUser(this)
  }

  leaveRoom (message: Message) {
    this.clearLastRoomIfNeed();
    this.curRoomId = MyGlobal.PLATFORM_ID
  }

  clearLastRoomIfNeed () {
    const lastRoomId = this.curRoomId;
    if (lastRoomId !== MyGlobal.PLATFORM_ID) {
      const lastRoom = MyGlobal.platform.getGameRoom(lastRoomId);
      if (!lastRoom) return;
      lastRoom.deleteUser(this);
      if (!lastRoom.userCount()) {
        MyGlobal.platform.deleteGameRoom(lastRoom)
      }
    }
  }

  sendMessage (message: Message) {
    const msg = JSON.stringify(message)
    console.log('发送的消息为:' + msg);
    this.conn.sendText(msg);
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
      this.clearLastRoomIfNeed();
    });
  }

  onError() {
    this.conn.on('error', (code: number, reason: string) => {
      console.log(`异常关闭, code${code}, ${reason}, ${this.name}离开了`)
    });
  }
}
