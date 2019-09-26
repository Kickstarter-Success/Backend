const axios = require('axios');
const router = require('express').Router();

const kick = require('./kick-helpers.js')
// Gets all Kickstarters
router.get('/all', (req, res) => {
    kick.getAll()
        .then(kick => {
            res.status(200).json(kick)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get kickstarters' })
        })
});

// Grabs a singular Kickstarter
router.get('/:id', (req, res) => {
    const { id } = req.params;

    kick.getKickById(id)
        .then(kicks => {
            if (kicks) {
                res.status(200).json(kicks)
            } else {
                res.status(404).json({ message: 'Could not find kickstarters with that ID' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Grabs all Kickstarters for a particular User 
router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    kick.getKickByUserId(id)
        .then(kicks => {
            if (kicks.length) {
                res.status(200).json(kicks)
            } else {
                res.status(404).json({ message: 'Could not find kickstarters with that ID' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.get('/DS', (req, res) => {

    axios.post('http://dummy.restapiexample.com/api/v1/create', {
        "name": "tsdfasdasdsdfst", "salary": "123", "age": "23", "id": "719"
    }).then(response => {
        res.status(200).json(response.data);
    })
        .catch(err => {
            res.status(500).json({ message: 'Error Fetching Jokes', error: err });
        });
});

// Adds a kickstarter to the user id passed
router.post('/user/:id', async function (req, res) {

    let kickstarter = req.body;
    let { campaignName, monetaryGoal, description, duration, categories, country } = kickstarter;
    // Function that translates country into a number value {country}
    // Function that translates categories into a number value {categories}
    let package = { campaignName, monetaryGoal, description, duration, categories, country }
    console.log(package)

    let balls = await axios.post('https://kickstarter-success.herokuapp.com', package)
    let response = balls.data
    // Sends only the required info to DS
    kickstarter.results = response.results;
    kickstarter.raising_more_success = response.custom_stats.raising_more_success;
    kickstarter.category_success = response.custom_stats.category_success;
    kickstarter.category_average = response.custom_stats.category_average;
    kickstarter.average_duration = response.custom_stats.average_duration;
    kickstarter.average_backers = response.custom_stats.average_backers;
    kickstarter.average_over = response.custom_stats.average_over;
    console.log(kickstarter)

    // Adds all custom DS data onto my kickstarter table
    kick.add(kickstarter) // Saves all the info into the Table to be recalled later
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(401).json(err)
        })

})

// Updates a kickstarter
router.put('/:id', (req, res) => {
    let { id } = req.params;
    let updatedUser = req.body;

    // Add some checks, make sure they can't change the user_id
    kick.update(id, updatedUser)
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(error => {
            res.status(400).json(error)
        })
});

// Deletes a kickstarter
router.delete('/:id', (req, res) => {
    let { id } = req.params;

    kick.remove(id)
        .then(event => {
            if (event) {
                res.status(204).json({ message: `Kickstarter ID:${id} removed` })
            } else {
                res.status(404).json({ message: 'Kickstarter not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The Kickstarter could not be removed.' })
        })
});

module.exports = router;