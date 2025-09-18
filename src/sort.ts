export function simpleSort(arr: number[], op: string = 'asc'): number[] {
    // const sortedArr = [...arr];
    let endIndex: number = arr.length - 1;

    let order: number = op == 'desc' ? -1 : 1;

    while (endIndex > 0) {
        let select = 0;

        for (let i = 1; i <= endIndex; i++) {
            if (order * arr[i] > order * arr[select]) {
                select = i;
            }
        }

        let temp = arr[endIndex];
        arr[endIndex] = arr[select];
        arr[select] = temp;

        endIndex--;
    }

    return arr;
}