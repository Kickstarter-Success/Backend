exports.seed = function (knex, Promise) {
    return knex('kickstarter').insert([
        { kickstarter_id: 1, campaignName: 'Test_Project_1', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30days', categories: 'Games', country: 'USA' },
        { kickstarter_id: 1, campaignName: 'Test_Project_2', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30days', categories: 'Games', country: 'CHINA' },
        { kickstarter_id: 1, campaignName: 'Test_Project_3', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30days', categories: 'Games', country: 'RUSSIA' },
        { kickstarter_id: 1, campaignName: 'Test_Project_4', monetaryGoal: 100000, description: 'Put the decription here and bla bla bla.', duration: '30days', categories: 'Games', country: 'JAPAN' }

    ])
}