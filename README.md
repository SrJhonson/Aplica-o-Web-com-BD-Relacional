# Jogo Heroi-Vilão com Banco de Dados

# 🎮 Descrição
O Jogo Herói e Vilão é uma aplicação web que simula uma batalha entre um herói e um vilão. Os usuários podem interagir escolhendo ações para os personagens, como atacar, defender, usar poção e correr. A cada ação realizada, o estado dos personagens é atualizado e exibido na interface do usuário.
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">


# Índice 
* [Descrição do Jogo](#-descrição)
* [Características do Jogo](#-características-do-jogo)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Funcionalidades](#%EF%B8%8F-funcionalidades)
* [Orientação de Utilização](#%EF%B8%8Forientação-de-utilização)
* [Interface](#interface)
* [Como Jogar](#%EF%B8%8Fcomo-jogar)
* [Licença](#licença)


   
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# 👩‍💻 Características do Jogo 
- Batalha entre um herói e um vilão.
- Interface interativa que permite aos usuários escolherem ações para os personagens.
- Atualização em tempo real do estado dos personagens.
- Histórico de ações realizadas durante a partida.
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# 💻 Tecnologias Utilizadas 
- Frontend: Vue.js
- Backend: Node.js com Express
- Banco de Dados: Microsoft SQL Server
- Hospedagem: Render (Backend) e Netlify (Frontend)

- Frontend:
    - Vue.js - Framework JavaScript para a construção de interfaces de usuário interativas.
    - HTML5 e CSS3 - Para a estrutura e estilização da interface do usuário.
    - Fetch API - Usado para fazer requisições HTTP para o backend e interagir com os recursos do servidor de forma assíncrona.
- Backend:
    - Node.js - Ambiente de execução JavaScript do lado do servidor.
    - Express.js - Framework web utilizado para criar e gerenciar rotas HTTP, além de fornecer middleware para habilitar funcionalidades como CORS e parse de JSON.
    - MSSQL -  Usado como driver para se conectar e interagir com o banco de dados SQL Server.
- Banco de Dados:
  - Microsoft SQL Server (Azure): Banco de dados relacional hospedado no Microsoft Azure para armazenar dados dos jogadores, personagens e histórico do jogo.
- Hospedagem:
    - Render (Backend): Utilizado para hospedar o servidor backend, fornecendo uma infraestrutura escalável e confiável para executar sua aplicação Node.js.
[Link Render ospedado ](https://aplica-o-web-com-bd-relacional.onrender.com)
    - Netlify (Frontend): Utilizado para hospedar o frontend, fornecendo uma maneira simples e eficiente de distribuir sua aplicação estática HTML, CSS e JavaScript.
[Link Netlify ospedado ](https://aplicacaoweb-bdrelacional.netlify.app/) 
 
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">


# 🖥️ Funcionalidades
- Login e Cadastro: Os jogadores podem se cadastrar e fazer login para acessar o jogo.
- Batalha: Durante a batalha, os jogadores podem realizar diferentes ações, como atacar, defender, usar poções de cura e correr.
- Atualização de Vida: Após cada ação, a vida do herói e do vilão é atualizada no banco de dados.
- Histórico de Ações: Todas as ações realizadas durante a partida são registradas em um histórico e armazenadas no banco de dados.
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# 🗒️Orientação de Utilização

### 🚀 Pré-requisitos

- Node.js instalado na máquina local.
- Banco de dados Microsoft SQL Server configurado e acessível.
    
<h3> ⚙️  Instalação de Dependências </h3>
1. Clone o Repositório: Faça uma cópia do repositório para o seu ambiente local.

      git clone https://github.com/ellendias01/Prova-Marcio.git
2. Navegue até o Diretório do Projeto: Acesse o diretório do projeto recém-clonado.

       cd Prova-Marcio
3. Instale as Dependências do Frontend: Navegue até o diretório do frontend e instale as dependências.

       cd frontend
       npm install
4. Instale as Dependências do Backend: Navegue até o diretório do backend e instale as dependências.

       cd ../backend
       npm install

    
<h3> 📊 Configuração do Banco de Dados </h3>
Configure o Banco de Dados MSSQL: No arquivo config.js no diretório backend, configure as credenciais do banco de dados.

```javascript
const config = {
user: "seu_usuario",
password: 'sua_senha',
server: "seu_servidor",
database: "nome_do_banco_de_dados",
options: {
encrypt: true // Dependendo da configuração do seu servidor SQL Server
}
};
```
<h3> 🧑‍💻 Execução do Projeto </h3>
1. Inicie o Servidor Backend: Execute o servidor backend.
   
        node server.js
2. Inicie o Servidor Frontend: Execute o servidor frontend.

       npm run serve
  
3. Acesse o Jogo: Abra o navegador e acesse http://localhost:8080 para iniciar o jogo.

<h3> 🎮 Uso </h3>

- Na interface do jogo, escolha as ações disponíveis para o herói e o vilão.
- Observe a atualização em tempo real da vida dos personagens e o histórico de ações realizadas.
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# 🎴Interface

### Tela inicial - tela de Login 
| Tela   | Imagem                                                                                                  |
|--------|---------------------------------------------------------------------------------------------------------|
| Login  | <img src="https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/fbe06507-d3cf-4d66-87e2-5fd5cc548aa1" alt="login" width="700">  |
| Sing In| <img src="https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/f4ee9507-93a6-4120-9bb0-36cbe8c54ed0" alt="singin" width="700"> |

### Tela do jogo 
![tela principal](https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/8cfa7ca0-4e63-45be-99df-d811681238ae)
| Personagem | Herói | Vilão |
|------------|-------|-------|
| Imagem     | ![Herói](https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/926e975c-d415-4aaa-9bab-64ca79565c8a) | ![Vilão](https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/0a294c13-4e62-437a-afcf-a82a8dab8d2a) |

### Tela Dashboard 
| Tela                               | Imagem                                                                                                   |
|------------------------------------|----------------------------------------------------------------------------------------------------------|
| Tela sem informação                | ![Tela sem informação](https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/88eb63b9-7612-49b4-8a4e-cfcf53c88e31) |
| Tela com informação                | ![Tela com informação](https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/7ced0b0e-a5de-4c6b-86f6-878fcbcecd16) |


### Video do Site funcionando 



https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/assets/101840801/08bcf635-9e1c-4fd6-876e-25df7eac2b2b


<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# 🕹️Como Jogar

1. Abra o navegador e acesse o endereço [Jogo Heroi Vilão](https://aplicacaoweb-bdrelacional.netlify.app/) para iniciar o jogo.
2. Faça login com suas credenciais ou crie uma nova conta.
3. Interaja com o jogo clicando nos botões disponíveis para atacar, defender, usar poção ou correr.
4. Observe o status dos personagens e o histórico de ações para acompanhar o progresso do jogo.
5. Divirta-se!

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Licença
Este projeto é distribuído sob a Licença MIT. Consulte o arquivo [LICENSE](https://github.com/SrJhonson/Aplica-o-Web-com-BD-Relacional/blob/main/LICENSE) para obter mais detalhes.
