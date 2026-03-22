const introducao = document.getElementById("introducao");
const botao =  document.getElementById("botao");
const proxima = document.getElementById('proxima');
const test = document.querySelector('.teste');

test.classList.add('fade-out');



let pronto = false;

const perguntas = [
  {
    texto: '',
    opcoes:['BOLA', 'MESA', 'CASA', 'SAPATO'],
    correta: 2,
    peso:2,
    critica: true,
    audio:'pergunta1.mp3'
  },
  {
    texto: 'Qual é o GATO?',
    opcoes:['🐶','🐱', '🚗', '🍎'],
    correta: 1,
    peso:1
  },
  {
    texto:'João foi ao mercado!',
    opcoes: ['Jõao', 'Maria', 'Pedro','Não sei'],
    correta:0,
    peso:2,
    audio:'pergunta3.mp3'
  },
  {
    texto:'Promoção válida até amanhã.',
    opcoes: ['hoje', 'amanha', 'semana que vem', 'não sei'],
    correta: 1,
    peso:2,
    audio:'pergunta4.mp3'
  },
  {
    texto: "Quando você deve ir?",
    opcoes: ["Hoje", "Amanhã", "Qualquer dia", "ontem"],
    correta: 1,
    peso: 2,
    audio:'pergunta5.mp3'
  }
];

let atual = 0;
let pontuacao = 0;
let respostas = [];

function gerarPerguntas(){
  const p = perguntas[atual];
  const div1 = document.getElementById('option1');
  const div2 = document.getElementById('option2');
  const pergunta = document.getElementById("texto");
  const audio = document.getElementById("introducao");

  // troca o áudio
  audio.src = p.audio;

  // reinicia e toca
  audio.currentTime = 0;
  audio.play()
  
  while (div1.firstChild) div1.removeChild(div1.firstChild);
  while (div2.firstChild) div2.removeChild(div2.firstChild);

  pergunta.textContent = p.texto;
  p.opcoes.forEach((opcao, index)=>{
    
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.classList.add('opcoes');


    btn.addEventListener('click',() =>{
     const todos = [...div1.children, ...div2.children];
     todos.forEach(b => b.classList.remove('selecionado')); // limpa todos

    btn.classList.add('selecionado');     

    respostas[atual] = index;
    
    })

    if(index<2){
      div1.append(btn)
    }else{
      div2.append(btn);
    }
  });

}

function calcularPeso(){
  const p = perguntas[atual];

  if(p.critica&&index!==p.correta){
    finalizar
  }
}


botao.onclick= () => {

  introducao.play();
  
  if(!pronto){
    botao.classList.add('fade-out');
    
    setTimeout(()=>{
      botao.textContent='iniciar';
      botao.classList.remove('fade-out');
      botao.classList.add('fade-in');
      pronto = true;
    },26000);
  }
  else{
    botao.classList.remove('fade-in');
    botao.classList.add('fade-out');

    test.classList.remove('fade-out');
    test.classList.add('fade-in');

    setTimeout(()=>{
      proxima.addEventListener('click', () =>{
        atual++;

        if (atual >= perguntas.length) {
          alert('Fim do teste!');
          test.style.display= 'none';
        return;
        }
        
        gerarPerguntas();
      })

      gerarPerguntas();
      botao.style.display = 'none';
    },1000);

  }



};
