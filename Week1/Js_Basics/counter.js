function counter(limit) {
    let count = 30;
    return function() {
        if (count <= limit) {
            clearInterval(interval);
        } else {
            console.log(count);
            count--;
        }
    }
}

setInterval(counter(0), 1000);
