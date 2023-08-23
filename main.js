//menu hamburguer

var ul = document.querySelector('nav ul');

function menuShow() {
    ul.classList.toggle('open');
}



//rolagem horizontal


const setasEsquerda = document.querySelectorAll('.seta-esquerda');
const setasDireita = document.querySelectorAll('.seta-direita');

setasEsquerda.forEach(setaEsquerda => {
  setaEsquerda.addEventListener('click', () => {
    const catalogo = setaEsquerda.closest('.sub_sessao').querySelector('.catalogo');
    const larguraItem = catalogo.firstElementChild.offsetWidth;

    catalogo.scrollBy({
      left: -larguraItem,
      behavior: 'smooth'
    });
  });
});

setasDireita.forEach(setaDireita => {
  setaDireita.addEventListener('click', () => {
    const catalogo = setaDireita.closest('.sub_sessao').querySelector('.catalogo');
    const larguraItem = catalogo.firstElementChild.offsetWidth;

    catalogo.scrollBy({
      left: larguraItem,
      behavior: 'smooth'
    });
  });
});





//deixar imagem catalogo em fullscreen
function fullscreen(element) {
  const imgSrc = element.querySelector('.imagem_produto').src;
  
  // Cria um elemento de imagem para exibir em tela cheia
  const fullscreenImg = document.createElement('img');
  fullscreenImg.src = imgSrc;
  fullscreenImg.classList.add('fullscreen-img');
  
  // Adiciona o elemento de imagem ao body
  document.body.appendChild(fullscreenImg);
  
  // Adiciona um evento para fechar a imagem em tela cheia quando clicada
  fullscreenImg.addEventListener('click', function() {
      fullscreenImg.remove();
  });
}

  


// Mudar cor de fundo dos elementos do catálogo
function updateBackground() {
  const subSessoes = document.querySelectorAll('.sub_sessao');

  subSessoes.forEach(subSessao => {
    const h1Element = subSessao.querySelector('h1');
    const conteudoTitulo = subSessao.querySelector('.conteudo_titulo');

    let corDeFundo;
    let corTitulo;

    if (h1Element) {
      switch (h1Element.textContent.trim()) {
        case 'Masculinas:':
          corDeFundo = '#f1f1f1';
          corTitulo = '#0000FF'; // Azul
          break;
        case 'Femininas:':
          corDeFundo = '#f1f1f1';
          corTitulo = '#D81B60'; // Rosa escuro
          break;
        case 'Unissex:':
          corDeFundo = '#f1f1f1';
          corTitulo = '#FFA000'; // Amarelo profundo
          break;
        default:
          corDeFundo = '#f1f1f1'; // Cor padrão para conteúdo não especificado
          corTitulo = '#000000'; // Cor padrão para título não especificado (preto)
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






//Fechar menu navbar apos clicar em algum href



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





window.addEventListener('scroll', function() {
  var botao = document.querySelector('.subirPage');
  if (window.scrollY >= 100) {
      botao.style.opacity = '1';
  } else {
      botao.style.opacity = '0';
  }
});


//Botão Subir Pagina
function subirPage() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


// Função para verificar a posição de rolagem e controlar a visibilidade do link
function verificarPosicaoRolagem() {
  const linkTopo = document.querySelector('.subirPage');
  
  if (window.scrollY > 0) {
      linkTopo.style.display = 'block'; // Tornar o link visível se a rolagem não estiver no topo
      linkTopo.style.cursor = 'pointer'; // Tornar o cursor como "mãozinha" quando o botão estiver visível
  } else {
      linkTopo.style.display = 'none'; // Tornar o link invisível se a rolagem estiver no topo
      linkTopo.style.cursor = 'default'; // Tornar o cursor padrão quando o botão estiver no topo e não visível
  }
}

// Ouvinte de rolagem para chamar a função ao rolar a página
window.addEventListener('scroll', verificarPosicaoRolagem);

// Chamar a função inicialmente para definir o estado inicial
verificarPosicaoRolagem();





//arrastar catalogo e menu
function setupMenuDrag() {
  const menuElement = document.querySelector('header nav .menu');
  let isDraggingMenu = false;
  let startXMenu;
  let initialScrollLeftMenu;
  let velocity = 0;
  let lastX = 0;

  function animateMomentum() {
      if (Math.abs(velocity) > 0.5) {
          menuElement.scrollLeft -= velocity; // Invertendo a direção aqui
          velocity *= 0.92; // Fator de atrito
          requestAnimationFrame(animateMomentum);
      }
  }

  function startDrag(e) {
      isDraggingMenu = true;
      startXMenu = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      initialScrollLeftMenu = menuElement.scrollLeft;
      menuElement.style.cursor = 'grabbing';
      document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', dragMenu);
      document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', stopDragMenuGlobal);
      document.addEventListener('mouseleave', stopDragMenuGlobal);
  }

  function dragMenu(e) {
      if (!isDraggingMenu) return;

      // Se chegarmos aqui, o usuário está realmente arrastando, então podemos impedir o comportamento padrão dos links
      if (e.target.tagName === 'A') {
          e.preventDefault();
      }

      const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const dx = currentX - startXMenu;
      menuElement.scrollLeft = initialScrollLeftMenu - dx;
      velocity = currentX - lastX;
      lastX = currentX;
  }

  function stopDragMenuGlobal() {
      if (isDraggingMenu) {
          isDraggingMenu = false;
          menuElement.style.cursor = 'grab';
          document.removeEventListener('touchmove', dragMenu);
          document.removeEventListener('mousemove', dragMenu);
          document.removeEventListener('touchend', stopDragMenuGlobal);
          document.removeEventListener('mouseup', stopDragMenuGlobal);
          document.removeEventListener('mouseleave', stopDragMenuGlobal);
          animateMomentum();
      }
  }

  // Impedir o comportamento padrão de arrastar e soltar para links
  menuElement.addEventListener('dragstart', function(e) {
      if (e.target.tagName === 'A') {
          e.preventDefault();
      }
  });

  // Impedir o clique enquanto estiver arrastando
  menuElement.addEventListener('click', function(e) {
      if (isDraggingMenu && e.target.tagName === 'A') {
          e.preventDefault();
      }
  });

  menuElement.addEventListener('mousedown', startDrag);
  menuElement.addEventListener('touchstart', startDrag);
}

// Inicializando as funcionalidades de arrasto
setupMenuDrag();
setupCatalogoDrag();
function setupCatalogoDrag() {
  const catalogoElements = document.querySelectorAll('.sessao_catalogo .catalogo');

  catalogoElements.forEach(catalogoElement => {
      let isDraggingCatalogo = false;
      let startXCatalogo;
      let initialScrollLeftCatalogo;
      let velocity = 0;
      let lastX = 0;

      function animateMomentum() {
          if (Math.abs(velocity) > 0.5) {
              catalogoElement.scrollLeft -= velocity; // Invertendo a direção aqui
              velocity *= 0.92; // Fator de atrito
              requestAnimationFrame(animateMomentum);
          }
      }

      function startDrag(e) {
          isDraggingCatalogo = true;
          startXCatalogo = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
          initialScrollLeftCatalogo = catalogoElement.scrollLeft;
          catalogoElement.style.cursor = 'grabbing';
          document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', dragCatalogo);
          document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', stopDragCatalogoGlobal);
      }

      function dragCatalogo(e) {
          const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
          const dx = currentX - startXCatalogo;
          catalogoElement.scrollLeft = initialScrollLeftCatalogo - dx;
          velocity = currentX - lastX;
          lastX = currentX;
      }

      function stopDragCatalogoGlobal() {
          isDraggingCatalogo = false;
          catalogoElement.style.cursor = 'grab';
          document.removeEventListener('touchmove', dragCatalogo);
          document.removeEventListener('mousemove', dragCatalogo);
          document.removeEventListener('touchend', stopDragCatalogoGlobal);
          document.removeEventListener('mouseup', stopDragCatalogoGlobal);
          animateMomentum();
      }

      catalogoElement.addEventListener('mousedown', startDrag);
      catalogoElement.addEventListener('touchstart', startDrag);
  });
}



//barra de pesquisa
const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

const products = Array.from(document.querySelectorAll('.desc_produto h1')).map(h1 => {
    return {
        name: h1.textContent.trim(),
        element: h1.closest('.conteudo_catalogo')
    };
});

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    suggestions.innerHTML = '';
    let found = false;

    for (const product of products) {
        if (product.name.toLowerCase().includes(query)) {
            found = true;
            const div = document.createElement('div');
            div.textContent = product.name;
            div.addEventListener('click', function() {
              const productTop = product.element.getBoundingClientRect().top;
              
              product.element.scrollIntoView({ behavior: 'smooth' });
          
              setTimeout(() => {
                  if (productTop > 0) { // Se o produto estiver abaixo da posição atual
                      window.scrollBy(0, -50);
                  } else { // Se o produto estiver acima da posição atual
                      window.scrollBy(0, 70);
                  }
                  suggestions.style.display = 'none';
              }, 500);
          });
          
            suggestions.appendChild(div);
        }
    }

    suggestions.style.display = found ? 'block' : 'none';
});

searchInput.addEventListener('click', function() {
    if (window.innerWidth <= 590 && this.style.width === '40px') {
        this.style.width = '100%';
        this.style.background = 'none';
        this.style.paddingLeft = '10px';
        this.style.textIndent = '0px';
        this.focus();
    }
});

const lupa = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>`;
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 590 && event.target !== searchInput && !searchInput.contains(event.target)) {
        searchInput.style.width = '40px';
        searchInput.style.background = `url('${lupa}') no-repeat center center`;
        searchInput.style.backgroundSize = '20px';
        searchInput.style.paddingLeft = '40px';
        searchInput.style.textIndent = '-9999px';
    }
});
