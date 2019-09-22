const db = require('../database/db-config.js')

module.exports = {
    getAll,
    getKickById,
    getKickByUserId,
    add,
    update,
    remove,
    getTasks
}


function getTasks() {
    return db('users as u').join('kickstarter as k', 'k.user_id', 'u.id').select('u.username', 'k.campaignName', 'k.description')
}

function getAll() {
    return db('kickstarter')
}

function getKickByUserId(id) {
    return db('kickstarter')
        .where({ user_id: id })
}

function getKickById(id) {
    return db('kickstarter')
        .where({ id: id }).first()
}

function add(kickstarter) {
    return db('kickstarter')
        .insert(kickstarter, 'id')
        .then(ids => {
            const [id] = ids;
            return getKickById(id);
        });
}

function update(id, load) {
    return db('kickstarter')
        .where({ id: id })
        .update(load)
}

function remove(id) {
    return db('kickstarter')
        .where({ id })
        .del()
}