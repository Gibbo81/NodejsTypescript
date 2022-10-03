export class Sort {
  sort(array: number[]): number[] {
    for (var i = array.length - 1; i > 0; i--) {
      for (var x = 0; x <= i; x++) {
        if (array[x] > array[x + 1])
          [array[x], array[x + 1]] = [array[x + 1], array[x]];
      }
    }
    return array;
  }
}
