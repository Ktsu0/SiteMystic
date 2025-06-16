document.addEventListener("DOMContentLoaded", function () {
  const btnEntrar = document.getElementById("btn_entrar");
  const emailInput = document.querySelector("#login_box input[type='email']");
  const senhaInput = document.getElementById("senha_input");

  // Função para extrair o primeiro nome do email
  function pegarPrimeiroNomeDoEmail(email) {
    // Pega a parte antes do @
    let nome = email.split("@")[0];

    // Pega só a parte com letras (até primeiro número ou caractere especial)
    const match = nome.match(/[a-zA-Z]+/);
    if (match) {
      nome = match[0];
    } else {
      nome = nome; // fallback caso não encontre letras (raro)
    }

    // Primeira letra maiúscula, resto minúsculo
    nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

    return nome;
  }

  // Função para atualizar a interface mostrando o usuário logado
  function mostrarUsuarioLogado(email) {
    let menuIcon = document.getElementById("menu_icon");

    const primeiroNome = pegarPrimeiroNomeDoEmail(email);

    menuIcon.innerHTML = `
      <img class="icon" src="./../assets/tarot.png" alt="Ícone">
      <span style="margin-left: 8px; color: white; font-weight: bold;">Olá, ${primeiroNome}</span> 
      <button id="btn_logout" style="margin-left: 12px; cursor: pointer;">Sair</button>
    `;

    document.getElementById("mensagem_agendar").style.display = "none";
    document.getElementById("login_box").classList.remove("visivel");

    document.getElementById("btn_logout").addEventListener("click", function () {
      localStorage.removeItem("usuarioLogado");
      location.reload();
    });
  }

  // Verifica se já tem usuário salvo no localStorage (login persistente)
  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    mostrarUsuarioLogado(usuarioSalvo);
  }

  // Evento do botão entrar
  btnEntrar.addEventListener("click", function () {
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      alert("Por favor, preencha o e-mail e a senha.");
      return;
    }

    // Simula login salvando o email
    localStorage.setItem("usuarioLogado", email);
    mostrarUsuarioLogado(email);
  });
});