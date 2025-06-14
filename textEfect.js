const span = document.getElementById('magic-span');
const letter = span.querySelector('.letter');
const icon = span.querySelector('.icon-img');

export function startEffect() {
	// Garante que o Y começa normal e o span sem position
	span.style.position = 'static';

	// ⏳ Tempo com o Y normal (4s)
	setTimeout(() => {
		// Ativa position relative para posicionar o ícone depois
		span.style.position = 'relative';

		// 🔮 Aplica blur (1s)
		letter.classList.add('blurred');

		setTimeout(() => {
			// 🔕 Esconde o Y (0.5s)
			letter.classList.add('hidden');

			setTimeout(() => {
				// 🎩 Mostra o ícone (6s)
				icon.classList.add('visible');

				setTimeout(() => {
					// ❌ Esconde o ícone
					icon.classList.remove('visible');

					// 🔧 Remove blur
					letter.classList.remove('blurred');

					// 🔄 Volta o span a não ter position
					span.style.position = 'static';

					setTimeout(() => {
						// 🔁 Volta o Y visível
						letter.classList.remove('hidden');

						// 🔂 Reinicia ciclo
						startEffect();

					}, 500); // ⬅️ Espera o blur sair

				}, 6000); // ⬅️ Ícone visível por 6s

			}, 500); // ⬅️ Espera após esconder letra

		}, 1000); // ⬅️ Tempo do blur

	}, 4000); // ⬅️ Tempo normal com a letra visível
}

// ⏱️ Inicia após 1 segundo
setTimeout(startEffect, 1000);
