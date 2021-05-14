// getting username from landing page via local storage
var userName = localStorage.getItem("Name");

// setting the health both parties
var enemyHealth = 100;
var userHealth = 100;

// setting a variable to hold attack value
var userAttack = "";
var enemyAttack = "";

// setting array to randomly choose attack
var possibleEnemyAttackVal = [5, 5, 10, 15];

// randomly choosing the enemy attack
enemyAttackValue = possibleEnemyAttackVal[Math.floor(Math.random() * possibleEnemyAttackVal.length)];

// targeting the health bars
var userHealthBar = document.getElementById("userHealthBar");
var userHealthStats = document.getElementById("userHealthStats");
var userHealthEl = document.getElementById("user-Health");
var enemyHealthBar = document.getElementById("enemyHealthBar");
var enemyHealthStats = document.getElementById("enemyHealthStats");
var enemyHealthEl = document.getElementById("enemy-health");

// targetting the buttons to attack
var attack1 = document.getElementById("move1");
var attack2 = document.getElementById("move2");
var attack3 = document.getElementById("move3");
var attack4 = document.getElementById("move4");

// targeting all the buttons
var attackButtons = document.getElementsByClassName("attackButtons");

// targeting the modal to change text
var winOrLose = document.getElementById("win-or-lose");
var gameEndText = document.getElementById("words");

// targeting opponent random user information placeholders
var randomUser = document.querySelector("#randomPicture");
var randomUpdates = document.querySelector("#randomUpdates");

// targetting the text to update attack value
var enemyAttackText = document.getElementById("enemyAttack");
var userAttackText = document.getElementById("userAttack");

// setting a variable to hold the enemy attack name
var enemyAttackName = "";

// Get the modal
var modal = document.getElementById("myModal");

// adding moves to the page
var moveOne = document.querySelector("#m1")
var moveTwo = document.querySelector("#m2")
var moveThree = document.querySelector("#m3")
var moveFour = document.querySelector("#m4")

// targetting user's and opponents pokemons and pokemons images placeholders
var userPokemon = document.querySelector("#userPokemonName")
var userPokemonPlaceholder = document.querySelector("#userPokemonPicture")
var opponentPokemon = document.querySelector("#randomPokemonName")
var opponentPokemonPlaceholder = document.querySelector("#randomPokemonPicture")

// setting text to show at beginning of game
userAttackText.textContent = (`It's your move, ${userName}! Pick an attack to start the game!`)

// creating a random user pokemon
var pokemon = ["pikachu", "charmander", "bulbasaur", "eevee", "oddish", "squirtle", "bellsprout", "butterfree", "pidgeotto", "jigglypuff"]
const random = Math.floor(Math.random() * pokemon.length);
var userRandomPokemon = pokemon[random];

//creating opponent random pokemon
var opponentRandomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)]; //Get a random field name from the array
while (pokemon == opponentRandomPokemon) {
    var opponentPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
};

// updated health text
var updateHealth = function() {
    // enemy health
    enemyHealthBar.setAttribute("aria-valuenow", enemyHealth);
    enemyHealthBar.setAttribute("aria-valuetext", enemyHealth);
    enemyHealthStats.style.width = enemyHealth + "%";
    enemyHealthEl.textContent = enemyHealth;
    // user health
    userHealthBar.setAttribute("aria-valuenow", userHealth);
    userHealthBar.setAttribute("aria-valuetext", userHealth);
    userHealthStats.style.width = userHealth + "%";
    userHealthEl.textContent = userHealth;
    // checking for the end of the game
    if (userHealth <= 0) {
        modalOpen();
        winOrLose.textContent = (`Oh no, ${userName}! You've lost the Battle!`);
        gameEndText.textContent = ("Get 'em next time!");
    } else if (enemyHealth <= 0) {
        modalOpen();
        winOrLose.textContent = (`Congratulations, ${userName}! You won the battle!`);
        gameEndText.textContent = (`Your score is ${userHealth}! Check high scores to see if you made it in the top!`);
        gameEnd();
        // alert("YOU WON! Your score is" + userHealth + "!");
    } else {
        // setting class to change color of user's health bar
        if (userHealth > 50) {
            userHealthBar.setAttribute("class", "success progress");
        } else if (userHealth > 25) {
            userHealthBar.setAttribute("class", "warning progress");
        } else userHealthBar.setAttribute("class", "alert progress");
        // setting class to change color of enemy's health bar
        if (enemyHealth > 50) {
            enemyHealthBar.setAttribute("class", "success progress");
        } else if (enemyHealth > 25) {
            enemyHealthBar.setAttribute("class", "warning progress");
        } else enemyHealthBar.setAttribute("class", "alert progress");
    };
};

// user fight function to be called on button clicks
var userFight = function(attackVal) {
    enemyHealth = enemyHealth-attackVal;
};

// time interval used to wait until enemy attack to attack again
var fightButtonClicks = function() {
    for (var i = 0; i < attackButtons.length; i++) {
        attackButtons[i].disabled = true;
    };
    setTimeout(function() {
        enemyFight();
        for (var i = 0; i < attackButtons.length; i++) {
            attackButtons[i].disabled = false;
        };
    }, 2000);
};


// enemy fight function 
var enemyFight = function() {
    if (userHealth > 0 && enemyHealth > 0) {
        var num = Math.floor(Math.random() * 10) + 1;
        if (enemyAttackValue === 5) {
            if (num < 3) {
                enemyAttackText.textContent = (`Incoming! ${opponentPokemon.textContent} attacked ${userPokemon.textContent} with ${enemyAttackName}!`);
                userAttackText.textContent = (`${userPokemon.textContent} blocked ${enemyAttackName} from ${opponentPokemon.textContent}!`); 
            } else {
                userHealth = userHealth-enemyAttackValue;
                enemyAttackText.textContent = (`Incoming! ${opponentPokemon.textContent} attacked ${userPokemon.textContent} with ${enemyAttackName}!`);
                userAttackText.textContent = (`${userPokemon.textContent} got hit from ${opponentPokemon.textContent}'s ${enemyAttackName}!`);
                updateHealth();
            }
        } else if (enemyAttackValue === 10) {
            if (num < 6) {
                enemyAttackText.textContent = (`Incoming! ${opponentPokemon.textContent} attacked ${userPokemon.textContent} with ${enemyAttackName}!`);
                userAttackText.textContent = (`${userPokemon.textContent} blocked ${enemyAttackName} from ${opponentPokemon.textContent}!`);
            } else {
                userHealth = userHealth-enemyAttackValue;
                enemyAttackText.textContent = (`Incoming! ${opponentPokemon.textContent} attacked ${userPokemon.textContent} with ${enemyAttackName}!`);
                userAttackText.textContent = (`${userPokemon.textContent} got hit from ${opponentPokemon.textContent}'s ${enemyAttackName}!`);
                updateHealth();
            }
        } else {
            if (num < 8) {
                enemyAttackText.textContent = (`Incoming! ${opponentPokemon.textContent} attacked ${userPokemon.textContent} with ${enemyAttackName}!`);
                userAttackText.textContent = (`${userPokemon.textContent} blocked ${enemyAttackName} from ${opponentPokemon.textContent}!`);
            } else {
                userHealth = userHealth-enemyAttackValue;
                enemyAttackText.textContent = (`Incoming! ${opponentPokemon.textContent} attacked ${userPokemon.textContent} with ${enemyAttackName}!`);
                userAttackText.textContent = (`${userPokemon.textContent} got hit from ${opponentPokemon.textContent}'s ${enemyAttackName}!`);
                updateHealth();
            };
        };
    };
};

// button attack 1 (value 5)
attack1.addEventListener("click", function() {
    var num = Math.floor(Math.random() * 10) + 1;
    userAttackText.textContent = (`Get 'em! ${userPokemon.textContent} attacked ${opponentPokemon.textContent} with ${moveOne.textContent}!`);
    if (num < 3) {
        enemyAttackText.textContent = (`${opponentPokemon.textContent} blocked ${moveOne.textContent} from ${userPokemon.textContent}!`);
    } else {
        var attackVal = document.getElementById("move1").value;
        userFight(attackVal);
        enemyAttackText.textContent = (`${opponentPokemon.textContent} got hit from ${userPokemon.textContent}'s ${moveOne.textContent}!`);
        updateHealth();
    };
    fightButtonClicks();
});

// button attack 2 (value 10)
attack2.addEventListener("click", function() {
    var num = Math.floor(Math.random() * 10) + 1;
    userAttackText.textContent = (`Get 'em! ${userPokemon.textContent} attacked ${opponentPokemon.textContent} with ${moveTwo.textContent}!`);
    if (num < 6) {
        enemyAttackText.textContent = (`${opponentPokemon.textContent} blocked ${moveTwo.textContent} from ${userPokemon.textContent}!`);
    } else {
        var attackVal = document.getElementById("move2").value;
        userFight(attackVal);
        enemyAttackText.textContent = (`${opponentPokemon.textContent} got hit from ${userPokemon.textContent}'s ${moveTwo.textContent}!`);
        updateHealth();
    };
    fightButtonClicks();
});

// button attack 3 (value 15)
attack3.addEventListener("click", function() {
    var num = Math.floor(Math.random() * 10) + 1;
    userAttackText.textContent = (`Get 'em! ${userPokemon.textContent} attacked ${opponentPokemon.textContent}  with ${moveThree.textContent}!`);
    if (num < 8) {
        enemyAttackText.textContent = (`${opponentPokemon.textContent} blocked ${moveThree.textContent} from ${userPokemon.textContent}!`);
    } else {
        var attackVal = document.getElementById("move3").value;
        userFight(attackVal);
        enemyAttackText.textContent = (`${opponentPokemon.textContent} got hit from ${userPokemon.textContent}'s ${moveThree.textContent}!`);
        updateHealth();
    };
    fightButtonClicks();
});

// button attack 4 (value 5)
attack4.addEventListener("click", function() {
    var num = Math.floor(Math.random() * 10) + 1;
    userAttackText.textContent = (`Get 'em! ${userPokemon.textContent} attacked ${opponentPokemon.textContent}  with ${moveFour.textContent}!`);
    if (num < 4) {
        enemyAttackText.textContent = (`${opponentPokemon.textContent} blocked ${moveFour.textContent} from ${userPokemon.textContent}!`);
    } else {
        var attackVal = document.getElementById("move4").value;
        userFight(attackVal);
        enemyAttackText.textContent = (`${opponentPokemon.textContent} got hit from ${userPokemon.textContent}'s ${moveFour.textContent}!`);
        updateHealth();
    };
    fightButtonClicks();
});

// getting random user information from API
let getUserInfo = () => {
    fetch("https://randomuser.me/api/").then((response) => {
        response.json().then((data) => {
            displayRepos(data.results);
        })
    });

};

// displaying random user information from API
let displayRepos = (repos) => {
    // console.log(repos);

    // //     // loop over repos
    for (let i = 0; i < repos.length; i++) {
        // loop over user name
        let nameObject = repos[i].name
        const name = Object.values(nameObject)
        // create an elememt to hold random user name
        let randomUserName = document.createElement("div");
        randomUserName.textContent = name[1] + " " + name[2];
        randomUser.appendChild(randomUserName)
        // loop over user country
        let countryObject = repos[i].location
        const country = Object.values(countryObject)
        // let randomUserCountry = country[3]
        let randomUserCountry = document.createElement("div");
        randomUserCountry.textContent = country[3]
        randomUser.appendChild(randomUserCountry)
        //loop over pictures
        let pictureObject = repos[i].picture
        const picture = Object.values(pictureObject)
        let randomUserImg = document.createElement('img');
        randomUserImg.setAttribute("class", "circle")
        randomUserImg.setAttribute('src', picture[0]);

        randomUser.appendChild(randomUserImg)
    }
};

// getting and displaying user's random pokemon and moves
let getCurrentInfo = () => {
    let apiURL = "https://pokeapi.co/api/v2/pokemon/" + userRandomPokemon;
    fetch(apiURL).then((response) => {
        response.json().then((data) => {
            //displaying random user pokemon name with capital first letter
            userPokemon.textContent = userRandomPokemon.charAt(0).toUpperCase() + userRandomPokemon.slice(1)
 
            //displaying random user pokemon picture
            var userPokemonImage = document.createElement("img")
            var imageURL = "./assets/images/" + userRandomPokemon + ".png"
            userPokemonImage.setAttribute("src", imageURL)
            userPokemonImage.setAttribute("style", "max-width: 15vh")
            userPokemonPlaceholder.appendChild(userPokemonImage)
            // changing the user moves after each attack
            var userMoves = function() {
                // making sure that we always hit a number 3 less than the length of moves array
                var moveIndex = (Math.floor(Math.random() * data.moves.length) - 3);
                // making sure our index never goes below 0
                if (moveIndex < 0) {
                    (moveIndex = 0)
                };
                // displaying new moves for user to choose
                moveOne.textContent = data.moves[moveIndex].move.name
                moveTwo.textContent = data.moves[(moveIndex) + 1].move.name
                moveThree.textContent = data.moves[(moveIndex) + 2].move.name
                moveFour.textContent = data.moves[(moveIndex) + 3].move.name

            };
            userMoves();
            attack1.addEventListener("click", function() {
                userMoves();
            });
            attack2.addEventListener("click", function() {
                userMoves();
            });
            attack3.addEventListener("click", function() {
                userMoves();
            });
            attack4.addEventListener("click", function() {
                userMoves();
            });
        });
    });
};

// getting from API and displaying opponent's pokemon and moves
let opponentInfo = () => {
    let apiURL = "https://pokeapi.co/api/v2/pokemon/" + opponentRandomPokemon;
    fetch(apiURL).then((response) => {
        response.json().then((data) => {

            // displaying opponent random pokemon's name with capital first letter
            opponentPokemon.textContent = opponentRandomPokemon.charAt(0).toUpperCase() + opponentRandomPokemon.slice(1)

            //displaying oponent's random pokemon picture
            var opponentPokemonImage = document.createElement("img")
            var imageURL = "./assets/images/" + opponentRandomPokemon + ".png"
            opponentPokemonImage.setAttribute("src", imageURL)
            opponentPokemonImage.setAttribute("style", "max-width: 15vh")
            // console.log(userPokemonImage)
            opponentPokemonPlaceholder.appendChild(opponentPokemonImage)

            //displaying random moves
            var enemyMoveDisplay = function() {
                // var opponentMove = document.createElement("p")
                enemyAttackName = data.moves[Math.floor(Math.random() * 10)].move.name
            };
            enemyMoveDisplay();
            attack1.addEventListener("click", function() {
                enemyMoveDisplay();
            });
            attack2.addEventListener("click", function() {
                enemyMoveDisplay();
            });
            attack3.addEventListener("click", function() {
                enemyMoveDisplay();
            });
            attack4.addEventListener("click", function() {
                enemyMoveDisplay();
            });
        })
    })
};

// saving highscores to display
var gameEnd = function() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    var score = { 
        score: userHealth,
        name: userName
    };
    highscores.push(score);
    highscores.sort((a,b) => {
        return b.score - a.score;
    });
    highscores.splice(3);
    localStorage.setItem("highscores", JSON.stringify(highscores));
};

var modalOpen = function() {
  modal.style.display = "block";
};


getCurrentInfo();
updateHealth();
getUserInfo();
opponentInfo()