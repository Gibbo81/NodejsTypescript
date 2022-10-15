import { Sortable } from './sortable';

export class Sort {
  sort(sortable: Sortable): void {
    for (var i = sortable.length - 1; i > 0; i--) {
      for (var x = 0; x < i; x++) {
        if (sortable.compare(x, x + 1) === 1) sortable.swamp(x, x + 1);
      }
    }
  }

  //really bad code written with type guards
  sortBad(sortable: number[] | string): number[] | string {
    for (var i = sortable.length - 1; i > 0; i--) {
      for (var x = 0; x <= i; x++) {
        if (sortable instanceof Array) {
          //type check (called type guard) to be sure that it's an array
          if (sortable[x] > sortable[x + 1])
            //here array ALWAYS is an number[]
            [sortable[x], sortable[x + 1]] = [sortable[x + 1], sortable[x]];
        }

        //string
        if (typeof sortable === 'string') {
          //here array ALWAYS is a string
          //Add here code to work with string
        }
      }
    }
    return sortable;
  }
}
