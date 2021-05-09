const router = require('express').Router();
const { Team, Pokemon } = require('../../models');
const sessionAuth = require('../../utils/auth');
const { QueryTypes } = require('sequelize');

// GET /team
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
            console.log("I will figure this out!")
            if (teamData) {
                const team = teamData.get({ plain: true });
                res.status(200).json(team);
            } else res.status(400)
        })
        .catch(e => {
            console.log(e)
            res.status(400).json({ Error: e });
        });
});

// POST team
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

// DELETE team
router.delete('/:id', sessionAuth, (req, res) => {
    Team.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(teamData => {
            if (teamData) {
                const team = teamData.get({ plain: true });
                res.render('team', { team, loggedIn: true });
            } else {
                res.render('team', { team: false, loggedIn: true });
            }
        })
        .catch(e => {
            console.log(e)
            res.status(400).json({ Error: e });
        });
});


module.exports = router;
  