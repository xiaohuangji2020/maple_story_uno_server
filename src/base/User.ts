import { BaseCard } from '../card/BaseCard';
import { Message } from '../message/Message';
import { MessageConstants } from '../message/MessageConstants';
import { MessageManager } from '../message/MessageManager';
import { Platform } from './Platform';

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

  notifyUserTurn () {
    this.sendMessage(MessageConstants.IS_YOUR_TURN())
  }

  // 出牌
  playCard (card: BaseCard) {
    const curRoom = Platform.getRoom(this.curRoomId)
    curRoom.game.play(card)
  }

  speak (message: Message) {
    const curRoom = Platform.getRoom(this.curRoomId)
    curRoom.broadcastMsg(message)
  }

  enterRoom (message: Message) {
    this.curRoomId = message.body.roomId;
    let curRoom = Platform.getRoomIfNot(message.body.roomId)
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
