const db = require('../database/db-config.js')

module.exports = {
    getAll,
    getKickById
}

function getAll() {
    return db('kickstarter')
}

function getKickById(id) {
    return db('kickstarter')
        .where({ kickstarter_id: id })
}