//MENU HAMBURGUER
var ul = document.querySelector('nav ul');
function menuShow() {
    ul.classList.toggle('open');
}

//FECHAR NAVBAR APOS CLICAR EM HREF
document.addEventListener('DOMContentLoaded'), function () {
    document.querySelectorAll('.home').forEach(link => {
      link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
          event.preventDefault();
          const target = document.querySelector(targetId);
          if (target) {
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - 90,
              behavior: 'smooth'
            });
            menuShow();
            const checkbox = document.getElementById('checkbox-menu');
            checkbox.checked = !checkbox.checked;
          }
        }
      });
    });
  };
  
  
//IMAGEM EM FULLSCREEN
function fullscreen(element) {
    const imgSrc = element.querySelector('.imagem_produto').src;
    const fullscreenImg = document.createElement('img');
    fullscreenImg.src = imgSrc;
    fullscreenImg.classList.add('fullscreen-img');
    document.body.appendChild(fullscreenImg);
    fullscreenImg.addEventListener('click', function() {
        fullscreenImg.remove();
    });
  }

  //FUNDO PRODUTOS
  function updateBackground() {
    const subSessoes = document.querySelectorAll('.sub_sessao');
    subSessoes.forEach(subSessao => {
      const h1Element = subSessao.querySelector('h1');
      const conteudoTitulo = subSessao.querySelector('.conteudo_titulo');
      let corDeFundo, corTitulo;
  
      switch (h1Element.textContent.trim()) {
        case 'Masculinas:':
          corDeFundo = '#F4E7FF';
          corTitulo = '#0000FF';
          break;
        case 'Femininas:':
          corDeFundo = '#F4E7FF';
          corTitulo = '#D81B60';
          break;
        case 'Unissex:':
          corDeFundo = '#F4E7FF';
          corTitulo = '#FFA000';
          break;
        default:
          corDeFundo = '#F4E7FF';
          corTitulo = '#000000';
      }
  
      const conteudosCatalogo = subSessao.querySelectorAll('.conteudo_catalogo');
      conteudosCatalogo.forEach(conteudoCatalogo => {
        conteudoCatalogo.style.backgroundColor = corDeFundo;
      });
  
      if (conteudoTitulo) {
        h1Element.style.color = corTitulo;
        conteudoTitulo.style.backgroundColor = corDeFundo;
      }
    });
  }
  
  window.onload = function() {
    updateBackground();
  };
  
  //BOTÃO SUBIRPAGE
  window.addEventListener('scroll', function() {
    var botao = document.querySelector('.subirPage');
    if (window.scrollY >= 100) {
        botao.style.opacity = '1';
    } else {
        botao.style.opacity = '0';
    }
  });
  
  function subirPage() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  