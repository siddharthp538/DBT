const obj = {
    name : 'sid',
    lname : 'pandey'
}

let str = JSON.stringify(obj);
console.log(str);

let ans = JSON.parse(str);
console.log(ans);
