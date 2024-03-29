enum Direction {
    Up, // when we run console.log(Direction.up) it will print 0 in js but if we want to give a specific value to it we can do Up="up" and then we have to give it to everyone
    Down, // Down = "down"
    Left, // Left = "left"
    Right // Right = "right"
}

type day = "Monday"| "Tuesday"| "Wednesday"| "Thursday"

// function testKey(key:Key): void{
//     for(let i:number=0; i<key.length; i++){
//         console.log(key[i])
//     }
// }
let today:day = "Tuesday"

function DoSomething(keyPressed:Direction):void{
    if(keyPressed==Direction.Up){
        
    }
}
// DoSomething(Direction.Up)


