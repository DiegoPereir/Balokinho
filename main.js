



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

    const fullscreenBackground = document.createElement('div');
    fullscreenBackground.classList.add('fullscreen-background');
    document.body.appendChild(fullscreenBackground);

    const fullscreenImg = document.createElement('img');
    fullscreenImg.src = imgSrc;
    fullscreenImg.classList.add('fullscreen-img');
    document.body.appendChild(fullscreenImg);

    document.body.style.overflow = 'hidden';

    const closeFullscreen = () => {
        fullscreenImg.remove();
        fullscreenBackground.remove();
        document.body.style.overflow = '';
    };

    fullscreenImg.addEventListener('click', closeFullscreen);
    fullscreenBackground.addEventListener('click', closeFullscreen);
}




  









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
document.addEventListener("DOMContentLoaded", function() {
    const catalogo = document.querySelector('.sub_sessao .catalogo');
    
    if (catalogo.scrollWidth > catalogo.clientWidth) {
        catalogo.style.cursor = "grab";
    } else {
        catalogo.style.cursor = "default";
    }
});

const isMobileDevice = () => window.innerWidth <= 768;
let isDragging = false;
let dragDistance = 0;

function setupDragForElement(element, isMenu = false) {
    let startX, startY;
    let initialScrollLeft;
    let velocity = 0;
    let lastX = 0;
    let isHorizontalDrag = false;

    const MAX_VELOCITY = 5;

    const animateMomentum = () => {
        if (Math.abs(velocity) > 0.5) {
            element.scrollLeft -= velocity;
            velocity *= 0.98;
            requestAnimationFrame(animateMomentum);
        }
    };

    const startDrag = (e) => {
        dragDistance = 0;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        initialScrollLeft = element.scrollLeft;
        element.style.cursor = 'grabbing';
        element.style.userSelect = 'none';
        document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', drag);
        document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', stopDragGlobal);
    };

    const drag = (e) => {
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        
        const dx = currentX - startX;
        const dy = currentY - startY;

        dragDistance += Math.abs(dx);

        if (!isDragging) {
            if (Math.abs(dy) > Math.abs(dx)) {
                stopDragGlobal();
                return;
            } else {
                isHorizontalDrag = true;
                isDragging = true;
                e.preventDefault();
            }
        }

        if (isHorizontalDrag) {
            element.scrollLeft = initialScrollLeft - dx;
            velocity = currentX - lastX;
            velocity = Math.min(Math.max(velocity, -MAX_VELOCITY), MAX_VELOCITY);
            lastX = currentX;
        }
    };

    const stopDragGlobal = () => {
        isHorizontalDrag = false;
        element.style.cursor = 'grab';
        element.style.userSelect = '';
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchend', stopDragGlobal);
        document.removeEventListener('mouseup', stopDragGlobal);
        animateMomentum();
        setTimeout(() => {
            isDragging = false;
        }, 100);
    };

    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDrag);
    element.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}

function setupMenuDrag() {
    const menuElement = document.querySelector('header nav .menu');
    setupDragForElement(menuElement, true);
}

function setupCatalogoDrag() {
    const catalogoElements = document.querySelectorAll('.sessao_catalogo .catalogo');
    catalogoElements.forEach(catalogoElement => {
        setupDragForElement(catalogoElement);
    });
}

document.addEventListener('click', (e) => {
    if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

setupMenuDrag();
setupCatalogoDrag();






//BARRA DE PESQUISA CATALOGO---------------------------------------------------------------------------------------------------------------------------
const searchInputElem = document.getElementById('searchInput');
const suggestionsElem = document.getElementById('suggestions');

const productItems = Array.from(document.querySelectorAll('.desc_produto h1')).map((h1, index) => ({
    name: h1.textContent.trim(),
    element: h1.closest('.conteudo_catalogo'),
    originalIndex: index
}));

let selectedIndexSearch = -1;
let sortTypeSearch = 'original';
let isSearchDragging = false; // Variável para rastrear o estado do drag

const updateSuggestionDisplaySearch = (found) => {
    suggestionsElem.style.display = found ? 'block' : 'none';
};

const updateOrderTextSearch = () => {
    switch (sortTypeSearch) {
        case 'asc':
            return "-Ordem A-Z-";
        case 'desc':
            return "-Ordem Z-A-";
        case 'original':
            return "-Mudar Ordem-";
    }
};

const createSuggestionDivSearch = (product) => {
    const div = document.createElement('div');
    div.textContent = product.name;
    div.addEventListener('click', () => {
        if (isSearchDragging) return; // Evitar cliques durante o drag

        const previouslySelected = document.querySelector('.simulated-hover');
        if (previouslySelected) {
            previouslySelected.classList.remove('simulated-hover');
        }
        product.element.classList.add('simulated-hover');
        product.element.scrollIntoView({ inline: 'center', behavior: 'smooth' });
        searchInputElem.value = product.name;
        updateSuggestionDisplaySearch(false);
    });
    return div;
};

const displaySuggestionsSearch = (query) => {
    suggestionsElem.innerHTML = '';

    const orderText = document.createElement('div');
    orderText.textContent = updateOrderTextSearch();
    orderText.style.fontWeight = "normal";
    orderText.style.color = "#B0B0B0";
    orderText.style.textAlign = "center";
    orderText.addEventListener('click', (e) => {
        if (isSearchDragging) return; // Evitar cliques durante o drag

        switch (sortTypeSearch) {
            case 'asc':
                sortTypeSearch = 'desc';
                break;
            case 'desc':
                sortTypeSearch = 'original';
                break;
            case 'original':
                sortTypeSearch = 'asc';
                break;
        }
        displaySuggestionsSearch(searchInputElem.value.toLowerCase());
        e.stopPropagation();
    });
    suggestionsElem.appendChild(orderText);

    let foundProducts = productItems.filter(product => product.name.toLowerCase().includes(query));
    
    switch (sortTypeSearch) {
        case 'asc':
            foundProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'desc':
            foundProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'original':
            foundProducts.sort((a, b) => a.originalIndex - b.originalIndex);
            break;
    }

    foundProducts.forEach(product => suggestionsElem.appendChild(createSuggestionDivSearch(product)));
    updateSuggestionDisplaySearch(foundProducts.length > 0);
};

const handleArrowNavigationSearch = (event, items) => {
    if (event.key === 'ArrowDown' && selectedIndexSearch < items.length - 1) {
        selectedIndexSearch++;
    } else if (event.key === 'ArrowUp' && selectedIndexSearch > 0) {
        selectedIndexSearch--;
    }
    Array.from(items).forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndexSearch);
    });
    if (selectedIndexSearch >= 0) {
        items[selectedIndexSearch].scrollIntoView({ block: 'nearest' });
    }
};

searchInputElem.addEventListener('input', (e) => {
    displaySuggestionsSearch(e.target.value.toLowerCase());
    selectedIndexSearch = -1;
});

searchInputElem.addEventListener('focus', (e) => {
    displaySuggestionsSearch(e.target.value.toLowerCase());
});

searchInputElem.addEventListener('keydown', (event) => {
    const items = suggestionsElem.children;
    handleArrowNavigationSearch(event, items);
    if (event.key === 'Enter') {
        if (selectedIndexSearch >= 0) {
            items[selectedIndexSearch].click();
        } else if (items.length > 0) {
            items[0].click();
        }
    }
});

const handleDocumentClickSearch = (event) => {
    if (!searchInputElem.contains(event.target) && !suggestionsElem.contains(event.target)) {
        if (event.type === 'touchend' && suggestionsElem.contains(event.target)) {
            return;
        }
        updateSuggestionDisplaySearch(false);
        const activeProduct = document.querySelector('.simulated-hover');
        if (activeProduct) {
            activeProduct.classList.remove('simulated-hover');
        }
    }
};

document.addEventListener('click', handleDocumentClickSearch);
document.addEventListener('touchend', handleDocumentClickSearch);

// Função para permitir arrastar com o mouse
function setupDragForSuggestionsSearch(element) {
    let isSuggestionsSearchDragging = false;
    let startDragY, initialSuggestionsScrollTop;

    const beginDragSearch = (e) => {
        isSearchDragging = true; // Iniciar o drag
        startDragY = e.clientY;
        initialSuggestionsScrollTop = element.scrollTop;
        document.addEventListener('mousemove', performDragSearch);
        document.addEventListener('mouseup', endDragSearch);
    };

    const performDragSearch = (e) => {
        if (!isSearchDragging) return;
        const deltaY = e.clientY - startDragY;
        element.scrollTop = initialSuggestionsScrollTop - deltaY;
        e.preventDefault();
    };

    const endDragSearch = () => {
        isSearchDragging = false; // Finalizar o drag
        document.removeEventListener('mousemove', performDragSearch);
        document.removeEventListener('mouseup', endDragSearch);
    };

    element.addEventListener('mousedown', beginDragSearch);
}

// Chame a função para o elemento suggestions
setupDragForSuggestionsSearch(suggestionsElem);
