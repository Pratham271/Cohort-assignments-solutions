setInterval(function(){
    let date = new Date;
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + (date.getHours() < 12 ? "AM" : "PM"));
}, 1000);

