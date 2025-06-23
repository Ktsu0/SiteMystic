// Importa a biblioteca Three.js no formato de módulo
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';

document.addEventListener('DOMContentLoaded', () => {
  // === Cena 3D ===
  const scene = new THREE.Scene();

  // === Câmera ===
  // Define uma câmera perspectiva que simula a visão humana
  const camera = new THREE.PerspectiveCamera(
    70, // Campo de visão (FOV)
    window.innerWidth / window.innerHeight, // Proporção da tela
    0.1, // Plano de corte próximo
    1000 // Plano de corte distante
  );
  camera.position.z = 10; // Distância da câmera em relação ao plano XY

  // === Renderizador ===
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('background').appendChild(renderer.domElement);

  // === Cria uma textura circular (para parecer uma luz redonda) ===
  function createCircleTexture() {
    const size = 128; // Tamanho do canvas
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Gradiente radial do centro para as bordas (de branco para transparente)
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  // === Função que calcula o tamanho da tela visível pela câmera ===
  function getScreenSize() {
    const vFOV = (camera.fov * Math.PI) / 180; // Converte FOV em radianos
    const height = 2 * Math.tan(vFOV / 2) * camera.position.z; // Altura da tela visível
    const width = height * camera.aspect; // Largura proporcional
    return { width, height };
  }

  // === Gera uma posição aleatória dentro da área visível ===
  function randomPosition() {
    const { width, height } = getScreenSize();
    return new THREE.Vector3(
      (Math.random() - 0.5) * width, // Eixo X
      (Math.random() - 0.5) * height, // Eixo Y
      (Math.random() - 0.5) * 2 // Profundidade Z pequena para leve variação
    );
  }

  // === Função que define o caminho de movimento (trajetória) ===
  function getPathPosition(type, t, start, end, direction) {
    const pos = new THREE.Vector3().lerpVectors(start, end, t);

    // Cada tipo gera uma variação diferente no caminho
    switch (type) {
      case 0: // Curva em S horizontal
        pos.y += Math.sin(t * Math.PI * 2) * 1.2 * direction;
        break;
      case 1: // Onda circular
        pos.x += Math.sin(t * Math.PI) * 1.8 * direction;
        pos.y += Math.cos(t * Math.PI) * 1.0 * direction;
        break;
      case 2: // Onda em V
        pos.y += Math.abs(Math.sin(t * Math.PI * 2)) * 1.7 * direction;
        break;
      case 3: // Zig-zag rápido
        pos.x += Math.sin(t * Math.PI * 4) * 0.7 * direction;
        pos.y += Math.cos(t * Math.PI * 2) * 1.2 * direction;
        break;
      case 4: // Pequena ondulação vertical
        pos.y += Math.sin(t * Math.PI * 4) * 0.4 * direction;
        break;
    }
    return pos;
  }

  // === Cria uma partícula (luz flutuante) ===
  function createParticle() {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createCircleTexture(), // Aplica a textura circular
        transparent: true,
        opacity: 0, // Começa invisível
        depthWrite: false,
        blending: THREE.AdditiveBlending, // Luz soma uma na outra
      })
    );

    // Escala (tamanho) aleatória
    const scale = Math.random() * 0.6 + 0.3;
    sprite.scale.set(scale, scale, 1);

    scene.add(sprite);

    return {
      sprite, // O objeto 3D
      life: 0, // Tempo atual da animação
      duration: Math.random() * 12 + 10, // Quanto tempo dura o movimento
      pathType: Math.floor(Math.random() * 5), // Tipo da trajetória (0 a 4)
      start: randomPosition(), // Posição inicial
      end: randomPosition(), // Posição final
      direction: Math.random() > 0.5 ? 1 : -1, // Direção (para variar as curvas)
      opacityPhase: Math.random() * Math.PI * 2, // Fase de oscilação de opacidade
      cooldown: Math.random() * 8 + 5, // Tempo de espera antes de reaparecer
      state: 'cooldown', // Estado inicial (em espera)
    };
  }

  // === Gera todas as partículas ===
  const particles = [];
  const maxParticles = 20; // Quantidade máxima de luzes na tela

  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle());
  }

  // === Loop de animação ===
  function animate() {
    requestAnimationFrame(animate);
    const delta = 0.016; // Aproximadamente 60 FPS

    particles.forEach((p) => {
      if (p.state === 'cooldown') {
        // Estado de espera
        p.cooldown -= delta;
        p.sprite.material.opacity = 0;

        if (p.cooldown <= 0) {
          // Começa novo ciclo de movimento
          p.state = 'animating';
          p.life = 0;
          p.duration = Math.random() * 12 + 10;
          p.pathType = Math.floor(Math.random() * 5);
          p.start = randomPosition();
          p.end = randomPosition();
          p.direction = Math.random() > 0.5 ? 1 : -1;
          p.opacityPhase = Math.random() * Math.PI * 2;
        }
      } else if (p.state === 'animating') {
        // Estado de animação (movimentando)
        p.life += delta;
        let t = p.life / p.duration;

        if (t > 1) {
          // Animação finalizada, volta para cooldown
          p.state = 'cooldown';
          p.cooldown = Math.random() * 10 + 5;
          p.sprite.material.opacity = 0;
          return;
        }

        // Calcula posição no caminho
        const pos = getPathPosition(p.pathType, t, p.start, p.end, p.direction);
        p.sprite.position.copy(pos);

        // Opacidade mística: fade in/out + pulso oscilante
        const fade = Math.sin(Math.PI * t); // Sobe até metade e depois desce
        const pulse = 0.4 + 0.6 * Math.sin(p.opacityPhase + p.life * 1.5);

        p.sprite.material.opacity = fade * pulse * 0.8;
      }
    });

    renderer.render(scene, camera);
  }

  animate();

  // === Responsividade ===
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
