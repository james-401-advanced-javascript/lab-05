'use strict';

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const db = 'mongodb://127.0.0.1:27017/app';

const configs = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(db, configs);

const Teams = require('./models/teams.js');
const People = require('./models/people.js');

let people = new People();
let teams = new Teams();

async function makePerson(person) {
  let made = await people.create(person);
  let found = await people.getByQuery(person);

  console.log(found);
  return found;
}
async function makeTeam(team) {
  let made = await teams.create(team);
  let found = await teams.getByQuery(team);

  console.log(found);
  return found;
}

async function updatePerson(_id, newPersonData) {
  // call people.update
  // UNLESS
  // did this person change teams?
  // if they did
  // you need to verify the team they are now in exists
  // and you need to verify the team they left still has some people
  let found = await people.get(_id);
  let updated = await people.update(_id, newPersonData);
  console.log('FOUND: ', found);
  console.log('UPDATED: ', updated);
}

async function deletePerson(_id) {
  // if you delete a person and their team
  // no longer has people
  // you should delete the team!
  let found = await people.get(_id);
  console.log(found);
  let deleted = await people.delete(found._id);
}

async function getPeople(obj) {
  let found = await people.getFromField(obj);
  console.log('FOUND EM: ', found);
}

async function countPeople(obj) {
  let found = await people.count(obj);
  console.log('COUNT EM: ', found);
}

// updatePerson(
//   {
//     firstName: 'Sarah',
//     lastName: 'Smalls',
//   }._id,
//   { lastName: 'Willis' }
// ).then(() => {
//   console.log('i\'m here!');
//   mongoose.connection.close();
// });

makeTeam({
  name: 'Yellow Rhino',
  color: 'yellow',
}).then(() => {
  mongoose.connection.close();
});

// countPeople({}).then(() => {
//   mongoose.connection.close();
// });
