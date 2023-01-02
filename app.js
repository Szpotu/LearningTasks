//Variables 
let jsForm = document.querySelector('.js-form');
let inputText = document.querySelector('#search-bar');
let wikiSearch = document.querySelector('#btn-pack').children[0];
let luckyButton = document.querySelector('#btn-pack').children[1];
let resultWindow = document.querySelector('#results-window');
//Functions 
//Clean previous search 
const cleanResults = () =>{
	resultWindow.innerHTML = '';
}
//Convert a date into a relation to current day 
async function handleSub(event) {
  //Prevent default reload
  event.preventDefault();
  cleanResults();
  let inputText = document.querySelector('#search-bar').value;
  //If input i empty - callback alert | Stop 
  if (inputText !== '') {
    let newQuery = inputText.trim();
    try {
      const result = await searchInWiki(newQuery);
      displayResults(result);
    } catch (err) {
    	console.log('Something went wrong');
    }
  } else {
    alert(`I'm sorry. The input is currently, please - fill it up and try again`);
  }
}
//Generate random page  
async function luckySearch(){
	cleanResults();
    try{
    	let random = Math.floor(Math.random()*10000 + 1);
        let endpoint = `https://en.wikipedia.org/w/api.php?action=parse&format=json&formatversion=2&pageid=${random}`;
    	let response = await fetch(endpoint,{
        	method:'GET',
            headers:{
            	accept:'application/json',
            },
            type:'cors',
        });
        if(!response.ok){
        	throw new Error(`Error! status: ${response.status}`);
        }
        else{
        	let json = await response.json();
        }
    }
    catch(err){
   	console.log(err.message);
    }
}

//Fetch results 
async function searchInWiki(searchQuery) {
  let response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchQuery}`);
  console.log(response);
  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    const json = await response.json();
    return json;
  }
}

function displayResults(result) {
  result.query.search.forEach(element => {
		let re = new RegExp(inputText.value,'ig');
    
    let mySnippet = element.snippet.replace(re, inputText.value.toUpperCase());
    const url = `https://en.wikipedia.org/?curid=${element.pageid}`;
    resultWindow.insertAdjacentHTML('beforeend',
      `
  <div class = 'result-record'>
    <a href='${url}' class='js-link' target='_blank'>${element.title}</a>
    </br>
     <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
    </br>
    <span class='snippet'>${mySnippet} </span>
  </div>
  `)
  })
}
//EventListneers

jsForm.addEventListener('submit', handleSub);
wikiSearch.addEventListener('click',handleSub);
luckyButton.addEventListener('click', luckySearch)










