import { Sortable } from './sortable';

export abstract class SortableBaseClass{
    private sorter: Isorter

    constructor( sorter: Isorter){
        this.sorter=sorter
    }

    sortList(){
        this.sorter.sort(this)
    }

    abstract get length(): number 
    abstract compare(leftIndex: number, rightIndex: number): number 
    abstract swamp(positionOne: number, positiontwo: number): void 
}


export interface Isorter{
    sort(sortable: Sortable): void
  }