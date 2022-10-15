import { Node } from './node';

export class LinkedList {
  private head: Node | null = null;

  add(number: number): void {
    if (this.head !== null) this.head.setNext(number);
    else this.head = new Node(number, 0);
  }

  print(): void {
    if (this.head !== null) this.head.print();
  }

  get length(): number {
    return this.head === null ? 0 : this.head.length(1);
  }

  compare(leftIndex: number, rightIndex: number): number {    
    if (this.head !== null)
      return this.head.compare(leftIndex, rightIndex, null);
    throw new Error('Empty Chain');
  }

  swamp(positionOne: number, positiontwo: number): void {
    if (this.head=== null)
      throw new Error('Empty Chain')
    var elements = this.head.getAllChain([]);
    [elements[positionOne], elements[positiontwo]] = [elements[positiontwo],elements[positionOne]]
    this.recreateTheChain(elements);     
  }

  private recreateTheChain(elements: number[]) {
    this.head = null;
    for (var x = 0; x < elements.length; x++)
      this.add(elements[x]);
  }
}
