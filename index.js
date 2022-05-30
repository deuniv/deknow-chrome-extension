//This param apiURL can be changed if needed
const apiURL = 'http://127.0.0.1:5000/details?url='


const tabBtn = document.getElementById("tab-btn")
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")

//function to send the actual tab to server
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs[0].url)
        submitURL(tabs[0].url)
    })
})

//function to send the input to server
inputBtn.addEventListener("click", function() {
    if(inputEl.value != '') {
        console.log(inputEl.value)
        submitURL(inputEl.value)
    }
})

//function to send the link to server
const submitURL = async (value) => {
    await fetch(apiURL+encodeURI(value), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).catch (err => console.log(err))
}