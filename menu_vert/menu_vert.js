document.addEventListener('DOMContentLoaded', () => {
  const menuLateral = document.getElementById('menu_lateral');
  const menuToggle = document.getElementById('menu_toggle');
  const menuIcon = document.getElementById('menu_icon');

  // Caminho das imagens
  const imgOpen = './assets/config.png';
  const imgClose = './assets/close.png';

  menuToggle.addEventListener('click', () => {
    menuLateral.classList.toggle('ativo');

    if (menuLateral.classList.contains('ativo')) {
      menuIcon.src = imgClose;
    } else {
      menuIcon.src = imgOpen;
    }
  });

  // Botão Configurações (exemplo)
  const btnConfig = document.getElementById('btn_config');
  btnConfig.addEventListener('click', () => {
    alert('Abrir painel de configurações (vamos fazer na próxima etapa)');
  });
});
