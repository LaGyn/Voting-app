
let username = "";
let password = "";
let admin = {
    username: "yllapito",
    password: "lintu", 
};
let users = [admin];

//Constructor:
function User(firstname, lastname, address, zipcode, email, username, password){
    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.zipcode = zipcode;
    this.email = email;
    this.username = username;
    this.password = password;
}

function addUser(){
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let address = document.getElementById("address").value;
    let zipcode = document.getElementById("zipcode").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user;
    user = new User(firstname, lastname, address, zipcode, email, username, password);
    users.push(user);

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("address").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

let tulosta = "";
function logIn(){
    let appliedName = document.getElementById("Username").value;
    let appliedPassword = document.getElementById("Password").value;
    let inList = false;
    for (let i = 0; i < users.length; i++){
        if (users[i].username == appliedName && users[i].password == appliedPassword){
            inList = true;
            tulosta = "true";
        }
        else if (inList == false){
            tulosta = "false!";
        }
        alert(tulosta);
        document.getElementById("Username").value = "";
        document.getElementById("Password").value = "";
    }
    
}