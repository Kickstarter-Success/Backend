const router = require('express').Router();

const kick = require('./kick-helpers.js')

router.get('/all', (req, res) => {
    kick.getAll()
        .then(kick => {
            res.status(200).json(kick)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get kickstarters' })
        })
});

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
});


router.post('/add/:user_id', (req, res) => {

});

module.exports = router;
