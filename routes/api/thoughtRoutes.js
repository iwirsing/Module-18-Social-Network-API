const router = require('express').Router();
const { getThoughts, getSingleThought, postNewThought} = require('../../controllers/thoughtController')

//this is for the route 'api/thoughts'
router.route('/').get(getThoughts).post(post);

//this is to get a single thought
router.route('/:thoughtId').get(getSingleThought);



module.exports = router;