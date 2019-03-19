const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
  insert,
  findById,
  update,
  remove
};

function find() {
  return db("bears");
}

function insert(bear) {
  return db
    .insert(bear)
    .into("bears")
    .then(ids => ids[0]);
}

function findById(id) {
  return db("bears")
    .where({ id: Number(id) })
    .then(bear => bear);
}

function update(id, bear) {
  return db("bears")
    .where({ id: Number(id) })
    .update(bear);
}

function remove(id) {
  return db("bears")
    .where({ id: Number(id) })
    .del();
}
