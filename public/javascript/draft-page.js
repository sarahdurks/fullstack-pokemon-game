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


// Function to fetch team id and pokemon count
fetch("/api/team")
    .then(response => response.json())
    .then(data => {
        team_id = data.id;
        let count = 6 - (data.pokemons.length);
        // console.log(count);
        dbTeam.push(team_id);
        dbTeam.push(count);
    })
    .catch(e => {
        console.log(e);
        alert(response.statusText);
    });

// Event listener for button click to draft each pokemon
PokemonBtnEl.addEventListener("click", (event) => {
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
            selected: true
        }
        pokeTeam.push(thisPokemon);
        // console.log(pokeTeam);
    } else {
        alert('No more slot on your team. Click "Draft Team" button to finish drafting.');
        return;
    }
});

// Event listener for draft team button - to bulk create pokemons
draftTeamBtnEl.addEventListener('click', event => {
    event.preventDefault();
    if (pokeTeam.length <= 0) {
        alert(`Please draft a pokemon to add it to the team`);
        return;
    }
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
            if (response.ok) {
                alert(`Pokemon Draft Completed!`);
                document.location.replace('/team');
            }
        })
        .catch(e => {
            console.log(e);
            alert(response.statusText);
        });
});


// Event listener for Clear draft button// refresh page
clearDraftBtnEl.addEventListener('click', event => {
    location.reload();
});



// to do

//* teampage.js (also .hbs)
//1. create a form for team creating **team name/team-logo (.hbs) Sarah
//2. button click listener for create team (do a post request for .html route team (/team)) Sarah
// 3. Drop down for team name generator.

//* draftpage-route

//1. time issue-every 24 hours. *Yev

//* change header/nav bar so that options available are only there based on status of user 

//* finally, present! 









