const router = require('express').Router();
const fetch = require('node-fetch');
const sessionAuth = require('../../utils/auth');
const PokemonPull = require('../../models/PokemonPull');

// ISSUES 
// Initial fetch logic
//https://github.com/sarahdurks/fullstack-pokemon-game/issues/16

//Clear Draft
//https://github.com/sarahdurks/fullstack-pokemon-game/issues/11


// Function to fetch pokemon every 24hrs
let id;

const promisifedPingApi = new Promise ((resolve, reject) => {
  id = setTimeout(() => {
    getPokemon();
  }, 500);
});

// Promise.race([
//     promisifedPingApi,
//     new Promise((_, reject) => {
//       setTimeout(() => reject('Timeout!'), 500);
//       (function () {
//         setInterval(function () {
//           getRandomWord();
//         }, 1000 * 60 * 60 * 24);
//       }) ();
//     })
//   ]).then(res => {
//       console.log('response: ', res);
//   })
//     .catch(e => {
//       console.error('error: ', e);
//       clearTimeout(id);
//     });

// End of Function to fetch pokemon every 24hrs

// const savedDate = localStorage.getItem("date");
// const todaydate = new Date();
// const mydate = todaydate.getFullYear() + '-' + (todaydate.getMonth() + 1) + '-' + todaydate.getDate();

// if (!savedDate || savedDate != mydate) {
//   getPokemon();
// } else {
//   localStorage.setItem('date', mydate);
//   return
// }


// setting empty array to hold random pokemon ids to pull from api
let pokeNums = [];

// adding 20 random numbers to our array, making sure there are no repeats
for (let i = 0; i < 20; i++) {
    const singlePokeNum = Math.floor(Math.random() * 898) + 1;
    if (!pokeNums.includes(singlePokeNum)) {
        pokeNums.push(singlePokeNum);
    }
};
let pokeData = [];

const pokemonDB = PokemonPull.findAll
// looping through our array, using numbers as pokemon to get pokemon data
const getPokemon = () => {

  const today = new Date().getDate();
  console.log(today)

  if (today !== pokeData[0].date || !pokeData[0].date) {

    for (let i = 0; i < pokeNums.length; i++) {
      const pokeNum = pokeNums[i];
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
          .then(response => response.json())
          .then(data => {
              let eachPoke =
              {
                  name: (data.name).toUpperCase(),
                  id: data.id,
                  hp: data.stats[0].base_stat,
                  attack: data.stats[1].base_stat,
                  defense: data.stats[2].base_stat,
                  speed: data.stats[5].base_stat,
                  imageSrc: data.sprites.front_default,
                  date: new Date().getDate()
              };
              pokeData.push(eachPoke);
          }).then(() => {
            if (pokeNums.length === pokeData.length) {
              pokeData.forEach(pokemon => {
                PokemonPull.create({ 
                  name: pokemon.name,
                  id: pokemon.id,
                  hp: pokemon.hp,
                  attack: pokemon.attack,
                  defense: pokemon.defense,
                  speed: pokemon.speed,
                  imageSrc: pokemon.imageSrc,
                  date: pokemon.date
                })

              })

              // console.log("pokedata",pokeData);
            }
            
          }) 
  }

  }
};



// Function to render Draftpage
router.get('/', sessionAuth, (req, res) => {
    res.render("draftpage", {
        pokeData,
        loggedIn: req.session.loggedIn,
        active: true
    })
});


module.exports = router;


// to do
// 1. Modify the setinterval or clearTimeout function to make sure the fetch is happening every 24 hrs. Test the code above
// 2. Exclude the saved pokemons from fetch request (compare if podex array includes random nums)
