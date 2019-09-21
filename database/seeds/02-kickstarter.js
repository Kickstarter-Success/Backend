exports.seed = function (knex, Promise) {
    return knex('kickstarter').insert([
        { kickstarter_id: 1, name: 'Test_Project_1', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', campaignLength: '30days', categories: 'Games' },
        { kickstarter_id: 1, name: 'Test_Project_2', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', campaignLength: '30days', categories: 'Games' },
        { kickstarter_id: 1, name: 'Test_Project_3', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', campaignLength: '30days', categories: 'Games' },
        { kickstarter_id: 1, name: 'Test_Project_4', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', campaignLength: '30days', categories: 'Games' }

    ])
}