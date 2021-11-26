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
    
}