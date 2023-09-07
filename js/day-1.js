// let user = {}
// user.name = "John";
// user.surname = "Smith";
// user.name = "Pete";
// delete user.name;

// const isEmpty = (d) => {
//   return Object.keys(schedule).length == 0
// }
// let schedule = {};
// console.log(isEmpty(schedule))
// schedule.a = 1;
// console.log(isEmpty(schedule))

// sum = 0
// let salaries = {
//   A: 100,
//   B: 160,
//   C: 130
// }

// for (i in salaries) {
//   sum += salaries[i]
// }
// console.log(sum)

class User {
  /**
  @param {String} name
  @param {Number} age
  */
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }  
  sayName() {
    console.log(this.name)
  }
  sayAge() {
    console.log(this.age)
  }
}

let user  = new User("5-23", 10)
user.sayName()