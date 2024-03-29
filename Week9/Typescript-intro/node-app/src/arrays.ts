function maxValue(arr:number[]):number{
    let maxValue = 0;
    // for(let i:number=0; i<arr.length; i++){
    //     if(arr[i]>maxValue){
    //         maxValue = arr[i];
    //     }
    // }

    arr.map(a => {
        if(a>maxValue) {
            maxValue = a
        }
    })
    return maxValue;
}

const max = maxValue([1,2,3,4,5])
console.log(max)