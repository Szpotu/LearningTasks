let quoteButton = document.querySelector('#fetcher');
const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
const spinner = document.querySelector('#js-spinner');
const tweetBtn=document.querySelector('#tweet');
const resetBtn = document.querySelector('#reset');
const quoteText = document.querySelector('#quote-window');
//Functions


function displayQuote(quote){
    const quoteText = document.querySelector('#quote-window');
    quoteText.textContent = quote;
}
function setTweetButton(quote){
    tweetBtn.setAttribute('href',`https://twitter.com/intent/tweet?text=${quote}`);
}

//ASYNC
async function getQuote(){
    spinner.classList.remove('hidden');
    quoteButton.disabled = true;
    // Th 'try' block executes the statements within it as usual
    //If an exception is thrown, the statements defined in
    //the 'catch' block will be executed
    try{
        //The simplest use of 'fetch' takes a single argument -- the url to the resource you want to fetch -- and returns what is known as a Promise.
        
        //A promise represents the eventual succes or failute of an operation and the 'await' keyword is used to pause the function until a promise is resolved 
        //
        
        const response = await fetch(endpoint)
        //if response is not 200 OK . . . 

        //The response to the fetch request (after it is resolved) is stored in the response variable. If the request is succesful, 200OK response will be received. If not, it means the request failed fo some reason. 

        if(!response.ok){
            throw Error(response.statusText)
        }
        const json = await response.json();
        displayQuote(json.message);
        //Here, the response.json method reads the response body to completion and parses respnse as JSON. The reason we use await here again is because the json{} method returns a promise. If the promise is resolved successfully, the JSON object will be stored in the json variable and logged to the console. 
    }
    catch(err){
        console.log(err);
        alert('Failed to fetch new quote');
    }
    finally{
        spinner.classList.add('hidden');
        
        quoteButton.disabled = false;
        console.log('elo');
    }
}

quoteButton.addEventListener('click',getQuote);
tweetBtn.addEventListener('click',setTweetButton);
resetBtn.addEventListener('click',e=>{
    quoteText.textContent ='';
});
