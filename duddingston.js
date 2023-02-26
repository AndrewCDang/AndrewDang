// Script file for interactive sliding image on mouseover

// Background/container selector 
const container = document.querySelector(".container");
const background = document.querySelector(".background");
// On mouse move over container, background image is moved relative to cursor position of the container
container.addEventListener("mousemove", function(event) {
// Getting coordinate positions of mouse in container
const xPos = event.clientX;
const yPos = event.clientY;
// Background position is set first to the center, then moved % amount distance about the centre of the container.
background.style.transform ="translateX(" + -50 + "%" + ") translateX(" + -(xPos - container.offsetWidth / 2) / container.offsetWidth * 75 + "%)";
});
// On mouse leave event listener added, background image will return to center 
container.addEventListener("mouseout", function(event) {
const xPos = event.clientX - container.offsetLeft;
const yPos = event.clientY - container.offsetTop;
background.style.transform ="translateX(" + -50 + "%" + ")";
})