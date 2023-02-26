// for each pin item...Add event listener 
let pinnedPages = 0;
let pins = [];
function Pin(page, state, fullpage, tag, backgroundCol, itemImageUrl, pageUrl,){
    this.page = page;
    this.state = state;
    this.fullpage = fullpage;
    this.tag = tag;
    this.backgroundCol = backgroundCol;
    this.itemImageUrl = itemImageUrl;
    this.pageUrl = pageUrl;
}

// Loading last pin local state
// getPinState();
let pageHasPin = "false";
let pinOnPage =0;

//On load, checks if there is saved pin information about the website, if not a new pin object is created.
window.addEventListener("load", function(){
    localPins = JSON.parse(localStorage.getItem("pins"));
    if (localPins !== null){
        for(let i=0; i<localPins.length; i++){
            let savePin = new Pin(
                localPins[i].page,
                localPins[i].state,
                localPins[i].fullpage,
                localPins[i].tag,
                localPins[i].backgroundCol,
                localPins[i].itemImageUrl,
                localPins[i].pageUrl,
            );
            if(localPins[i].page == webpageName){
                const pinItem = document.querySelectorAll(".itemPinnedPageBtn")[pinOnPage];
                const pinBtn = document.querySelectorAll(".st3-2")[pinOnPage];
                let pinCheck = localPins[i].state;
                if (pinCheck == "true"){
                    pinBtn.classList.add("st0-click");
                    pinItem.setAttribute("pin", "true")
                }else{
                    pinItem.setAttribute("pin", "false")
                };

                pinItemAnimation2[pinOnPage].addEventListener("click", function(e){
                    const parent = e.target.parentElement.parentElement;
                    const pinState = parent.querySelector(".itemPinnedPageBtn").getAttribute("pin");
                    if(pinState=="false" ||pinState == ""){
                       pinToggleTrue(e);
                    }else{
                       pinToggleFalse(e);
                    }
                });
                pinOnPage++;
            }
            // Setting clickable 
            pins.push(savePin);
        }
        // Notes there isn't a pin object that matches the current webpage in the array...
        pins.forEach(pin => {
            if(pin.page == webpageName){
                pageHasPin = "true";
            }
        })
        // ...so it creates a new pin object in thsi case. 
        if(pageHasPin == "false"){
            newPin();
        };
        localStorage.setItem("pins", JSON.stringify(pins));
    }else{
        newPin();
    }
})


// Function which creates pin object if webpage does not have it (true on first time load)
function newPin(){
    // let pinCheck = document.querySelectorAll(".itemPinnedPageBtn")[i].getAttribute("pinned");
    for(let i=0; i<pinItemContainer2.length;i++){
        const fullPageName = document.querySelectorAll(".itemPinnedPageBtn")[i].getAttribute("fullpage");
        const itemImageUrl = document.querySelectorAll(".itemPinnedPageBtn")[i].getAttribute("img");
        const pinItemCheck = document.querySelectorAll(".itemPinnedPageBtn")[i].getAttribute("pin");
        const tag = document.querySelectorAll(".itemPinnedPageBtn")[i].getAttribute("tag");
        const pageUrl = document.querySelectorAll(".itemPinnedPageBtn")[i].getAttribute("pageurl");
        let pinCheck = "false";
        const createPin = new Pin(webpageName, pinCheck, fullPageName, tag, backgroundCol, itemImageUrl, pageUrl);
        pins.push(createPin);
        localStorage.setItem("pins", JSON.stringify(pins));

        pinItemAnimation2[i].addEventListener("click", function(e){
            const parent = e.target.parentElement.parentElement;
            const pinState = parent.querySelector(".itemPinnedPageBtn").getAttribute("pin");
            if(pinState=="false" ||pinState == ""){
               pinToggleTrue(e);
            }else{
               pinToggleFalse(e);
            }
        })
    }
}

// Pin button event listener which toggles activation of functions



// Function which 'checks' pin page
// Animation of dropdown is displayed via addition and removal of classes stylised with CSS.
function pinToggleTrue(e){
    pinnedPages = pinnedPages +1;
    localStorage.setItem("pinPagesCount", pinnedPages);
    updatePinnedPages();
    dropdownAnimation();
    // Animation - 'more' dropdown and added pin indicator
    setTimeout(function() {
        pinAnimation.classList.add("pin-ani");
        pinFill.style.fill = "#05C8D4";
        pinAlert.classList.remove("hidden")
        pinAlert.classList.add("opacity-100")
        pinAlert.classList.add("bluetext")
        pinAlert.classList.add("pinAlertAni")
    }, 1000);
    setTimeout(function(){
        pinAnimation.classList.remove("pin-ani");
    });
    setTimeout(function(){
        pinFill.style.fill = "white";
        dropdownAnimationOff();
    },2000);
    setTimeout(function(){
        pinAlert.classList.remove("bluetext")
        pinAlert.classList.remove("opacity-100")
        pinAlert.classList.remove("hidden")
    },2500)
    // Setting Pin object
    const parent = e.target.parentElement.parentElement;
    const pinButton = parent.querySelector(".st3-2");
    pinButton.classList.add("st0-click");
    const pinAttribute = parent.querySelector(".itemPinnedPageBtn");
    const pinFullPage = pinAttribute.getAttribute("fullpage");
    pinAttribute.setAttribute("pin", "true");
    let pinTrue = pins.findIndex(pins => pins.fullpage == pinFullPage);
    if(pinTrue !== -1){
        pins[pinTrue].state = "true"
    };
    localStorage.setItem("pins", JSON.stringify(pins));
}

// Function which 'unchecks' pin page
function pinToggleFalse(e){
    pinnedPages = pinnedPages -1;
    localStorage.setItem("pinPagesCount", pinnedPages);
    updatePinnedPages();

    // Setting Pin object
    const parent = e.target.parentElement.parentElement;
    const pinButton = parent.querySelector(".st3-2");
    pinButton.classList.remove("st0-click");
    const pinAttribute = parent.querySelector(".itemPinnedPageBtn");
    const pinFullPage = pinAttribute.getAttribute("fullpage");
    pinAttribute.setAttribute("pin", "false");
    let pinTrue = pins.findIndex(pins => pins.fullpage == pinFullPage);
    if(pinTrue !== -1){
        pins[pinTrue].state = "false"
    };
    localStorage.setItem("pins",JSON.stringify(pins))
}

// Function which updates pin count 
updatePinnedPages();
function updatePinnedPages(){
    (localStorage.getItem("pinPagesCount")!== null)?pinnedPages = parseInt(JSON.parse(localStorage.getItem("pinPagesCount"))):pinnedPages = 0;
    (pinnedPages == 1)? pinAlert.innerHTML = `<strong>${pinnedPages}</strong> item pinned`: pinAlert.innerHTML = `<strong>${pinnedPages}</strong> items pinned`;
};

// Function for 'pin page' button in comments section. If outer div clicked, inner pin div will be clicked to trigger pin toggle function
const clickEvent = new Event("click");
const outerPinBtn = document.getElementById("pinPageBtn");
const innerPinBtn = document.getElementById("pinCommentSection");
const pinCommentIndex = document.querySelectorAll(".itemPinnedPageBtn").length;
outerPinBtn.addEventListener("click", function(){
    pinItemAnimation2[pinCommentIndex-1].dispatchEvent(clickEvent);
})
