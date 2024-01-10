function generateQR() {
    const content = document.getElementById('content').value;

    if (content.trim() !== '') {
        fetch(`/generate?q=${encodeURIComponent(content)}`)
            .then(response => response.json())
            .then(data => {
                const qrcodeElement = document.getElementById('qrcode');
                qrcodeElement.innerHTML = `<img src="${data.url}" alt="QR Code">`;

                // Add a download link for the QR code image
                const downloadLink = document.createElement('a');
                downloadLink.href = data.url;
                downloadLink.download = 'qrcode.png';
                downloadLink.textContent = 'Download QR Code';

                // Append the link to the container
                qrcodeElement.appendChild(downloadLink);
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter content to generate a QR code.');
    }
}

window.generateQR = generateQR;