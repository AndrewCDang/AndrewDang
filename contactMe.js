const firstName = document.getElementById("firstName");
const secondName = document.getElementById("secondName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const msgLine1 = document.getElementById("msgLine1");
const msgLine2 = document.getElementById("msgLine2");
const msgLine3 = document.getElementById("msgLine3");
const msgLine4 = document.getElementById("msgLine4");
const replyLine1 = document.getElementById("replyLine1");
const replyLine2 = document.getElementById("replyLine2");
const workBtn = document.getElementById("work");
const otherBtn = document.getElementById("other");

workBtn.addEventListener("click", function(){
    block.classList.add("path");
})



firstName.addEventListener("change", function(){
    if(firstName.value !== ""){
        msgLine1.classList.add("msgLineFill")
    }
    else(
        msgLine1.classList.remove("msgLineFill")
    )
});
secondName.addEventListener("change", function(){
    if(secondName.value !== ""){
        msgLine2.classList.add("msgLineFill")
    }
    else(
        msgLine2.classList.remove("msgLineFill")
    )
});
email.addEventListener("change", function(){
    if(email.value !== ""){
        msgLine4.classList.add("msgLineFill")
    }
    else(
        msgLine4.classList.remove("msgLineFill")
    )
});
message.addEventListener("change", function(){
    if(message.value !== ""){
        msgLine3.classList.add("msgLineFill")
    }
    else(
        msgLine3.classList.remove("msgLineFill")
    )
});
document.addEventListener("change", function(){
    if(firstName.value !== "" && secondName.value !== "" && email.value !== "" && message.value !== ""){
        replyLine1.classList.add("msgLineFill2");
        replyLine2.classList.add("msgLineFill2");
    }
    else{
        if(replyLine1.classList.contains("msgLineFill2")){
            replyLine1.classList.remove("msgLineFill2");
            replyLine2.classList.remove("msgLineFill2");
        }
    }
})


