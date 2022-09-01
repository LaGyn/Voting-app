window.addEventListener('load', createListOfVotes);
window.addEventListener('load', createListOfUsers);
let username = "";
let password = "";

const users = [];
const votes = [];
let candidates = []; //äänestys kohteet
let data;
let userData;
let link;
let newVotes;

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
    userData = JSON.parse(localStorage.getItem('users'));
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let address = document.getElementById("address").value;
    let zipcode = document.getElementById("zipcode").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user;
    user = new User(firstname, lastname, address, zipcode, email, username, password);
    userData.push(user);

    localStorage.setItem('users', JSON.stringify(userData));
    

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
        index++;
    }
    
}

// Tulostetaan käyttäjän tiedot modaaliin:

function createUserModal(event){
    //let print = "";
    link = event.target.id; // Otetaan talteen äänestyksen id numero.
    let emptyList = document.getElementById('users'); // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    emptyList.innerHTML = "";
    let header = userData[link].username; // Id numeroa käytetään apuna kohdennettaessa äänestyksen nimi ja äänestyskohteet
    document.getElementById('userHeader').innerText = header; // Määritetään modaalin otsikko
    //userData[link].users.forEach(users => {
        let fname = userData[link].firstname;
        let fnElement = document.createElement('h4');
        let fnText = document.createTextNode("Firstname: " + fname);
        fnElement.appendChild(fnText);
        document.querySelector('#users').appendChild(fnElement);
        let lname = userData[link].lastname;
        let lnElement = document.createElement('h4');
        let lnText = document.createTextNode("Lastname: " + lname);
        lnElement.appendChild(lnText);
        document.querySelector('#users').appendChild(lnElement);
        let address = userData[link].address;
        let adElement = document.createElement('h4');
        let adText = document.createTextNode("Address: " + address);
        adElement.appendChild(adText);
        document.querySelector('#users').appendChild(adElement);
        let zipcode = userData[link].zipcode;
        let zipElement = document.createElement('h4');
        let zipText = document.createTextNode("Zipcode: " + zipcode);
        zipElement.appendChild(zipText);
        document.querySelector('#users').appendChild(zipElement);
        let email = userData[link].email;
        let eElement = document.createElement('h4');
        let eText = document.createTextNode("Email: " + email);
        eElement.appendChild(eText);
        document.querySelector('#users').appendChild(eElement);
        let username = userData[link].username;
        let uElement = document.createElement('h4');
        let uText = document.createTextNode("Username: " + username);
        uElement.appendChild(uText);
        document.querySelector('#users').appendChild(uElement);
        let password = userData[link].password;
        let pElement = document.createElement('h4');
        let pText = document.createTextNode("Password: " + password);
        pElement.appendChild(pText);
        document.querySelector('#users').appendChild(pElement);
        
   // })
    /*
    print = userData[link].printInfo();
    let printElement = document.createElement('p');
    let printText = document.createTextNode(print);
    printElement.appendChild(printText);
    //document.getElementById('users').innerHTML = print;
    document.querySelector('#users').appendChild(printElement);
    */
}

// Poistetaan käyttäjä:

function deleteUser(){
    userData = JSON.parse(localStorage.getItem('users'));
    userData.splice(link, 1);
    localStorage.setItem('users', JSON.stringify(userData));
    createListOfUsers();
}