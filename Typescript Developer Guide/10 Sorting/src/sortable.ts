export interface Sortable {
  compare(leftIndex: number, rightIndex: number): number;
  swamp(positionOne: number, positiontwo: number): void;
  get length(): number;
}
