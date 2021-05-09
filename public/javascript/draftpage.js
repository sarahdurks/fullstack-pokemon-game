let buttonEl = document.querySelector("#listen");
let pokeTeam = []

fetch(`/api/pokemons`, {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (response.ok) {
        pokeTeam.push(response);
    } 
})
.catch (e => {
console.log(e);
alert(response.statusText);
});

console.log (pokeTeam);




buttonEl.addEventListener("click", function (event) {
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
            speed: pokeInfo[6]
        }
        pokeTeam.push(thisPokemon);
        console.log(pokeTeam);
    }

});



// //  Function to post pokemon data to the database
// const pokemonDraftHandler = event => {
    // let pokeImgEl = document.querySelector('#poke-img');
    // let draftbtnEl = document.querySelector('#draft-me-btn');
    // let hpEl = document.querySelector('#hp');
    // let attackEl = document.querySelector('#attack');
    // let defenseEl = document.querySelector('#defense');
    // let speedEl = document.querySelector('#speed');
    // let pokedex = draftbtnEl.getAttribute('name');
    // let pokemon_name = document.querySelector("#poke-name").textContent;
    // let pokemon_pic = pokeImgEl.getAttribute("src");
    // let hp = hpEl.getAttribute("aria-valuenow");
    // let attack = attackEl.getAttribute("aria-valuenow");
    // let defense = defenseEl.getAttribute("aria-valuenow");
    // let speed = speedEl.getAttribute("aria-valuenow");

//     console.log(pokedex,
//         pokemon_name,
//         pokemon_pic,
//         hp,
//         attack,
//         defense,
//         speed);

    // if (pokeTeam.length < 6 && !pokeTeam.includes(pokedex)) {
    //     pokeTeam.push(pokedex);
    //     // include fetch function to check if the team has more than 6 pokemon
    

// }
// };

// // Event listner for click
// document.querySelector(".listen").addEventListener('click', pokemonDraftHandler);

// // Function to reset the variables
// function resetValues() {
//     draftbtnEl.innerText = "";
//     pokemon_name.innerText = "";
//     pokemon_pic.innerText = "";
//     hp.innerText = "";
//     attack.innerText = "";
//     defense.innerText = "";
//     speed.innerText = "";

//     console.log(pokedex,
//         pokemon_name,
//         pokemon_pic,
//         hp,
//         attack,
//         defense,
//         speed);
// };

// resetValues();