const object = [
    {
        firstName : "Ram",
        gender: "M"
    },
    {
        firstName : "Sita",
        gender: "F"
    }, 
    {
        firstName : "Laxman",
        gender: "M"
    }, 
    {
        firstName : "Urmila",
        gender: "F"
    }, 
    {
        firstName : "Bharat",
        gender: "M"
    },
    {
        firstName : "Mandavi",
        gender: "F"
    },
    {
        firstName : "Shatrughan",
        gender: "M"
    },
    {
        firstName : "Shrutakirti",
        gender: "F"
    },

]

// object.map((element)=> {
//     element.gender=='M'?console.log(element.firstName):""
// });

for(let i=0; i<object.length; i++){
    if(object[i]["gender"]=="M"){
        console.log(object[i]["firstName"])
    }
}
