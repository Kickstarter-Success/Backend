
exports.up = function (knex) {
    return knex.schema

        .createTable('users', users => {
            users.increments();

            users
                .string('username', 255)
                .notNullable()
                .unique()

            users
                .string('password', 255)
                .notNullable();
        })

        .createTable('kickstarter', data => {
            data
                .integer('kickstarter_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')

            data
                .string('name')

            data
                .integer('monetaryGoal')

            data
                .string('description')

            data
                .string('campaignLength')

            data
                .string('categories')

        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('kickstarter')

};
