const router = require('express').Router();
const { Team, Pokemon } = require('../../models');
const sessionAuth = require('../../utils/auth');


router.get('/', sessionAuth, (req, res) => {
   
    res.render('battle-page');
});




module.exports = router;