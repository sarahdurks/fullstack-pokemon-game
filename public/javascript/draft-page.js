// DOM Selection and global variable assignment
let PokemonBtnEl = document.querySelector("#listen");
const draftTeamBtnEl = document.querySelector('#draft-team');
const clearDraftBtnEl = document.querySelector('#draft-clear');
let pokeTeam = [];
let count;
let dbTeam = [];
let num;
let team_id;
let pokemons;
let currentPlayer = "";
let enemyTeam = [];

// Function to fetch team id and pokemon count
fetch("/api/team")
    .then(response => response.json())
    .then(data => {
        team_id = data.id;
        let count = 6 - (data.pokemons.length);
        console.log(count);
        dbTeam.push(team_id);
        dbTeam.push(count);
    })
    .catch(e => {
        console.log(e);
        alert(response.statusText);
    });


// Event listener for button click to draft each pokemon
const userTurn = PokemonBtnEl.addEventListener("click", (event) => {
    let buttonId = event.target.id;
    if (pokeTeam.length < dbTeam[1] && !pokeTeam.includes(buttonId) && buttonId != "") {
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
            team_id: dbTeam[0],
            selected: true,
        }
        // console.log(thisPokemon)
        pokeTeam.push(thisPokemon);
        // console.log(pokeTeam);
        fetch(`/api/pokemons/`, {
            method: 'POST',
            body: JSON.stringify(
                thisPokemon
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // alert(`Pokemon added to your Team!`);

                }
            })
            .catch(e => {
                console.log(e);
            });
    } else {
        alert('There are no slots left on your team. Click "Draft Team" button to finish drafting.');
        return;
    }
    computerTurn();
});


draftTeamBtnEl.addEventListener('click', event => {
    event.preventDefault();
    document.location.replace('/team');
});


setTimeout(() => {
    console.log(dbTeam[1])
}, 500);

const computerTurn = () => {
    if (enemyTeam.length < 7) {
    let buttons = document.getElementsByTagName("button");
    let pokeChoiceButtons = [];
    for (let i = 0; i < buttons.length; i++) {
        const singleButton = buttons[i];
        if (!singleButton.disabled) {
            pokeChoiceButtons.push(singleButton);
        }
    }
    pokeChoiceButtons.shift();
    pokeChoiceButtons.shift();
    pokeChoiceButtons.shift();
    let pokeInfoComputerChoice = [];
    // console.log(pokeChoiceButtons);
    for (let i = 0; i < pokeChoiceButtons.length; i++) {
        const pokeData = pokeChoiceButtons[i].id.split(" ");
        pokeInfoComputerChoice.push(pokeData);
    }
    // console.log(pokeInfoComputerChoice);
    pokeInfoComputerChoice = pokeInfoComputerChoice.map(poke => {
        return {
            hp: parseInt(poke[3]),
            attack: parseInt(poke[4]),
            defense: parseInt(poke[5]),
            speed: parseInt(poke[6])
        }
    })

    let highValueArray =[];
    for (let i = 0; i < pokeInfoComputerChoice.length; i++) {
        const highValue = (pokeInfoComputerChoice[i].hp) + (pokeInfoComputerChoice[i].attack) + (pokeInfoComputerChoice[i].defense) + (pokeInfoComputerChoice[i].speed);
        highValueArray.push(highValue);
    }
    let highButtonIndex = highValueArray.indexOf(Math.max(...highValueArray));
    // console.log(highButtonIndex);
    let compChoiceButtonId = (pokeChoiceButtons[highButtonIndex].id);
    let thisButton = document.getElementById(`${compChoiceButtonId}`);
        thisButton.disabled = true;
        thisButton.innerText = "Enemy Team!"
        pokeInfo = compChoiceButtonId.split(" ");
        let thisPokemon = {
            pokedex: pokeInfo[0],
            pokemon_name: pokeInfo[1],
            pokemon_pic: pokeInfo[2],
            hp: pokeInfo[3],
            attack: pokeInfo[4],
            defense: pokeInfo[5],
            speed: pokeInfo[6],
            team_id: dbTeam[0],
            selected: true,
        }
        alert(`Enemy drafted ${thisPokemon.pokemon_name}`)
        enemyTeam.push(thisPokemon);
        console.log(enemyTeam);
}
};



const coinflip = () => {
    User = (Math.floor(Math.random() * 2) == 0);
    if (User) {
        currentPlayer = "User";
    } else computerTurn();
};

setTimeout(() => {
    coinflip();
}, 500);


// computerTurn();


// let gameCount = dbTeam[1];
// console.log(gameCount);

// to do

//* teampage.js (also .hbs)
//1. create a form for team creating **team name/team-logo (.hbs) Sarah
//2. button click listener for create team (do a post request for .html route team (/team)) Sarah
// 3. Drop down for team name generator.

//* draftpage-route

//1. time issue-every 24 hours. *Yev

//* change header/nav bar so that options available are only there based on status of user 

//* finally, present! 









