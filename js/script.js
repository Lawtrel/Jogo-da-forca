let palavras = ["ALURA","ORACLE","FORCA","HTML","JAVASCRIPT","LEAGUE"];
let tabuleiro = document.getElementById("forca").getContext('2d');
let palavraSecretas = "";

function escolherPalavraSecreta(){
    let palavra = palavras[Math.floor(Math.random() * palavras.length)]
    palavraSecretas = palavra
    console.log(palavraSecretas)
}

function iniciarJogo(){
    document.getElementById('div-desaparece').style.display = "none"
    escolherPalavraSecreta()
    desenharCanvas()
    desenharLinhas()
}

function desenharCanvas(){
    tabuleiro.lineWidth = 8;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.fillStyle = "#F3F5FC";
    tabuleiro.strokeStyle = "#0A3871";

    tabuleiro.fillRect(0,0, 1200, 800);
    tabuleiro.beginPath();
    tabuleiro.moveTo(900, 500);
    tabuleiro.lineTo(650, 500);
    tabuleiro.stroke();
    tabuleiro.closePath();
}

function desenharLinhas(){
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.lineJoin = "round";
    tabuleiro.fillStyle = "#F3F5FC";
    tabuleiro.strokeStyle = "#0A3871";

    let largura = 600/palavraSecretas.length
    for(let i = 0; i < palavraSecretas.length; i++){
        tabuleiro.moveTo(500+(largura*i), 640)
        tabuleiro.lineTo(550+(largura*i), 640)
    }
    tabuleiro.stroke()
    tabuleiro.closePath()

}