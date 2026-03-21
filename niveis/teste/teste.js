console.log("js carregado");

// elementos
const btnIniciar = document.querySelector("#iniciar button");
const divIniciar = document.getElementById("iniciar");

const btnTeste = document.querySelector("#teste button");
const divTeste = document.getElementById("teste");

const quizDiv = document.getElementById("quiz");
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");

const audio = document.getElementById("instrucao");

// perguntas
const perguntas = [
  {
    texto: "Toque na palavra CASA",
    opcoes: ["CASA", "MESA", "BOLA", "SAPATO"],
    correta: 0,
    peso: 2,
    critica: true
  },
  {
    texto: "Qual é GATO?",
    opcoes: ["🐶", "🐱", "🚗", "🍎"],
    correta: 1,
    peso: 1
  },
  {
    texto: "Quem foi ao mercado?",
    opcoes: ["João", "Maria", "Pedro", "Não sei"],
    correta: 0,
    peso: 1
  },
  {
    texto: "Até quando vale a promoção?",
    opcoes: ["Hoje", "Amanhã", "Semana que vem", "Não sei"],
    correta: 1,
    peso: 2
  },
  {
    texto: "Quando você deve ir?",
    opcoes: ["Hoje", "Amanhã às 8h", "Qualquer dia", "Não sei"],
    correta: 1,
    peso: 2
  }
];

let atual = 0;
let pontuacao = 0;

// clique instruções
btnIniciar.addEventListener("click", () => {
  divIniciar.classList.add("sumir");

  setTimeout(() => {
    divIniciar.style.display = "none";
    divTeste.style.display = "block";
  }, 500);

  audio.play().catch(() => {
    console.log("Autoplay bloqueado");
  });
});

// clique começar teste
btnTeste.addEventListener("click", () => {
  divTeste.style.display = "none";
  quizDiv.style.display = "block";

  carregarPergunta();
});

// carregar pergunta
function carregarPergunta() {
  const p = perguntas[atual];

  perguntaEl.innerText = p.texto;
  opcoesEl.innerHTML = "";

  p.opcoes.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.innerText = opcao;

    btn.onclick = () => responder(index);

    opcoesEl.appendChild(btn);
  });
}

// responder
function responder(index) {
  const p = perguntas[atual];

  // filtro crítico
  if (p.critica && index !== p.correta) {
    finalizar("Nível inicial (analfabeto)");
    return;
  }

  if (index === p.correta) {
    pontuacao += p.peso;
  }

  atual++;

  if (atual < perguntas.length) {
    carregarPergunta();
  } else {
    calcularNivel();
  }
}

// calcular nível
function calcularNivel() {
  let nivel = "";

  if (pontuacao <= 1) {
    nivel = "Nível inicial";
  } else if (pontuacao == 2) {
    nivel = "Rudimentar";
  } else if (pontuacao <= 5) {
    nivel = "Funcional limitado";
  } else {
    nivel = "Funcional";
  }

  finalizar(nivel);
}

// resultado
function finalizar(nivel) {
  document.body.innerHTML = `
    <h1>${nivel}</h1>
    <p>Você acertou ${pontuacao} pontos</p>
  `;
}