// mysticBackground.js

// Cria o plano de fundo místico automaticamente
(function () {
  const id = 'mystic-bg';
  const amount = 800;

  const target = document.getElementById(id);
  if (!target) return;

  // Cria a estrutura HTML do fundo
  target.classList.add('canvas');

  const sky = document.createElement('div');
  sky.className = 'sky';

  const foreground = document.createElement('div');
  foreground.className = 'foreground';

  target.appendChild(sky);
  target.appendChild(foreground);

  // Cria estrelas com animação
  for (let i = 0; i < amount; i++) {
    const star = document.createElement('div');
    star.className = 'star-blink';

    const inner = document.createElement('div');
    star.appendChild(inner);

    const size = Math.random() * 2 + 7;
    const opacity = Math.random() * 0.5 + 0.5;
    const delay = Math.random() * 100;

    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.opacity = opacity;
    star.style.animation = `blinkAfter 15s infinite ${delay}s ease-out`;

    if (i % 8 === 0) star.classList.add('red');
    else if (i % 10 === 6) star.classList.add('blue');

    sky.appendChild(star);
  }
})();
