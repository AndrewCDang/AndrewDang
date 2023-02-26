// Global Selectors for JS files in main common folder to prevent repeats
// Button/icons Selectors
const backgroundCol = document.querySelector("#pageInfo").getAttribute("backgroundCol");
const pinFill = document.querySelector(".st1");
const pinAlert = document.querySelector(".pinAlert");
// Pin Items 
const pinItemContainer2 = document.querySelectorAll(".itemPinPageBtn");
const pinItemAnimation2 = document.querySelectorAll(".pinWrap");

// -------------------------------------------------

// Like Button

/* Adding blue effect and +1 like counter on click*/
const likeArray = [];
function Likes(page, num, userLiked){
    this.page = page;
    this.num = num;
    this.userLiked = userLiked;
}

// Referencing 'like' containers/buttons
const likeBtn = document.getElementById("likeBtn");
const likeFill = document.getElementsByClassName("st0")[0];

const likeElement = document.getElementById("likeCount-container");
let likeCount =  parseInt(likeElement.getAttribute("value"));
let likeClick = likeElement.getAttribute("click");

// First webpage load - importing likes. Setting base likes on first visit. Else, importing objects from local storage, pushing into array and creating/setting 'like' objects.
window.addEventListener("load", function(){
    const visted = localStorage.getItem("visted");
    if(!visted){
        likeArray.push(new Likes("taichung", 5, "false"));
        likeArray.push(new Likes("duddingston", 4,"false"));
        likeArray.push(new Likes("art", 10, "false"));

        for(let i=0; i<likeArray.length; i++){
            if(likeArray[i].page == webpageName){
                likeCount = likeArray[i].num;
                likeElement.innerText = likeCount;
            }
        }
        localStorage.setItem("likeArray", JSON.stringify(likeArray));
    }
    else if(visted =="yes"){
        const likelocal = JSON.parse(localStorage.getItem("likeArray"));
        for(let i=0; i< likelocal.length; i++){
            likeArray.push(likelocal[i]);
        }
        for(let i=0; i<likeArray.length; i++){
            if(likeArray[i].page == webpageName){
                likeCount = likeArray[i].num;
                likeElement.innerText = likeCount;

                let likeStatus = likeArray[i].userLiked;
                if(likeStatus == "true"){
                    likeElement.setAttribute("click", "true");
                    likeFill.classList.add("st0-click");
                    likeClick = "true";
                }
            }
        }
        localStorage.setItem("likeArray", JSON.stringify(likeArray))
    }
})

// Adding event listener to like button, activating like or unlike function:
likeBtn.addEventListener("click", function(){
    if (likeClick=="false"){
        likeActivate();
    }
    else if(likeClick=="true"){
        likeDeactive();
    };
});

// Activating 'liked' stlying and count
function likeActivate(){
        likeElement.setAttribute("click", "true");
        likeClick = "true";
        likeFill.classList.add("st0-click");
        likeCount = likeCount +1;
        likeElement.innerText = likeCount;
        likeUpdate()
} 
// Activating 'unliked' stlying and count
function likeDeactive(){
        likeElement.setAttribute("click", "false");
        likeFill.classList.remove("st0-click");
        likeClick = "false";
        likeCount = likeCount -1;
        likeElement.innerText = likeCount;
        likeUpdate()
}
//updating like count and like status in array and saving in local storage
function likeUpdate(){
        let likeIndex = likeArray.findIndex(like => like.page == webpageName);
        if(likeIndex !== -1){
            likeArray[likeIndex].num = likeCount;
            likeArray[likeIndex].userLiked = likeClick;
            localStorage.setItem("likeArray", JSON.stringify(likeArray));
        };
}

// -------------------------------------------------

// Mail Button
const mail = document.getElementById("mailBtn");
const webpageUrl = window.location.href
mail.setAttribute("href", `mailto:?subject=Andrew Dang Website&body=${webpageUrl}`)

// -------------------------------------------------
// Comments

// Time
// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const today = day + "/" + month + "/" + year;
// IndexNum later calculated and used to determine index number of target event comment.
let indexNum = 0;


// User Comment
// Loading Existing comments into webpage
const existingComments =[];
function Comment(page, comment, name, date, local){
    this.page = page;
    this.comment = comment;
    this.name = name;
    this.date = date;
    this.local = local;
};

// Comment box values
const submitBtn = document.getElementById("userComment-submit");
// Comments container
const commentsContainer = document.getElementsByClassName("comments-published")[0];

function displayComment(){
    for(let i=0; i<existingComments.length; i++){
        if(existingComments[i].page == webpageName){
            let commentInput = document.createElement("div");
            commentInput.classList.add("comment-box");
            commentInput.innerHTML = `
            <div class="comment-inner">
                <p class="text-margin text greytext">${existingComments[i].comment}</p>
                <p class="text-margin align-right text greytext">- ${existingComments[i].name} (${existingComments[i].date})</p>
            </div>
            `;
            commentsContainer.appendChild(commentInput);
            if(existingComments[i].local !=="false"){
                commentInput.classList.add("comment-box-user");
                commentInput.innerHTML = `
                <span class="comment-del text greytext">\u00D7</span>
                <div class="comment-inner">
                    <p class="text-margin text greytext">${existingComments[i].comment}</p>
                    <p class="text-margin align-right text greytext">- ${existingComments[i].name} (${existingComments[i].date})</p>
                </div>
                `;
                // Delete own comment functionality
                deleteComment();
            }
        }
    };
    localStorage.setItem("existingComments", JSON.stringify(existingComments));
}

// Giving functionality for user to delete own comments
function deleteComment(){
    const delLength = document.getElementsByClassName("comment-del").length;
    const delBtn = document.getElementsByClassName("comment-del")[delLength-1];
    const delBtnParent = delBtn.parentElement;
    const commentContainer = delBtnParent.parentElement;
    delBtn.addEventListener("click", function(event){
        indexNum = 0;
        const currentComments = document.getElementsByClassName("comment-box");
        for(let i=0;i<currentComments.length;i++){
            if(currentComments[i] == event.target.parentElement){
                break;
            }
            else{
                indexNum++;
            }
        };
        // Filtering Comments into comments belonging to current webpage and comments belonging to others.
        /* Finding index of deleted comment in current page, then deleting it from current page comments array
        Combined the filtered aray back into the 'existing array' then saved in local storage*/
        const commentsOtherPages = existingComments.filter(comment => comment.page !== webpageName);
        const commentsCurrentPage = existingComments.filter(comment => comment.page == webpageName);
        existingComments.length =0;
        commentContainer.removeChild(delBtnParent);
        commentsCurrentPage.splice(indexNum,1);
        commentsOtherPages.forEach(comment => existingComments.push(comment));
        commentsCurrentPage.forEach(comment => existingComments.push(comment));
        localStorage.setItem("existingComments", JSON.stringify(existingComments));
    })
}
// Creating base comments on website load
function baseComments(){
    // Creating 'existing' comments on first load
    existingComments.push(new Comment("taichung", "I like the drawings and gifs", "David D", "01/1/2023", "false"));
    existingComments.push(new Comment("taichung", "The way you've created a connection between the built environment and the surrounding landscape is great.", "Jane Smith", "06/1/2023", "false"));

    existingComments.push(new Comment("duddingston", "Your attention to detail is impressive! Every aspect of your design is well-thought-out and executed with precision.", "A.F", "03/2/2023", "false"));
    existingComments.push(new Comment("duddingston","Your use of space is fantastic! Your design has a great flow and feels very welcoming and functional.", "Alex S", "10/2/2023", "false"));

    existingComments.push(new Comment("art", "Your use of color is great! I like the way you've blended different hues and shades together.", "Anonymous", "15/1/2023", "false"));
    existingComments.push(new Comment("art","I can see how much emotion you put into your work. It's truly moving and evokes a sense of feeling in the viewer.", "Will R", "26/1/2023", "false"));
    existingComments.push(new Comment("art","I can do better xD", "Alan D", "29/1/2023", "false"));    
}

// Restoring comments from local storage on load. If comments in local storage is null, base comments are pushed.
window.addEventListener("load", function(){
    const visted = localStorage.getItem("visted");
    if(!visted){
        baseComments();
        displayComment();
    }else{
        const commentStorage = JSON.parse(localStorage.getItem("existingComments"));
        if(commentStorage){
            for(let i=0;i<commentStorage.length;i++){
                const existingComment = new Comment(
                    commentStorage[i].page,
                    commentStorage[i].comment,
                    commentStorage[i].name,
                    commentStorage[i].date,
                    commentStorage[i].local,
                );
                existingComments.push(existingComment);
            }
            displayComment();
        }else{
        baseComments();
        displayComment();
        }
    }
})
// Submitting comments into comment array, local storage and webpage upon button click
submitBtn.addEventListener("click", function(){
    const userComment = document.getElementById("comment-input").value;
    let userName = document.getElementsByClassName("input-field-name")[0].value;
    if(!userComment == ""){
    if (userName == ""){
    userName = "Anonymous";
    }
    // Extracting values from input box and creating new comment in comment container
    let commentInput = document.createElement("div");
    commentInput.classList.add("comment-box");
    commentInput.classList.add("comment-box-user");
    commentInput.innerHTML = `
    <span class="comment-del text greytext">\u00D7</span>
    <div class="comment-inner">
        <p class="text-margin text greytext">${userComment}</p>
        <p class="text-margin align-right text greytext">- ${userName} (${today})</p>
    </div>
    `;
    commentsContainer.appendChild(commentInput);
    deleteComment();

    // Creating new class object and updating local storage
    const newComment = new Comment(webpageName, `${userComment}`, `${userName}`, `${today}`, "true");
    existingComments.push(newComment);
    localStorage.setItem("existingComments", JSON.stringify(existingComments));
    
    // Resetting input field blank upon pressing submit button
    document.getElementById("comment-input").value = "";
    document.querySelectorAll("#comment-input")[1].value ="";
    
}
else{
    alert("Cannot submit empty message")
}
})

// Visited webpage checker
window.addEventListener("load",function(){
    localStorage.setItem("visted", "yes")
});
