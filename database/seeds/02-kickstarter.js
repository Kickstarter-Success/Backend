exports.seed = function (knex, Promise) {
    return knex('kickstarter').insert([
        {
            user_id: 1,
            campaignName: 'Test_Project_1',
            monetaryGoal: 100000,
            description: 'Put the decription here and bla bla bla.',
            duration: 30,
            categories: 125,
            country: 0,
            raising_more_success: 823,
            category_success: "1.0000",
            category_average: "90223.8034",
            average_duration: "34.6282",
            average_backers: "2582.9947",
            average_over: "66726.7648",
            results: 1
        },
        {
            user_id: 1,
            campaignName: 'Test_Project_2',
            monetaryGoal: 100000,
            description: 'Put the decription here and bla bla bla.',
            duration: 30,
            categories: 130,
            country: 16,
            raising_more_success: 823,
            category_success: "1.0000",
            category_average: "90223.8034",
            average_duration: "34.6282",
            average_backers: "2582.9947",
            average_over: "66726.7648",
            results: 0
        },
        {
            user_id: 1,
            campaignName: 'Test_Project_3',
            monetaryGoal: 100000,
            description: 'Put the decription here and bla bla bla.',
            duration: 30,
            categories: 118,
            country: 8,
            raising_more_success: 823,
            category_success: "1.0000",
            category_average: "90223.8034",
            average_duration: "34.6282",
            average_backers: "2582.9947",
            average_over: "66726.7648",
            results: 1
        },
        {
            user_id: 1,
            campaignName: 'Test_Project_4',
            monetaryGoal: 100000,
            description: 'Put the decription here and bla bla bla.',
            duration: 30,
            categories: 114,
            country: 9,
            raising_more_success: 823,
            category_success: "1.0000",
            category_average: "90223.8034",
            average_duration: "34.6282",
            average_backers: "2582.9947",
            average_over: "66726.7648",
            results: 1
        }
    ])
}