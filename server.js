const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const portfolios = require('./data')

// configurar o express para usar arquivos estáticos que ficam 
// armazenados na pasta public, la colocamos os arquivos estaticos
server.use(express.static('public'));

// Configurando a View Engine  
server.set("view engine", "njk");

// Configurando o nunjucks
nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

// Rota get para a pagina index
server.get('/', function (req, res) {
  const about = {
    avatar_url: 'https://avatars0.githubusercontent.com/u/17993135?s=460&u=26053a4fd0ad31b632419ec173b06086f1ad9547&v=4',
    name: 'Bruno Eduardo',
    role: 'Analista de Sistemas',
    description: 'Programador Full-stack focado em desenvolvimento Javascript, React, NodeJS e React Native.',
    links: [
      {
        name: 'Github',
        url: 'https://github.com/brunoemferreira'
      },
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/brunoemf/'
      },
    ]
  }

  return res.render("about", { about })
})

// Rota get para a pagina portfolio onde apontamos o arquivo que ira chamar de portfolio 
// e os items vem diretamente do arquivo data que é importado como portfolios
server.get('/portfolio', function (req, res) {
  return res.render("portfolio", { items: portfolios })
});

server.get('/video', function (req, res) {
  const id = req.query.id;

  const video = portfolios.find(function (video) {
    return video.id == id
  });

  if (!video) {
    return res.send("Video not Found");
  }
  res.render("video", { item: video });
});

server.listen(5000, function () {
  console.log('Server is Running on port 5000!')
});
