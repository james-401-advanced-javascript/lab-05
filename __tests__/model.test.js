const People = require('../models/people.js');
const supertester = require('./supertester.js');

let people = new People();

describe('Model', () => {
  test('can create', () => {
    let person = people.create({
      firstName: 'Test',
      lastName: 'Test',
      birthday: new Date('01/01/2020'),
      likes: 'dogs',
    });
    expect(person).toBeDefined();
  });

  xit('can read', () => {});

  xit('can update', () => {});

  xit('can delete', () => {});
});
