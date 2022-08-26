window.addEventListener('load', createListOfVotes);

function createListOfVotes(){
    let data = JSON.parse(localStorage.getItem('votes'));
    console.log(data)
}