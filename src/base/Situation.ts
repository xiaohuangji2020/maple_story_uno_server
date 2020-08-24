export class Situation {
  direction: boolean; // true顺时针，false逆时针
  color: number;
  num: number;
  total: number; // 加牌量

  clearTotal () {
    this.total = 0;
  }
}