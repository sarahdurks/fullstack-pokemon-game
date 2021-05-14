// DOM Selection
let PokemonBtnEl = document.querySelector("#listen");
const removebtnEl = document.querySelector('#remove-pokemon');
const createTeamEl = document.querySelector('#create-team');
const teamNameEl = document.querySelector('#team-name');
const teamLogoEl = document.querySelector('#carousel-thumbs');
let namePokeBtnEl = document.querySelector("#pokeTeamNaming");
let display = document.getElementById("random-name");


// Generating random team names
let adjective = [ // madlib words https://studentsandwriters.com/2018/02/09/funny-mad-libs-word-lists-adjectives-nouns-and-verbs-2/
  'Confused', 'Demanding', 'Ultimate', 'Drunken', 'Greedy', 'Hyperactive', 'Misunderstood', 'Out-of-Control', 'Rebellious', 'Territorial', 'Useless', 'Sassy', 'Salty', 'Hungry', 'Grumpy', 'Top-Secret', 'Barely Qualified', 'YOLO', 'Litty', 'Top-Secret', 'Major Key', '#Winning', 'Trill', '#Winning', 'Too Cool'
];
let legendary = [ // Legendary Pokemon https://pokemongo.fandom.com/wiki/Legendary_Pok%C3%A9mon
  'Articunos', 'Zapdos', 'Mew Twos', 'Raikous', 'Enteis', 'Suicunes', 'Cobalions', 'Tornadus', 'Thundurus', 'Landorus', 'Moltres'
];
let pokeCity = [ // Locations in pokemon world https://bulbapedia.bulbagarden.net/wiki/List_of_locations_by_name
  'Abandoned Ship', 'Artisan Cave', 'Cave of Being', 'Citadark Isle', 'Dark Cave', 'Dreamyard', 'Eterna Forest', 'Flower Paradise', 'Giant Mirror', 'Gnarled Den', 'Lake of Rage', 'Outcast Island'
];
let attack = [ // Pokemon moves https://bulbapedia.bulbagarden.net/wiki/List_of_moves
  'Double Slap', 'Mega Kick', 'Pay Day', 'Slam', 'Stomp', 'Fire Punch', 'Vine Whip', 'Fly', 'Thrash', 'Roar', 'Growl', 'Acid', 'Sonic Boom', 'Headbutt'
];



function nameTeam(id) {
  return id[Math.floor(Math.random() * id.length)]
};

let teamBuild = [
  `The ${nameTeam(adjective)} ${nameTeam(legendary)}`,
  `${nameTeam(adjective)} ${nameTeam(pokeCity)}`,
  `2 ${nameTeam(adjective)} 2 ${nameTeam(attack)}`,
  `${nameTeam(adjective)} 4 Lyfe`,
  `Team ${nameTeam(adjective)}`,
  `Team ${nameTeam(legendary)}`,
  `Team ${nameTeam(pokeCity)}`,
  `${nameTeam(legendary)} With ${nameTeam(legendary)}`,
  `${nameTeam(legendary)} From ${nameTeam(pokeCity)}`,
  `${nameTeam(legendary)} ${nameTeam(attack)}`,
  `${nameTeam(legendary)} Don’t ${nameTeam(attack)}`,
  `${nameTeam(pokeCity)} ${nameTeam(legendary)}`,
  `${nameTeam(pokeCity)}’s ${nameTeam(adjective)}  ${nameTeam(legendary)}`,
  `${nameTeam(pokeCity)}’s Potions`,
  `${nameTeam(attack)} and ${nameTeam(attack)}`,
  `Level Up and ${nameTeam(attack)}`
];

let teamNamesArr = [];
const pokeTeamName = () => {
  for (let i = 0; i < 25; i++) {
      var teamName = teamBuild[Math.floor(Math.random() * teamBuild.length)];
      if(!teamNamesArr.includes(teamName)) {
          teamNamesArr.push(teamName);
      } 
  }

};

pokeTeamName();
if (display) {
  display.innerText = teamNamesArr[0];
};

console.log(teamNamesArr);

if(namePokeBtnEl) {
  namePokeBtnEl.addEventListener("click", (event) => {
    // event.preventDefault();
    display.innerText = teamNamesArr[Math.floor(Math.random() * teamNamesArr.length)];
  });
}
// End of generating random team names.

// Event listener for remove pokemon button
if (PokemonBtnEl) {
    // console.log(PokemonBtnEl);
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
    const getImageInfo = document.querySelector(".selected");
    const image = getImageInfo.getElementsByTagName("img")[0];
    const team_logo = image.src;
    console.log(team_logo);
    const team_name = display.innerHTML;
    // const team_logo = teamLogoEl.value;
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
};


// carousel logic
$('#myCarousel').carousel({
  interval: false
});
$('#carousel-thumbs').carousel({
  interval: false
});

$('[id^=carousel-selector-]').click(function () {
  var id_selector = $(this).attr('id');
  var id = parseInt(id_selector.substr(id_selector.lastIndexOf('-') + 1));
  $('#myCarousel').carousel(id);
});
// when the carousel slides, auto update
$('#myCarousel').on('slide.bs.carousel', function (e) {
  var id = parseInt($(e.relatedTarget).attr('data-slide-number'));
  $('[id^=carousel-selector-]').removeClass('selected');
  $('[id=carousel-selector-' + id + ']').addClass('selected');
});
// when user swipes, go next or previous
// $('#myCarousel').swipe({
//   fallbackToMouseEvents: true,
//   swipeLeft: function (e) {
//       $('#myCarousel').carousel('next');
//   },
//   swipeRight: function (e) {
//       $('#myCarousel').carousel('prev');
//   },
//   allowPageScroll: 'vertical',
//   preventDefaultEvents: false,
//   threshold: 75
// });


$('#myCarousel .carousel-item img').on('click', function (e) {
  var src = $(e.target).attr('data-remote');
  if (src) $(this).ekkoLightbox();
});
