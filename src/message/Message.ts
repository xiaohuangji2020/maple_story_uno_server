export class Message{
  code: number;
  /**
   * 客户端->服务器消息
   *  1001: 初始化用户消息
   *  1002: 出牌消息
   * 服务器push消息
   *  2001: 通知客户端到你了的消息
   */
  type: number;
      
  msg?: string;
  body?: any;

  constructor (msgStr?: any) {
    if (msgStr) {
      const msg = typeof msgStr === 'string' ? JSON.parse(msgStr) : msgStr;
      this.code = msg.code;
      this.type = msg.type;
      this.msg = msg.msg;
      this.body = msg.body;
    }
  }
}