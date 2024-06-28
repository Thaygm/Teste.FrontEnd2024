function searchVideos() {
    const apiKey = 'AIzaSyCFAX8eOotr4xTHEO9wZ2bLGT1hHsWftTA';
    const searchTerm = document.getElementById('search').value;
    const maxResults = 12;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${searchTerm}&maxResults=${maxResults}`;

    // requisição com fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayVideos(data.items);
        })
        .catch(error => {
            console.error('Erro ao buscar vídeos:', error);
        });
}

// para exibir os vvídeos
function displayVideos(videos) {
    const videoContainer = document.querySelector('.video-container');
    videoContainer.innerHTML = '';

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');

        videoElement.innerHTML = `
            <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" 
                title="${videoTitle}" frameborder="0" allowfullscreen></iframe>
            <h6>${videoTitle}</h6>
        `;

        videoContainer.appendChild(videoElement);

        const titleElement = videoElement.querySelector('h6');
        const videoWidth = videoElement.offsetWidth;
        const titleWidth = titleElement.offsetWidth;

        if (titleWidth > videoWidth) {
            titleElement.classList.add('long-title');
        }
    });
}
