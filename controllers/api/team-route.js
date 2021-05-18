const router = require('express').Router();
const { Team, Pokemon } = require('../../models');
const sessionAuth = require('../../utils/auth');

// GET /api/team
router.get('/', sessionAuth, (req, res) => {
    Team.findOne({
        where: { user_id: req.session.user_id },
        include: [
            {
                model: Pokemon,
                attributes: ['pokedex', 'pokemon_name', 'pokemon_pic', 'hp', 'attack', 'defense', 'speed'],
            }]

    })
        .then(teamData => {
            if (teamData) {
                const team = teamData.get({ plain: true });
                res.status(200).json(team);
            } else res.status(400).json('NO team yet!')
        })
        .catch(e => {
            console.log(e)
            res.status(400).json({ Error: e });
        });
});

// POST /api/team
router.post('/', sessionAuth, (req, res) => {
    Team.create({
        team_name: req.body.team_name,
        team_logo: req.body.team_logo,
        user_id: req.session.user_id,
    })
        .then(teamData => {
            req.session.save(() => {
                req.session.team_id = teamData.id;
                req.session.team_name = teamData.team_name;
                res.json(teamData)

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;
