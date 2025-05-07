
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 20, y: 20 };
let gotas = [
  { x: 100, y: 100 },
  { x: 200, y: 50 },
  { x: 150, y: 200 }
];

function draw() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = 'brown';
  ctx.fillRect(player.x, player.y, 20, 20);
  gotas.forEach(g => {
    ctx.beginPath();
    ctx.arc(g.x, g.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#3e2723';
    ctx.fill();
  });
}

function checkCollisions() {
  gotas = gotas.filter(g => {
    const dx = player.x - g.x;
    const dy = player.y - g.y;
    return Math.sqrt(dx * dx + dy * dy) > 15;
  });
  if (gotas.length === 0) {
    alert('Todas as gotas coletadas!');
    localStorage.setItem('stage', 'com_gotas');
    window.location.href = 'index.html';
  }
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': player.y -= 10; break;
    case 'ArrowDown': player.y += 10; break;
    case 'ArrowLeft': player.x -= 10; break;
    case 'ArrowRight': player.x += 10; break;
  }
  checkCollisions();
  draw();
});

draw();