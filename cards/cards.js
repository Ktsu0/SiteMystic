import { createSmokeEffect } from './smoke.js';

class MysticalCards {
	constructor() {
		// Elementos do DOM
		this.cardsContainer = document.getElementById("cards-container"); // Contêiner das cartas
		this.messageContainer = document.getElementById("message-container"); // Contêiner da mensagem revelada
		this.messageTitle = document.getElementById("message-title"); // Título da carta revelada
		this.messageText = document.getElementById("message-text"); // Mensagem da carta revelada
		this.reshuffleBtn = document.getElementById("reshuffle-btn"); // Botão para embaralhar novamente
		this.canvas = document.getElementById("particle-canvas"); // Canvas para partículas
		this.ctx = this.canvas.getContext("2d"); // Contexto 2D para desenho no canvas

		// Dados das cartas
		this.cards = [
	{symbol: "✨",title: "The Star",description: "Esperança e inspiração",fortune: "Uma nova oportunidade trará alegria inesperada para a sua vida. Confie na sua intuição para te guiar."},
	{symbol: "🌙",title: "The Moon",description: "Intuição e mistério",fortune: "Verdades ocultas serão reveladas. Preste atenção aos seus sonhos, pois eles contêm mensagens importantes."},
	{symbol: "☀️",title: "The Sun",description: "Sucesso e positividade",fortune: "Um período de crescimento e felicidade se aproxima. Seus esforços serão recompensados de forma magnífica."},
	{symbol: "🔮",title: "The Magician",description: "Manifestação e poder",fortune: "Você possui todas as ferramentas necessárias para o sucesso. Seus poderes criativos estão no auge — use-os com sabedoria."},
	{symbol: "🌊",title: "The Ocean",description: "Emoções e intuição",fortune: "Confie no vai e vem das suas emoções. Uma conexão profunda espera por você se abrir seu coração."}
];

		// Sistema de partículas
		this.particles = [];
		this.particleColors = ["#9969ff", "#ff69a1", "#69b4ff", "#ff9f69"]; // Cores das partículas

		// Estado atual
		this.selectedCard = null; // Carta selecionada
		this.isRevealed = false; // Se a mensagem já foi revelada

		// Inicialização
		this.init();
	}

	init() {
		this.createCards(); // Cria as cartas
		this.setupCanvas(); // Configura o canvas das partículas
		this.reshuffleBtn.addEventListener("click", this.reshuffleCards.bind(this)); // Evento de embaralhar
		this.animateParticles(); // Inicia a animação das partículas
	}

	createCards() {
		this.cardsContainer.innerHTML = ""; // Limpa as cartas anteriores

		// Embaralha as cartas
		const shuffledCards = [...this.cards].sort(() => Math.random() - 0.5);

		// Cria os elementos das cartas
		shuffledCards.forEach((card, index) => {
			const cardElement = document.createElement("div");
			cardElement.className = "card";
			cardElement.innerHTML = `
				<div class="card-face card-back">
					<div class="smoke-container"></div> 
				</div>
				<div class="card-face card-front">
					<div class="card-symbol">${card.symbol}</div>
					<div class="card-title">${card.title}</div>
					<div class="card-desc">${card.description}</div>
				</div>
			`;
			 // Aplica o efeito de fumaça somente no container de fumaça, já que ele está dentro do verso da carta
			const smokeContainer = cardElement.querySelector(".smoke-container");
			createSmokeEffect(smokeContainer);


			// Evento de clique na carta
			cardElement.addEventListener("click", () =>
				this.selectCard(cardElement, card)
			);

			// Gira levemente a carta aleatoriamente
			const randomRotation = Math.random() * 6 - 3;
			cardElement.style.transform = `rotateZ(${randomRotation}deg)`;

			// Aplica delay na animação para efeito cascata
			cardElement.style.animationDelay = `${index * 0.1}s`;

			this.cardsContainer.appendChild(cardElement);
		});
	}

	selectCard(cardElement, cardData) {
		if (this.isRevealed) return; // Impede múltiplas seleções

		this.createMagicalEffect(cardElement); // Efeito mágico

		cardElement.classList.add("flipped"); // Vira a carta
		this.selectedCard = { element: cardElement, data: cardData };

		// Escurece as outras cartas
		const allCards = this.cardsContainer.querySelectorAll(".card");
		allCards.forEach((card) => {
			if (card !== cardElement) {
				card.style.opacity = "0.3";
				card.style.transform = "scale(0.95)";
				card.style.filter = "grayscale(0.7)";
				card.style.pointerEvents = "none";
			}
		});

		// Revela a fortuna após um tempo
		setTimeout(() => {
			this.revealFortune(cardData);
		}, 1000);
	}

	revealFortune(cardData) {
		this.isRevealed = true;

		// Atualiza conteúdo da mensagem
		this.messageTitle.textContent = cardData.title;
		this.messageText.textContent = cardData.fortune;

		// Exibe mensagem
		this.messageContainer.classList.add("visible");

		// Cria um "burst" de partículas
		for (let i = 0; i < 50; i++) {
			this.createParticle(window.innerWidth / 2, window.innerHeight / 2, true);
		}
	}

	reshuffleCards() {
		// Oculta mensagem
		this.messageContainer.classList.remove("visible");

		// Reinicia o estado
		this.isRevealed = false;
		this.selectedCard = null;

		setTimeout(() => {
			// Cria partículas ao embaralhar
			for (let i = 0; i < 30; i++) {
				this.createParticle(window.innerWidth / 2, window.innerHeight / 2, true);
			}
			this.createCards(); // Recria cartas
		}, 500);
	}

	createMagicalEffect(element) {
		// Pega a posição central do elemento
		const rect = element.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		// Cria brilhos mágicos
		for (let i = 0; i < 15; i++) {
			const sparkle = document.createElement("div");
			sparkle.className = "magical-sparkle";

			const angle = Math.random() * Math.PI * 2;
			const distance = Math.random() * 100;
			const posX = centerX + Math.cos(angle) * distance;
			const posY = centerY + Math.sin(angle) * distance;

			sparkle.style.left = `${posX}px`;
			sparkle.style.top = `${posY}px`;

			const colors = ["#9969ff", "#ff69a1", "#ffeb3b", "#69b4ff"];
			sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

			const size = Math.random() * 8 + 3;
			sparkle.style.width = `${size}px`;
			sparkle.style.height = `${size}px`;

			document.body.appendChild(sparkle);

			// Remove após a animação
			setTimeout(() => {
				sparkle.remove();
			}, 1000);
		}

		// Cria partículas
		for (let i = 0; i < 20; i++) {
			this.createParticle(centerX, centerY);
		}
	}

	// Sistema de partículas
	setupCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		// Redimensiona o canvas ao mudar o tamanho da janela
		window.addEventListener("resize", () => {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		});

		// Cria partículas de fundo
		for (let i = 0; i < 50; i++) {
			this.createParticle(
				Math.random() * this.canvas.width,
				Math.random() * this.canvas.height
			);
		}
	}

	createParticle(x, y, isBurst = false) {
		const color = this.particleColors[
			Math.floor(Math.random() * this.particleColors.length)
		];

		const particle = {
			x,
			y,
			size: Math.random() * 4 + 1,
			color,
			speedX: (Math.random() - 0.5) * (isBurst ? 8 : 1),
			speedY: (Math.random() - 0.5) * (isBurst ? 8 : 1),
			life: 100,
			maxLife: 100
		};

		this.particles.push(particle);
	}

	animateParticles() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Atualiza e desenha cada partícula
		for (let i = 0; i < this.particles.length; i++) {
			const p = this.particles[i];

			p.x += p.speedX;
			p.y += p.speedY;

			// Reduz gradualmente a velocidade
			p.speedX *= 0.99;
			p.speedY *= 0.99;

			p.life--;

			const opacity = p.life / p.maxLife;

			this.ctx.beginPath();
			this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			this.ctx.fillStyle = `${p.color}${Math.floor(opacity * 255).toString(16).padStart(2, "0")}`;
			this.ctx.fill();

			// Remove partículas expiradas
			if (p.life <= 0) {
				this.particles.splice(i, 1);
				i--;

				// Mantém a densidade criando uma nova partícula
				if (this.particles.length < 50) {
					this.createParticle(
						Math.random() * this.canvas.width,
						Math.random() * this.canvas.height
					);
				}
			}
		}

		// Continua a animação
		requestAnimationFrame(this.animateParticles.bind(this));
	}
}

// Inicializa quando a janela carregar
window.addEventListener("load", () => {
	new MysticalCards();
});
