import { Message } from './Message';

export class MessageConstants {
  static readonly IS_YOUR_TURN = () => {
    return new Message({
      code: 0,
      type: 20001,
      from: 0,
      data: {}
    }) 
  }

  static readonly TEXT_MESSAGE = (text: string) => {
    return new Message({
      code: 0,
      type: 10005,
      data: { text }
    })
  }
}