document.getElementById("loginFrom").addEventListener("submit", function(event) 
{ event.preventDefault();
     
    let login_voterId = document.getElementById("Login_VoterId").value.trim();
    let login_password = document.getElementById("Login_Password").value.trim();

    let VoterId = "ABC1223456";
    let Password = "manoj123";

    let isValid = true;

    if (login_voterId === "" || login_voterId !== VoterId) {
        document.getElementById("Login_VoterId").style.borderColor = "red";
        isValid = false;
    } else {
        document.getElementById("Login_VoterId").style.borderColor = "";
    }

    if (login_password === "" || login_password !== Password) {
        document.getElementById("Login_Password").style.borderColor = "red";
        isValid = false;
    }else {
        document.getElementById("Login_Password").style.borderColor = "";
    }

    if (isValid) {
        alert("Login Successful");
    }
    return isValid;
});


