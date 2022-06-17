//Function to make the POST request and display the result message from server
const displayTextAlert = () => {

    //This param apiURL can be changed if needed
    const apiURL = 'http://159.89.28.183:5000/details?url='

    //POST request to server
    const submitURL = async (value) => {
        await fetch(apiURL+encodeURIComponent(value), {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
    
            }
        }).then(r => r.json())
        .then(d => {
            console.log(d)
            let alertElement = `<div id='alertSent' 
            style='position: fixed;
                top: 0px;
                width: 100%;
                display:flex;
                justify-content: center;
                z-index:999;
                background-color: #00FF00;'>
                    <h1 style='color: #FFF;'>PAGE SAVED</h1>
            </div>`
            document.body.innerHTML +=(alertElement)
            setTimeout(() => {document.getElementById('alertSent').remove()}, 2000)
        })
        .catch (err => {
            console.log(err)
            let alertElement = `<div id='alertSent' 
            style='position: fixed;
                top: 0px;
                width: 100%;
                display:flex;
                justify-content: center;
                z-index:999;
                background-color: #FF0000;'>
                    <h1 style='color: #FFF;'>PAGE COULDN'T BE SENT</h1>
            </div>`
            document.body.innerHTML +=(alertElement)
            setTimeout(() => {document.getElementById('alertSent').remove()}, 2000)
        })
    }

    //Executing the function to send the URL
    submitURL(window.location.href)
}

//Main function (to execute the script into the active tab)
const catchURL = () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
        chrome.scripting.executeScript(
            {
                target: {tabId: tabs[0].id},
                function: displayTextAlert
            }
        );
    })

    setTimeout(() => {
        window.close()
    }, 20);
}

//Call the main function
catchURL()