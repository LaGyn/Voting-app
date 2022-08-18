
let username = "";
let password = "";
let admin = {
    username: "yllapito",
    password: "lintu", 
};
let users = [admin];
let votes = [];
let candidates = [];

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

// Constructor:
function Vote(VoteName, candidates){
    this.VoteName = VoteName;
    this.candidates = candidates;
}

//let submitBtn = document.forms['signupform'];
//let submit = document.forms['loginform'];
let addCandBtn = document.getElementById('btn-addCand');
let addVoteBtn = document.getElementById('btn-addVote');

//submitBtn.addEventListener('submit', addUser);
//submit.addEventListener('submit', logIn);
addCandBtn.addEventListener('click', addCandidate);
addVoteBtn.addEventListener('click', addVote);

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

    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('address', address);
    localStorage.setItem('zipcode', zipcode);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("address").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function logIn(){
    const name = localStorage.getItem('username');
    const word = localStorage.getItem('password');
    let appliedName = document.getElementById("Username").value;
    let appliedPassword = document.getElementById("Password").value;
    let inList = false;
    if (name == appliedName && word == appliedPassword){
        window.open('/home.html');
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

function addCandidate(){
    let newListItem = document.querySelector('#candidate input[type="text"]').value;
    let newElement = document.createElement('li');
    let newText = document.createTextNode(newListItem); // Luodaan elementille tekstisisältö
    newElement.appendChild(newText); // Lisätään uudelle elementille teksti
    newElement.className = 'list-item'; // Annetaan uudelle elementille luokkanimi
   
    document.querySelector('#item-list').appendChild(newElement);
    candidates.push(newListItem);
    document.querySelector('#candidate input[type="text"]').value = "";
    document.querySelector('#candidate input[type="text"]').focus();
    console.log(candidates);
}

function addVote(){
    let VoteName = document.querySelector('#vote-name input[type="text"]').value;
    //let candidate = document.getElementsByClassName('list-item').value;
    let vote = new Vote(VoteName, candidates);
    votes.push(vote);
    console.log(votes);
}

