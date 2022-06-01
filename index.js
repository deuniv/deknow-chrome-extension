//This param apiURL can be changed if needed
const apiURL = 'http://159.89.28.183:5000/details?url='


const tabBtn = document.getElementById("tab-btn")
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const res = document.getElementById('response')

//When the function it's done, I'll display this message for a short time
const displayAlert = () => {
    res.innerHTML = 'URL Sent!'
}

//function to send the actual tab to server
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        submitURL(tabs[0].url)
        displayAlert()
        setTimeout(() => {res.innerHTML = ''},1500)
        
    })
})

//function to send the input to server
inputBtn.addEventListener("click", function() {
    if(inputEl.value != '') {
        submitURL(inputEl.value)
        inputEl.value = ''
        displayAlert()
        setTimeout(() => {res.innerHTML = ''},1500)
    }
})

//function to send the link to server
const submitURL = async (value) => {
    await fetch(apiURL+encodeURIComponent(value), {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

        }
    }).catch (err => console.log(err))
}