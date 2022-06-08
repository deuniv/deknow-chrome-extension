//This param apiURL can be changed if needed
const apiURL = 'http://159.89.28.183:5000/details?url='

//When the function it's done, I'll display this message for a short time
const displayTextAlert = () => {

    let alertElement = `<div id='alertSent' 
        style='position: fixed;
            top: 0px;
            width: 100%;
            display:flex;
            justify-content: center;
            z-index:999;
            background-color: #000000;'>
                    <h1 style='color: #FFF;'>PAGE SAVED</h1>
        </div>`
    document.body.innerHTML +=(alertElement)
    setTimeout(() => {document.getElementById('alertSent').remove()}, 2000)
  }

//function to call the message alert
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

catchURL()