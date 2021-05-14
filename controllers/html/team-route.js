const router = require('express').Router();
const { Team, Pokemon } = require('../../models');
const sessionAuth = require('../../utils/auth');


// Generating random team names
let adjective = [ // madlib words https://studentsandwriters.com/2018/02/09/funny-mad-libs-word-lists-adjectives-nouns-and-verbs-2/
    'Confident', 'Demanding', 'Ultimate', 'Drunken', 'Greedy', 'Hyperactive', 'Victorious', 'Out-of-Control', 'Rebellious', 'Territorial', 'Sassy', 'Hungry', 'Lovely', 'Top-Secret', 'YOLO', 'Litty', 'Top-Secret', 'Major Key', 'Winning', 'Adorable', 'Too Cool'
];
let legendary = [ // Legendary Pokemon https://pokemongo.fandom.com/wiki/Legendary_Pok%C3%A9mon
    'Articunos', 'Zapdos', 'Mew Twos', 'Raikous', 'Enteis', 'Suicunes', 'Cobalions', 'Tornadus', 'Thundurus', 'Landorus', 'Moltres'
];
let pokeCity = [ // Locations in pokemon world https://bulbapedia.bulbagarden.net/wiki/List_of_locations_by_name
    'Abandoned Ship', 'Artisan Cave', 'Cave of Being', 'Citadark Isle', 'Dark Cave', 'Dreamyard', 'Eterna Forest', 'Flower Paradise', 'Giant Mirror', 'Gnarled Den', 'Lake of Rage', 'Outcast Island'
];
let attack = [ // Pokemon moves https://bulbapedia.bulbagarden.net/wiki/List_of_moves
    'Double Slap', 'Mega Kick', 'Pay Day', 'Slam', 'Stomp', 'Fire Punch', 'Vine Whip', 'Fly', 'Thrash', 'Roar', 'Growl', 'Acid', 'Sonic Boom', 'Headbutt'
];

function nameTeam(id) {
    return id[Math.floor(Math.random() * id.length)]
};

let teamBuild = [
    `The ${nameTeam(adjective)} ${nameTeam(legendary)}`,
    `2 ${nameTeam(adjective)} 2 ${nameTeam(adjective)}`,
    `${nameTeam(adjective)} 4 Lyfe`,
    `Team ${nameTeam(adjective)}`,
    `Team ${nameTeam(legendary)}`,
    `Team ${nameTeam(pokeCity)}`,
    `Level Up & ${nameTeam(attack)}`
];

let teamNamesArr = [];
const pokeTeamName = () => {
    for (let i = 0; i < 10; i++) {
        var teamName = teamBuild[Math.floor(Math.random() * teamBuild.length)];
        if(!teamNamesArr.includes(teamName)) {
            teamNamesArr.push(teamName);
        } 
    }
    return teamNamesArr;
};
// End of generating random team names.


// GET request to /team
router.get('/', sessionAuth, (req, res) => {
    console.log(req.session.user_id);
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
                const disable = team.pokemons.length >= 6;
                // console.log(team, disable);
                res.render('team', { team, loggedIn: true, disable: disable });
            } else {
                pokeTeamName();
                // console.log(teamNamesArr);
                res.render('team', { team: false, loggedIn: true, teamNamesArr:teamNamesArr });
            }
        })
        .catch(e => {
            console.log(e)
            res.status(400).json({ Error: e });
        });
});

// POST request to /team
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
                const team = teamData.get({ plain: true });
                res.render('team', { team, loggedIn: true });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE team -Never used :(
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