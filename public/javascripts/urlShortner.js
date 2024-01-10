function shortenUrl() {
    const urlInput = document.getElementById('urlInput');
    const shortUrlDisplay = document.getElementById('shortUrl');
    const copyIcon = document.getElementById('copyIcon');

    const originalUrl = urlInput.value;

    fetch('/shorten', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ originalUrl }),
    })
    .then(response => response.json())
    .then(data => {
        const shortUrl = data.shortUrl;
        shortUrlDisplay.innerText = shortUrl;

        // Enable the copy icon
        copyIcon.setAttribute('data-clipboard-text', shortUrl); // Set the text to be copied
        copyIcon.style.cursor = 'pointer'; // Ensure the icon has a pointer cursor
    })
    .catch(error => {
        console.log("Error", error);
        shortUrlDisplay.innerHTML = 'Error shortening URL';
    });
}

// this code is not working  //
function copyShortUrl() {
    const shortUrlDisplay =document.getElementById('urlInput');
    const textToCopy = shortUrlDisplay.innerText;

    navigator.clipboard.writeText(textToCopy)
    .then(() =>{
        console.log('copied');
    })
    .catch(err =>{
        console.error('not copied',err);
    });
    }

