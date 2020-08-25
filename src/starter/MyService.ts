/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-18 11:37:14
 */
import ws from 'nodejs-websocket';
import { Player } from '../user/Player';
import { Message } from '../message/Message';
import { MyGlobal } from '../base/MyGlobal';


export class MyService {
  private static port = 3002;
  private static server: any;

  /**
   * Custom constructor
   *
   */
  static init() {
    MyService.server = ws.createServer().listen(this.port);
    MyService.onConnect()
  }

  static sendMessage(msg: Message, conn: any) {
    conn.sendText(msg);
  }

  static onConnect() {
    MyService.server.on('connection', (conn: any) => {
      console.log('----------new connection----------');
      // 这里可以创建其他类型用户
      MyService.createUser(conn);
    })
  }

  static createUser (conn: any) {
    const user = new Player(conn);
    MyGlobal.platform.addUser(user);
  }
}