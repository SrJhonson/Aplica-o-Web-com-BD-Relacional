const Login = {
    data() {
        return {
            usuario: '',
            senha: '',
            mensagem: '' 
        }
    },
    template: `
        <div class="componente">
            <h1>Realizar Login</h1>
            <p>Usuário: <input v-model="usuario"></p>
            <p>Senha: <input type="password" v-model="senha"></p>
            <button @click="fazerLogin">Fazer Login</button>
            <p>{{ mensagem }}</p>
        </div>
    `,
    methods: {
        fazerLogin() {
            if (this.usuario && this.senha) {
                // Atualiza a mensagem
                this.mensagem = 'Login realizado com sucesso!';
                // Limpa os campos
                this.usuario = '';
                this.senha = '';
                // Redireciona para a página index na pasta jogo após 3 segundos
                setTimeout(() => {
                    window.location.href = '/jogo/index.html';
                }, 500);
            } else {
                this.mensagem = 'Por favor, preencha todos os campos.';
            }
        }
    }
}

const Cadastro = {
    data() {
        return {
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        }
    },
    template: `
        <div class="componente">
            <h1>Realizar Cadastro</h1>
            <p>Nome: <input v-model="nome"></p>
            <p>E-mail:<input type="email" v-model="email"></p>
            <p>Senha: <input type="password" v-model="senha"></p>
            <p>Confirmar Senha: <input type="password" v-model="confirmarSenha"></p>
            <button @click="fazerCadastro">Fazer Cadastro</button>
        </div>
    `,
    methods: {
        fazerCadastro() {
            if (this.nome && this.email && this.senha && this.confirmarSenha) {
                alert('Cadastro criado com sucesso!');
                this.nome = '';
                this.email = '';
                this.senha = '';
                this.confirmarSenha = '';
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        }
    }
}



const { createApp } = Vue;

createApp({
    data() {
        return {
            componenteAtual: "Login",
            textoBotao: "Criar uma conta"
        }
    },
    methods: {
        alterarComponentes() {
            if (this.componenteAtual === "Login") {
                this.componenteAtual = "Cadastro";
                this.textoBotao = "Realizar login";
            } else {
                this.componenteAtual = "Login";
                this.textoBotao = "Criar uma conta";
            }
        }
    },
    components: {
        Login,
        Cadastro
    }
}).mount("#app")
