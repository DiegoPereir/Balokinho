// Função para criar elementos de produto
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

// Função para atualizar a cor do título
function updateTitleColor(h1Element) {
  const titleColors = {
    'Masculinos': '#4E9AE6',
    'Femininas': '#FF5275',
    'Unissex': '#FFB347',
    'Novos Produtos em Breve...': '#7c7c7c'
  };
  const defaultColor = '#FFB347';
  h1Element.style.color = titleColors[h1Element.textContent.trim()] || defaultColor;
  if (h1Element.textContent.trim() === 'Todos') {
    h1Element.style.display = 'none'; // Oculta o elemento
  }
}

// Função para preencher a sessão
function preencherSessao(categoria, sessao) {
  if (!sessao) return;

  const divSessao = document.getElementById(categoria);
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

// O JSON fornecido (coloque aqui o seu JSON)
const database = {
  "p12": {
    "titulo": "Acessorios",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Acessorios/Femininas/B202 1.jpg",
            "nome": "B202 1"
          },
          {
            "imagem": "catalogo/Acessorios/Femininas/B203-2 1.jpg",
            "nome": "B203-2 1"
          },
          {
            "imagem": "catalogo/Acessorios/Femininas/B204-2 1.jpg",
            "nome": "B204-2 1"
          },
          {
            "imagem": "catalogo/Acessorios/Femininas/B252,,. - Cópia.webp",
            "nome": "B252,,"
          },
          {
            "imagem": "catalogo/Acessorios/Femininas/B253 1.jpg",
            "nome": "B253 1"
          },
          {
            "imagem": "catalogo/Acessorios/Femininas/B253, - Cópia.webp",
            "nome": "B253, - Cópia"
          },
          {
            "imagem": "catalogo/Acessorios/Femininas/B253. - Cópia.webp",
            "nome": "B253"
          },
          {
            "imagem": "catalogo/Acessorios/Femininas/B255..... - Cópia.webp",
            "nome": "B255"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Acessorios/Masculinos/B122 1.jpg",
            "nome": "B122 1"
          },
          {
            "imagem": "catalogo/Acessorios/Masculinos/B201 1.jpg",
            "nome": "B201 1"
          },
          {
            "imagem": "catalogo/Acessorios/Masculinos/B252-2 1.jpg",
            "nome": "B252-2 1"
          },
          {
            "imagem": "catalogo/Acessorios/Masculinos/B252., - Cópia.webp",
            "nome": "B252"
          },
          {
            "imagem": "catalogo/Acessorios/Masculinos/B258... - Cópia.webp",
            "nome": "B258"
          },
          {
            "imagem": "catalogo/Acessorios/Masculinos/B258.... - Cópia.webp",
            "nome": "B258"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Acessorios/Unissex/B252 1.jpg",
            "nome": "B252 1"
          },
          {
            "imagem": "catalogo/Acessorios/Unissex/B252, - Cópia.webp",
            "nome": "B252, - Cópia"
          },
          {
            "imagem": "catalogo/Acessorios/Unissex/B258, - Cópia.webp",
            "nome": "B258, - Cópia"
          },
          {
            "imagem": "catalogo/Acessorios/Unissex/B258-3 1.jpg",
            "nome": "B258-3 1"
          },
          {
            "imagem": "catalogo/Acessorios/Unissex/B258..., - Cópia.webp",
            "nome": "B258"
          },
          {
            "imagem": "catalogo/Acessorios/Unissex/B262 1.jpg",
            "nome": "B262 1"
          },
          {
            "imagem": "catalogo/Acessorios/Unissex/B262, - Cópia.webp",
            "nome": "B262, - Cópia"
          },
          {
            "imagem": "catalogo/Acessorios/Unissex/B262,., - Cópia.webp",
            "nome": "B262,"
          }
        ]
      }
    ]
  },
  "p4": {
    "titulo": "Bodies",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Bodies/Femininas/feminino.png",
            "nome": "feminino"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Bodies/Masculinos/masculino.png",
            "nome": "masculino"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Bodies/Unissex/unissex.jpg",
            "nome": "unissex"
          }
        ]
      }
    ]
  },
  "p13": {
    "titulo": "Bonés e Chapéu",
    "subSessoes": [
      {
        "titulo": "Todos",
        "produtos": [
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B251 1.jpg",
            "nome": "B251 1"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B251, - Cópia.webp",
            "nome": "B251, - Cópia"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B251,, - Cópia.webp",
            "nome": "B251,, - Cópia"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B264 1.jpg",
            "nome": "B264 1"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B264. - Cópia.webp",
            "nome": "B264"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B264... - Cópia.webp",
            "nome": "B264"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B265 1.jpg",
            "nome": "B265 1"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B265. - Cópia.webp",
            "nome": "B265"
          },
          {
            "imagem": "catalogo/Bonés e Chapéu/Todos/B265.. - Cópia.webp",
            "nome": "B265"
          }
        ]
      }
    ]
  },
  "p6": {
    "titulo": "Camisetas",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Camisetas/Femininas/B0009 1.jpg",
            "nome": "B0009 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B004.. 1.jpg",
            "nome": "B004"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B004...., - Cópia.webp",
            "nome": "B004"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B005..., - Cópia.webp",
            "nome": "B005"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B005....... - Cópia.webp",
            "nome": "B005"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B005G 1.jpg",
            "nome": "B005G 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B006G - Cópia.webp",
            "nome": "B006G - Cópia"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B006G 1.jpg",
            "nome": "B006G 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B007 1.jpg",
            "nome": "B007 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B007G. 1.jpg",
            "nome": "B007G"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B009 1.jpg",
            "nome": "B009 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B009... - Cópia.webp",
            "nome": "B009"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B009.......... - Cópia.webp",
            "nome": "B009"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B010..... - Cópia.webp",
            "nome": "B010"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B010G 1.jpg",
            "nome": "B010G 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B011.. - Cópia.webp",
            "nome": "B011"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B05 1.jpg",
            "nome": "B05 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B09G-2 1.jpg",
            "nome": "B09G-2 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B263-2 1.jpg",
            "nome": "B263-2 1"
          },
          {
            "imagem": "catalogo/Camisetas/Femininas/B263G 1.jpg",
            "nome": "B263G 1"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Camisetas/Masculinos/B003 - Cópia.webp",
            "nome": "B003 - Cópia"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B003-2 1.jpg",
            "nome": "B003-2 1"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B003. 1.jpg",
            "nome": "B003"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B003., - Cópia.webp",
            "nome": "B003"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B003...... - Cópia.webp",
            "nome": "B003"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B003G - Cópia.webp",
            "nome": "B003G - Cópia"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B003G 1.jpg",
            "nome": "B003G 1"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B004G. - Cópia.webp",
            "nome": "B004G"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B008.. - Cópia.webp",
            "nome": "B008"
          },
          {
            "imagem": "catalogo/Camisetas/Masculinos/B08 1.jpg",
            "nome": "B08 1"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Camisetas/Unissex/B0009..... - Cópia.webp",
            "nome": "B0009"
          },
          {
            "imagem": "catalogo/Camisetas/Unissex/B006...., - Cópia.webp",
            "nome": "B006"
          },
          {
            "imagem": "catalogo/Camisetas/Unissex/B007...... - Cópia.webp",
            "nome": "B007"
          },
          {
            "imagem": "catalogo/Camisetas/Unissex/B008 - Cópia.webp",
            "nome": "B008 - Cópia"
          },
          {
            "imagem": "catalogo/Camisetas/Unissex/B011 1.jpg",
            "nome": "B011 1"
          },
          {
            "imagem": "catalogo/Camisetas/Unissex/B06 1.jpg",
            "nome": "B06 1"
          }
        ]
      }
    ]
  },
  "p2": {
    "titulo": "Conjuntos",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Conjuntos/Femininas/B100..... - Cópia.webp",
            "nome": "B100"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B118. - Cópia.webp",
            "nome": "B118"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B118.. - Cópia.webp",
            "nome": "B118"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B119 - Cópia.webp",
            "nome": "B119 - Cópia"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B120 - Cópia.webp",
            "nome": "B120 - Cópia"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B120.. - Cópia.webp",
            "nome": "B120"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B123 - Cópia.webp",
            "nome": "B123 - Cópia"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B124.. - Cópia.webp",
            "nome": "B124"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B124GG... - Cópia.webp",
            "nome": "B124GG"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B125G - Cópia.webp",
            "nome": "B125G - Cópia"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B210.. - Cópia.webp",
            "nome": "B210"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B210... - Cópia.webp",
            "nome": "B210"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B210..... - Cópia.webp",
            "nome": "B210"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B210.............. - Cópia.webp",
            "nome": "B210"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B263...... - Cópia.webp",
            "nome": "B263"
          },
          {
            "imagem": "catalogo/Conjuntos/Femininas/B268.... - Cópia.webp",
            "nome": "B268"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Conjuntos/Masculinos/B001...,-Editar.jpg",
            "nome": "B001"
          },
          {
            "imagem": "catalogo/Conjuntos/Masculinos/B102... - Cópia.webp",
            "nome": "B102"
          },
          {
            "imagem": "catalogo/Conjuntos/Masculinos/B122.... - Cópia.webp",
            "nome": "B122"
          },
          {
            "imagem": "catalogo/Conjuntos/Masculinos/B209.. - Cópia.webp",
            "nome": "B209"
          },
          {
            "imagem": "catalogo/Conjuntos/Masculinos/B266.. - Cópia.webp",
            "nome": "B266"
          },
          {
            "imagem": "catalogo/Conjuntos/Masculinos/B266....., - Cópia.webp",
            "nome": "B266"
          },
          {
            "imagem": "catalogo/Conjuntos/Masculinos/B269............., - Cópia.webp",
            "nome": "B269"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Conjuntos/Unissex/unissex.jpg",
            "nome": "unissex"
          }
        ]
      }
    ]
  },
  "p8": {
    "titulo": "Cuecas e Calcinhas",
    "subSessoes": [
      {
        "titulo": "Todos",
        "produtos": [
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B001, - Cópia.webp",
            "nome": "B001, - Cópia"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B001.. 1.jpg",
            "nome": "B001"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B001..., - Cópia.webp",
            "nome": "B001"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B002, - Cópia.webp",
            "nome": "B002, - Cópia"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B002-4 1.jpg",
            "nome": "B002-4 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B002.., - Cópia.webp",
            "nome": "B002"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B254 1.jpg",
            "nome": "B254 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B254, - Cópia.webp",
            "nome": "B254, - Cópia"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B254. - Cópia.webp",
            "nome": "B254"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B259 1.jpg",
            "nome": "B259 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B259. - Cópia.webp",
            "nome": "B259"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B259.... - Cópia.webp",
            "nome": "B259"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B259...... - Cópia.webp",
            "nome": "B259"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B259G 1.jpg",
            "nome": "B259G 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B259G.... - Cópia.webp",
            "nome": "B259G"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B260 - Cópia.webp",
            "nome": "B260 - Cópia"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B260 1.jpg",
            "nome": "B260 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B260.... - Cópia.webp",
            "nome": "B260"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B260G 1.jpg",
            "nome": "B260G 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B260G.. - Cópia.webp",
            "nome": "B260G"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B261-2 1.jpg",
            "nome": "B261-2 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B261., - Cópia.webp",
            "nome": "B261"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B261G 1.jpg",
            "nome": "B261G 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B267 1.jpg",
            "nome": "B267 1"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B267. - Cópia.webp",
            "nome": "B267"
          },
          {
            "imagem": "catalogo/Cuecas e Calcinhas/Todos/B267.... - Cópia.webp",
            "nome": "B267"
          }
        ]
      }
    ]
  },
  "p3": {
    "titulo": "KIT´s",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/KIT´s/Femininas/B202. - Cópia.webp",
            "nome": "B202"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B203.. - Cópia.webp",
            "nome": "B203"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B203...... - Cópia.webp",
            "nome": "B203"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B204..... - Cópia.webp",
            "nome": "B204"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B205 - Cópia.webp",
            "nome": "B205 - Cópia"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B205 1.jpg",
            "nome": "B205 1"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B207 1.jpg",
            "nome": "B207 1"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B207. - Cópia.webp",
            "nome": "B207"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B214 1.jpg",
            "nome": "B214 1"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B214.. - Cópia.webp",
            "nome": "B214"
          },
          {
            "imagem": "catalogo/KIT´s/Femininas/B214...... - Cópia.webp",
            "nome": "B214"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/KIT´s/Masculinos/B201. - Cópia.webp",
            "nome": "B201"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B201.. - Cópia.webp",
            "nome": "B201"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B204.. - Cópia.webp",
            "nome": "B204"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B206 1.jpg",
            "nome": "B206 1"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B206.. - Cópia.webp",
            "nome": "B206"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B208.... - Cópia.webp",
            "nome": "B208"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B211 - Cópia.webp",
            "nome": "B211 - Cópia"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B211 1.jpg",
            "nome": "B211 1"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B211. - Cópia.webp",
            "nome": "B211"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B212 1.jpg",
            "nome": "B212 1"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B212, - Cópia.webp",
            "nome": "B212, - Cópia"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B213.. - Cópia.webp",
            "nome": "B213"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B213..... - Cópia.webp",
            "nome": "B213"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B213....... - Cópia.webp",
            "nome": "B213"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B214G 1.jpg",
            "nome": "B214G 1"
          },
          {
            "imagem": "catalogo/KIT´s/Masculinos/B214G.. - Cópia.webp",
            "nome": "B214G"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/KIT´s/Unissex/B208 1.jpg",
            "nome": "B208 1"
          },
          {
            "imagem": "catalogo/KIT´s/Unissex/B208G - Cópia.webp",
            "nome": "B208G - Cópia"
          },
          {
            "imagem": "catalogo/KIT´s/Unissex/B208G 1.jpg",
            "nome": "B208G 1"
          },
          {
            "imagem": "catalogo/KIT´s/Unissex/B208G... - Cópia.webp",
            "nome": "B208G"
          }
        ]
      }
    ]
  },
  "p5": {
    "titulo": "Macacões",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Macacões/Femininas/B256 1.jpg",
            "nome": "B256 1"
          },
          {
            "imagem": "catalogo/Macacões/Femininas/B256.. - Cópia.webp",
            "nome": "B256"
          },
          {
            "imagem": "catalogo/Macacões/Femininas/B256.... - Cópia.webp",
            "nome": "B256"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Macacões/Masculinos/B256, - Cópia.webp",
            "nome": "B256, - Cópia"
          },
          {
            "imagem": "catalogo/Macacões/Masculinos/B256, 1.jpg",
            "nome": "B256, 1"
          },
          {
            "imagem": "catalogo/Macacões/Masculinos/B256,, - Cópia.webp",
            "nome": "B256,, - Cópia"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Macacões/Unissex/B256, 1.jpg",
            "nome": "B256, 1"
          }
        ]
      }
    ]
  },
  "p7": {
    "titulo": "Mijões e Shorts",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B050-2 1.jpg",
            "nome": "B050-2 1"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B050... - Cópia.webp",
            "nome": "B050"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B050G 1.jpg",
            "nome": "B050G 1"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B050G.. - Cópia.webp",
            "nome": "B050G"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B257, - Cópia.webp",
            "nome": "B257, - Cópia"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B257, 1.jpg",
            "nome": "B257, 1"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B257., - Cópia.webp",
            "nome": "B257"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B257.......... - Cópia.webp",
            "nome": "B257"
          },
          {
            "imagem": "catalogo/Mijões e Shorts/Femininas/B257G 1.jpg",
            "nome": "B257G 1"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Mijões e Shorts/Masculinos/B257 1.jpg",
            "nome": "B257 1"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Mijões e Shorts/Unissex/B257 1.jpg",
            "nome": "B257 1"
          }
        ]
      }
    ]
  },
  "p1": {
    "titulo": "Pijamas e BabyDolls",
    "subSessoes": [
      {
        "titulo": "Todos",
        "produtos": [
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B102 1.jpg",
            "nome": "B102 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B102G 1.jpg",
            "nome": "B102G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B103 1.jpg",
            "nome": "B103 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B104 1.jpg",
            "nome": "B104 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B104G 1.jpg",
            "nome": "B104G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B105 1.jpg",
            "nome": "B105 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B105G, 1.jpg",
            "nome": "B105G, 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B106 1.jpg",
            "nome": "B106 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B106G 1.jpg",
            "nome": "B106G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B107 1.jpg",
            "nome": "B107 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B107G 1.jpg",
            "nome": "B107G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B108 1.jpg",
            "nome": "B108 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B109 1.jpg",
            "nome": "B109 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B109G 1.jpg",
            "nome": "B109G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B110 1.jpg",
            "nome": "B110 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B111 1.jpg",
            "nome": "B111 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B111G 1.jpg",
            "nome": "B111G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B112 1.jpg",
            "nome": "B112 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B112G 1 (1).jpg",
            "nome": "B112G 1 (1)"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B112G 1.jpg",
            "nome": "B112G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B113 1.jpg",
            "nome": "B113 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B114 1.jpg",
            "nome": "B114 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B115 1.jpg",
            "nome": "B115 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B116 1.jpg",
            "nome": "B116 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B117 1.jpg",
            "nome": "B117 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B118 1.jpg",
            "nome": "B118 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B119 1.jpg",
            "nome": "B119 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B120 1.jpg",
            "nome": "B120 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B123 1.jpg",
            "nome": "B123 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B124 1.jpg",
            "nome": "B124 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B124GG 1.jpg",
            "nome": "B124GG 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B125G 1.jpg",
            "nome": "B125G 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B209 1.jpg",
            "nome": "B209 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B210 1.jpg",
            "nome": "B210 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B210-2 1.jpg",
            "nome": "B210-2 1"
          },
          {
            "imagem": "catalogo/Pijamas e BabyDolls/Todos/B266 1.jpg",
            "nome": "B266 1"
          }
        ]
      }
    ]
  },
  "p11": {
    "titulo": "Saida Maternidade",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Saida Maternidade/Femininas/feminino.png",
            "nome": "feminino"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Saida Maternidade/Masculinos/masculino.png",
            "nome": "masculino"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Saida Maternidade/Unissex/unissex.jpg",
            "nome": "unissex"
          }
        ]
      }
    ]
  },
  "p10": {
    "titulo": "Tanga Enxuta",
    "subSessoes": [
      {
        "titulo": "Femininas",
        "produtos": [
          {
            "imagem": "catalogo/Tanga Enxuta/Femininas/feminino.png",
            "nome": "feminino"
          }
        ]
      },
      {
        "titulo": "Masculinos",
        "produtos": [
          {
            "imagem": "catalogo/Tanga Enxuta/Masculinos/masculino.png",
            "nome": "masculino"
          }
        ]
      },
      {
        "titulo": "Unissex",
        "produtos": [
          {
            "imagem": "catalogo/Tanga Enxuta/Unissex/unissex.jpg",
            "nome": "unissex"
          }
        ]
      }
    ]
  },
  "p9": {
    "titulo": "Vestidos",
    "subSessoes": [
      {
        "titulo": "Todos",
        "produtos": [
          {
            "imagem": "catalogo/Vestidos/Todos/unissex.jpg",
            "nome": "unissex"
          }
        ]
      }
    ]
  }
};

// Iterando sobre as categorias do JSON
for (const categoria in database) {
  preencherSessao(categoria, database[categoria]);
}
