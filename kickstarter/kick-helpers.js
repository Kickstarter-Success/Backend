const db = require('../database/db-config.js')

module.exports = {
    getAll,
    getKickById,
    getKickByUserId
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