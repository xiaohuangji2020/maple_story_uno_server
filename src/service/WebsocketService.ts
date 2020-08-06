/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-18 11:37:14
 */
import ws from 'nodejs-websocket';
import { Service, BaseService } from 'koatty';
import { App } from '../App';
import { Message } from '../model/message/Message';
import { User } from '../model/base/User';
import { Platform } from '../model/base/Platform';

@Service()
export class WebsocketService extends BaseService {
  app: App;
  private port = 3002;
  private server: any;

  /**
   * Custom constructor
   *
   */
  init() {
    this.server = ws.createServer().listen(this.port);
    this.onConnect()
  }

  sendMessage(msg: Message, conn: any) {
    conn.sendText(msg);
  }

  onConnect() {
    this.server.on('connection', (conn: any) => {
      console.log('----------new connection----------');
      this.createUser(conn);
    })
  }

  createUser (conn: any) {
    const user = new User(conn);
    Platform.addUser(user);
  }
}