// Variables for visible page interactive elements 

const tryMeButtonLeft = document.querySelector('.try-me-button');
const tryMeButtonRight = document.querySelector('.try-me-right');
const shareMeButton = document.querySelector('.share-me-button');
const resetMeButton = document.querySelector('.reset-me-button');
const categoryButton = document.querySelector('.category-button');
const searchedKeyword = document.querySelector('#keyword');

// Variables for API 

let outputWindow = document.querySelector('.output-window');
const apiEndpointRandom = 'https://api.chucknorris.io/jokes/random';
const apiEndpointCategories = 'https://api.chucknorris.io/jokes/categories';
const apiEndpointSearch = 'https://api.chucknorris.io/jokes/search?query={query}';


// Operations on buttons and forms 

//--Displays joke on the window 
function displayJoke (content){
    outputWindow.textContent = content;
}
//--Checks if input form filled up 
const isEmpty = () =>{
    searchedKeyword.value==''?console.log('Empty - try categories:'):console.log('No');
}
//--Checks if keyword matches with categories 
function isMatching(array,keyword){
    if(array.includes(keyword)){
        console.log('Yes');
    }
    else{
        alert('Check on available categories by clicking the button below :)')
    }
}

// --Gets array from fetched categories 




//const getPersonalised = (array,keyword) =>{
  //  if(isEmpty == true && isMatching(,keywordSearch)){

    //}
//}

// SHARE BUTTON ON WORK -------------------

// Functions - Small Operations 
function summonAlert(){
    alert(err,'Something went wrong sweetie. That could be failing server, or wifi connection.');
}
// This function is fetching random jokes from passed API endpoint 
async function getRandomJoke(){
    try{
        const response = await fetch(apiEndpointRandom);
        if(!response.ok){
            throw Error(response.statusText);
        }
        const newJson = await response.json();
        console.log(response.statusText);
        displayJoke(newJson.value);
    }
    catch(err){
        console.log(err);
        summonAlert();
    }
}
// This function retrieve a list of available categories 
async function getCategories(){
    try{
        const response = await fetch(apiEndpointCategories);
        if(!response.ok){
            alert('Oops, try again Marishka!');
            throw Error(response.statusText);
        }
        const json = await response.json();
        if(!isEmpty()){
            console.log(json);
            console.log(searchedKeyword.value);

        }
        // How to prove that value from keywordSearch matches one of json indexes ?
        else if(isMatching(json,searchedKeyword.value)){
            console.log('Cool');
        }
    }
    catch(err){
        console.log(err);
        summonAlert();
    }
}

//
//Event listeners - Buttons 
tryMeButtonLeft.addEventListener('click',getRandomJoke);

tryMeButtonRight.addEventListener('click',getCategories);


resetMeButton.addEventListener('click', ()=>{
    outputWindow.textContent='';
});



// check if input empty 
// if empty - ask to fill in 
// if not - check if word in categories 
// if not - inform about categories 
// 
