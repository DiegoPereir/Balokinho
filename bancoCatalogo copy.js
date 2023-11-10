const database = {
    bannerCatalogo: {
      imagem: "banners/BannerCatalogo.jpg"
    },
    p2: {
      titulo: "Conjuntos",
      subSessoes: [
        {
          titulo: "Masculinos",
          produtos: []
        }
      ]
    }
  };
  
  // Diretório onde estão as imagens
  const diretorioImagens = "img/conjunto/masculiino/";
  
  // Obter uma lista de imagens na pasta
  fetch(diretorioImagens)
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, 'text/html');
      const imagens = Array.from(htmlDocument.querySelectorAll("a"))
        .map(a => a.getAttribute("href"))
        .filter(href => href.endsWith(".jpg") || href.endsWith(".webp"));
  
      // Adicionar cada imagem à estrutura de dados
      imagens.forEach(imagemNome => {
        database.p2.subSessoes[0].produtos.push({
          imagem: diretorioImagens + imagemNome,
          nome: "Nome do produto",
          descricao: "Descrição ou preço do produto"
        });
      });
  
      console.log(JSON.stringify(database, null, 2)); // Exibe a estrutura em JSON
    })
    .catch(error => {
      console.error("Erro ao obter lista de imagens:", error);
    });
  
  








function createProductElement(produto) {
    const divProduto = document.createElement('div');
    divProduto.className = "conteudo_catalogo";

    const divImagem = document.createElement('div');
    divImagem.className = "produto_content";
    divImagem.setAttribute("onclick", "fullscreen(this)");

    const loadingDiv = document.createElement('div');
    loadingDiv.className = "loading";

    const spinner = document.createElement('div');
    spinner.className = "spinner";
    loadingDiv.appendChild(spinner);

    divImagem.appendChild(loadingDiv);

    const imgProduto = document.createElement('img');
    imgProduto.className = "imagem_produto";
    imgProduto.src = produto.imagem;
    imgProduto.alt = "imagem produto";
    imgProduto.draggable = false;
    imgProduto.onload = function () {
        divImagem.removeChild(loadingDiv);
        divImagem.style.transform = 'scale(1)';
    };

    divImagem.appendChild(imgProduto);
    divProduto.appendChild(divImagem);

    const divDesc = document.createElement('div');
    divDesc.className = "desc_produto";
    const h1Nome = document.createElement('h1');
    h1Nome.textContent = produto.nome;
    const h2Desc = document.createElement('h2');
    h2Desc.textContent = produto.descricao;
    divDesc.appendChild(h1Nome);
    divDesc.appendChild(h2Desc);
    divProduto.appendChild(divDesc);

    return divProduto;
}

function preencherSessao(idSessao) {
    const sessao = database[idSessao];
    if (!sessao) return;

    if (idSessao === 'bannerCatalogo') {
        const bannerElement = document.getElementById('bannerCatalogo');
        if (bannerElement && sessao.imagem) {
            bannerElement.style.backgroundImage = `url(${sessao.imagem})`;
        }
        return;
    }

    const divSessao = document.getElementById(idSessao);
    divSessao.innerHTML = '';

    const tituloDiv = document.createElement('div');
    tituloDiv.className = "conteudo_titulo";
    const h1Titulo = document.createElement('h1');
    h1Titulo.className = "titulo_catalogo";
    h1Titulo.textContent = sessao.titulo;
    tituloDiv.appendChild(h1Titulo);
    divSessao.appendChild(tituloDiv);

    sessao.subSessoes.forEach(subSessao => {
        const divSubSessao = document.createElement('div');
        divSubSessao.className = "sub_sessao";

        const tituloSubDiv = document.createElement('div');
        tituloSubDiv.className = "alinhar_titulo";
        const h1SubTitulo = document.createElement('h1');
        h1SubTitulo.className = "titulo_catalogo";
        h1SubTitulo.textContent = subSessao.titulo;
        tituloSubDiv.appendChild(h1SubTitulo);
        divSubSessao.appendChild(tituloSubDiv);

        updateTitleColor(h1SubTitulo);

        const divCatalogo = document.createElement('div');
        divCatalogo.className = "catalogo";

        subSessao.produtos.forEach(produto => {
            const divProduto = createProductElement(produto);
            divCatalogo.appendChild(divProduto);
        });

        divSubSessao.appendChild(divCatalogo);
        divSessao.appendChild(divSubSessao);
    });
}

function updateTitleColor(h1Element) {
    const titleColors = {
        'Masculinos': '#4E9AE6',
        'Femininas': '#FF5275',
        'Unissex': '#FFB347',
        'Novos Produtos em Breve...': '#7c7c7c'
    };
    const defaultColor = '#FFB347';
    h1Element.style.color = titleColors[h1Element.textContent.trim()] || defaultColor;
}

for (const idSessao in database) {
    preencherSessao(idSessao);
}
