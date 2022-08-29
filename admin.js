window.addEventListener('load', createListOfVotes);
let username = "";
let password = "";
let admin = {
    username: "yllapito",
    password: "lintu", 
};
let users = [admin];
const votes = [];
let candidates = []; //äänestys kohteet
let data = JSON.parse(localStorage.getItem('votes'));
//let index = 0;
let link;
let newVotes;
let modal = document.getElementById('voteDetails');

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
let deleteBtn = document.getElementById('btn-deleteVote');

addCandBtn.addEventListener('click', addCandidate);
addVoteBtn.addEventListener('click', addVote);
deleteBtn.addEventListener('click', deleteItem);

// Rekisteröityminen:

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

// Sisäänkirjautuminen:

function logIn(){
    const name = localStorage.getItem('username');
    const word = localStorage.getItem('password');
    let appliedName = document.getElementById("Username").value;
    let appliedPassword = document.getElementById("Password").value;
    let inList = false;
    if (name == appliedName && word == appliedPassword){
        window.open('/vote.html');
    }
    for (let i = 0; i < users.length; i++){
        if (appliedName == 'yllapito' && appliedPassword == 'lintu'){
            inList = true;
            window.open('/admin.html');
        }
        else if(users[i].username == appliedName && users[i].password == appliedPassword){
            inList = true;
            window.open('/vote.html');
        }
    }
}
    
// Annetaan äänestykselle äänestyskohteet ja tulostetaan ne html-sivulle, jotta tekijä näkee mitkä kohteet on jo lisätty:

function addCandidate(){
    // Lisätään html-tiedostoon lista elemettejä:
    let newVoteItem = document.querySelector('#candidate input[type="text"]').value;
    let newElement = document.createElement('li');
    let newText = document.createTextNode(newVoteItem); // Luodaan elementille tekstisisältö
    newElement.appendChild(newText); // Lisätään uudelle elementille teksti
    newElement.className = 'list-item'; // Annetaan uudelle elementille luokkanimi
    document.querySelector('#item-list').appendChild(newElement);
    newVotes = 0; // Alustetaan äänien määrä nollaksi
    let candidate = new Candidate(newVoteItem, newVotes); // Luodaan uusi candidate-olio jolla nimi ja äänimäärä
    candidates.push(candidate); // Lisätään candidate candidates-arraylle

    document.querySelector('#candidate input[type="text"]').value = ""; // Tyhjennetään input-kenttä
    document.querySelector('#candidate input[type="text"]').focus(); // Kursori valmiiksi inputkenttään
}

// Luodaan äänestys ja viedään se tietokantaan (localstorage):

function addVote(){
    
    let VoteName = document.querySelector('#vote-name input[type="text"]').value; //Äänestyksen nimi otetaan talteen
    let vote = new Vote(VoteName, candidates); // Luodaan äänestys olio, jolla nimi ja äänestettävät asiat
    votes.push(vote); // Lisätään äänestys äänestysten arraylle

    localStorage.setItem('votes', JSON.stringify(votes));
    data = JSON.parse(localStorage.getItem('votes'));

    document.querySelector('#vote-name input[type="text"]').value = ""; // Tyhjennetään input-kenttä
    let emptyList = document.getElementById('item-list');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    candidates = []; //Lista tyhjäksi, muuten äänestyskohteet menevät kaikki samalle äänestykselle
/*
    let newSelectItem = VoteName;
    //console.log(newSelectItem);
   -- newElem = document.createElement('a');
   -- let newElem2 = document.createElement('br');
   -- let newtext = document.createTextNode(newSelectItem);
   -- newElem.appendChild(newtext); // uudelle elementille annetaan tekstiä
   -- newElem.className = 'vote-item'; // elementille annetaan class nimi
   -- newElem.setAttribute("data-bs-toggle", "modal");
   -- newElem.id = index;
   -- newElem.setAttribute("data-vote", index)
    
   -- newElem.href = "#voteDetails"; // linkki vie modaaliin
   -- document.querySelector('#vote-name input[type="text"]').value = "";
   -- document.querySelector('#printArea').appendChild(newElem); // Tulostetaan print arealle uusi elementti
   -- document.querySelector('#printArea').appendChild(newElem2); // Tulostetaan rivinvaihto
    
    newElem.addEventListener('click', createVoteModal); // linkki-elementille function kutsu
    
    let emptyList = document.getElementById('item-list');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    
    index++; // Id : n indeksi numero kasvaa => jokainen äänestys saa eri numeron, jonka avulla äänestykselle kohdennetaan oikeat äänestyskohteet modaaliin tulostaessa.
    candidates = []; //Lista tyhjäksi, muuten äänestyskohteet menevät kaikki samalle äänestykselle
    */
    createListOfVotes();
}

// Luodaan lista html-sivulle äänestyksistä. Otsikot linkkeinä modaaliin:

function createListOfVotes(event){
    let index = 0;
    let emptyList = document.getElementById('printArea'); // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    emptyList.innerHTML = "";
    data = JSON.parse(localStorage.getItem('votes')); // Tuodaan sen hetkisestä tietokannasta tiedot käytettäväksi
    //console.log(data)
    for (let i = 0; i < data.length; i++){
        let VoteName = data[i].VoteName; 
        let votename = VoteName;
        let voteElement = document.createElement('a');
        let voteTitle = document.createTextNode(votename);
        voteElement.appendChild(voteTitle);
        voteElement.className = 'vote-item';
        voteElement.setAttribute('data-bs-toggle', 'modal');
        voteElement.setAttribute('data-vote', index);
        voteElement.id = index;
        voteElement.href = "#voteDetails"; // Linkki avaa modaalin
        let linebreak = document.createElement('br');
        voteElement.addEventListener('click', createVoteModal);
        document.querySelector('#printArea').appendChild(voteElement);
        document.querySelector('#printArea').appendChild(linebreak);
        voteElement.addEventListener('click', createVoteModal);
        index++;
    }
}

function createVoteModal(event){
    let btnIndex = 0;
    let emptyList = document.getElementById('voteCandidates');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    let emptyList2 = document.getElementById('results');
    emptyList2.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    //console.log(event.target.id)
    data = JSON.parse(localStorage.getItem('votes'));
    link = event.target.id; // Otetaan talteen äänestyksen id numero.
    let header = data[link].VoteName; // Id numeroa käytetään apuna kohdennettaessa äänestyksen nimi ja äänestyskohteet
    document.getElementById('voteHeader').innerText = header; // Määritetään modaalin otsikko
    data[link].candidates.forEach(candidates => {
        let cand = candidates.newVoteItem;
        let candElement = document.createElement('h4');
        let newText2 = document.createTextNode(cand);
        candElement.appendChild(newText2);
        candElement.className = 'candidate';
        candElement.id = btnIndex; // Annetaan elementille juokseva id nro
        document.querySelector('#voteCandidates').appendChild(candElement);

        let name = data[link].candidates[btnIndex].newVoteItem;
        let totalVotes = data[link].candidates[btnIndex].newVotes;
        let newDiv = document.createElement('div');
        newDiv.className = 'd-sm-flex justify-content-between';
        
        let nameElement = document.createElement('h4');
        let resultText = document.createTextNode(name + '  total votes: ' + totalVotes);
        nameElement.appendChild(resultText);
        
        document.querySelector('#results').appendChild(newDiv).appendChild(nameElement);
        btnIndex++; // Napin indeksi numero kasvaa yhdellä
    })
}

function deleteItem(){
    data = JSON.parse(localStorage.getItem('votes'));
    votes.splice(link, 1);
    localStorage.setItem('votes', JSON.stringify(votes))
    createListOfVotes();
}
