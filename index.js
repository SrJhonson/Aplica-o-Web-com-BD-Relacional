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
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        usuario: this.usuario,
                        senha: this.senha
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        this.mensagem = data;
                        if (data === 'Login realizado com sucesso!') {
                            this.usuario = '';
                            this.senha = '';
                            setTimeout(() => {
                                window.location.href = '/jogo/index.html';
                            }, 3000);
                        }
                    });
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
                fetch('/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        email: this.email,
                        senha: this.senha
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        this.mensagem = data;
                        if (data === 'Cadastro realizado com sucesso!') {
                            this.nome = '';
                            this.email = '';
                            this.senha = '';
                            this.confirmarSenha = '';
                        }
                    });
            } else {
                this.mensagem = 'Por favor, preencha todos os campos.';
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
