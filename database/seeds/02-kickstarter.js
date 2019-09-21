exports.seed = function (knex, Promise) {
    return knex('kickstarter').insert([
        { user_id: 1, campaignName: 'Test_Project_1', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30', categories: 'Games', country: 'USA' },
        { user_id: 1, campaignName: 'Test_Project_2', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30', categories: 'Games', country: 'CHINA' },
        { user_id: 1, campaignName: 'Test_Project_3', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30', categories: 'Games', country: 'RUSSIA' },
        { user_id: 1, campaignName: 'Test_Project_4', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30d', categories: 'Games', country: 'JAPAN' }

    ])
}