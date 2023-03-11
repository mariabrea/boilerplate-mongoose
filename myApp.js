require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    age: Number,
    favoriteFoods: Array
});

let Person = mongoose.model("Person", personSchema);

// let Person;

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Luis Lopez",
    age: 43,
    favoriteFoods: ["jamon", "pasta", "pork"]
  });

  person.save(function(err, data) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log(data);
      done(null , data);
    }
  });

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log(data);
      done(null , data);
    }
  });
};
// createManyPeople([{name:"Pepe Ruiz", age:22, favoriteFoods:["jamon", "ice cream"]}, 
//   {name:"Manolo Lopez", age:56, favoriteFoods:["tacos", "pork"]}, 
//   {name:"John Smith", age:44, favoriteFoods:["burguer", "hot dog"]}], (err, data) => {
//   if (err) {
//       console.log(err);
//       return;
//   }
//   console.log(data);
// });

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log(data);
      done(null , data);
    }
  });
};

// findPeopleByName("Pepe Ruiz", (err, data) => {
//   if (err) {
//       console.log(err);
//       return;
//   }
//   console.log(data);
// });

const findOneByFood = (food, done) => {
  Person.find({favoriteFoods: {$in: food}}, function(err, data) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log("findOneByFood");
      console.log(data);
      done(null , data);
    }
  });
};

// findOneByFood("hot dog", (err, data) => {
//   if (err) {
//       console.log(err);
//       return;
//   }
//   console.log(data);
// });

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
