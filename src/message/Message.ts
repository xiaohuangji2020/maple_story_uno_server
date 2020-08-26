import { Tools } from '../utils/tools';

export class Message{
  id: string;
  code: number;
  /**
   * 客户端->服务器消息
   *  10001: 初始化用户消息
   *  10002: 用户进入房间
   *  10003: 用户离开房间
   *  10004: 出牌消息
   *  10005: 说话消息
   * 服务器push消息
   *  20001: 通知客户端到你了的消息
   */
  type: number;
      
  msg?: string;
  body?: any;
  from?: object;
  to?: object[];

  constructor (msgStr?: any) {
    if (msgStr) {
      const msg = typeof msgStr === 'string' ? JSON.parse(msgStr) : msgStr;
      this.id = String(Date.now()) + Tools.getRandom();
      this.code = msg.code;
      this.type = msg.type;
      this.msg = msg.msg || '';
      this.body = msg.body || {};
      this.from = msg.from || {};
    }
  }
}