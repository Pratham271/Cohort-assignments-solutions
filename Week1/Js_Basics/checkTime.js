// Record the start time before setTimeout
const startTime = Date.now();

setTimeout(a,1000);

function a(){
    const endTime = Date.now();

    const timeTaken = endTime-startTime

    console.log("Time taken : "+ timeTaken)
}
