# The Pokémon Draft [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![header](https://user-images.githubusercontent.com/77648727/118218306-0e83a000-b42c-11eb-9883-80f61ebf0c4c.png)

## Description 🏈
This is a simple game built around the idea of selecting and saving a Pokemon team.
First time players will sign up with their name, email, and a password. They will land on a team-building page where they can run a random name generator to help spark ideas for their team name--it mixes up Legendary Pokemon, Pokemon 'world' locations, moves, and fun descriptors to create something unique. Users can select and save a logo, then proceed on to the draft.

Players are able to review stats of "free agent" pokemon to draft and claim them for their Pokémon team. Data comes from the PokéAPI and the team a user builds is stored for future use and play. 

In later-stage development efforts, this game will hav elogic closer to resembling a fantasy football draft logic, where players take turns selecting the best Pokémon.
![Frame 92](https://user-images.githubusercontent.com/77648727/118071368-7ec2f080-b35c-11eb-870d-9a0a713b0141.png)

## Built With & Using 🧰
- [x] JavaScript
- [x] ES6 
- [x] Node.js (express.js, mysql2, sequelize, nodemon, dotenv, express-handlebars)
- [x] Heroku
- [x] PokéAPI
- [x] Socket.io

## Table of Contents 📑
* [User-Story](#User-Story📖)
* [Installation](#Installation🧮)
* [License](#License📛)
* [Authors](#Authors📝)
* [Tests](#Tests🤓)
* [Screenshot](#Screenshot)
* [Deployed-Link](#Deployed-Link)
* [Questions](#Questions🤔)
* [Resources/References](Resources/References🙏)


![Frame 118](https://user-images.githubusercontent.com/77648727/118218400-2c510500-b42c-11eb-87f9-1cb89e6d23fd.png)


### User-Story📖
> AS a Pokémon Fan
> I WANT to make Data-based decisions and build a strong team       
> SO I CAN win when I play in tournaments against My friends
      
### Installation🧮
> To download the application: ```git clone https://github.com/sarahdurks/fullstack-pokemon-game.git```.         
> ```npm i```  to install dependencies      
> Configure an .env file with your username, password, database name, session secret and server path.    
> ```npm start``` to start the server      
> ```npm run seed``` to seed the database      
![Frame 117](https://user-images.githubusercontent.com/77648727/118218461-4db1f100-b42c-11eb-9713-c88e23c1d596.png)
### License📛
This application is covered under the **MIT** license. 


### Authors📝
* Janarthani: [GitHub](https://github.com/vsjanarthani)      
* Yevgeniya Terlyuk [GitHub](https://github.com/down-dive)     
* Megan Close [GitHub](https://github.com/meganclo)      
* Sarah Durkin [GitHub](https://github.com/sarahdurks)   

![Frame 120](https://user-images.githubusercontent.com/77648727/118218517-6de1b000-b42c-11eb-949e-c125ba69421d.png)


### Tests🤓
No automated test are set up for this application yet.

### Screenshot
![code](./assets/images/screenshot-pokemon.png)
### Questions🤔
If you have any questions, please reach out to the Authors via github.
        
* Janarthani - [vsjanarthani](https://github.com/vsjanarthani)        
* Yevgeniya Terlyuk - [Yev](https://github.com/down-dive)        
* Megan Close - [MeganClo](https://github.com/meganclo)             
* Sarah Durkin - [sarahdurks](https://www.github.com/sarahdurks/)              
![Frame 114](https://user-images.githubusercontent.com/77648727/118218538-7a660880-b42c-11eb-9ffb-9e60f3a34553.png)

### Deployed-Link
The app is deployed on Heroku [https://pokemon-fullstack.herokuapp.com/](https://pokemon-fullstack.herokuapp.com/)

### Resources/References🙏
- [Using Array Filter StackOverflow](https://stackoverflow.com/questions/56168771/how-to-limit-for-10-results-the-array-filter) - [Legendary Pokemon](https://pokemongo.fandom.com/wiki/Legendary_Pok%C3%A9mon)
- [The BulbaPedia for Moves](https://bulbapedia.bulbagarden.net/wiki/List_of_moves)
- [Pokemon Locations](https://bulbapedia.bulbagarden.net/wiki/List_of_locations_by_name)
- [Stickpng assets for Pokemon Graphics non-sprites](https://www.stickpng.com/)    
- [12up Pokemon Go Article](https://www.12up.com/posts/3595664-every-nfl-helmet-redesigned-with-pokemon-go-characters)    
- [Tooltip Codepen](https://codepen.io/reiinii1/pen/aPGXEa)
- [Carousel for Bootstrap Example](https://codepen.io/Ashik-iqbal/pen/WNbRWGR)
- [Canva for Image Cleanup](https://www.canva.com/)    
- [Tooltip Codepen](https://codepen.io/reiinii1/pen/aPGXEa)
- [Carousel for Bootstrap Example](https://codepen.io/Ashik-iqbal/pen/WNbRWGR)

![Frame 93](https://user-images.githubusercontent.com/77648727/118072017-d6ae2700-b35d-11eb-9840-22d6764b0e95.png)


