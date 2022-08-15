
let username = document.getElementById("username");
let password = document.getElementById("password");
let users = [];

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
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let address = document.getElementById("address");
    let zipcode = document.getElementById("zipcode");
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    let user;
    user = new User(firstname, lastname, address, zipcode, email, username, password);
    users.push(user);
}

let admin = {
    username: "yllapito",
    password: "lintu",
    
};