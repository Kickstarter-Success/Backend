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

// Adds a kickstarter to the user id passed
router.post('/user/:id', (req, res) => {
    let kickstarter = req.body;

    if (check.id == kickstarter.user_id) {
        kick.add(kickstarter)
            .then(saved => { res.status(201).json(saved) })
            .catch(error => { res.status(500).json(error) })
    } else {
        res.status(401).json({ message: 'The UserID that you sent much match the user_id' })
    }
});

// router.get('/test/test', (req, res) => {
//     kick.getTasks()
//         .then(e => {
//             res.status(200).json(e)
//         })
//         .catch(err => {
//             res.json({ message: 'What the hell' })
//         })
// })


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
