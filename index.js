document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu_suspenso");
  const loginBox = document.getElementById("login_box");
  const mensagemAgendar = document.getElementById("mensagem_agendar");
  const menuIcon = document.getElementById("menu_icon");

  // Alterna o menu suspenso (abre/fecha)
  window.toggleMenu = function () {
    // Se o login estiver visível e o menu estiver aberto, só fecha o login
    if (loginBox.classList.contains("visivel") && menu.classList.contains("expandido")) {
      loginBox.classList.remove("visivel");
      return; // não fecha o menu
    }

    // Senão, alterna o menu normalmente
    menu.classList.toggle("expandido");

    // Se estiver recolhendo o menu, também esconde o login
    if (!menu.classList.contains("expandido")) {
      loginBox.classList.remove("visivel");
    }
  };

  // Abre o menu de login
  window.abrirLogin = function () {
    loginBox.classList.add("visivel");
  };

  // Fecha tudo ao clicar fora
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = menu.contains(event.target);

    if (!isClickInsideMenu) {
      menu.classList.remove("expandido");
      loginBox.classList.remove("visivel");
    }
  });

  // Impede o clique em "Quer agendar uma consulta?" de fechar
  mensagemAgendar.addEventListener("click", function (e) {
    e.stopPropagation();
    abrirLogin();
  });

  // Também evita que cliques internos no login_box fechem o menu
  loginBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// ICON Senha
window.alternarSenha = function () {
  const input = document.getElementById("senha_input");
  const icon = document.getElementById("toggle_senha");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
};


