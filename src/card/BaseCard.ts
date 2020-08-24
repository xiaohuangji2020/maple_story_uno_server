import { Tools } from "../utils/tools";
import { Situation } from '../base/Situation';

export abstract class BaseCard {
  constructor (color: number, num: number) {
    this.color = color;
    this.num = num;
    this.random =  Tools.getRandom();
  }
  readonly num: number;
  readonly color: number;
  readonly level: number;  // 卡牌的级别，级别相同或者更大的卡才可以继续出 10基本卡、反转卡、跳过卡；20小加牌卡；30大加牌卡；40骑士牌
  readonly type: number;  // 卡牌类型，10基本卡，20反转卡，30跳过卡，40+2，50+3，60骑士1，70骑士2，80骑士3，90骑士4，100骑士5

  random: number; // 用于生成牌后的打乱

  abstract canUse(thelastCard: BaseCard): boolean;
  abstract effect(situation: Situation): any;

}