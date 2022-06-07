//This param apiURL can be changed if needed
//const apiURL = 'http://159.89.28.183:5000/details?url='
const apiURL = 'http://127.0.0.1:3000'

const res = document.getElementById('response')

//When the function it's done, I'll display this message for a short time
function displayTextAlert(){

    let alertElement = `<div id='alertSent' 
    style='position: sticky;
        top: 20px;
        width: 100%;
        display:flex;
        justify-content: center;
        z-index:999;
        background-color :dark;'>
            <div style='background-color :dark;'>
                <h1>PAGE SAVED</h1>
            </div>
    </div>`
    document.body.prepend(alertElement.to
        )
    setTimeout(() => {document.getElementById('alertSent').remove()}, 2000)
  }

//function to call the alert
const displayAlert = () => {
    chrome.tabs.query( {active: true, currentWindow: true },
        (tabs) =>
        {
            chrome.scripting.executeScript(
                {
                    target: {tabId: tabs[0].id},
                    function: displayTextAlert
                }
            );
        }
    )
    setTimeout(() => {
    window.close()
    }, 20); 
}

//function to send the actual tab to server
const catchURL = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        submitURL(tabs[0].url)
        displayAlert()
        setTimeout(() => {res.innerHTML = ''},1500)
        
    })
}

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

displayAlert()