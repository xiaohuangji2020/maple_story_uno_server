import { BaseCardBO } from "./BaseCardBO";

export class CommonCardBO extends BaseCardBO {
  constructor (num: number, color: number) {
    super(num, color);
  }

  readonly type: number = 40;

  effect () {
    return this.num;
  }

  canUse (thelastCard: BaseCardBO) {
    return true;
  }
}