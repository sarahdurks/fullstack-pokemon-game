let buttonEl = document.querySelector(".listen");
let nameEl = document.querySelectorAll(".card-title");
let nameEl2 = document.querySelector(".card-title");
let pokeTeam = []

buttonEl.addEventListener("click", function (event) {
    let pokemonName = event.target.id;
    console.log(pokemonName);
    if (pokeTeam.length < 6 && !pokeTeam.includes(pokemonName)) {
        pokeTeam.push(pokemonName);
        console.log(pokeTeam)
    }
});


