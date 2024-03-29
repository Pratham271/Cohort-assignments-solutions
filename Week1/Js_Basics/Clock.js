function counter() {
    let seconds = 0;
    let minutes = 0;
    let hour = 0;
    return function() {
        if (seconds == 60) {
            seconds = 0;
            if(minutes==60){
                if(hour==24){
                    hour=0;
                }
                else{
                    hour++;
                }
            }
            else{
                minutes++;
            }
            

        } else {
            console.log(hour+":"+minutes+":"+seconds);
            seconds++;
        }
    }
}


function counter(){
    // return function(){
    //     const currentDate = new Date();
    //     console.log(currentDate.getHours()+ " "+ currentDate.getMinutes()+ " " + currentDate.getSeconds())
    // }
    const currentDate = new Date();
    console.log(currentDate.getHours()+ " "+ currentDate.getMinutes()+ " " + currentDate.getSeconds())
}
setInterval(counter, 1000);
