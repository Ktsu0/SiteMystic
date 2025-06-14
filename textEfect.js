const span = document.getElementById('magic-span');
const letter = span.querySelector('.letter');
const icon = span.querySelector('.icon-img');

export function startEffect() {
    // Fase 1: Letra normal (4s)
    setTimeout(() => {
        // Fase 2: Aplica blur (1s)
        letter.classList.add('blurred');
        
        setTimeout(() => {
            // Fase 3: Esconde letra (sem transição)
            letter.style.transition = 'none'; // Remove transição momentaneamente
            letter.classList.add('hidden');
            
            // Restaura transição após mudança
            setTimeout(() => {
                letter.style.transition = 'filter 1s ease-in-out, opacity 1s ease-in-out';
                
                // Fase 4: Mostra ícone (6s)
                icon.classList.add('visible');
                
                setTimeout(() => {
                    // Fase 5: Esconde ícone
                    icon.classList.remove('visible');
                    
                    // Fase 6: Mostra letra (sem blur)
                    letter.classList.remove('hidden');
                    letter.classList.remove('blurred');
                    
                    // Reinicia após ciclo completo
                    setTimeout(startEffect, 4000);
                }, 6000);
            }, 10); // Pequeno delay para garantir renderização
        }, 1000);
    }, 4000);
}

// Inicia com delay para carregamento da página
setTimeout(startEffect, 1000);