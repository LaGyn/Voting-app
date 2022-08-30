window.addEventListener('load', createListOfVotes); // Kun sivu latautuu suoritetaan seuraava funktio 

let data;
let votes;
let candidates;
let voteElement;
//let link;
let item;
let votearea = document.getElementById('votearea');

// Luodaan lista äänestyksistä html-sivulle: 

function createListOfVotes(){
    let index = 0;
    let emptyList = document.getElementById('printArea3'); // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    emptyList.innerHTML = "";
    data = JSON.parse(localStorage.getItem('votes'));
    console.log(data)
    for (let i = 0; i < data.length; i++){
        let VoteName = data[i].VoteName;
        let votename = VoteName;
        voteElement = document.createElement('a');
        let voteTitle = document.createTextNode(votename);
        voteElement.appendChild(voteTitle);
        voteElement.className = 'vote-item';
        voteElement.id = index;
        voteElement.setAttribute('data-vote', index);
        voteElement.href = "#printArea4"; // Tähän linkkiosoite
        let linebreak = document.createElement('br');
        document.querySelector('#printArea3').appendChild(voteElement);
        document.querySelector('#printArea3').appendChild(linebreak);
        voteElement.addEventListener('click', selectVote);
        index++;
    }
    /*data.votes.forEach(votes => {
        let votename = VoteName;
        let voteElement = document.createElement('a');
        let voteTitle = document.createTextNode(votename);
        voteElement.appendChild(voteTitle);
        voteElement.className = 'vote-item';
        voteElement.href = "#"; // Tähän linkkiosoite
        let linebreak = document.createElement('br');
        document.querySelector('#printArea3').appendChild(voteElement);
        document.querySelector('#printArea3').appendChild(linebreak);
        index++;
    })*/
}

// Tuodaan tiedot äänestyksestä html-sivulle:

function selectVote(event){
    //votearea.style.display = "block";
    item = event.target.id;
    console.log(item);
    let btnIndex = 0;
    let emptyList = document.getElementById('printArea4');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    data = JSON.parse(localStorage.getItem('votes'));
    let header = data[item].VoteName;
    document.getElementById('voteHeader').innerText = header;
    data[item].candidates.forEach(candidates => {
        let candidate = candidates.newVoteItem;
        let candElement = document.createElement('h3');
        let newElem3 = document.createElement('button');
        let newText2 = document.createTextNode(candidate);
        let newText3 = document.createTextNode('Vote');
        let horizontal = document.createElement('hr');
        candElement.appendChild(newText2);
        newElem3.appendChild(newText3); // napille annetaan teksti

        candElement.className = 'candidate';
        candElement.id = btnIndex; // Annetaan elementille juokseva id nro, tämä on sama kuin kohteen napilla
        newElem3.className = 'voteBtn'; // napille annetaan class nimi
        
        newElem3.id = btnIndex; // Annetaan napille juokseva id nro
        newElem3.className = 'btn btn-primary';
        document.querySelector('#printArea4').appendChild(horizontal);
        document.querySelector('#printArea4').appendChild(candElement);
        document.querySelector('#printArea4').appendChild(newElem3);
        
        let name = data[item].candidates[btnIndex].newVoteItem;
        let totalVotes = data[item].candidates[btnIndex].newVotes;
        let nameElement = document.createElement('h4');
        let resultText = document.createTextNode(name + '  total votes: ' + totalVotes);
        nameElement.appendChild(resultText);
        document.querySelector('#printArea4').appendChild(nameElement);
        newElem3.addEventListener('click', vote);
        btnIndex++;
    })
    /*
    let closeBtn = document.createElement('button');
    let closeText = document.createTextNode('Close vote');
    let horizontal2 = document.createElement('hr');
    closeBtn.appendChild(closeText);
    closeBtn.className = 'btn btn-primary';
    closeBtn.addEventListener('click', closeArea);
    document.querySelector('#printArea4').appendChild(horizontal2);
    document.querySelector('#printArea4').appendChild(closeBtn);*/
}

// Äänestetään:

function vote(event){
    let nro = event.target.id;
    let aanet = data[item].candidates[nro].newVotes = data[item].candidates[nro].newVotes + 1;
    localStorage.setItem('votes', JSON.stringify(data)); // HUOM!!! stringify DATA! ei votes
    //data = JSON.parse(localStorage.getItem('votes'));
    console.log(nro);
    console.log(aanet);
    upDateVote(event); 
}

// Sulkee äänestyksen:
/*
function closeArea(){
    votearea.style.display = "none";
}*/

function upDateVote(event){
    //votearea.style.display = "block";
    //item = event.target.id;
    console.log(item);
    let btnIndex = 0;
    let emptyList = document.getElementById('printArea4');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    data = JSON.parse(localStorage.getItem('votes'));
    let header = data[item].VoteName;
    document.getElementById('voteHeader').innerText = header;
    data[item].candidates.forEach(candidates => {
        let candidate = candidates.newVoteItem;
        let candElement = document.createElement('h3');
        let newElem3 = document.createElement('button');
        let newText2 = document.createTextNode(candidate);
        let newText3 = document.createTextNode('Vote');
        let horizontal = document.createElement('hr');
        candElement.appendChild(newText2);
        newElem3.appendChild(newText3); // napille annetaan teksti

        candElement.className = 'candidate';
        candElement.id = btnIndex; // Annetaan elementille juokseva id nro, tämä on sama kuin kohteen napilla
        newElem3.className = 'voteBtn'; // napille annetaan class nimi
        
        newElem3.id = btnIndex; // Annetaan napille juokseva id nro
        newElem3.className = 'btn btn-primary';
        document.querySelector('#printArea4').appendChild(horizontal);
        document.querySelector('#printArea4').appendChild(candElement);
        document.querySelector('#printArea4').appendChild(newElem3);
        
        let name = data[item].candidates[btnIndex].newVoteItem;
        let totalVotes = data[item].candidates[btnIndex].newVotes;
        let nameElement = document.createElement('h4');
        let resultText = document.createTextNode(name + '  total votes: ' + totalVotes);
        nameElement.appendChild(resultText);
        document.querySelector('#printArea4').appendChild(nameElement);
        newElem3.addEventListener('click', vote);
        btnIndex++;
    })
    /*
    let closeBtn = document.createElement('button');
    let closeText = document.createTextNode('Close vote');
    let horizontal2 = document.createElement('hr');
    closeBtn.appendChild(closeText);
    closeBtn.className = 'btn btn-primary';
    closeBtn.addEventListener('click', closeArea);
    document.querySelector('#printArea4').appendChild(horizontal2);
    document.querySelector('#printArea4').appendChild(closeBtn);*/
}