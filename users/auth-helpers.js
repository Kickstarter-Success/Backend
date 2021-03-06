const db = require('../database/db-config.js');

module.exports = {
    add,
    update,
    find,
    findBy,
    findById,
    remove
};

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function update(id, load) {
    return db('users')
        .where({ id })
        .update(load)
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function remove(id) {
    return db('users')
        .where({ id })
        .del()
}