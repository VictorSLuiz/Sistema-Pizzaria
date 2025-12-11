let carrinho = [];

// Espera a página carregar totalmente para rodar o código
document.addEventListener('DOMContentLoaded', () => {
    carregarCardapio();
});

// Função Assíncrona: Porque buscar dados na internet demora uns milissegundos
async function carregarCardapio() {
    const container = document.getElementById('lista-produtos');

    try {
        // 1. O Fetch vai bater lá no seu Python (http://127.0.0.1:5000/cardapio)
        const resposta = await fetch('http://127.0.0.1:5000/cardapio');
        
        // 2. Transforma a resposta em JSON (o texto que você viu no navegador)
        const produtos = await resposta.json();

        // Limpa a mensagem de "Carregando..."
        container.innerHTML = '';

        // 3. Para cada pizza que veio do Python, cria um cartão na tela
        produtos.forEach(produto => {
            
            // Cria o HTML do cartão usando Template String (essas crases ``)
            const cardHTML = `
                <div class="card-pizza">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <p class="preco">R$ ${produto.preco}</p>
                    <button onclick="adicionarAoCarrinho('${produto.nome}', '${produto.preco}')">Adicionar ao Carrinho</button>
                </div>
            `;

            // Adiciona esse HTML dentro da nossa div principal
            container.innerHTML += cardHTML;
        });

    } catch (erro) {
        console.error('Erro ao buscar cardápio:', erro);
        container.innerHTML = '<p style="color:red">Erro ao carregar o cardápio. O servidor está ligado?</p>';
    }
}

function adicionarAoCarrinho(nomePizza, precoPizza) {
    const novoItem = {
        nome : nomePizza,
        preco : precoPizza
    };

    carrinho.push(novoItem);

    console.log(`Adicionado: ${nomePizza} - R$ ${precoPizza}`);
    console.log(carrinho); // Mostra a lista completa crescendo
}
