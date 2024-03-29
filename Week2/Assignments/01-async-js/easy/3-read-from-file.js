const fs = require('fs');
fs.readFile('a.txt', 'utf8', (err, data)=> {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
})

for(let i=0; i<1000000000; i++){
  // console.log();
}

