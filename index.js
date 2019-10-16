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

async function getPeople(obj) {
  let found = await people.getFromField(obj);
  console.log('FOUND EM: ', found);
}

async function countPeople(obj) {
  let found = await people.count(obj);
  console.log('COUNT EM: ', found);
}

makePerson({
  firstName: 'James',
  lastName: 'Dunn',
  birthday: new Date('5/10/2020'),
  likes: 'dogs',
}).then(() => {
  console.log('i\'m here!');
  mongoose.connection.close();
});

// makeTeam({
//   name: 'Yellow Rhino',
//   color: 'yellow',
// }).then(() => {
//   mongoose.connection.close();
// });

// countPeople({}).then(() => {
//   mongoose.connection.close();
// });
