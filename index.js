console.log('js carregou')

const btniniciar = document.getElementById('iniciar');
const btncomecar = document.getElementById('comecar');

btncomecar.style.display = 'none';

btniniciar.addEventListener('click', () =>{
    btniniciar.style.display = 'none';
    btncomecar.style.display = 'block';

    const audio = document.getElementById("apresentacao");
    audio.play().catch(() => {
      console.log("Autoplay bloqueado");
    
    });

})

