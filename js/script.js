let tela =document.querySelector("canvas");
let tabuleiro = document.getElementById("forca").getContext('2d');

let btnNovoJogoinv = document.getElementById("btn-novo-jogo").style.display = "none"
let btnSairInv = document.getElementById("btn-sair").style.display = "nome"
let btnAdicionarPalavra = document.getElementById("adicionar-palavra").style.display = "nome"
let btnNovoJogo = document.getElementById("btn-novo-jogo");
let btnSair = document.getElementById("btn-sair");
let btnCancelar = document.getElementById("btn-cancelar");

let palavras = ["ALURA","ORACLE","FORCA","HTML","JAVASCRIPT","LEAGUE","LOL"];
let palavraSecretas = "";
let letras = [];
let palavraCorreta = "";
let erros = 8
let letrasincorretas = [];
let numerosDeErros = 8;
let letraEscolhida = [];

document.getElementById("iniciar-jogo").onclick = () => {
    iniciarJogo();
}

document.getElementById("btn-salvar").onclick = () => {
    salvarPalavra();
}

btnNovoJogo.addEventListener("click", function() {
    location.reload();
});

btnSair.addEventListener("click", function() {
    location.reload();
});

btnCancelar.addEventListener("click", function() {
    location.reload();
});

function escolherPalavraSecreta(){
    let palavra = palavras[Math.floor(Math.random() * palavras.length)]
    palavraSecretas = palavra
    return palavra
}

function verificarLetraClicada(key){
    if(letras.length < 1 || letras.indexOf(key) < 0){
        letras.push(key)
        return false
    }
    else{
        letras.push(key)
        return true
    }
}

function adicionarLetraCorreta(i) {
    palavraCorreta += palavraSecretas[i].toUpperCase()
}

function adicionarLetraIncorreta(letter){
    if (palavraSecretas.indexOf(letter) <= 0) {
        erros -= 1
    }
}

function verificarFimdeJogo(letra) {
    if (letraEscolhida.length < palavraSecretas.length) {
        letrasincorretas.push(letra);
    
    if (letrasincorretas.length > numerosDeErros) {
        exibirDerrota()
    }
    else if (letraEscolhida.length < palavraSecretas.length) {
        adicionarLetraIncorreta(letra)
        escreverLetraIncorreta(letra, erros)
        }
    }
}

function verificarVencedor(letra) {
    letraEscolhida.push(letra.toUpperCase());
    if (letraEscolhida.length == palavraSecretas.length) {
    exibirVitoria()
    }
}

function verificarLetra(keyCode) {
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  }

function mostrarTelaAdicionarPalavra() {
    document.getElementById("div-desaparece").style.display = 'none';
    document.getElementById("adicionar-palavra").style.display = "block";
  
}

function salvarPalavra() {
    let novaPalara = document.getElementById('input-nova-palavra').value;
    
    if(novaPalara !==""){
        palavras.push(novaPalara.toUpperCase());
        alert('Palavra digitada foi salva com sucesso')
        document.getElementById("adicionar-palavra").style.display = "none";
        iniciarJogo();
    }
    else{
        alert("Nenhuma palavra foi digitada")
    }
}

function iniciarJogo(){
    document.getElementById('div-desaparece').style.display = "none"
    desenharCanvas()
    escolherPalavraSecreta()
    desenharLinhas()

    document.getElementById("btn-novo-jogo").style.display = "block"
    document.getElementById("btn-sair").style.display = "block"

    document.onkeydown = (e) => {

        let letra = e.key.toUpperCase()

        if (letrasincorretas.length <= numerosDeErros) {
            if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
              if (palavraSecretas.includes(letra)) {
                adicionarLetraCorreta(palavraSecretas.indexOf(letra))
                for (let i = 0; i < palavraSecretas.length; i++) {
                  if (palavraSecretas[i] === letra) {
                    escreverLetraCorreta(i)
                    verificarVencedor(letra)
      
                  }
                }
      
        }
        else{
            if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
            desenharForca(erros)
            verificarFimdeJogo(letra)
          }
        }
      }
      else {
        alert('Você atingiu o limíte de letras incorretas')
      }
  
    };
  }

function desenharCanvas(){
    tabuleiro.lineWidth = 8;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.fillStyle = "#F3F5FC";
    tabuleiro.strokeStyle = "#0A3871";

    tabuleiro.fillRect(0,0, 1200, 800);
    tabuleiro.beginPath();
    tabuleiro.moveTo(650, 500);
    tabuleiro.lineTo(900, 500);
    tabuleiro.stroke();
    tabuleiro.closePath();
}

function desenharLinhas(){
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.strokeStyle = "#0A3871";
    tabuleiro.beginPath()
    let largura = 600/palavraSecretas.length
    for(let i = 0; i < palavraSecretas.length; i++){
        tabuleiro.moveTo(500+(largura*i), 640)
        tabuleiro.lineTo(550+(largura*i), 640)
    }
    tabuleiro.stroke()
    tabuleiro.closePath()

}

function escreverLetraCorreta(index){
    tabuleiro.font = "bold 52px Inter"
    tabuleiro.lineWidth = 6
    tabuleiro.lineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.fillStyle = "#0A3871"
    let largura = 600/palavraSecretas.length
    tabuleiro.fillText(palavraSecretas[index],505 + (largura * index),620)
    tabuleiro.stroke()
}

function escreverLetraIncorreta(letra, erros){
    tabuleiro.font = "bold 40px Inter"
    tabuleiro.lineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.fillStyle = "#0A3871"
    tabuleiro.lineWidth = 6
    tabuleiro.fillText(letra,535 +(40*(10 - erros)),710,40)
}

function desenharForca(pontos) {
    tabuleiro.lineWidth = 8
    tabuleiro.lineCap = "round"
    tabuleiro.lineJoin = "round"
    tabuleiro.strokeStyle = "#0A3871"
        if (pontos===8){
        tabuleiro.moveTo(700,500)
        tabuleiro.lineTo(700,100)
        }
        if(pontos===7){
            tabuleiro.moveTo(850,100)
            tabuleiro.lineTo(700,100)
        }
        if(pontos===6){
            tabuleiro.moveTo(850,100)
            tabuleiro.lineTo(700,100)
        }
        if(pontos===5){
            tabuleiro.moveTo(900,230)
            tabuleiro.arc(850,230,50,9,Math.PI*2)
        }
        if(pontos===4){
            tabuleiro.moveTo(850,389)
            tabuleiro.lineTo(850,289)
        }
        if(pontos===3){
            tabuleiro.moveTo(850,389)
            tabuleiro.lineTo(800,450)
        }
        if(pontos===2){
            tabuleiro.moveTo(850,389)
            tabuleiro.lineTo(890,450)
        }
        if(pontos===1){
            tabuleiro.moveTo(850,330)
            tabuleiro.lineTo(800,300)
        }
        if(pontos===0){
            tabuleiro.moveTo(850,330)
            tabuleiro.lineTo(890,389)
        }
    tabuleiro.stroke()
    tabuleiro.closePath()
}

function exibirDerrota() {
    tabuleiro.font = "bold 42px Inter";
    tabuleiro.lineWidth = 6
    tabuleiro.lineCap="round"
    tabuleiro.lineJoin="round"
    tabuleiro.fillStyle="red"
    tabuleiro.fillText("Fim de jogo!",930,320)
}

function exibirVitoria(){
    tabuleiro.font = "bold 42px Inter";
    tabuleiro.lineCap="round"
    tabuleiro.lineJoin="round"
    tabuleiro.fillStyle="green"
    tabuleiro.fillText("Ganhou,",950,320)
    tabuleiro.fillText("Parabéns!",930,360)
    setTimeout( recarregar , 1000)
}

function recarregar(){
    location.reload();
}