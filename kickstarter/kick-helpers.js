const db = require('../database/db-config.js')

module.exports = {
    getAll,
    getKickById,
    getKickByUserId,
    add
}

function getAll() {
    return db('kickstarter')
}

function getKickByUserId(id) {
    return db('kickstarter')
        .where({ kickstarter_id: id })
}

function getKickById(id) {
    return db('kickstarter')
        .where({ id: id })
}

function add(kickstarter) {
    return db('kickstarter')
        .insert(kickstarter, 'id')
        .then(ids => {
            const [id] = ids;
            return getKickById(id);
        });
}
