"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// diretórios estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'views', 'index.html'));
});
// rota para a página de pesquisa dos vídeos
app.get('/videos', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'views', 'videos.html'));
});
// rota para a página dos vídeos favoritados
app.get('/favoritos', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'views', 'favoritos.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
