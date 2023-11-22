// Estrutura de dados atualizada
const database = {
    "produtos": [
      {
        "imagem": "catalogo/Nossos Produtos/B100..... - Cópia.webp",
        "nome": "B100"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B118. - Cópia.webp",
        "nome": "B118"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B118.. - Cópia.webp",
        "nome": "B118"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B119 - Cópia.webp",
        "nome": "B119 - Cópia"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B120 - Cópia.webp",
        "nome": "B120 - Cópia"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B120.. - Cópia.webp",
        "nome": "B120"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B123 - Cópia.webp",
        "nome": "B123 - Cópia"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B124.. - Cópia.webp",
        "nome": "B124"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B125G - Cópia.webp",
        "nome": "B125G - Cópia"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B210.. - Cópia.webp",
        "nome": "B210"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B210... - Cópia.webp",
        "nome": "B210"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B210..... - Cópia.webp",
        "nome": "B210"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B210.............. - Cópia.webp",
        "nome": "B210"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B263...... - Cópia.webp",
        "nome": "B263"
      },
      {
        "imagem": "catalogo/Nossos Produtos/B268.... - Cópia.webp",
        "nome": "B268"
      }
    ]
  };
  
  function preencherSessao() {
      const divCatalogo = document.querySelector('.sessao_catalogo .catalogo');
      if (!divCatalogo) return;
  
      // Limpa o conteúdo existente
      divCatalogo.innerHTML = '';
  
      database.produtos.forEach(produto => {
          const divProduto = document.createElement('div');
          divProduto.className = "conteudo_catalogo";
  
          const divImagem = document.createElement('div');
          divImagem.className = "produto_content";
          divImagem.setAttribute("onclick", "fullscreen(this)");
  
          const imgProduto = document.createElement('img');
          imgProduto.className = "imagem_produto";
          imgProduto.src = produto.imagem;
          imgProduto.alt = produto.nome;
          divImagem.appendChild(imgProduto);
          divProduto.appendChild(divImagem);
  
          const divDesc = document.createElement('div');
          divDesc.className = "desc_produto";
          const h1Nome = document.createElement('h1');
          h1Nome.textContent = produto.nome;
          divDesc.appendChild(h1Nome);
          divProduto.appendChild(divDesc);
  
          divCatalogo.appendChild(divProduto);
      });
  }
  
  // Executa a função para preencher a sessão de produtos
  preencherSessao();
  