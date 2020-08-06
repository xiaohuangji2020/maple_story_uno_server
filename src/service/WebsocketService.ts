/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-18 11:37:14
 */
import ws from 'nodejs-websocket';
import { Service, BaseService } from 'koatty';
import { App } from '../App';
import { Message } from '../model/base/Message';

@Service()
export class WebsocketService extends BaseService {
  app: App;
  private port = 3002;
  private conn: any;

  /**
   * Custom constructor
   *
   */
  init() {
    ws.createServer((conn: any) => {
      console.log('----------create websocket server----------');
      this.conn = conn;
      this.onMessage(conn);
      this.onClose(conn);
      this.onError(conn);
    }).listen(this.port);
  }

  sendMessage(msg: Message, conn = this.conn) {
    conn.sendText(msg);
  }

  onMessage(conn = this.conn) {
    conn.on('text', (str: string) => {
      console.log('收到的信息为:' + str)
    });
  }

  onClose(conn = this.conn) {
    conn.on('close', (code: number, reason: string) => {
      console.log(`关闭连接, code${code}, ${reason}`)
    });
  }

  onError(conn = this.conn) {
    conn.on('error', (code: number, reason: string) => {
      console.log(`异常关闭, code${code}, ${reason}`)
    });
  }
}