const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api',apiRoutes);

//for any other routes that are not valid
router.use((req,res)=>{
    return res.send('Wrong route.');
});

module.exports = router;