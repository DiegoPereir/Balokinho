
// Exemplos para teste
const words = ["produtoA", "ProdutoB", "ProdutoC", "ProdutoD", "ProdutoE", "produtoF", "ProdutoG", "ProdutoH", "ProdutoI", "ProdutoJ"];
const imgProduto = [
    "banners/imagem1.png",
    "banners/imagem2.png",
    "banners/imagem3.png",
    "banners/imagem4.png",
    "banners/imagem5.png",
    "banners/imagem6.png",
    "banners/imagem7.png",
    "banners/imagem8.png",
    "banners/imagem9.png",
    "banners/imagem10.png",
    "banners/imagem11.png",
    "banners/imagem12.png",
    "banners/imagem13.png",
    "banners/imagem14.png",
    "banners/imagem15.png",
    "banners/imagem16.png",
    "banners/imagem17.png",
    "banners/imagem18.png",
    // ... adicione mais URLs conforme necessário
];

const h1Elements = document.querySelectorAll('.desc_produto h1');
const imgElements = document.querySelectorAll('.imagem_produto');

h1Elements.forEach(h1 => {
    const randomWordIndex = Math.floor(Math.random() * words.length);
    h1.textContent = words[randomWordIndex];
});

imgElements.forEach(img => {
    const randomImgIndex = Math.floor(Math.random() * imgProduto.length);
    img.src = imgProduto[randomImgIndex];
});


// MENU HAMBURGUER------------------------------------------------------------------------------------------------------------------------------------
var ul = document.querySelector('nav ul');

function menuShow() {
    ul.classList.toggle('open');
}


//BANNER HOME--------------------------------------------------------------------------------------------------------------------------
const images = [
  'url("banners/imagem1.png")',
  'url("banners/imagem2.png")',
  'url("banners/imagem16.png")'
];

let currentImageIndex = 0;

function rotateBackgroundImage() {
  const section = document.querySelector('#home');
  section.style.backgroundImage = images[currentImageIndex];
  currentImageIndex = (currentImageIndex + 1) % images.length; // Isso fará com que volte ao início após a última imagem
}
setInterval(rotateBackgroundImage, 5000); // Muda a imagem a cada 5 segundos


// FULLSCREM IMAGEM--------------------------------------------------------------------------------------------------------------------------------
function fullscreen(element) {
  const imgSrc = element.querySelector('.imagem_produto').src;

  // Cria um elemento de fundo
  const fullscreenBackground = document.createElement('div');
  fullscreenBackground.classList.add('fullscreen-background');
  document.body.appendChild(fullscreenBackground);

  // Cria um elemento de imagem para exibir em tela cheia
  const fullscreenImg = document.createElement('img');
  fullscreenImg.src = imgSrc;
  fullscreenImg.classList.add('fullscreen-img');
  document.body.appendChild(fullscreenImg);

  // Função para remover a imagem e o fundo
  const closeFullscreen = () => {
      fullscreenImg.remove();
      fullscreenBackground.remove();
  };

  // Adiciona eventos para fechar a imagem e o fundo
  fullscreenImg.addEventListener('click', closeFullscreen);
  fullscreenBackground.addEventListener('click', closeFullscreen);
}



  


// MUDAR COR DOS TITULOS DE SESSÕES NA PAGINA DE CATALOGO---------------------------------------------------------------------------------------------
function updateBackground() {
  const subSessoes = document.querySelectorAll('.sub_sessao');

  subSessoes.forEach(subSessao => {
    const h1Element = subSessao.querySelector('h1');
    const conteudoTitulo = subSessao.querySelector('.conteudo_titulo');

    let corDeFundo;
    let corTitulo;

    if (h1Element) {
      switch (h1Element.textContent.trim()) {
        case 'Masculinas':
          // corDeFundo = '#ffffff';
          corTitulo = '#4E9AE6'; // Azul
          break;
        case 'Femininas':
          // corDeFundo = '#ffffff';
          corTitulo = '#FF5275'; // Rosa escuro
          break;
        case 'Unissex':
          // corDeFundo = '#ffffff';
          corTitulo = '#FFB347'; // Amarelo profundo
          break;
        default:
          // corDeFundo = '#ffffff'; // Cor padrão para conteúdo não especificado
          corTitulo = '#FFB347'; // Cor padrão para título não especificado (preto)
      }

      const conteudosCatalogo = subSessao.querySelectorAll('.conteudo_catalogo');
      conteudosCatalogo.forEach(conteudoCatalogo => {
        conteudoCatalogo.style.backgroundColor = corDeFundo;
      });

      if (conteudoTitulo) {
        h1Element.style.color = corTitulo; // Aplica a cor ao texto do título
        conteudoTitulo.style.backgroundColor = corDeFundo; // Aplica a cor de fundo ao título
      }
    }
  });
}

window.onload = function() {
  updateBackground();
};






//FECHAR MENU APOS HREF CLICADO------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  // Iterar sobre todos os links com a classe "home"
  document.querySelectorAll('.home').forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      
      // Verificar se o link é interno (começa com "#")
      if (targetId.startsWith('#')) {
        event.preventDefault();
        const target = document.querySelector(targetId);
        
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 90,
            behavior: 'smooth'
          });
          menuShow();
          
          // Ativar ou desativar o checkbox com base no seu estado atual
          const checkbox = document.getElementById('checkbox-menu');
          checkbox.checked = !checkbox.checked; // Inverter o estado do checkbox
        }
      }
    });
  });
});


//BOTÃO SUBIR PAGE------------------------------------------------------------------------------------------------------------------------------------
function toggleSubirPageButtonVisibility() {
  const botao = document.querySelector('.subirPage');
  botao.style.opacity = window.scrollY >= 100 ? '1' : '0';
  botao.style.cursor = window.scrollY > 0 ? 'pointer' : 'default'; // Tornar o cursor apropriado
}

function subirPage() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

// Adiciona ouvinte de rolagem para controlar a visibilidade do botão de subir página
window.addEventListener('scroll', toggleSubirPageButtonVisibility);
toggleSubirPageButtonVisibility();


//GRAP AND DROP MENU E CATALOGO -------------------------------------------------------------------------------------------------------------------------
const isMobileDevice = () => window.innerWidth <= 768;

function setupDragForElement(element, isMenu = false) {
    let isDragging = false;
    let startX;
    let initialScrollLeft;
    let velocity = 0;
    let lastX = 0;

    const animateMomentum = () => {
        if (Math.abs(velocity) > 0.5) {
            element.scrollLeft -= velocity;
            velocity *= 0.98;
            requestAnimationFrame(animateMomentum);
        }
    };

    const startDrag = (e) => {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        initialScrollLeft = element.scrollLeft;
        element.style.cursor = 'grabbing';
        document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', drag);
        document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', stopDragGlobal);
    };

    const drag = (e) => {
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const dx = currentX - startX;
        element.scrollLeft = initialScrollLeft - dx;
        velocity = currentX - lastX;
        lastX = currentX;
    };

    const stopDragGlobal = () => {
        isDragging = false;
        element.style.cursor = 'grab';
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchend', stopDragGlobal);
        document.removeEventListener('mouseup', stopDragGlobal);
        animateMomentum();
    };

    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDrag);
    element.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    if (isMenu) {
        element.addEventListener('click', (e) => {
            if (isDragging && e.target.tagName === 'A') {
                e.preventDefault();
            }
        });
    }
}

function setupMenuDrag() {
    const menuElement = document.querySelector('header nav .menu');
    setupDragForElement(menuElement, true);
    menuElement.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}

function setupCatalogoDrag() {
    const catalogoElements = document.querySelectorAll('.sessao_catalogo .catalogo');
    catalogoElements.forEach(catalogoElement => {
        setupDragForElement(catalogoElement);
        const conteudoCatalogoElements = catalogoElement.querySelectorAll('.conteudo_catalogo');
        conteudoCatalogoElements.forEach(element => {
            ['touchstart', 'touchend'].forEach(eventType => {
                element.addEventListener(eventType, () => {
                    if (isMobileDevice()) {
                        element.classList.remove('hover-effect');
                    }
                });
            });
        });
    });
}

setupMenuDrag();
setupCatalogoDrag();



//BARRA DE PESQUISA CATALOGO---------------------------------------------------------------------------------------------------------------------------
const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

const products = Array.from(document.querySelectorAll('.desc_produto h1')).map(h1 => ({
    name: h1.textContent.trim(),
    element: h1.closest('.conteudo_catalogo')
}));

let selectedIndex = -1;

const updateSuggestionDisplay = (found) => {
    suggestions.style.display = found ? 'block' : 'none';
};

const createSuggestionDiv = (product) => {
    const div = document.createElement('div');
    div.textContent = product.name;
    div.addEventListener('click', () => {
        // Remova a classe 'simulated-hover' de qualquer produto anteriormente selecionado
        const previouslySelected = document.querySelector('.simulated-hover');
        if (previouslySelected) {
            previouslySelected.classList.remove('simulated-hover');
        }

        // Adicione a classe 'simulated-hover' ao .conteudo_catalogo do produto clicado
        product.element.classList.add('simulated-hover');

        // Scroll lateral para tornar o produto visível
        product.element.scrollIntoView({ inline: 'center', behavior: 'smooth' });

        searchInput.value = product.name;
        updateSuggestionDisplay(false); // Fechar a barra de sugestões
    });
    return div;
};

const displaySuggestions = (query) => {
    suggestions.innerHTML = '';

    // Adicionando o texto "por ordem alfabética"
    const orderText = document.createElement('div');
    orderText.textContent = "-POR ORDEM ALFABETICA-";
    orderText.style.fontWeight = "normal";
    orderText.style.color = "#B0B0B0";
    orderText.style.textAlign = "center";
    suggestions.appendChild(orderText);

    const foundProducts = products.filter(product => product.name.toLowerCase().includes(query));
    foundProducts.forEach(product => suggestions.appendChild(createSuggestionDiv(product)));
    updateSuggestionDisplay(foundProducts.length > 0);
};

const handleArrowNavigation = (event, items) => {
    if (event.key === 'ArrowDown' && selectedIndex < items.length - 1) {
        selectedIndex++;
    } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
        selectedIndex--;
    }
    Array.from(items).forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
    if (selectedIndex >= 0) {
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
};

searchInput.addEventListener('input', (e) => {
    displaySuggestions(e.target.value.toLowerCase());
    selectedIndex = -1;
});

searchInput.addEventListener('focus', (e) => {
    displaySuggestions(e.target.value.toLowerCase());
});

searchInput.addEventListener('keydown', (event) => {
    const items = suggestions.children;
    handleArrowNavigation(event, items);
    if (event.key === 'Enter') {
        if (selectedIndex >= 0) {
            items[selectedIndex].click();
        } else if (items.length > 0) {
            items[0].click();
        }
    }
});

const handleDocumentClick = (event) => {
    if (!searchInput.contains(event.target) && !suggestions.contains(event.target)) {
        if (event.type === 'touchend' && suggestions.contains(event.target)) {
            return; // Se o toque ocorreu dentro da área de sugestões, não feche a caixa de sugestões
        }

        updateSuggestionDisplay(false);

        // Remova a classe 'simulated-hover' de qualquer produto
        const activeProduct = document.querySelector('.simulated-hover');
        if (activeProduct) {
            activeProduct.classList.remove('simulated-hover');
        }
    }
};

document.addEventListener('click', handleDocumentClick);
document.addEventListener('touchend', handleDocumentClick);
