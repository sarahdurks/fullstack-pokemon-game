const router = require('express').Router();
const homeRoutes = require('./home-routes');
const draftpageRoutes = require('./draftpage-route');
const teamRoutes = require('./team-route');
const battleRoutes = require('./battle-route');

// middleware callback function
router.use('/', homeRoutes);
router.use('/draftpage', draftpageRoutes);
router.use('/team', teamRoutes);
router.use('/battle', battleRoutes);

module.exports = router;
