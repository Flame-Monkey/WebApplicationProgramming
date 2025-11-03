console.log(true === 1);         // 1
console.log(true === 1);         // 2
console.log(0 === !null);        // 3
console.log(0 === undefined);    // 4
console.log(0 === NaN);          // 5
console.log(NaN === NaN);        // 6
Number.isNaN(NaN);

console.log(Object.is(NaN, NaN));

let arr: number[] = [];
console.log(arr.at(1));

arr[1]  = 1;

console.log(arr.at(1));
console.log(arr.at(0));
