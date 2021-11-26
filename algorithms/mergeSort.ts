export const mergeSort = (arr: number[]): number[] => {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return mergeHalves(mergeSort(left), mergeSort(right));
}

const mergeHalves = (left: number[], right: number[]): number[] => {
    const sortedArr: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            sortedArr.push(left[leftIndex]);
            leftIndex++;
        } else {
            sortedArr.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return sortedArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}