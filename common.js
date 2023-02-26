// Page headings info selector
const webpageName = document.querySelector("#pageInfo").getAttribute("page");

// ---------------------------------------------
// Dropdown button animation selectors
const moreButton = document.querySelector(".moreButton");
const dropdown = document.querySelector(".dropdown-wrap");
const moreIcon = document.querySelector(".moreIcon");
// Dropdown Animation
function dropdownAnimation(){
        dropdown.className = "dropdown-open " + dropdown.className;
        moreIcon.classList.add("moreRotate");

}
function dropdownAnimationKeep(){
        if(!dropdown.classList.contains("dropdown-open")){
            dropdown.className = "dropdown-open " + dropdown.className;
            // moreIcon.classList.add("moreRotate");
        }
}
function dropdownAnimationOff(){
    dropdown.className = dropdown.className.replace("dropdown-open", "");
    setTimeout(function(){
        if(moreIcon.classList.contains("moreRotate") && !dropdown.classList.contains("dropdown-open")){
         moreIcon.classList.remove("moreRotate");
        }},1000);
}

dropdown.addEventListener("mouseover", dropdownAnimationKeep);
dropdown.addEventListener("mouseout", dropdownAnimationOff)
moreButton.addEventListener("mouseover", dropdownAnimation);
moreButton.addEventListener("mouseout", dropdownAnimationOff);

// Adding animation to rest of pin buttons
const pinContainer = document.querySelectorAll(".itemPinPageBtn");
for(i=0; i<pinContainer.length; i++){
    const pinWrap = pinContainer[i].querySelector(".pinWrap");
    pinWrap.addEventListener("mouseover", function(){
        pinWrap.classList.add("pin-ani");
    });
    pinWrap.addEventListener("mouseout", function(){
        if(pinWrap.classList.contains("pin-ani")){
            pinWrap.classList.remove("pin-ani");
        }
    });
}

// Adding animation to Nav pin Button
const pinAnimation = document.querySelector(".navPinWrap");
const navPin = document.querySelector(".pinBtn");
navPin.addEventListener("mouseover", function(){
    pinAnimation.classList.add("pin-ani");
});
navPin.addEventListener("mouseout",function(){
    if(pinAnimation.classList.contains("pin-ani")){
        pinAnimation.classList.remove("pin-ani")
    }
})
