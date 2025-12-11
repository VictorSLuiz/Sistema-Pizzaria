from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Libera o acesso para o Front-end

# Configuração do Banco de Dados
# Atenção: Em produção, nunca deixamos senhas no código assim! 
# Usamos variáveis de ambiente. Mas para aula, faremos assim.
db_config = {
    'user': 'root',       # Usuário padrão do XAMPP
    'password': '12345',       # Senha padrão do XAMPP (geralmente vazia)
    'host': 'localhost',
    'database': 'pizzaria_delivery',
}

# Função auxiliar para conectar ao banco
def get_db_connection():
    return mysql.connector.connect(**db_config)

# Rota 1: Página Inicial (Só para testar se o servidor está on)
@app.route('/')
def index():
    return "<h1>API da Pizzaria está Rodando! 🍕</h1>"

# Rota 2: Listar o Cardápio (O Garçom entregando o menu)
@app.route('/cardapio', methods=['GET'])
def get_cardapio():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True) # dictionary=True traz os dados organizados
        
        # Vamos buscar tudo da tabela produtos
        cursor.execute('SELECT * FROM produtos')
        produtos = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        # Retorna os dados em formato JSON (A língua universal da web)
        return jsonify(produtos)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == '__main__':
    # debug=True faz o servidor reiniciar sozinho quando você salva o arquivo
    app.run(debug=True)