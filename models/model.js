'use strict';

const mongoose = require('mongoose');
const schema = require('./people-schema');

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  // CRUD: create
  create(item) {
    // returns a Promise!
    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }

  // CRUD: read / search - we don't know if it exists
  get(_id) {
    // return a Promise!
    if (_id) return this.schema.findOne({ _id });
    else return this.schema.findOne({});
  }

  getByQuery(query) {
    // query is an object!
    // ex: {firstName: 'Sarah'}
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }

  // CRUD: update - you usually only update something that exists
  // if something exists, it has an id
  update(_id, item) {
    // change a piece of the data
    // change data where data.id === id
    // [async] write data to file
    // make sure your change is in this.database
    // write this.database to file
    // look up findByIdAndUpdate
    let updated = schema.findByIdAndUpdate(_id, { ...item }, (err, data) => {
      if (err) console.error(err);
      console.log(data);
      return data;
    });

    // .then(data => {
    //   console.log(data);
    //   return data;
    // })
    // .catch(e => e);
    console.log('TING', Object.keys(updated));
    console.log('TING', updated);
    return updated;
  }

  // CRUD: delete
  delete(_id) {
    // find this.database object where object.id === id (forEach??)
    // remove that object (map??)
    // [async] write the new (smaller) this.database to the file
    // look up findByIdAndDelete
    return this.schema.findByIdAndDelete(_id);
  }

  // takes in an object parameter and return the search result for objects that match the fields in the object parameter
  // Hint: You probably want to use the find() method
  getFromField(obj) {
    // let query = this.getByQuery(obj);
    return schema.find(obj);
  }

  // take in an object parameter, and search the database for items that match the object paramter.
  // return the number of items that match.
  count(obj) {
    return schema.countDocuments(obj);
  }
}

module.exports = Model;
