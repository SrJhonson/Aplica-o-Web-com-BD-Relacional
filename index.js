import { createApp } from 'vue';

const API_URL = 'http://localhost:3000';

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            aux: 1,
            mensagemAcao: '',
            historico: [],
            acao: ''
        }

    },
    computed: {
        heroiVidaClasse() {
            return {
                'vida-vermelha': this.heroi.vida <= 25,
                'vida-amarela': this.heroi.vida > 25 && this.heroi.vida <= 50,
                'vida-verde': this.heroi.vida > 50
            }
        },
        vilaoVidaClasse() {
            return {
                'vida-vermelha': this.vilao.vida <= 25,
                'vida-amarela': this.vilao.vida > 25 && this.vilao.vida <= 50,
                'vida-verde': this.vilao.vida > 50
            }
        }
    },
    methods: {
        atacar(isHeroi) {
            let acao = isHeroi ? "Herói atacou" : "Vilão atacou";
            if (isHeroi) {
                this.vilao.vida = this.vilao.vida > 5 ? this.vilao.vida - 10 : 0;
                this.historico.push("Herói atacou. Vida do vilão: " + this.vilao.vida);
                this.acao = "Herói atacou";
                console.log("Herói atacou");
                this.acaoVilao();
                this.aux = 1;
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);

            } else {
                this.mensagemAcao = "Vilão atacou";
                this.historico.push("Vilão atacou. Vida do herói: " + this.heroi.vida);
                this.historico.acao = "Vilão atacou";
                console.log("Vilão atacou");
                this.heroi.vida = this.heroi.vida > 5 ? this.heroi.vida - 10 : 0;
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
            this.adicionarHistorico(acao);
            this.verificarVida();
        },
        async atualizarVidaNoBancoDeDados(vidaHeroi, vidaVilao) {
            try {
                const response = await fetch(`${API_URL}/atualizarVida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ vidaHeroi, vidaVilao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar a vida no banco de dados.');
                }
                console.log('Vida do herói e do vilão atualizada com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        defender(isHeroi) {
            let acao = isHeroi ? "Herói defendeu" : "Vilão defendeu";
            if (isHeroi) {
                console.log("Herói defendeu");
                this.acaoVilao();
                this.historico.push("Herói defendeu.");
                this.acao = "Herói defendeu";
            } else {
                this.mensagemAcao = "Vilão defendeu";
                console.log("Vilão defendeu");
                this.aux = 1;
                this.historico.push("Vilão defendeu.");
                this.acao = "Vilão defendeu";
            }
            this.adicionarHistorico(acao);
            this.verificarVida();
        },
        usarPocao(isHeroi) {
            let acao = isHeroi ? "Herói usou poção" : "Vilão usou poção";
            if (isHeroi) {
                this.acao = "Herói usou poção";
                console.log("Herói usou poção");
                this.heroi.vida = this.heroi.vida < 95 ? this.heroi.vida + 5 : 100;
                this.aux = 1;
                this.acaoVilao();
                this.historico.push("Herói usou poção. Vida do herói: " + this.heroi.vida);
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
            } else {
                this.mensagemAcao = "Vilão usou poção";
                this.acao = "Vilão usou poção";
                console.log("Vilão usou poção");
                this.vilao.vida = this.vilao.vida < 95 ? this.vilao.vida + 5 : 100;
                this.historico.push("Vilão usou poção. Vida do vilão: " + this.vilao.vida);
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
            this.adicionarHistorico(acao);
            this.verificarVida();
        },
        critico(isHeroi) {
            // Ataque crítico que causa o dobro do dano do ataque normal
            let acao = isHeroi ? "Herói deu Critico" : "Vilão deu Critico";
            if (isHeroi) {
                this.vilao.vida = this.vilao.vida > 10 ? this.vilao.vida - 20 : 0;
                this.historico.push("Herói deu Critico. Vida do vilão: " + this.vilao.vida);
                this.acao = "Herói deu Critico";
                console.log("Herói deu Critico");
                this.acaoVilao();
                this.aux = 1;
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
                // Adiciona uma chance de 1/3 do vilão revidar
                if (Math.random() < 1 / 3) {
                    this.historico.push("Vilão deu Critico. Vida do vilão: " + this.heroi.vida);
                    this.acao = "Vilão deu Critico";
                    console.log("Vilão deu Critico");
                    this.heroi.vida -= 30;
                    this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
                }
            }
            this.adicionarHistorico(acao);
            this.verificarVida();
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'critico'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
            this.verificarVida();
            this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
        },
        verificarVida() {
            // Se a vida de qual quer um chegar a 0 cria-se um pop-up alertando o vencedor!!
            if (this.heroi.vida <= 0) {
                alert("Vilão Ganhou!! CONQUISTAMOS A LUAAA!!!!!");
                this.recomecar();
                this.limparLogs();
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            } else if (this.vilao.vida <= 0) {
                alert("Herói Ganhou!! O BEM SEMPRE IRÁ VENCER!!!!!");
                this.recomecar();
                this.limparLogs();
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
        },
        recomecar() {
            //Após o Alert o jogo recomeça com a vida 100% de ambos
            this.heroi.vida = 100;
            this.vilao.vida = 100;
            this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
        },
        async adicionarHistorico(acao) {
            try {
                //let acao = this.acao;
                const response = await fetch(`${API_URL}/adicionarHistorico`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ acao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o historico no banco de dados.');
                }
                console.log('Historico atualizados com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar o historico no banco de dados:', error);
            }
        }
    }
}).mount("#app");