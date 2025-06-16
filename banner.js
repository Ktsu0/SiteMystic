let actual_banner = 1;
const qnt_banners = 5;
const banners = document.getElementById("banners");

// Clona o primeiro banner e adiciona ao final (para efeito de loop)
const firstBanner = banners.children[0].cloneNode(true);
banners.appendChild(firstBanner);

// Controla o movimento
export function switchBanner(n_banner) {
    banners.style.transition = 'left 0.7s ease-in-out';
    banners.style.left = `-${n_banner - 1}00vw`;
    actual_banner = n_banner;

    // Atualiza os botões
    for (let i = 1; i <= qnt_banners; i++) {
        const btn = document.getElementById(`btn_banner_${i}`);
        if (n_banner === i) {
            btn.style.transform = 'scale(1.3)';
            btn.style.backgroundColor = 'white';
        } else {
            btn.style.transform = 'scale(1)';
            btn.style.backgroundColor = 'rgba(240, 248, 255, 0.528)';
        }
    }
}

// Avança automaticamente
function nextBanner() {
    actual_banner++;
    switchBanner(actual_banner);

    // Se chegou no clone (posição 6)
    if (actual_banner === qnt_banners + 1) {
        setTimeout(() => {
            banners.style.transition = 'none'; // remove animação
            banners.style.left = '0'; // volta ao primeiro
            actual_banner = 1;
            // força reflow para garantir que a transição volte depois
            void banners.offsetWidth;
            banners.style.transition = 'left 0.7s ease-in-out';
        }, 700); // mesmo tempo da transição
    }
}

// Start automático
setInterval(nextBanner, 10000);

// Botões clicáveis
for (let i = 1; i <= qnt_banners; i++) {
    const btn = document.getElementById(`btn_banner_${i}`);
    if (btn) {
        btn.addEventListener("click", () => {
            switchBanner(i);
            actual_banner = i;
        });
    }
}
