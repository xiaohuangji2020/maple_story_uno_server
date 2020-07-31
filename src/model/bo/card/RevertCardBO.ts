import { BaseCardBO } from "./BaseCardBO";

export class RevertCardBO extends BaseCardBO {
  constructor (num: number, color: number) {
    super(num, color);
  }

  readonly type: number = 20;

  effect () {
    return 0;
  }

  canUse (thelastCard: BaseCardBO) {
    return thelastCard.num === this.num || thelastCard.color === this.color
  }
}