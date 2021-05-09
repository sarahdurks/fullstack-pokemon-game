const router = require('express').Router();
const { User, Pokemon, Team } = require('../../models');
const sessionAuth = require('../../utils/auth');
const { QueryTypes } = require('sequelize');

// GET /api/team
router.get('/', async (req, res) => {
    try {
      const teamData = await Team.findAll();
      res.status(200).json(teamData);
    }
    catch (e) {
      res.status(400).json({ Error: e });
    }
  });
  
  // GET /api/team/id
  router.get('/:id', async (req, res) => {
    try {
      const teamId = req.params;
      const teamData = await Pokemon.findAll({
        where: { team_id: teamId }
      });
      console.log(req.session.user_id);
      if (!teamData) {
        Team.create({
            team_name: "Name your Team",
            pokemon_count: 0,
            user_id: req.session.user_id
        }).then(team => {
            teamData = team; 
            return team;
        })
      res.status(200).json(teamData);
    }}
    catch (e) {
      console.log(e)
      res.status(400).json({ Error: e });
    }
  });
  
  // // GET /api/pokemons/pokedex
  // router.get('/pokedex', async (req, res) => {
  //   try {
  //     const allPokedex = await sequelize.query("SELECT pokedex FROM pokemon", { type: QueryTypes.SELECT });
  //     console.log(allPokedex);
  //     // res.status(200).send(allPokedex);
  //   }
  //   catch (e) {
  //     res.status(400).json({ Error: e });
  //   }
  // });
  
  // POST /api/pokemons/
  router.post('/', sessionAuth, (req, res) => {
  
    Pokemon.create({
      pokedex: req.body.pokedex,
      pokemon_name: req.body.pokemon_name,
      pokemon_pic: req.body.pokemon_pic,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed,
      user_id: req.session.user_id
    })
      .then(pokemonData => res.status(200).json(pokemonData))
      .catch(e => {
        console.log(e);
        res.status(400).json({ Error: e });
      });
  });
  
  // POST /api/pokemons/team
  router.post('/team', sessionAuth, (req, res) => {
    const { pokeTeam } = req.body
    // console.log (pokeTeam);
    Pokemon.bulkCreate(pokeTeam)
      .then(pokemonData => res.status(200).json(pokemonData))
      .catch(e => {
        console.log(e);
        res.status(400).json({ Error: e });
      });
  })
  
  // DELETE /api/pokemons/id
  router.delete('/:id', sessionAuth, (req, res) => {
    console.log('delete route hit');
    Pokemon.destroy({
      where: {
        pokedex: req.params.id
      }
    })
      .then(pokemonData => {
        if (!pokemonData) {
          return res.status(404).json({ message: 'Pokemon not found on your team' });
        }
        res.status(200).json(`${pokemonData} removed from your team`);
      })
      .catch(e => {
        console.log(e);
        res.status(400).json({ Error: e });
      });
  });
  
  module.exports = router;
  