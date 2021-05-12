// DOM Selection
let PokemonBtnEl = document.querySelector("#listen");
const removebtnEl = document.querySelector('#remove-pokemon');
const createTeamEl = document.querySelector('#create-team');
const teamNameEl = document.querySelector('#team-name');
const teamLogoEl = document.querySelector('#team-logo');


// Event listener for remove pokemon button
if (PokemonBtnEl) {
    console.log(PokemonBtnEl);
    PokemonBtnEl.addEventListener('click', async event => {
        const id = event.target.name;
        const response = await fetch(`/api/pokemons/${id}`, {
            method: 'DELETE'
          });
        
          if (response.ok) {
            document.location.reload('/team');
          } else {
            alert(response.statusText);
          }
    })
}

// Event listener for create team button
if (createTeamEl) {
  createTeamEl.addEventListener('click', async event => {
    event.preventDefault();
    const team_name = teamNameEl.value;
    const team_logo = teamLogoEl.value;
    const response = await fetch(`/team`, {
        method: 'POST',
        body: JSON.stringify({
          team_name,
          team_logo
      }),
      headers: {
          'Content-Type': 'application/json'
      }
      });
    
      if (response.ok) {
        document.location.reload('/team');
      } else {
        alert(response.statusText);
      }
})
}


