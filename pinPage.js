// Selecting pin objects from webpage and accessing local storage pin data
const pinContainer2 = document.getElementsByClassName("body-container")[0];
const pinStorage = JSON.parse(localStorage.getItem("pins"));
const noPinsText = document.getElementById("noPins").parentElement;

// Values of data objects within pinned object are placed into newly created div and appended onto the page
for(let i=0; i<pinStorage.length; i++){
    if(pinStorage[i].state =="true"){
        const appendPin = document.createElement("div");
        appendPin.classList.add("content-container");
        appendPin.innerHTML = `
        <a href="${pinStorage[i].pageUrl}" class="title-card">
            <img class="thumbnail" src="${pinStorage[i].itemImageUrl}" alt="Duddingston Image">
            <div class="${pinStorage[i].backgroundCol} frostBackground imgCaption">
                <p class="pinnedText text"><strong>${pinStorage[i].tag}</strong></p>
                <p class="pinnedText text">${pinStorage[i].fullpage}</p>
            </div>
        </a>
        `;
        pinContainer2.appendChild(appendPin);
    }
}

// Placeholder 'no pins on page' text removed when a pin object is appended
const containerLength = document.getElementsByClassName("body-container")[0].childElementCount;
if(containerLength !== 1){
    noPinsText.setAttribute("hidden", true);
}