export class Tools {
  static readonly getRandom = (bit = 10000) => {
    return Math.round(Math.random() * bit)
  }
}