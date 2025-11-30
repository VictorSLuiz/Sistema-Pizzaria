CREATE DATABASE ID NOT EXISTS pizzaria_delivery;
USE pizzaria_delivery;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50),
    imagem_url VARCHAR(255)
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_nome VARCHAR(100) NOT NULL,
    cliente_telefone VARCHAR(20) NOT NULL,
    cliente_endereco TEXT NOT NULL,
    data_pedido DATATIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'Recebido'
);

CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    quantidade INT ,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

INSERT INTO produtos (nome, descricao, preco, categoria) VALUES
('CALABRESA', 'Mussarela, calabresa e cebola', 45.00, 'Pizza Salgada'),
('MARGUERITA', 'Mussarela, tomate e manjericão', 40.00, 'Pizza Salgada'),
('Coca-Cola 2L', 'Refrigerante gelado', 12.00, 'Bebida');
