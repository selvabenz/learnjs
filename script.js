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