// const { response } = require("express");

// DOM Selection
let PokemonBtnEl = document.querySelector("#listen");
const pokeTeam = []
const draftTeamBtnEl = document.querySelector('#draft-team');

//ISSUES
// async function getPokeTeamData () {
//     let apiTeam = fetch("api/team" , {
//         method: "GET",
//         body: JSON.stringify({
//             team_id,
//             team_name,
//             pokemon_count
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
    
//     if (data.ok) {
//         console.log(apiTeam);
//     } else {
//         alert(data.statusText);
//     }
// };
// getPokeTeamData();

//Team ID hardcoded
// https://github.com/sarahdurks/fullstack-pokemon-game/issues/12

//Pokemon count should be incremental, ties to here and the team model
//https://github.com/sarahdurks/fullstack-pokemon-game/issues/10

// Listening for button click to draft each pokemon
PokemonBtnEl.addEventListener("click", (event) => {
    let buttonId = event.target.id;
    if (pokeTeam.length < 6 && !pokeTeam.includes(buttonId) && buttonId != "") {
        let thisButton = document.getElementById(`${buttonId}`);
        thisButton.disabled = true;
        thisButton.innerText = "Already Drafted!"
        pokeInfo = buttonId.split(" ");
        let thisPokemon = {
            pokedex: pokeInfo[0],
            pokemon_name: pokeInfo[1],
            pokemon_pic: pokeInfo[2],
            hp: pokeInfo[3],
            attack: pokeInfo[4],
            defense: pokeInfo[5],
            speed: pokeInfo[6],
            team_id: '4a5a129a-f0e4-4529-a1ff-f8cea4d65998'
            // find a way to include team id in the array to bulk create
        }
        pokeTeam.push(thisPokemon);
        localStorage.clear();
        
        
        console.log(pokeTeam);
    }

});

draftTeamBtnEl.addEventListener('click', event => {
    event.preventDefault();
   const response = fetch(`/api/pokemons/team`, {
        method: 'POST',
        body: JSON.stringify({
            pokeTeam
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            // return response.json();
            if (response.ok) {
                alert(`Pokemon Draft Completed!`);
                document.location.replace('/team');
            }
        })
        // .then (response => {
        // console.log(response);
        // })
        .catch(e => {
            console.log(e);
            alert(response.statusText);
        });

});

    
// to do
// 1. Event listener for clear draft button
// 2. A way to get team_id and pokemon_count on line 25 and line 12 instead of hardcoding
// 3. Change the pokemon_count as a function to count the pokemon in the team





