export default class RNG {
  constructor(seed) {
    this.seed = seed;
    this.original = seed;
    this._random = this.random.bind(this);
  }

  reset() {
    this.seed = this.orignal;
  }

  seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  random() {
    return this.seededRandom(this.seed++);
  }
}
