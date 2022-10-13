import { Sortable } from './sortable';

export class CharactersCollection implements Sortable {
  constructor(public data: string) {}

  swamp(positionOne: number, positiontwo: number): void {
    var characters = this.data.split('');
    [characters[positionOne], characters[positiontwo]] = [
      characters[positiontwo],
      characters[positionOne],
    ];
    this.data = characters.join('');
  }
  compare(leftIndex: number, rightIndex: number): number {
    if (
      this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
    )
      return 1;
    if (
      this.data[leftIndex].toLowerCase() < this.data[rightIndex].toLowerCase()
    )
      return -1;
    return 0;
  }
  get length(): number {
    return this.data.length;
  }
}
