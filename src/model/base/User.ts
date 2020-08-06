import { BaseCard } from '../card/BaseCard';
import { Autowired } from 'koatty';
import { WebsocketService } from '../../service/WebsocketService';
import { Message } from './Message';

export class User {
  id: number;
  name: string;
  avatar: string;
  
  cards: BaseCard[] = [];

  @Autowired()
  ws: WebsocketService;

  async play () {
    // 通知客户端到你了，并且告知用户哪些牌可以用
    this.ws.sendMessage(Message.IS_YOUR_TURN);
    await this.getUserPlayCardMessage()
    // 等待用户出牌
    // 暂且返回一张
    return this.cards[0]
  }

  async getUserPlayCardMessage () {
    return new Promise((resolve, reject) => {
      
    })
  }
}
