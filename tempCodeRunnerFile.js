let arr = [1, 2, 3, 4, 5, 6]

let res = arr.reduce((acc, item) => {
    return acc + item
}, 0)

console.log(res);