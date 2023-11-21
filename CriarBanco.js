const fs = require('fs');
const path = require('path');

const pastaDeImagens = path.join(__dirname, 'catalogo');
console.log('Pasta de Imagens:', pastaDeImagens);

const database = {};
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
            database[chaveCategoria].subSessoes.push(subsecao);
            lerArquivosDeSubcategoria(path.join(caminhoCategoria, nomeSubsecao), subsecao);
        }
    });
}

function lerPastaPrincipal(pasta) {
    fs.readdirSync(pasta, { withFileTypes: true }).forEach(categoria => {
        if (categoria.isDirectory()) {
            const chaveCategoria = mapeamentoCategorias[categoria.name] || categoria.name;
            database[chaveCategoria] = {
                titulo: categoria.name,
                subSessoes: []
            };
            lerSubpastasDeCategoria(path.join(pasta, categoria.name), chaveCategoria);
        }
    });
}

lerPastaPrincipal(pastaDeImagens);

setTimeout(() => {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(database, null, 2));
    console.log('O arquivo database.json foi criado com sucesso.');
}, 1000);
