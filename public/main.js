let favoriteVideos = [];

function searchVideos() {
    const apiKey = 'Adicione sua chave api aqui';
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

// para exibir os vídeos
function displayVideos(videos) {
    const videoContainer = document.querySelector('.video-container');
    videoContainer.innerHTML = '';

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;
        const isFavorite = favoriteVideos.includes(videoId);
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');

        videoElement.innerHTML = `
            <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" 
                title="${videoTitle}" frameborder="0" allowfullscreen></iframe>
            <h6>${videoTitle}</h6>
            <i class="${isFavorite ? 'bi bi-star-fill' : 'bi bi-star'} favorite-icon" onclick="toggleFavorite(this, '${videoId}')"></i>
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

//para adicionar/remover favoritos
function toggleFavorite(icon, videoId) {
    icon.classList.toggle('bi-star');
    icon.classList.toggle('bi-star-fill');

    if (icon.classList.contains('bi-star-fill')) {
        favoriteVideos.push(videoId);
    } else {
        const index = favoriteVideos.indexOf(videoId);
        if (index !== -1) {
            favoriteVideos.splice(index, 1);
        }
    }

    updateFavoriteCount();
    updateFavoriteVideos();
}

//para atualizar o contador de favoritos
function updateFavoriteCount() {
    const favoriteCountElement = document.getElementById('favorite-count');
    favoriteCountElement.textContent = favoriteVideos.length;
    localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
}

//para atualizar a lista de favoritos na página favoritos
function updateFavoriteVideos() {
    const favoriteVideosContainer = document.getElementById('favorite-videos');
    favoriteVideosContainer.innerHTML = '';

    favoriteVideos.forEach(videoId => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');

        videoElement.innerHTML = `
            <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}"
                frameborder="0" allowfullscreen></iframe>
        `;

        favoriteVideosContainer.appendChild(videoElement);
    });
}

//para inicializar os favoritos ao carregar a página
function initializeFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteVideos'));
    if (storedFavorites) {
        favoriteVideos = storedFavorites;
        updateFavoriteCount();
        displayFavoriteVideos();
    }

    const removeAllButton = document.getElementById('remove-all-favorites');
    removeAllButton.addEventListener('click', removeAllFavorites);
}

//para exibir os favoritos na página favoritos
function displayFavoriteVideos() {
    const favoriteVideoContainer = document.getElementById('favorite-videos');
    favoriteVideoContainer.innerHTML = '';

    favoriteVideos.forEach(videoId => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');

        videoElement.innerHTML = `
            <iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allowfullscreen></iframe>
        `;

        favoriteVideoContainer.appendChild(videoElement);
    });
}

//botão de remover todos os favoritos
function removeAllFavorites() {
    favoriteVideos = [];
    updateFavoriteCount();
    displayFavoriteVideos();
}

initializeFavorites();