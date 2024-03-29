const fs = require('fs');
fs.writeFile('a.txt' , 'Hello World', (err) => {
  if(err) throw err;
  console.log('The file has been saved!');
})

