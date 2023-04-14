function myClick() {
    //document.getElementById("benz").style.display ="none";
    let messAge="welcome to the script world";
    document.getElementById("new").innerHTML = messAge;
    document.getElementById("new").style.visibility = "visible";
    //alert(messAge);
    console.log(messAge);
}

function myHide(){
    document.getElementById("new").style.visibility = "hidden";
}

function buttonchangeText (){
    let change = document.getElementById("toggle");
        if (change.value === 'Show')
            {
                change.value = 'Hide';
                change.innerHTML = myClick();
            }
            else
            {
                change.value = 'Show';
                change.innerHTML = myHide();
            }
            console.log(change);
}


//Seema's script
/*
let subscribe = document.getElementById("subscribe")

subscribe.onclick = function(){
    
   window.location.href = "Sign In.html" 
}

let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");


signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function(){
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}

*/