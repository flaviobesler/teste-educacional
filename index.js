const botao = document.querySelector(".start");

let pronto = false

botao.onclick = () => {
    document.getElementById("apresentacao").play();
    
  if(!pronto){
    botao.classList.add("fade-out");

    setTimeout(()=>{
      botao.textContent = "iniciar";
      botao.classList.remove("fade-out");
      botao.classList.add("fade-in");

      pronto = true;
    },24000);}
    else{
      window.location.href = '/niveis/teste/teste.html'
    }
    

};

