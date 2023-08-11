//menu hamburguer

var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menuHamburguer');

function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    } else {
        ul.classList.add('open');
    }
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

//rolagem horizontal do menu catalogo
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');

setaEsquerda.addEventListener('click', () => {
  const menu = document.querySelector('.menu');
  menu.scrollBy({
    left: -150,
    behavior: 'smooth'
  });
});

setaDireita.addEventListener('click', () => {
  const menu = document.querySelector('.menu');
  menu.scrollBy({
    left: 150,
    behavior: 'smooth'
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





document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.home').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = link.getAttribute('href'); // Usar o href como ID do alvo
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 90,
          behavior: 'smooth'
        });
        menuShow();
      }
    });
  });
});



function subirPage() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

