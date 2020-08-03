import { BaseCard } from '../card/BaseCard';

export class User {
  id: number;
  name: string;
  avatar: string;
  
  cards: BaseCard[] = [];

  async play () {
    // 通知客户端到你了，并且告知用户哪些牌可以用
    // 等待用户出牌
    // 暂且返回一张
    return this.cards[0]
  }
}
