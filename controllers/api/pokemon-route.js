const router = require('express').Router();
const { Pokemon } = require('../../models');
const sessionAuth = require('../../utils/auth');
const { QueryTypes } = require('sequelize');

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
router.get('/:id', async (req, res) => {

  try {
    const { pokedex } = req.params;
    const pokemonById = await Pokemon.findOne({
      where: { pokedex }
    });
    if (!pokemonById) {
      return res.status(404).json({ message: 'No pokemon found with this id' });
    }
    res.status(200).json(pokemonById);
  }
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
    .then(pokemonData => {
      console.log(pokemonData)
      res.status(200).json(pokemonData)})
    
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


// to do
// 1. Resolve the error in getting all pokedex from pokemon