window.addEventListener('load', createListOfVotes); // Kun sivu latautuu suoritetaan seuraava funktio 

let data = JSON.parse(localStorage.getItem('votes'));
let candidates;

function createListOfVotes(){
    let index = 0;
    let emptyList = document.getElementById('printArea3'); // Tyhjennetään edellinen lista jotta kyseessä on aina päivitetty versio
    emptyList.innerHTML = "";
    data = JSON.parse(localStorage.getItem('votes'));
    console.log(data)
    for (let i = 0; i < data.length; i++){
        let VoteName = data[i].VoteName;
        let votename = VoteName;
        let voteElement = document.createElement('a');
        let voteTitle = document.createTextNode(votename);
        voteElement.appendChild(voteTitle);
        voteElement.className = 'vote-item';
        voteElement.id = index;
        voteElement.href = "#"; // Tähän linkkiosoite
        let linebreak = document.createElement('br');
        document.querySelector('#printArea3').appendChild(voteElement);
        document.querySelector('#printArea3').appendChild(linebreak);
        index++;
        voteElement.addEventListener('click', selectVote);
    }
   /* data.forEach(vote => {
        let votename = VoteName;
        let voteElement = document.createElement('a');
        let voteTitle = document.createTextNode(votename);
        voteElement.appendChild(voteTitle);
        voteElement.className = 'vote-item';
        voteElement.href = "#"; // Tähän linkkiosoite
        let linebreak = document.createElement('br');
        document.querySelector('#printArea3').appendChild(voteElement);
        document.querySelector('#printArea3').appendChild(linebreak);
    })*/
}

function selectVote(event){
    let item = event.target.id;
    let btnIndex = 0;
    let name = votes[item].VoteName;
    votes[item].candidates.forEach(candidates => {
        let candidate = candidates.newVoteItem;
        let candElement = document.createElement('h3');
        let newElem3 = document.createElement('button');
        let newText2 = document.createTextNode(candidate);
        let newText3 = document.createTextNode('Vote');
        candElement.appendChild(newText2);
        newElem3.appendChild(newText3); // napille annetaan teksti

        candElement.className = 'candidate';
        candElement.id = btnIndex; // Annetaan elementille juokseva id nro, tämä on sama kuin kohteen napilla
        newElem3.className = 'voteBtn'; // napille annetaan class nimi
        newElem3.className = 'btn btn-primary';
        newElem3.id = btnIndex; // Annetaan napille juokseva id nro
        document.querySelector('#printArea4').appendChild(candElement);
        document.querySelector('#printArea4').appendChild(newElem3);
      
        newElem3.addEventListener('click', vote);
        btnIndex++;
    })
}

function createVoteModal(event){
    let btnIndex = 0;
    let emptyList = document.getElementById('voteCandidates');
    emptyList.innerHTML = ""; // Tyhjennetään tulostusalue listasta
    //console.log(event.target.id)
    data = JSON.parse(localStorage.getItem('votes'));
    link = event.target.id; // Otetaan talteen äänestyksen id numero.
    let header = data[link].VoteName; // Id numeroa käytetään apuna kohdennettaessa äänestyksen nimi ja äänestyskohteet
    document.getElementById('voteHeader').innerText = header; // Määritetään modaalin otsikko
    data[link].candidates.forEach(candidates => {
        let cand = candidates.newVoteItem;
        let candElement = document.createElement('h4');
        let newElem3 = document.createElement('button');
        let newText2 = document.createTextNode(cand);
        let newText3 = document.createTextNode('Vote');
        candElement.appendChild(newText2);
        newElem3.appendChild(newText3); // napille annetaan teksti
   
        candElement.className = 'candidate';
        candElement.id = btnIndex; // Annetaan elementille juokseva id nro, tämä on sama kuin kohteen napilla
        newElem3.className = 'voteBtn'; // napille annetaan class nimi
        newElem3.className = 'btn btn-primary';
        newElem3.id = btnIndex; // Annetaan napille juokseva id nro
        document.querySelector('#voteCandidates').appendChild(candElement);
        document.querySelector('#voteCandidates').appendChild(newElem3);
        
        newElem3.addEventListener('click', vote);

        let name = data[link].candidates[btnIndex].newVoteItem;
        totalVotes = data[link].candidates[btnIndex].newVotes;
        let newDiv = document.createElement('div');
        newDiv.className = 'd-sm-flex justify-content-between';
        
        let nameElement = document.createElement('h4');
        let resultText = document.createTextNode(name + '  total votes: ' + totalVotes);
        nameElement.appendChild(resultText);
        
        document.querySelector('#results').appendChild(newDiv).appendChild(nameElement);
        btnIndex++; // Napin indeksi numero kasvaa yhdellä
    })
}

function vote(event){
    link = newElem.id;
    let nro = event.target.id;
    votes[link].candidates[nro].newVotes = votes[link].candidates[nro].newVotes + 1;
    totalVotes = votes[link].candidates[nro].newVotes;
    localStorage.setItem('newVotes', JSON.stringify(votes));
    
    let result = document.createElement('h4');
    let resultText2 = document.createTextNode(totalVotes);
    result.appendChild(resultText2);

    document.querySelector('#results').appendChild(result);  
}