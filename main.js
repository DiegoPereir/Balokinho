var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menuHamburguer');

function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }
}


//rolagem horizontal


var servicesList = document.querySelector('.services_list');
var seta_esquerda = document.getElementById('seta_esquerda');
var seta_direita = document.getElementById('seta_direita');
var scrollAmount = 200; // quantos pixels para rolar

// Função para verificar se o elemento de rolagem atingiu o fim
function isScrollEnd(el) {
    // A posição de rolagem mais a largura do contêiner é igual ou maior do que a largura do conteúdo
    return el.scrollLeft + el.offsetWidth >= el.scrollWidth;
}

// Função para verificar se o elemento de rolagem atingiu o início
function isScrollStart(el) {
    // A posição de rolagem é 0
    return el.scrollLeft === 0;
}

// Função para mover um elemento para o fim da lista
function moveToEnd(el) {
    // Remover o elemento do início da lista
    el.parentNode.removeChild(el);
    // Adicionar o elemento ao fim da lista
    servicesList.appendChild(el);
}

// Função para mover um elemento para o início da lista
function moveToStart(el) {
    // Remover o elemento do fim da lista
    el.parentNode.removeChild(el);
    // Adicionar o elemento ao início da lista
    servicesList.insertBefore(el, servicesList.firstChild);
}

// Adicionar eventListeners para os botões
seta_esquerda.addEventListener('click', function() {
    servicesList.scrollLeft -= scrollAmount;
    if (isScrollStart(servicesList)) {
        // Mover o último elemento para o início da lista
        moveToStart(servicesList.lastElementChild);
        // Resetar a posição de rolagem
        servicesList.scrollLeft = scrollAmount;
    }
});

seta_direita.addEventListener('click', function() {
    servicesList.scrollLeft += scrollAmount;
    if (isScrollEnd(servicesList)) {
        // Mover o primeiro elemento para o fim da lista
        moveToEnd(servicesList.firstElementChild);
        // Resetar a posição de rolagem
        servicesList.scrollLeft -= scrollAmount;
    }
});



document.getElementById('scrollLeft').addEventListener('click', function() {
  document.querySelector('.services_list').scrollBy({
    left: -200, // Ajuste a quantidade de rolagem aqui
    behavior: 'smooth'
  });
});

document.getElementById('scrollRight').addEventListener('click', function() {
  document.querySelector('.services_list').scrollBy({
    left: 200, // Ajuste a quantidade de rolagem aqui
    behavior: 'smooth'
  });
});

