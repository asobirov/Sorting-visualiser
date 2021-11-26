import { TLine } from "@lib/types";

export const insertionSort = (arr: TLine[]) => {
  let sortedArr = [...arr];
  let replay: any[] = [];
  for (let i = 1; i < sortedArr.length; i++) {
    let j = i;
    while (j > 0 && sortedArr[j].length < sortedArr[j - 1].length) {
      swap(sortedArr, j, j - 1, replay);
      j--;
    }
  }
  return { replay, sortedArr };
};

const swap = (arr: TLine[], i: number, j: number, replay: any[]) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  replay.push([i, j]);
};
