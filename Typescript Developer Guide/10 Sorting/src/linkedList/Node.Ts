export class Node {
  nextNode: Node | null = null;

  constructor(public value: number, public index: number) {}

  setNext(value: number): void {
    if (this.nextNode === null) this.nextNode = new Node(value, this.index + 1);
    else this.nextNode.setNext(value);
  }

  print(): void {
    console.log('Node: ', this.value);
    if (this.nextNode !== null) this.nextNode.print();
  }

  length(starting: number): number {
    return this.nextNode === null
      ? starting
      : this.nextNode.length(starting + 1);
  }

  compare( leftIndex: number, rightIndex: number, firstvalue: number | null ): number {
    if (firstvalue !== null){
        if (this.isThisNodeTheSecondToCompare(rightIndex))
            return this.compareValue(firstvalue, this.value);
        else if (this.nextNode !== null)
            return this.nextNode.compare(leftIndex, rightIndex, firstvalue)
        else
            throw new Error('compare index not found inside the chain')
    }
    else if (this.nextNode === null)
        throw new Error('compare index not found inside the chain')
    else if (this.index === leftIndex)
        return this.nextNode.compare(leftIndex, rightIndex, this.value);
    else 
        return this.nextNode.compare(leftIndex, rightIndex, null);
  }

    private isThisNodeTheSecondToCompare(rightIndex: number) {
        return this.index === rightIndex;
    }

  private compareValue(left: number, right: number): number {
    if (left > right) return 1;
    if (left < right) return -1;
    return 0;
  }
}
