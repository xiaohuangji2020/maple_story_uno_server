import { BaseCard } from '../card/BaseCard';
import { Message } from '../message/Message';
import { MessageConstants } from '../message/MessageConstants';
import { MessageManager } from '../message/MessageManager';
import { Platform } from './Platform';
import { Room } from './Room';

export class User {
  id: string;
  name: string;
  avatar: string;

  conn: any;
  
  curRoomId: string;
  cards: BaseCard[] = [];

  constructor (conn: any) {
    this.id = 'user' + Date.now() + Math.random() * 1000
    this.conn = conn;
    this.init();
  }

  init () {
    this.onMessage();
    this.onClose();
    this.onError();
  }

  async play () {
    // 通知客户端到你了，并且告知用户哪些牌可以用
    this.notifyUserTurn()
    // 等待用户出牌
    // 暂且返回一张
    return this.cards[0]
  }

  // 通知用户
  notifyUserTurn () {
    this.sendMessage(MessageConstants.IS_YOUR_TURN())
  }

  // 出牌
  playCard (message: Message) {
    const curRoom = Platform.getRoom(this.curRoomId)
    curRoom.messages.push(message)
  }

  enterRoom (message: Message) {
    this.curRoomId = message.data.roomId;
    let curRoom = Platform.getRoom(message.data.roomId)
    if (!curRoom) {
      curRoom = new Room(this.curRoomId)
      this.curRoomId = curRoom.id
      Platform.addRoom(curRoom)
    }
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
