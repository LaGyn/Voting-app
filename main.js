
let username = "";
let password = "";
let admin = {
    username: "yllapito",
    password: "lintu", 
};
let users = [admin];
const votes = [];
let candidates = []; //äänestys kohteet
let data;
let nextVote;
let index = 0;
let link;
let totalVotes;

//Constructors:
function User(firstname, lastname, address, zipcode, email, username, password){
    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.zipcode = zipcode;
    this.email = email;
    this.username = username;
    this.password = password;
}

function Candidate(name, votes){
    this.newVoteItem = name;
    this.newVotes = votes;
}

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
    // Lisätään html-tiedostoon lista elemettejä:
    let newVoteItem = document.querySelector('#candidate input[type="text"]').value;
    let newElement = document.createElement('li');
    let newText = document.createTextNode(newVoteItem); // Luodaan elementille tekstisisältö
    newElement.appendChild(newText); // Lisätään uudelle elementille teksti
    newElement.className = 'list-item'; // Annetaan uudelle elementille luokkanimi
    document.querySelector('#item-list').appendChild(newElement);
    let newVotes = 0; // Äänien määrä
    let candidate = new Candidate(newVoteItem, newVotes);
    candidates.push(candidate); // Lisätään candidate candidates-arraylle

    document.querySelector('#candidate input[type="text"]').value = "";
    document.querySelector('#candidate input[type="text"]').focus();
    //console.log(candidates);
    
}

function addVote(){
    
    let VoteName = document.querySelector('#vote-name input[type="text"]').value; //Äänestyksen nimi otetaan talteen
    let vote = new Vote(VoteName, candidates); // Luodaan äänestys olio jolla nimi ja äänestettävät asiat
    votes.push(vote); // Äänestyslistaan lisätään äänestys
    //console.log(votes);
    localStorage.setItem('votes', JSON.stringify(votes));
    data = JSON.parse(localStorage.getItem('votes'));

    //console.log(data[nextVote]);
    //console.log(data[0].candidates[1]);

    let newSelectItem = VoteName;
    //console.log(newSelectItem);
    let newElem = document.createElement('a');
    let newElem2 = document.createElement('br');
    let newtext = document.createTextNode(newSelectItem);
    
    newElem.appendChild(newtext); // uudelle elementille annetaan tekstiä
    newElem.className = 'vote-item'; // elementille annetaan class nimi
    newElem.setAttribute("data-bs-toggle", "modal");
    newElem.id = index;
    
    newElem.href = "#voteDetails"; // linkki vie modaaliin
    document.querySelector('#vote-name input[type="text"]').value = "";
    document.querySelector('#printArea').appendChild(newElem); // Tulostetaan print arealle uusi elementti
    document.querySelector('#printArea').appendChild(newElem2); // Tulostetaan rivinvaihto
    newElem.addEventListener('click', createVoteModal); // linkki-elementille function kutsu
    
    let emptyList = document.getElementById('item-list');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    
    index++; // Id : n indeksi numero kasvaa => jokainen äänestys saa eri numeron, jonka avulla äänestykselle kohdennetaan oikeat äänestyskohteet modaaliin tulostaessa.
    candidates = []; //Lista tyhjäksi, muuten äänestyskohteet menevät kaikki samalle äänestykselle
}

function createVoteModal(event){
    let emptyList = document.getElementById('voteCandidates');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    //console.log(event.target.id)
    link = event.target.id; // Otetaan talteen äänestyksen id numero.
    let header = votes[link].VoteName; // Id numeroa käytetään apuna kohdennettaessa äänestyksen nimi ja äänestyskohteet
    document.getElementById('voteHeader').innerText = header; // Määritetään modaalin otsikko
    votes[link].candidates.forEach(candidates => {
        let cand = candidates.newVoteItem;
        totalVotes = candidates.newVotes;
        let candElement = document.createElement('h4');
        let newElem3 = document.createElement('button');
       // let newElem4 = document.createElement('h5');
        let newText2 = document.createTextNode(cand + '  total votes: ' + totalVotes);
        let newText3 = document.createTextNode('Vote');
        candElement.appendChild(newText2);
        newElem3.appendChild(newText3); // napille annetaan teksti
       // newElem4.appendChild(newText2 + 'votes: ');
        candElement.className = 'candidate';
        newElem3.className = 'voteBtn'; // napille annetaan class nimi
        newElem3.className = 'btn btn-primary';
        newElem3.id = link;
        document.querySelector('#voteCandidates').appendChild(candElement);
        document.querySelector('#voteCandidates').appendChild(newElem3);

        newElem3.addEventListener('click', vote);
    })
}

function vote(event){
    console.log(event.target.id)
    link = event.target.id;
    totalVotes = totalVotes + 1;
}

function deleteItem(){
    deleteBtn = document.getElementsByClassName('deleteBtn');
    
}

