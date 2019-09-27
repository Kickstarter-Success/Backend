
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
                .notNullable()

            data
                .integer('categories')
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
                .integer('country')
                .notNullable()

            data
                .integer('results')

            data
                .integer('raising_more_success')

            data
                .string('category_success')

            data
                .string('category_average')
            data
                .string('average_duration')
            data
                .string('average_backers')
            data
                .string('average_over')

            data
                .string('prediction_results')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('kickstarter')

};
