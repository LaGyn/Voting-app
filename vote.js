window.addEventListener('load', createListOfVotes); // Kun sivu latautuu suoritetaan seuraava funktio 
//let votes = [];
/*function Vote(VoteName, candidates){
    this.VoteName = VoteName;
    this.candidates = candidates;
}*/

let index = 0;

function createListOfVotes(){
    const data = JSON.parse(localStorage.getItem('votes'));
    console.log(data)
    let VoteName;
    for (let i = 0; i < data.length; i++){
        VoteName = data[i].VoteName; // KOrjaa tämä!!!
        //votes.push(data[i].VoteName);
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
    //console.log(votes);
}