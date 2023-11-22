const fs = require('fs');
const path = require('path');

const pastaDeImagens = path.join(__dirname, 'catalogo');
console.log('Pasta de Imagens:', pastaDeImagens);

// Database para o primeiro script
const database = {
    produtos: []
};

// Database para o segundo script
const indexDatabase = {};
const mapeamentoCategorias = {
    "Pijamas e BabyDolls": "p1",
    "Conjuntos": "p2",
    "KIT´s": "p3",
    "Bodies": "p4",
    "Macacões": "p5",
    "Camisetas": "p6",
    "Mijões e Shorts": "p7",
    "Cuecas e Calcinhas": "p8",
    "Vestidos": "p9",
    "Tanga Enxuta": "p10",
    "Saida Maternidade": "p11",
    "Acessorios": "p12",
    "Bonés e Chapéu": "p13"
};

// Funções do primeiro script
function lerArquivosDaPasta(pasta) {
    fs.readdirSync(pasta, { withFileTypes: true }).forEach(arquivo => {
        if (arquivo.isFile()) {
            const caminhoRelativo = path.relative(__dirname, path.join(pasta, arquivo.name)).replace(/\\/g, '/');
            console.log('Caminho Relativo:', caminhoRelativo);
            database.produtos.push({
                imagem: caminhoRelativo,
                nome: arquivo.name.split('.')[0]
            });
        }
    });
}

// Funções do segundo script
function lerArquivosDeSubcategoria(caminhoSubcategoria, subsecao) {
    fs.readdirSync(caminhoSubcategoria, { withFileTypes: true }).forEach(arquivo => {
        if (arquivo.isFile()) {
            const caminhoRelativo = 'catalogo/' + path.relative(pastaDeImagens, path.join(caminhoSubcategoria, arquivo.name)).replace(/\\/g, '/');
            console.log('Caminho Relativo:', caminhoRelativo);
            subsecao.produtos.push({
                imagem: caminhoRelativo,
                nome: arquivo.name.split('.')[0]
            });
        }
    });
}

function lerSubpastasDeCategoria(caminhoCategoria, chaveCategoria) {
    fs.readdirSync(caminhoCategoria, { withFileTypes: true }).forEach(subpasta => {
        if (subpasta.isDirectory()) {
            const nomeSubsecao = subpasta.name;
            const subsecao = {
                titulo: nomeSubsecao,
                produtos: []
            };
            indexDatabase[chaveCategoria].subSessoes.push(subsecao);
            lerArquivosDeSubcategoria(path.join(caminhoCategoria, nomeSubsecao), subsecao);
        }
    });
}

function lerPastaPrincipal(pasta) {
    fs.readdirSync(pasta, { withFileTypes: true }).forEach(categoria => {
        if (categoria.isDirectory()) {
            const chaveCategoria = mapeamentoCategorias[categoria.name] || categoria.name;
            indexDatabase[chaveCategoria] = {
                titulo: categoria.name,
                subSessoes: []
            };
            lerSubpastasDeCategoria(path.join(pasta, categoria.name), chaveCategoria);
        }
    });
}

// Executando as funções do primeiro script
lerArquivosDaPasta(path.join(pastaDeImagens, 'Nossos Produtos'));

// Executando as funções do segundo script
lerPastaPrincipal(pastaDeImagens);

// Salvando os resultados em arquivos JSON separados
setTimeout(() => {
    fs.writeFileSync(path.join(__dirname, 'IndexDatabase.json'), JSON.stringify(database, null, 2));
    console.log('O arquivo database.json foi criado com sucesso.');

    fs.writeFileSync(path.join(__dirname, 'CatalogoDatabase.json'), JSON.stringify(indexDatabase, null, 2));
    console.log('O arquivo indexdatabase.json foi criado com sucesso.');
}, 1000);
