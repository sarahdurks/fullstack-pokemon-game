let buttonEl = document.querySelector(".listen");
let nameEl = document.querySelectorAll(".card-title");
let nameEl2 = document.querySelector(".card-title");

buttonEl.addEventListener("click", function() {
    // console.log(button.getId());
    // console.log(nameEl.innerHTML);
    // console.log(nameEl.text);
    // console.log(this.nameEl.innerHTML);
    // right track? works, but can only get the first one
    // console.log(nameEl2);
    // console.log(nameEl2.innerHTML);
    console.log(nameEl.id.value);
});