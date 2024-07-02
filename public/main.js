var favoriteVideos = [];
function searchVideos() {
    var apiKey = 'AIzaSyCFAX8eOotr4xTHEO9wZ2bLGT1hHsWftTA';
    var searchTerm = document.getElementById('search').value;
    var maxResults = 12;
    var apiUrl = "https://www.googleapis.com/youtube/v3/search?key=".concat(apiKey, "&part=snippet&type=video&q=").concat(searchTerm, "&maxResults=").concat(maxResults);
    // requisição com fetch
    fetch(apiUrl)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        displayVideos(data.items);
    })
        .catch(function (error) {
        console.error('Erro ao buscar vídeos:', error);
    });
}
// para exibir os vídeos
function displayVideos(videos) {
    var videoContainer = document.querySelector('.video-container');
    videoContainer.innerHTML = '';
    videos.forEach(function (video) {
        var videoId = video.id.videoId;
        var videoTitle = video.snippet.title;
        var isFavorite = favoriteVideos.includes(videoId);
        var videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = "\n            <iframe width=\"300\" height=\"200\" src=\"https://www.youtube.com/embed/".concat(videoId, "\" \n                title=\"").concat(videoTitle, "\" frameborder=\"0\" allowfullscreen></iframe>\n            <h6>").concat(videoTitle, "</h6>\n            <i class=\"").concat(isFavorite ? 'bi bi-star-fill' : 'bi bi-star', " favorite-icon\" onclick=\"toggleFavorite(this, '").concat(videoId, "')\"></i>\n        ");
        videoContainer.appendChild(videoElement);
    });
}
//para adicionar/remover favoritos
function toggleFavorite(icon, videoId) {
    icon.classList.toggle('bi-star');
    icon.classList.toggle('bi-star-fill');
    if (icon.classList.contains('bi-star-fill')) {
        favoriteVideos.push(videoId);
    }
    else {
        var index = favoriteVideos.indexOf(videoId);
        if (index !== -1) {
            favoriteVideos.splice(index, 1);
        }
    }
    updateFavoriteCount();
    updateFavoriteVideos();
}
//para atualizar o contador de favoritos
function updateFavoriteCount() {
    var favoriteCountElement = document.getElementById('favorite-count');
    favoriteCountElement.textContent = favoriteVideos.length.toString();
    localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
}
//para atualizar a lista de favoritos na página favoritos
function updateFavoriteVideos() {
    var favoriteVideosContainer = document.getElementById('favorite-videos');
    if (!favoriteVideosContainer)
        return;
    favoriteVideosContainer.innerHTML = '';
    favoriteVideos.forEach(function (videoId) {
        var videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = "\n            <iframe width=\"300\" height=\"200\" src=\"https://www.youtube.com/embed/".concat(videoId, "\" \n                frameborder=\"0\" allowfullscreen></iframe>\n            <i class=\"bi bi-star-fill favorite-icon\" onclick=\"toggleFavorite(this, '").concat(videoId, "')\"></i>\n        ");
        favoriteVideosContainer.appendChild(videoElement);
    });
}
//para inicializar os favoritos ao carregar a página
function initializeFavorites() {
    var storedFavorites = JSON.parse(localStorage.getItem('favoriteVideos') || '[]');
    if (storedFavorites) {
        favoriteVideos = storedFavorites;
        updateFavoriteCount();
        displayFavoriteVideos();
    }
    var removeAllButton = document.getElementById('remove-all-favorites');
    removeAllButton.addEventListener('click', removeAllFavorites);
}
//para exibir os favoritos na página favoritos
function displayFavoriteVideos() {
    var favoriteVideoContainer = document.getElementById('favorite-videos');
    favoriteVideoContainer.innerHTML = '';
    favoriteVideos.forEach(function (videoId) {
        var videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = "\n            <iframe width=\"300\" height=\"200\" src=\"https://www.youtube.com/embed/".concat(videoId, "\" \n                frameborder=\"0\" allowfullscreen></iframe>\n            <i class=\"bi bi-star-fill favorite-icon\" onclick=\"toggleFavorite(this, '").concat(videoId, "')\"></i>\n        ");
        favoriteVideoContainer.appendChild(videoElement);
    });
}
//botão de remover todos os favoritos
function removeAllFavorites() {
    favoriteVideos = [];
    updateFavoriteCount();
    displayFavoriteVideos();
}
