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
            if (kicks.length) {
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

// Adds a kickstarter to the user id passed
router.post('/user/:id', (req, res) => {
    let kickstarter = req.body;
    let check = req.params;
    console.log(check.id)
    console.log(kickstarter.kickstarter_id)
    if (check.id == kickstarter.kickstarter_id) {
        kick.add(kickstarter)
            .then(saved => { res.status(201).json(saved) })
            .catch(error => { res.status(500).json(error) })
    } else {
        res.status(401).json({ message: 'The UserID that you sent much match the kickstarter_id' })
    }
});

// Adds a kickstarter to the user id passed
router.put('/user/:id', (req, res) => {

});

// Adds a kickstarter to the user id passed
router.delete('/user/:id', (req, res) => {

});
module.exports = router;
