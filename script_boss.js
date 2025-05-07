const questions = [
  {
    q: 'Qual o ingrediente principal do cookie?',
    options: ['Arroz', 'Farinha', 'Cimento'],
    answer: 'Farinha'
  },
  {
    q: 'O que adiciona doçura ao cookie?',
    options: ['Sal', 'Pimenta', 'Açúcar'],
    answer: 'Açúcar'
  },
  {
    q: 'Onde o cookie é assado?',
    options: ['Freezer', 'Forno', 'Geladeira'],
    answer: 'Forno'
  }
];

let current = 0;
const area = document.getElementById('questionArea');

function showQuestion() {
  const q = questions[current];
  area.innerHTML = `<p>${q.q}</p>` +
    q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join('');
}

function checkAnswer(opt) {
  if (opt === questions[current].answer) {
    current++;
    if (current >= questions.length) {
      alert('Você derrotou o Forno Boss!');
      localStorage.setItem('stage', 'pronto');
      window.location.href = 'index.html';
    } else {
      showQuestion();
    }
  } else {
    alert('Resposta errada! Tente novamente.');
  }
}

showQuestion();