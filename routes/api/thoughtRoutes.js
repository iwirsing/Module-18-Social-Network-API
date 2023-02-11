const router = require('express').Router();
const { getThoughts, 
        getSingleThought, 
        postNewThought,
        updateThought,
        deleteThought,
        addReaction,
        deleteReaction
        } = require('../../controllers/thoughtController')

//this is for the route 'api/thoughts'
router.route('/').get(getThoughts);

//this is to get a single thought,update a thought and delete single thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//this is to create a single thought 'api/thought/:userId'
router.route('/:userId').post(postNewThought);

//add a reaction
router.route('/:thoughtId/react').post(addReaction);

//remove a reaction
router.route('/:thoughtId/:reactId').delete(deleteReaction);



module.exports = router;