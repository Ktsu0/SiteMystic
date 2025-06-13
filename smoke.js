// 🔮 Importa a biblioteca Three.js como módulo
import * as THREE from 'https://unpkg.com/three@0.134.0/build/three.module.js';

// 🔥 Função que cria o efeito de fumaça dentro de um elemento container
export function createSmokeEffect(containerElement) {
	// 🃏 Define tamanho do canvas (aproximadamente o tamanho de uma carta)
	const width = 160;
	const height = 280;

	// 🌌 Cria a cena 3D
	const scene = new THREE.Scene();

	// 🎥 Define uma câmera com perspectiva e posição z afastada
	const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
	camera.position.z = 160;

	// 🖼️ Cria o renderizador com fundo transparente (alpha: true)
	const renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(width, height); // Define tamanho do renderizador
	renderer.setClearColor(0x000000, 0); // Define fundo como transparente
	containerElement.appendChild(renderer.domElement); // Adiciona o canvas ao DOM

	// 💡 Cria uma luz direcional branca vinda da frente
	const light = new THREE.DirectionalLight(0xffffff, 0.6);
	light.position.set(0, 0, 1);
	scene.add(light); // Adiciona a luz na cena

	// 🌫️ Prepara variáveis para partículas de fumaça e controle de tempo
	const smokeParticles = [];
	const clock = new THREE.Clock();
	const loader = new THREE.TextureLoader(); // Carregador de texturas

	// 🖼️ Carrega imagem de fumaça azul
	loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/82015/blue-smoke.png", (texture) => {
		// 🧱 Cria geometria plana (tipo "folha de papel") para a fumaça
		const geometry = new THREE.PlaneBufferGeometry(580, 580);

		// 🎨 Cria o material com transparência e cor inicial roxa
		const material = new THREE.MeshLambertMaterial({
			map: texture,              // Usa a textura de fumaça
			transparent: true,        // Permite transparência
			opacity: 0.4,              // Define opacidade leve
			color: new THREE.Color(0x9969ff) // Cor inicial roxa
		});

		// 🔁 Cria 10 partículas com posição e rotação aleatórias
		for (let i = 0; i < 10; i++) {
			const mesh = new THREE.Mesh(geometry, material.clone()); // Usa cópia do material para cor independente
			mesh.position.set(
				Math.random() * 100 - 50,  // posição X aleatória centralizada
				Math.random() * 150 - 75,  // posição Y aleatória
				Math.random() * 80 - 40    // posição Z (profundidade)
			);
			mesh.rotation.z = Math.random() * Math.PI; // Rotação inicial aleatória

			scene.add(mesh); // Adiciona partícula na cena
			smokeParticles.push(mesh); // Guarda no array para animar depois
		}

		// ▶️ Inicia a animação contínua
		animate();
	});

	// 🌀 Função de animação (chamada a cada frame)
	function animate() {
		requestAnimationFrame(animate); // Solicita próximo frame

		// ⏳ Calcula tempo decorrido desde o início
		const time = clock.getElapsedTime();

		// 🟣↔🔵 Oscila valor 't' entre 0 e 1 usando seno (suave)
		const t = (Math.sin(time * 0.5) + 1) / 2;

		// 🔁 Atualiza cada partícula de fumaça
		smokeParticles.forEach((p, i) => {
			p.rotation.z += 0.002 + i * 0.0005; // Rotação suave e variável por índice

			// 🎨 Transição suave de cor entre roxo (h=0.7) e azul (h=0.5)
			p.material.color.setHSL(0.7 - 0.2 * t, 1, 0.7); // h varia de 0.7 a 0.5
		});

		// 📸 Renderiza a cena com a câmera atual
		renderer.render(scene, camera);
	}
}
