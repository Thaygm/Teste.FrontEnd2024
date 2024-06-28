const express = require('express');
const app = express();
const path = require('path');

// diretórios estáticos
app.use(express.static(path.join(__dirname, 'public')));

// rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// rota para a página de pesquisa dos vídeos
app.get('/videos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'videos.html'));
});

// rota para a página dos vídeos favoritados
app.get('/favoritos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'favoritos.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
