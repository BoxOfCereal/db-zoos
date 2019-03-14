const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
  insert,
  findById
};

function find() {
  return db("zoos");
}

function insert(zoo) {
  return db
    .insert(zoo)
    .into("zoos")
    .then(ids => ids[0]);
}

function findById(id) {
  return db("zoos")
    .where({ id: Number(id) })
    .then(zoo => zoo);
}
