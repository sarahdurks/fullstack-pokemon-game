const router = require('express').Router();
const { Pokemon, Team } = require('../../models');
const sessionAuth = require('../../utils/auth');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models/User');
const fetch = require('node-fetch');
const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:5000' : 'https://your_deployment.server.com';

// GET /api/pokemons
router.get('/', async (req, res) => {
  try {
    const allPokemon = await Pokemon.findAll();
    res.status(200).json(allPokemon);
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// GET /api/pokemons/id
// router.get('/:id', async (req, res) => {

//   try {
//     const { pokedex } = req.params;
//     const pokemonById = await Pokemon.findOne({
//       where: { pokedex }
//     });
//     if (!pokemonById) {
//       return res.status(404).json({ message: 'No pokemon found with this id' });
//     }
//     res.status(200).json(pokemonById);
//   }
//   catch (e) {
//     console.log(e)
//     res.status(400).json({ Error: e });
//   }
// });

// GET /api/pokemons/pokedex
router.get('/pokedex', (req, res) => {
  Pokemon.findOne({
    where: {
      pokedex: req.params.pokedex
    },
    include: [
      {
        model: Team,
        include: {
          model: User
        }
      }
    ]
  })
  .then(dbpokeData => {
    if(!dbpokeData) {
      res.status(400).json({ message: "No pokemon found with this pokedex" });
      return;
    }
    res.json(dbpokeData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

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
    .then(pokemonData => {
      console.log("initiating update", pokeTeam)
      res.status(200).json(pokemonData)
      fetch(`${server}/draftpage/updatePokeData`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(
            pokeTeam
         )
      })
      .catch(e=> {
        console.log(e);
      })
    })
    
    .catch(e => {
      console.log(e);
      res.status(400).json({ Error: e });
    });
})

// DELETE /api/pokemons/id
router.delete('/:id', sessionAuth, (req, res) => {
  fetch(`${server}/draftpage/updatePokeDataDelete`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
        req.params
     )
  })
  .catch(e=> {
    console.log(e);
  })
  Pokemon.destroy({
    where: {
      pokedex: req.params.id
    }
  })
    .then(pokemonData => {
      if (!pokemonData) {
        return res.status(404).json({ message: 'Pokemon not found on your team' });
      }
      res.status(200).json(`${pokemonData} removed from your team`)
      // console.log("this is pokedata in pokeroute")
      // console.log(pokedex);

    })
    .catch(e => {
      console.log(e);
      res.status(400).json({ Error: e });
    });
});

module.exports = router;


// to do
// 1. Resolve the error in getting all pokedex from pokemon