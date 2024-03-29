/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  arr = [];
  constructor(){
    this.arr = [];
  }
  getAll(){
 
      return this.arr;

    
    
  }
  add(str) {
    this.arr.push(str)
  }
  remove(index){
    if (index >= 0 && index < this.arr.length) {
      this.arr.splice(index, 1);
    }
  }
  update(index,str){
    if(index<this.arr.length){
      this.arr[index] = str;

    }
  }
  clear(){
    this.arr = [];
  }
  get(index){
    if(index>=0 && index<this.arr.length){
      return this.arr[index]
    }
    else {
      return null;
    }
  }
}

module.exports = Todo;
