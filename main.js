
let username = "";
let password = "";
let admin = {
    username: "yllapito",
    password: "lintu", 
};
let users = [admin];
let votes = [];
let candidates = []; //äänestys kohteet
let candidateList = []; //sisältää candidates-listat
let nextVote = 0;

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

let addCandBtn = document.getElementById('btn-addCand');
let addVoteBtn = document.getElementById('btn-addVote');

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
    //console.log(candidates);
}

    let vote;
    let VoteName;
function addVote(){
    candidateList.push(candidates);
    candidates = candidateList[nextVote]; // Annetaan äänestyksien listalle juokseva numero
    
    VoteName = document.querySelector('#vote-name input[type="text"]').value; //Äänestyksen nimi otetaan talteen
    vote = new Vote(VoteName, candidates); // Luodaan äänestys olio jolla nimi ja äänestettävät asiat
    votes.push(vote); // Äänestyslistaan lisätään äänestys
    //console.log(votes);
    let newSelectItem = vote.VoteName;
    //console.log(newSelectItem);
    let newElem = document.createElement('a');
    let newElem2 = document.createElement('br');
    let newtext = document.createTextNode(newSelectItem);
    
    newElem.appendChild(newtext); // uudelle elementille annetaan tekstiä
    newElem.className = 'vote-item'; // elementille annetaan class nimi
    newElem.setAttribute("data-bs-toggle", "modal");
    
    newElem.href = "#voteDetails"; // linkki vie modaaliin
    document.querySelector('#vote-name input[type="text"]').value = "";
    document.querySelector('#printArea').appendChild(newElem); // Tulostetaan print arealle uusi elementti
    document.querySelector('#printArea').appendChild(newElem2); // Tulostetaan rivinvaihto
    
    newElem.addEventListener('click', createVoteModal); // linkki-elementille function kutsu
    let emptyList = document.getElementById('item-list');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    
    nextVote++; // Äänestyksien lista menee pykälän eteenpäin
    candidates = []; //Lista tyhjäksi
}

function createVoteModal(){
    let header = VoteName;
    document.getElementById('voteHeader').innerText = header; // Määritetään modaalin otsikko
    
    for (let i = 0; i < vote.candidates.length; i++){
        let cand = vote.candidates[i];
        let candElement = document.createElement('h4');
        let newElem3 = document.createElement('button');
        let newText2 = document.createTextNode(cand)
        let newText3 = document.createTextNode('Vote');
        candElement.appendChild(newText2);
        newElem3.appendChild(newText3); // napille annetaan teksti
        candElement.className = 'candidate';
        newElem3.className = 'voteBtn'; // napille annetaan class nimi
        document.querySelector('#voteCandidates').appendChild(candElement);
        document.querySelector('#voteCandidates').appendChild(newElem3);
        
    }
}

function deleteItem(){
    deleteBtn = document.getElementsByClassName('deleteBtn');
    
}

