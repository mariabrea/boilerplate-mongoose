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
    favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

// let Person;

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Poldo",
    age: 40,
    favoriteFoods: [ 'spaghetti' ]
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

// createAndSavePerson((err, data) => {
//   if (err) {
//       console.log(err);
//       return;
//   }
//   console.log(data);
// });

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
  Person.findOne({favoriteFoods: {$in: food}}, function(err, data) {
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
  Person.findById(personId, function(err, data) {
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

// findPersonById("640ca7d6997a3a5478b68e0f", (err, data) => {
//   if (err) {
//       console.log(err);
//       return;
//   }
//   console.log(data);
// });

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, foundPerson) {
    if (err){
      console.log("not foundPerson");
      console.log(err);
      done(err);
    } else {
      console.log("foundPerson");
      console.log(foundPerson);
      foundPerson.favoriteFoods.push(foodToAdd);
      foundPerson.save(function(err, data) {
        if (err){
          console.log(err);
          done(err);
        } else {
          console.log(data);
          done(null , data);
        }
      });
    }
  });

};

// findEditThenSave("640cb7441a19d274f025d4a0", (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(data);
//   });

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate({name: personName}, {age: 20}, { new: true, useFindAndModify: false }, function(err, newPerson) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log("newPerson");
      console.log(newPerson);
      done(null , newPerson);
    }
  });
};

// findAndUpdate("John Smith", (err, data) => {
//       if (err) {
//           console.log(err);
//           return;
//       }
//       console.log(data);
//     });

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, { useFindAndModify: false }, function(err, data) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log(data);
      done(null , data);
    }
  });
};

// removeById("640cafdd06c372a0349b7cae", (err, data) => {
//       if (err) {
//           console.log(err);
//           return;
//       }
//       console.log(data);
//     });

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, data) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log(data);
      done(null , data);
    }
  });
};

// removeManyPeople((err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });

const queryChain = (done) => {
  const foodToSearch = "tacos";

  Person.find({favoriteFoods: {$in: foodToSearch}}).sort({name: 1}).limit(2).select({age: 0}).exec(function(err, data) {
    if (err){
      console.log(err);
      done(err);
    } else {
      console.log(data);
      done(null , data);
    }
  });
};

// queryChain((err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("queryChain");
//   console.log(data);
// });

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
