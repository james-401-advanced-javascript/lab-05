'use strict';

const DataModel = require('./model.js');
const schema = require('./teams-schema');

class Teams extends DataModel {
  constructor() {
    super(schema);
  }
}

module.exports = Teams;
