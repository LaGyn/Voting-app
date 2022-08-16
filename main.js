
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

let submitBtn = document.forms['signupform'];
let submit = document.forms['loginform'];

submitBtn.addEventListener('submit', addUser)
submit.addEventListener('submit', logIn)

function addUser(event){
    //event.preventDefault()

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
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('address', address);
    localStorage.setItem('zipcode', zipcode);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

   /* document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("address").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";*/
}


function logIn(event){
    event.preventDefault()
    const name = localStorage.getItem('username');
    const word = localStorage.getItem('password');
    let appliedName = document.getElementById("Username").value;
    let appliedPassword = document.getElementById("Password").value;
    let inList = false;
    if (name == appliedName && word == appliedPassword){
        window.open('/admin.html');
    }
    for (let i = 0; i < users.length; i++){
        if (appliedName == 'yllapito' && appliedPassword == 'lintu'){
            inList = true;
            window.open('/admin.html');
        }
        else if(users[i].username == appliedName && users[i].password == appliedPassword){
            inList = true;
            window.open('/home.html');
        }
    }
    
}