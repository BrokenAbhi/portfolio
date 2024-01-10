async function scrapeProfile() {
  const profileLink = document.getElementById("profileLink").value;

  if (!profileLink) {
    alert("Please enter a valid Instagram profile link.");
    return;
  }

  try {
    const response = await fetch(`/scrape?profileLink=${profileLink}`);
    const data = await response.json();

    // Update the DOM with the scraped data
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `
      <img src="${data.profilePicture}" alt="Profile Picture">
      <p><strong>Bio:</strong> ${data.bio}</p>
      <div id="photosContainer">${data.photos
        .map(
          (photoUrl, index) => `
          <div class="photo-container">
            <img src="${photoUrl}" alt="Photo">
            <button class="download-btn" onclick="downloadImage('${photoUrl}', 'photo_${index}')">Download</button>
          </div>
        `
        )
        .join("")}</div>
    `;

    // Additional handling for other scraped data can be added here
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while scraping the profile. Please try again.");
  }
}

function downloadImage(imageUrl, imageName) {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = imageName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading image:", error);
      alert("An error occurred while downloading the image. Please try again.");
    });
}
