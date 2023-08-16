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






  
//tela cheia catalogo
function fullscreen(element) {
    element.classList.toggle('fullscreen');
}


//mudar cor de fundo dos elementos do catalogo
function updateBackground() {
  const subSessoes = document.querySelectorAll('.sub_sessao');

  subSessoes.forEach(subSessao => {
    const h1Element = subSessao.querySelector('h1');
    const conteudoTitulo = subSessao.querySelector('.conteudo_titulo');

    if (h1Element) {
      const conteudosCatalogo = subSessao.querySelectorAll('.conteudo_catalogo');
      const corDeFundo = h1Element.textContent.trim() === 'Masculinas:' ? 'rgba(206, 234, 240, 1)' :
                         h1Element.textContent.trim() === 'Unissex:' ? 'rgba(239, 221, 168, 1)' : 
                         h1Element.textContent.trim() === 'Femininas:' ? 'rgba(250, 225, 224, 1)' :
                         'rgba(239, 221, 168, 1)'; // Cor padrão para conteúdo não especificado

      conteudosCatalogo.forEach(conteudoCatalogo => {
        conteudoCatalogo.style.backgroundColor = corDeFundo;
      });

      if (conteudoTitulo) {
        conteudoTitulo.style.backgroundColor = corDeFundo;
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
  } else {
    linkTopo.style.display = 'none'; // Tornar o link invisível se a rolagem estiver no topo
  }
}

// Ouvinte de rolagem para chamar a função ao rolar a página
window.addEventListener('scroll', verificarPosicaoRolagem);

// Chamar a função inicialmente para definir o estado inicial
verificarPosicaoRolagem();





function setupMenuDrag() {
  const menuElement = document.querySelector('header nav .menu');
  let isDraggingMenu = false;
  let startXMenu;
  let initialScrollLeftMenu;

  function startDrag(e) {
      isDraggingMenu = true;
      startXMenu = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      initialScrollLeftMenu = menuElement.scrollLeft;
      menuElement.style.cursor = 'grabbing';
      document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', dragMenu);
      document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', stopDragMenuGlobal);
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
  }

  function stopDragMenuGlobal() {
      if (isDraggingMenu) {
          isDraggingMenu = false;
          menuElement.style.cursor = 'grab';
          document.removeEventListener('touchmove', dragMenu);
          document.removeEventListener('mousemove', dragMenu);
          document.removeEventListener('touchend', stopDragMenuGlobal);
          document.removeEventListener('mouseup', stopDragMenuGlobal);
      }
  }

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

      function startDrag(e) {
          isDraggingCatalogo = true;
          startXCatalogo = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
          initialScrollLeftCatalogo = catalogoElement.scrollLeft;
          catalogoElement.style.cursor = 'grabbing';
          document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', dragCatalogo);
          document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', stopDragCatalogoGlobal);
      }

      function dragCatalogo(e) {
          if (isDraggingCatalogo) {
              const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
              const dx = currentX - startXCatalogo;
              catalogoElement.scrollLeft = initialScrollLeftCatalogo - dx;
          }
      }

      function stopDragCatalogoGlobal() {
          if (isDraggingCatalogo) {
              isDraggingCatalogo = false;
              catalogoElement.style.cursor = 'grab';
              document.removeEventListener('touchmove', dragCatalogo);
              document.removeEventListener('mousemove', dragCatalogo);
              document.removeEventListener('touchend', stopDragCatalogoGlobal);
              document.removeEventListener('mouseup', stopDragCatalogoGlobal);
          }
      }

      catalogoElement.addEventListener('mousedown', startDrag);
      catalogoElement.addEventListener('touchstart', startDrag);
  });
}

// Inicializando as funcionalidades de arrasto
setupMenuDrag();
setupCatalogoDrag();
