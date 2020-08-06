import { Message } from './Message';

export class MessageConstants {
  static readonly IS_YOUR_TURN = () => {
    return new Message({
      code: 0,
      type: 2001,
      data: {}
    }) 
  }
}