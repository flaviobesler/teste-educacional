const introducao = document.getElementById("introducao");
const botao = document.getElementById("botao");
const proxima = document.getElementById("proxima");
const test = document.querySelector(".teste");
const res1 = document.getElementById("res1");

res1.classList.add("fade-out");
test.classList.add("fade-out");

let pronto = false;

const perguntas = [
  {
    texto: "",
    opcoes: ["BOLA", "MESA", "CASA", "SAPATO"],
    correta: 2,
    peso: 2,
    critica: true,
    audio: "pergunta1.mp3"
  },
  {
    texto: "Qual é o GATO?",
    opcoes: ["🐶", "🐱", "🚗", "🍎"],
    correta: 1,
    peso: 1
  },
  {
    texto: "João foi ao mercado!",
    opcoes: ["João", "Maria", "Pedro", "Não sei"],
    correta: 0,
    peso: 2,
    audio: "pergunta3.mp3"
  },
  {
    texto: "Promoção válida até amanhã.",
    opcoes: ["hoje", "amanhã", "semana que vem", "não sei"],
    correta: 1,
    peso: 2,
    audio: "pergunta4.mp3"
  },
  {
    texto: "Quando você deve ir?",
    opcoes: ["Hoje", "Amanhã", "Qualquer dia", "Ontem"],
    correta: 1,
    peso: 2,
    audio: "pergunta5.mp3"
  }
];

let atual = 0;
let respostas = [];

function gerarPerguntas() {
  const p = perguntas[atual];
  const div1 = document.getElementById("option1");
  const div2 = document.getElementById("option2");
  const pergunta = document.getElementById("texto");
  const audio = document.getElementById("introducao");

  proxima.disabled = true;

  if (p.audio) {
    audio.src = p.audio;
    audio.currentTime = 0;
    audio.play();
  }

  while (div1.firstChild) div1.removeChild(div1.firstChild);
  while (div2.firstChild) div2.removeChild(div2.firstChild);

  pergunta.textContent = p.texto;

  p.opcoes.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.classList.add("opcoes");

    btn.onclick = () => {
      const todos = [...div1.children, ...div2.children];
      todos.forEach(b => b.classList.remove("selecionado"));

      btn.classList.add("selecionado");
      proxima.disabled = false;

      if (index === p.correta) {
        respostas[atual] = p.peso;
      } else {
        respostas[atual] = 0;

        if (p.critica) {
          mostrarResultado(niveis[0]);
          test.style.display = "none";
          return;
        }
      }
    };

    if (index < 2) {
      div1.append(btn);
    } else {
      div2.append(btn);
    }
  });
}

const niveis = [
  {
    nivel: 1,
    title: "Iniciante",
    texto: "Nível iniciante. Um botão vai aparecer para você continuar.",
    audio: "nivel1.mp3",
    redirecionar: "nivel_1/nivel1.html"
  },
  {
    nivel: 2,
    title: "Básico",
    texto: "Nível básico. Continue pelo botão abaixo.",
    audio: "nivel2.mp3",
    redirecionar: "nivel_2/nivel2.html"
  },
  {
    nivel: 3,
    title: "Elementar",
    texto: "Nível elementar. Use o botão para avançar.",
    audio: "nivel3.mp3",
    redirecionar: "nivel_3/nivel3.html"
  },
  {
    nivel: 4,
    title: "Intermediário",
    texto: "Nível intermediário. Continue pelo botão.",
    audio: "nivel4.mp3",
    redirecionar: "nivel_4/nivel4.html"
  },
  {
    nivel: 5,
    title: "Alfabetizado",
    texto: "Nível avançado. Escolha um nível abaixo.",
    audio: "nivel5.mp3"
  }
];

function definirNivel(pontos) {
  if (pontos <= 2) return niveis[0];
  if (pontos <= 4) return niveis[1];
  if (pontos <= 7) return niveis[2];
  if (pontos <= 9) return niveis[3];
  return niveis[4];
}

function mostrarResultado(nivel) {
  const title = document.getElementById("title1");
  const result = document.getElementById("resulte");
  const btn = document.getElementById("button");
  const levels = document.getElementById("levels");
  const audio = document.getElementById("introducao");

  res1.classList.remove("fade-out");
  res1.classList.add("fade-in");

  title.textContent = nivel.title;
  result.textContent = nivel.texto;

  audio.src = nivel.audio;
  audio.currentTime = 0;
  audio.play();

  if (nivel.redirecionar) {
    btn.style.display = "block";
    btn.textContent = "Continuar";
    btn.onclick = () => {
      window.location.href = nivel.redirecionar;
    };
  } else {
    btn.style.display = "none";
    levels.style.display = "flex";
  }
}

proxima.onclick = () => {
  if (respostas[atual] === undefined) return;

  atual++;

  if (atual >= perguntas.length) {
    const pontos = respostas.reduce((acc, n) => acc + n, 0);
    const nivelFinal = definirNivel(pontos);
    mostrarResultado(nivelFinal);
    test.style.display = "none";
    return;
  }

  gerarPerguntas();
};

botao.onclick = () => {
  introducao.play();

  if (!pronto) {
    botao.classList.add("fade-out");

    setTimeout(() => {
      botao.textContent = "iniciar";
      botao.classList.remove("fade-out");
      botao.classList.add("fade-in");
      pronto = true;
    }, 26000);
  } else {
    botao.classList.add("fade-out");

    test.classList.remove("fade-out");
    test.classList.add("fade-in");

    gerarPerguntas();
    botao.style.display = "none";
  }
};