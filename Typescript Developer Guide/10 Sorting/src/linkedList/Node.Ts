export class Node {
  private nextNode: Node | null = null;
  private value: number
  private index : number
  constructor(value: number, index: number) {
    this.value= value
    this.index = index
  }

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

  compare( leftIndex: number, rightIndex: number, firstComparisongValue: number | null ): number {
    if (firstComparisongValue !== null)
      return this.searchForsecondComparisonValue(leftIndex, rightIndex, firstComparisongValue)
    if (this.nextNode === null)
      throw new Error('compare indexes not found inside the chain')
    if (this.isThisNodeTheSecondOne(leftIndex))
      return this.nextNode.compare(leftIndex, rightIndex, this.value);
    return this.nextNode.compare(leftIndex, rightIndex, null)
  }

  private isThisNodeTheSecondOne(leftIndex: number) {
    return this.index === leftIndex;
  }

  private searchForsecondComparisonValue( leftIndex: number, rightIndex: number, firstComparisongValue: number): number {
    if (this.isThisNodeTheSecondToCompare(rightIndex))
        return this.compareValue(firstComparisongValue, this.value);
    if (this.nextNode !== null)
        return this.nextNode.compare(leftIndex, rightIndex, firstComparisongValue)    
    throw new Error('compare index not found inside the chain')
  }

  private isThisNodeTheSecondToCompare(rightIndex: number) {
      return this.index === rightIndex;
  }

  private compareValue(left: number, right: number): number {
    if (left > right) return 1;
    if (left < right) return -1;
    return 0;
  }

  getAllChain(allElements: number[]): number[]{
    allElements.push(this.value)
    if (this.nextNode !== null)
      allElements = this.nextNode.getAllChain(allElements)
    return allElements
  }
}
