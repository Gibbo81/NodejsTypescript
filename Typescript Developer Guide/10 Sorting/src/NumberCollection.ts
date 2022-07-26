import { SortableBaseClass, Isorter } from './SortableBaseClass';

export class NumberCollection extends SortableBaseClass {
  
  constructor(public data: number[], sorter:Isorter) {
    super(sorter)
  }

  //getter --> to use this method as a property --> sortable.length
  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): number {
    if (this.data[leftIndex] > this.data[rightIndex]) return 1;
    if (this.data[leftIndex] < this.data[rightIndex]) return -1;
    return 0;
  }
  swamp(positionOne: number, positiontwo: number): void {
    [this.data[positionOne], this.data[positiontwo]] = [
      this.data[positiontwo],
      this.data[positionOne],
    ];
  }
}
