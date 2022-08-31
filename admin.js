window.addEventListener('load', createListOfVotes);
window.addEventListener('load', createListOfUsers);
let username = "";
let password = "";

let users = [];
const votes = [];
let candidates = []; //äänestys kohteet
let data;
let userData;
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
    /*
    this.printInfo = function(){
        return "Firstname: " + this.firstname + "<br/>" + "Lastname: " + this.lastname + "<br/>" + "Address: " + this.address + "<br/>" + "Zipcode: " + this.zipcode + "<br/>" + "Email: " + this.email;
    }*/
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
let deleteUserBtn = document.getElementById('btn-deleteUser');

addCandBtn.addEventListener('click', addCandidate);
addVoteBtn.addEventListener('click', addVote);
deleteBtn.addEventListener('click', deleteItem);
deleteUserBtn.addEventListener('click', deleteUser);

// Rekisteröityminen:

function addUser(){
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let address = document.getElementById("address").value;
    let zipcode = document.getElementById("zipcode").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = new User(firstname, lastname, address, zipcode, email, username, password);
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
    userData = JSON.parse(localStorage.getItem('users'));

    document.getElementById("firstname").value = ""; // Input-kentät tyhjiksi
    document.getElementById("lastname").value = "";
    document.getElementById("address").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    createListOfUsers();
}

// Sisäänkirjautuminen:

function logIn(){
    let appliedName = document.getElementById("Username").value;
    let appliedPassword = document.getElementById("Password").value;
    userData = JSON.parse(localStorage.getItem('users'));
    let inList = false;
    if (appliedName == 'yllapito' && appliedPassword == 'lintu'){
        inList = true;
        window.open('/admin.html');
    }
    for (let i = 0; i < userData.length; i++){
        if (userData[i].username == appliedName && userData[i].password == appliedPassword){
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

    createListOfVotes();
}

// Luodaan lista html-sivulle äänestyksistä. Otsikot linkkeinä modaaliin:

function createListOfVotes(){
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
        document.querySelector('#printArea').appendChild(voteElement);
        document.querySelector('#printArea').appendChild(linebreak);
        voteElement.addEventListener('click', createVoteModal);
        index++;
    }
}

// Luodaan modaali: 

function createVoteModal(event){
    let btnIndex = 0;
    let emptyList = document.getElementById('voteCandidates');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    let emptyList2 = document.getElementById('results');
    emptyList2.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    //console.log(event.target.id)
    //data = JSON.parse(localStorage.getItem('votes'));
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
        
        let nameElement = document.createElement('h4');
        let resultText = document.createTextNode(name + '  total votes: ' + totalVotes);
        nameElement.appendChild(resultText);
        
        document.querySelector('#results').appendChild(nameElement);
        btnIndex++; // Napin indeksi numero kasvaa yhdellä
    })
}

// Poistetaan äänestys: 

function deleteItem(){
    //data = JSON.parse(localStorage.getItem('votes'));
    votes.splice(link, 1);
    localStorage.setItem('votes', JSON.stringify(votes))
    createListOfVotes();
}

function createListOfUsers(){
    let index = 0;
    let emptyList = document.getElementById('printArea2'); // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    emptyList.innerHTML = "";
    userData = JSON.parse(localStorage.getItem('users')); // Tuodaan sen hetkisestä tietokannasta tiedot käytettäväksi
    console.log(userData)
    for (let i = 0; i < userData.length; i++){
        let username = userData[i].username; 
        let name = username;
        let userElement = document.createElement('a');
        let userTitle = document.createTextNode(name);
        userElement.appendChild(userTitle);
        userElement.className = 'user-item';
        userElement.setAttribute('data-bs-toggle', 'modal');
        //userElement.setAttribute('data-vote', index);
        userElement.id = index;
        userElement.href = "#userDetails"; // Linkki avaa modaalin
        let linebreak = document.createElement('br');
        document.querySelector('#printArea2').appendChild(userElement);
        document.querySelector('#printArea2').appendChild(linebreak);
        userElement.addEventListener('click', createUserModal);
        //userElement.addEventListener('click', printInfo);
        index++;
    }
    
}

// Tulostetaan käyttäjän tiedot modaaliin:

function createUserModal(event){
   // let print = "";
   // let emptyList = document.getElementById('users');
   // emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    
    link = event.target.id; // Otetaan talteen äänestyksen id numero.
    let header = userData[link].username; // Id numeroa käytetään apuna kohdennettaessa äänestyksen nimi ja äänestyskohteet
    document.getElementById('userHeader').innerText = header; // Määritetään modaalin otsikko
   // print = userData[link].printInfo();
   // document.getElementById('users').innerHTML = print;
    
}

// Poistetaan käyttäjä:

function deleteUser(){
    users.splice(link, 1);
    localStorage.setItem('users', JSON.stringify(users));
    createListOfUsers();
}