import { BaseCardBO } from "./BaseCardBO";

export class CommonCardBO extends BaseCardBO {
  constructor (num: number, color: number) {
    super(num, color);
  }

  readonly type: number = 10;

  effect () {
    return 0;
  }

  canUse (thelastCard: BaseCardBO) {
    return thelastCard.num === this.num || thelastCard.color === this.color
  }
}