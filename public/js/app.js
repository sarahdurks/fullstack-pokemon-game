let socket = io();

const startingSection = document.querySelector('.starting-section');
const homeBtn = document.querySelector('.home-btn');
let pokeButton = document.getElementById('pokeButton');

startButton.addEventListener('click', () => {
    socket.emit('startDraft');
});
// process the 'message' from the server
socket.on('startDraft', () => {
    hideStartButton();
});

function hideStartButton() {
    startButton.style.display = "none";
    pokeButton.style.display = "block";
    startingSection.style.display = "none";
}

pokeButton.addEventListener('click', () => {
    socket.emit('pokemonIsSelected', {
        offsetLeft: Math.random() * ((window.innerWidth -  pokeButton.clientWidth) - 800),
        offsetTop: Math.random() * ((window.innerHeight - pokeButton.clientHeight) - 40)
    });
})

socket.on('pokemonIsSelected', (data) => {
    goPokemon(data.offsetLeft, data.offsetTop);
});

function goPokemon(offLeft, offTop) {
    let top, left;

    left = offLeft;
    top = offTop;

    pokeButton.style.top = top + 'px';
    pokeButton.style.left = left + 'px';
    pokeButton.style.animation = "none";
}