
exports.up = function (knex) {
    return knex.schema

        .createTable('users', users => {
            users.increments('');

            users
                .string('username', 255)
                .notNullable()
                .unique()

            users
                .string('password', 255)
                .notNullable();
        })

        .createTable('kickstarter', data => {

            data.increments()

            data.integer('user_id')
                .unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')

            data
                .string('campaignName')
                .notNullable().unique()

            data
                .string('categories')
                .notNullable()

            data
                .string('description', 500)
                .notNullable()

            data
                .integer('monetaryGoal')
                .notNullable()

            data
                .integer('duration')
                .notNullable()

            data
                .string('country')
                .notNullable()

        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('kickstarter')

};
