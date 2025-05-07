
const cookieImg = document.getElementById('cookieImg');
const clickCountText = document.getElementById('clickCount');
const statusText = document.getElementById('status');

let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let stage = localStorage.getItem('stage') || 'massa';

let precoClick = 10;
let precoCPS = 20;
let precoEvo1 = 500;
let precoEvo2 = 2000;

let cookiesPerClick = parseInt(localStorage.getItem('cookiesPerClick')) || 1;
let cps = parseInt(localStorage.getItem('cps')) || 0;

let evo1Comprada = localStorage.getItem('evolucao1') === 'true';
let evo2Comprada = localStorage.getItem('evolucao2') === 'true';

const upgradeClickBtn = document.getElementById("upgradeClick");
const upgradeCPSBtn = document.getElementById("upgradeCPS");

const evo1Btn = document.getElementById("evolucao1");
const evo2Btn = document.getElementById("evolucao2");


function updateUI() {
  stage = localStorage.getItem('stage') || 'massa';
  clickCountText.textContent = `Cliques: ${clickCount}`;

  document.getElementById('priceClick').textContent = `Preço: ${precoClick}`;
  document.getElementById('priceCPS').textContent = `Preço: ${precoCPS}`;
  document.getElementById('priceEvo1').textContent = `Preço: ${precoEvo1}`;
  document.getElementById('priceEvo2').textContent = `Preço: ${precoEvo2}`;

  upgradeClickBtn.disabled = clickCount < precoClick;
  upgradeCPSBtn.disabled = clickCount < precoCPS;

  evo1Btn.disabled = evo1Comprada || clickCount < precoEvo1;
  evo2Btn.disabled = evo2Comprada || clickCount < precoEvo2;


  // ESTAGIOS DO COOKIE
  if (stage == 'massa') {
    document.getElementById("evolucao2").style.display = "none";
    cookieImg.src = 'assets/cookie_mass.png';
    statusText.textContent = 'Cookie cru... precisa de mais interações!';

    document.getElementById("evolucao1").style.display = "flex";
    document.getElementById("evolucao2").style.display = "none";


  } else if (stage == 'com_gotas') {
    cookieImg.src = 'assets/cookie_gotas.png';
    statusText.textContent = 'Com gotas! Continue clicando!';

    document.getElementById("evolucao1").style.display = "none";
    document.getElementById("evolucao2").style.display = "flex";


  } else if (stage == 'pronto') {
    cookieImg.src = 'assets/cookie_pronto.png';
    statusText.textContent = 'Seu Cookie Pet está pronto! Parabéns!';

    document.getElementById("evolucao1").style.display = "none";
    document.getElementById("evolucao2").style.display = "none";

  }
}

// EVENTOS UPGRADE

upgradeClick.addEventListener('click', () => {
  if (clickCount >= 10) {
    clickCount -= 10;
    cookiesPerClick += 1;
    localStorage.setItem('cookiesPerClick', cookiesPerClick);
    localStorage.setItem('clickCount', clickCount);
    updateUI();
  }
});

upgradeCPS.addEventListener('click', () => {
  if (clickCount >= 20) {
    clickCount -= 20;
    cps += 1;
    localStorage.setItem('cps', cps);
    localStorage.setItem('clickCount', clickCount);
    updateUI();
  }
});

evolucao1.addEventListener('click', () => {
  if (clickCount >= 30 && !evo1Comprada) {
    clickCount -= 30;
    evo1Comprada = true;
    localStorage.setItem('evolucao1', 'true');
    localStorage.setItem('clickCount', clickCount);
    
    document.getElementById("evolucao1").style.display = "none";
    
    stage = 'com_gotas';
    localStorage.setItem('stage', stage);
    window.location.href = './labirinto.html';


    updateUI();


  }
});

evolucao2?.addEventListener('click', () => {
  if (clickCount >= 40 && !evo2Comprada) {
    clickCount -= 40;
    evo2Comprada = true;
    localStorage.setItem('clickCount', clickCount);

    stage = 'boss';
    localStorage.setItem('stage', stage);
    window.location.href = './boss.html';
    updateUI();
  }
});

setInterval(() => {
  if (cps > 0) {
    clickCount += cps;
    localStorage.setItem('clickCount', clickCount);
    updateUI();
  }
}, 1000);

cookieImg.addEventListener('click', () => {
  clickCount += cookiesPerClick;
  localStorage.setItem('clickCount', clickCount);
  updateUI();
});


document.getElementById("resetarJogo").addEventListener("click", () => {
  
    window.location.href = 'index.html';

    localStorage.clear();
    location.reload();

});


const cookieSpeeches = {
  massa: [
    "Preciso de mais farinha!",
    "Clica mais em mim!",
    "Ainda estou cru!",
    "Amassa, Amassa, Amassa, A Massa",
    "Esta um dia lindo la fora! eh- eh- eh-",
    "To Cru :("

  ],
  com_gotas: [
    "To Doce :)",
    "Me deixe bem redondinho.",
    "Você tem que vencer o Forno!",
    "Fazer botões é legal.",
    "Por favor, não use auto clicker ;-;",
    "Me da um 10 ;)"
  ],
  pronto: [
    "To Crocant :3",
    "Estou muito gostoso.",
    "Quentinho e saboroso",
    "Ahhhhhh, free at last....",
    "Coockie!"
  ]
};

function updateCookieSpeech() {
  let speechList = cookieSpeeches[stage] || [];
  let randomSpeech = speechList[Math.floor(Math.random() * speechList.length)];
  document.getElementById("cookieTalk").textContent = randomSpeech;
}

setInterval(updateCookieSpeech, 5000);


const comerBtn = document.getElementById('comerBtn');

comerBtn?.addEventListener('click', () => {
  window.location.href = 'final.html';
});

updateUI();


