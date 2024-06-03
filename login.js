
const login = {
    template: `
    <div class="componente">
        <h1> Login </h1>
        <input type="text" placeholder="Nome" v-model="nome">
        <input type="password" placeholder="Senha" v-model="senha">
        <button class= "logar" @click="fazerLogin"> login </button>
    </div>
    `,
    data() {
        return {
            nome: '',
            senha: ''
        }
    },
    methods: {
        async fazerLogin() {
            try {
                const response = await fetch('https://aplica-o-web-com-bd-relacional.onrender.com/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        senha: this.senha
                    })
                });
        
                if (response.status === 200) {
                    alert('Login bem-sucedido.');
                    window.open('index.html','_blank');
                } else {
                    alert('Credenciais inválidas.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao fazer login.');
            }
        }
    }
}

const singin = {
    template: `
    <div class="componente1">
        <h1> Cadastre-se </h1>
        <input type="text" placeholder="Nome" v-model="nome">
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Senha" v-model="senha">
        <button class="logar" @click="criarConta"> criar conta </button>
    </div>
    `,
    data() {
        return {
            nome: '',
            email: '',
            senha: ''
        }
    },
    methods: {
        async criarConta() {
            try {
                const response = await fetch('https://aplica-o-web-com-bd-relacional.onrender.com/atualizarUsuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        email: this.email,
                        senha: this.senha
                    })
                });
                if (response.ok) {
                    alert('Conta criada com sucesso.');
                } else {
                    alert('Erro ao criar conta.');
                }
            } catch (error) {
                console.error('Erro ao criar conta:', error);
                alert('Erro ao criar conta.');
            }
        }
    }
}

const { createApp } = Vue;
createApp({
    data() {
        return {
            componenteAtual: "login",
            buttonText: "Criar uma conta",
            buttonTextPrefix: "Bem-vindo! Novo por aqui?"
        }
    },
    methods: {
        alterarComponentes() {
            this.componenteAtual = (this.componenteAtual === "login") ? "singin" : "login";
            this.buttonText = (this.componenteAtual === "login") ? "Criar uma conta" : "Fazer login";
            this.buttonTextPrefix = (this.componenteAtual === "login") ? "Bem-vindo! Novo por aqui?" : "Bem-vindo de volta! ";
        }
    },
    components: {
        login,
        singin
    }
}).mount('#app')