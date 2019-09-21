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

});

module.exports = router;
