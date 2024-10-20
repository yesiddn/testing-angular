export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number
  ) {}

  calcIMC(): string {
    const result = Math.round(this.weight / Math.pow(this.height, 2));

    // 0 - 18 = down
    // 19 - 24 = normal
    // 25 - 26 = overweigth
    // 27 - 29 = overweigth level 1
    // 30 - 39 = overweigth level 2
    // 40 = overweigth level 3

    if (result >= 40) {
      return  'overweight level 3';
    }
    else if (result >= 30) {
      return 'overweight level 2';
    }
    else if (result >= 27) {
      return 'overweight level 1';
    }
    else if (result >= 25) {
      return 'overweight';
    }
    else if (result >= 18) {
      return 'normal';
    }
    else if (result > 0) {
      return 'down';
    }
    else{
      return 'not found'
    }
  }
}
