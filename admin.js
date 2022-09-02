window.addEventListener('load', createListOfVotes); // Funktio suoritetaan ikkunan latautuessa: äänestykset näkyviin
window.addEventListener('load', createListOfUsers); // Funktio suoritetaan ikkunan latautuessa: käyttäjät näkyviin

// Tarkistetaan onko local storagessa votes/users avain vai onko arvo null:
let votes = localStorage.getItem('votes');
if (votes != null){
    votes = JSON.parse(votes);
}
else {
    votes = [];
    localStorage.setItem('votes', JSON.stringify(votes));
}
let users = localStorage.getItem('users');
if (users != null){
    users = JSON.parse(users);
}
else {
    users = [];
    localStorage.setItem('users', JSON.stringify(users));
}

let userData; 
let data; 
let candidates = []; //äänestys kohteet
let link; // muuttuja id:n arvolle
let newVotes;

//Konstruktorit:
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

// Luodaan painikkeille muuttujat ja kytketään eventListenerillä halutut funktiot niihin:
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
    userData = JSON.parse(localStorage.getItem('users')); // Tieto parsittu js-objektiksi. (Parsitaan JSON-string javaScript-objektiksi, jolloin sitä voi helposti käsitellä).
    // Muuttujille input-kenttien arvot:
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let address = document.getElementById("address").value;
    let zipcode = document.getElementById("zipcode").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = new User(firstname, lastname, address, zipcode, email, username, password); // Muodostetaan uusi user-olio
    userData.push(user); // Lisätään user parsittuun tietokantaan
    
    localStorage.setItem('users', JSON.stringify(userData)); // viedään userData localstorageen JSON stringinä
    
    document.getElementById("firstname").value = ""; // Input-kentät tyhjiksi
    document.getElementById("lastname").value = "";
    document.getElementById("address").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    createListOfUsers(); // Tulostetaan käyttäjät html:ään
}

// Sisäänkirjautuminen:

function logIn(){
    let appliedName = document.getElementById("Username").value; // Input-kenttään lisätty käyttäjänimi
    let appliedPassword = document.getElementById("Password").value; // Input-kenttään lisätty salasana
    userData = JSON.parse(localStorage.getItem('users')); // Kaivetaan parsittu tietokanta esiin
    let inList = false;
    if (appliedName == 'yllapito' && appliedPassword == 'lintu'){
        inList = true;
        window.open('admin.html');
    }
    // Käydään tietokanta läpi löytyykö käyttäjänimeä ja salasanaa:
    for (let i = 0; i < userData.length; i++){ 
        if (userData[i].username == appliedName && userData[i].password == appliedPassword){
            inList = true;
            window.open('vote.html');
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
    data = JSON.parse(localStorage.getItem('votes')); // Tieto parsittu js-objektiksi. (Parsitaan JSON-string javaScript-objektiksi, jolloin sitä voi helposti käsitellä).
    
    let VoteName = document.querySelector('#vote-name input[type="text"]').value; //Äänestyksen nimi otetaan talteen
    let vote = new Vote(VoteName, candidates); // Luodaan äänestys olio, jolla nimi ja äänestettävät asiat
    data.push(vote); // Lisätään äänestys äänestysten arraylle

    localStorage.setItem('votes', JSON.stringify(data)); // Viedään localstorageen JSON-stringiksi muutettu tieto
    
    document.querySelector('#vote-name input[type="text"]').value = ""; // Tyhjennetään input-kenttä
    let emptyList = document.getElementById('item-list');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    candidates = []; //Lista tyhjäksi, muuten äänestyskohteet menevät kaikki samalle äänestykselle

    createListOfVotes(); // Päivitetään html
}

// Luodaan lista äänestyksistä html-sivulle. Otsikot linkkeinä modaaliin:

function createListOfVotes(){
    let index = 0;
    let emptyList = document.getElementById('printArea'); // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    emptyList.innerHTML = "";
    data = JSON.parse(localStorage.getItem('votes')); // Tuodaan sen hetkisestä tietokannasta tiedot käytettäväksi
    //console.log(data)
    for (let i = 0; i < data.length; i++){
        let VoteName = data[i].VoteName; 
        let votename = VoteName;
        let voteElement = document.createElement('a'); // linkki a-elementti
        let voteTitle = document.createTextNode(votename); // teksti, joka lukee elementissä
        voteElement.appendChild(voteTitle); // lisätään teksti elementtiin
        voteElement.className = 'vote-item'; // annetaan luokka nimi
        voteElement.setAttribute('data-bs-toggle', 'modal'); // annetaan bootstrap atribuutti joka ohjaa modaaliin
        voteElement.setAttribute('data-vote', index); // data-atribuutti, kokeilu
        voteElement.id = index; // Annetaan id:lle index numero
        voteElement.href = "#voteDetails"; // Linkki avaa modaalin
        let linebreak = document.createElement('br'); // rivinvaihto
        document.querySelector('#printArea').appendChild(voteElement); // lisätään elementti osoitettuun paikkaan html-sivulla
        document.querySelector('#printArea').appendChild(linebreak);
        voteElement.addEventListener('click', createVoteModal); // lisätään elementille eventListener ja kytketään se funktioon klikkauksella
        index++; //Index-numero on lisääntyvä
    }
}

// Luodaan äänestyksen modaali: 

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
    // Listataan ehdokkaat:
    data[link].candidates.forEach(candidates => {
        let cand = candidates.newVoteItem;
        let candElement = document.createElement('h4');
        let newText2 = document.createTextNode(cand);
        candElement.appendChild(newText2);
        candElement.className = 'candidate';
        candElement.id = btnIndex; // Annetaan elementille juokseva id nro
        document.querySelector('#voteCandidates').appendChild(candElement);

        let name = data[link].candidates[btnIndex].newVoteItem; // Ehdokkaan nimi
        let totalVotes = data[link].candidates[btnIndex].newVotes; // Ehdokkaan äänet
        // Äänestystulokset:
        let nameElement = document.createElement('h4');
        let resultText = document.createTextNode(name + '  total votes: ' + totalVotes);
        nameElement.appendChild(resultText);
        
        document.querySelector('#results').appendChild(nameElement);
        btnIndex++; // Napin indeksi numero kasvaa yhdellä
    })
}

// Poistetaan äänestys: 

function deleteItem(){
    data.splice(link, 1); // Poistaa linkin arvon osoittaman olion arraylta
    localStorage.setItem('votes', JSON.stringify(data)); // Päivittää localstoragen
    createListOfVotes(); // Päivitetään tulostus
}

// Luodaan lista käyttäjistä html-sivulle:

function createListOfUsers(){
    let index = 0;
    let emptyList = document.getElementById('printArea2'); 
    emptyList.innerHTML = ""; // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    userData = JSON.parse(localStorage.getItem('users')); // Tuodaan sen hetkisestä tietokannasta tiedot käytettäväksi
    //console.log(userData)
    // Käydään array läpi ja muodostetaan uudet elementit html:ään
    for (let i = 0; i < userData.length; i++){
        let username = userData[i].username; 
        let name = username;
        let userElement = document.createElement('a');
        let userTitle = document.createTextNode(name);
        userElement.appendChild(userTitle);
        userElement.className = 'user-item';
        userElement.setAttribute('data-bs-toggle', 'modal'); // Bootstrap attribuutti modaaliin
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
    link = event.target.id; // Otetaan talteen äänestyksen id numero. Id:tä käytetään myöhemmin käyttäjän poisto funktiossa.
    let emptyList = document.getElementById('users'); 
    emptyList.innerHTML = ""; // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    let header = userData[link].username; // Id numeroa käytetään apuna kohdennettaessa äänestyksen nimi ja äänestyskohteet
    document.getElementById('userHeader').innerText = header; // Määritetään modaalin otsikko
    // Luodaan tiedoille tulostus html-sivulle:
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
}

// Poistetaan käyttäjä:

function deleteUser(){
    userData.splice(link, 1); // Poistaa linkin arvon osoittaman olion arraylta
    localStorage.setItem('users', JSON.stringify(userData)); // Päivittää localstoragen
    createListOfUsers(); //Päivittää listan html:ään
}