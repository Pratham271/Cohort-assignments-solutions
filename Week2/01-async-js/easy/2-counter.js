function timer(){
    let date = new Date();
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + (date.getHours() < 12 ? "AM" : "PM"));
    setTimeout(timer,1000)  
 
}

timer();

