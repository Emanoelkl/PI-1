const textos = [
  {
    portugues: "A natureza é sagrada para o povo indígena.",
    tupi: "Yby eté rã kunhã karaíba.",
  },
  {
    portugues: "O sol nasce no horizonte.",
    tupi: "Kuaray oîeîm.",
  },
  {
    portugues: "Vamos aprender a língua dos nossos ancestrais.",
    tupi: "Jaikó tupi ñe'ẽ rehe.",
  },
  {
    portugues: "A floresta é nossa casa.",
    tupi: "Ka'a rã ore róka.",
  },
];

const telaMenu = document.getElementById("tela-menu");
const telaTeclado = document.getElementById("tela-teclado");
const telaJogo = document.getElementById("tela-jogo");
const botaoJogar = document.getElementById("botao-jogar");
const tempo = document.getElementById("tempo-restante");
const balao = document.getElementById("balao-txt");
const balaoImagem = document.getElementById("balao-img");
const pontos = document.getElementById("pontos");
const guia = document.getElementById("texto-guia");
const input = document.getElementById("input");
const display = document.getElementById("texto-display");
const papelTxt = document.getElementById("papel-txt");
let timer;
let texto;
let level = 0;
let pontuacao = parseInt(pontos.innerText);
let index = 0;
const velocidade = 50;
const textoConfirmação = "Posicione suas mãos e aperte ESPAÇO para começar";

botaoJogar.addEventListener("click", () => {
  telaMenu.classList.add("animacao");
  document.body.classList.add("animacao-menu");
  setTimeout(() => {
    telaMenu.classList.add("hidden");
    telaTeclado.classList.remove("hidden");
    papelTxt.textContent = textoConfirmação;
    window.addEventListener("keydown", escutarEspaco);
  }, 1200);
});

const logica = (texto1, texto2) => {
  if (index < texto1.length) {
    balao.textContent += texto1.charAt(index);
    index++;
    setTimeout(logica, velocidade, texto1, texto2);
  } else {
    guia.innerHTML = texto2;
    input.value = "";
    display.innerHTML = "";
    input.focus();
    tempoFaltando = 60;
    tempo.textContent = tempoFaltando;
    timer = setInterval(updateTimer, 1000);
    input.addEventListener("input", handleInput);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
    handleInput();
  }
};

const escutarEspaco = (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    document.body.classList.remove("animacao-menu");
    document.body.classList.add("animacao-teclado");
    window.removeEventListener("keydown", escutarEspaco);
    telaTeclado.classList.add("hidden");
    telaJogo.classList.remove("hidden");
    setTimeout(() => {
      telaJogo.classList.add("fade-in");
      jogar();
    }, 1200);
  }
};

const jogar = () => {
  index = 0;
  texto = textos[level];
  balao.textContent = "";
  let textoBalao = "";
  let textoGuia = "";
  let balaoImg = "";
  clearInterval(timer);
  if (level % 2 == 0) {
    balaoImagem.classList.add("balao-esq");
    balaoImg = "balao esquerda.png";
    textoBalao = texto.tupi;
    textoGuia = texto.portugues;
  } else {
    balaoImagem.classList.remove("balao-esq");
    balaoImg = "balao direita.png";
    textoBalao = texto.portugues;
    textoGuia = texto.tupi;
  }
  balaoImagem.src = balaoImg;
  logica(textoBalao, textoGuia);
};

const handleInput = () => {
  const textoDigitado = input.value;
  let textoValidado = "";
  let erros = 0;
  for (let i = 0; i < textoDigitado.length + 1; i++) {
    let letraGuia = guia.innerText[i];
    let letraDigitada = textoDigitado[i];

    if (letraDigitada == undefined) {
      textoValidado += `<span class="cursor"> </span>`;
      continue;
    }
    if (letraGuia == undefined) {
      textoValidado += `<span class="incorreto">${letraDigitada}</span>`;
      continue;
    }
    if (letraGuia == letraDigitada) {
      textoValidado += `<span class="correto">${letraDigitada}</span>`;
    } else {
      textoValidado += `<span class="incorreto">${letraDigitada}</span>`;
      erros++;
    }
  }
  display.innerHTML = textoValidado;
  if (textoDigitado.length == guia.innerText.length) {
    if (erros == 0) {
      pontuacao += 100 + tempoFaltando;
      pontos.innerText = pontuacao;
      fim();
    }
  }
};

const updateTimer = () => {
  tempoFaltando--;
  tempo.textContent = tempoFaltando;
  if (tempoFaltando <= 0) {
    pontos.innerText = 0;
    fim();
  }
};

const fim = () => {
  if (level >= textos.length - 1) {
    level = 0;
  } else {
    level++;
  }
  jogar();
};
