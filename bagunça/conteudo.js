
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

const menuLinks = document.querySelectorAll("#menuItems li a");

menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const text = link.querySelector("span").textContent.toLowerCase();
    let contentHTML = "";

    switch(text) {
      case "conta":
        contentHTML = `
          <h2>Minha Conta</h2>
          <p>Aqui você pode editar suas informações de conta e preferências.</p>
          <button>Editar Perfil</button>
          <button>Alterar Senha</button>
        `;
        break;
      case "configuração":
        contentHTML = `
          <h2>Configurações</h2>
          <p>Ajuste suas preferências e configurações do sistema.</p>
          <button>Notificações</button>
          <button>Privacidade</button>
        `;
        break;
      case "ajuda":
        contentHTML = `
          <h2>Ajuda</h2>
          <p>Encontre respostas e suporte para dúvidas comuns.</p>
          <button>FAQ</button>
          <button>Contato</button>
        `;
        break;
      case "sair":
        contentHTML = `
          <h2>Sair</h2>
          <p>Deseja realmente sair da sua conta?</p>
          <button id="confirmLogout">Confirmar Logout</button>
          <button id="cancelLogout">Cancelar</button>
        `;
        break;
      default:
        contentHTML = `<p>Opção não encontrada.</p>`;
    }

    modalBody.innerHTML = contentHTML;
    modalOverlay.style.display = "flex";

    if(text === "sair") {
      document.getElementById("confirmLogout").addEventListener("click", () => {
        alert("Você saiu!");
        modalOverlay.style.display = "none";
      });
      document.getElementById("cancelLogout").addEventListener("click", () => {
        modalOverlay.style.display = "none";
      });
    }
  });
});

modalClose.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (e) => {
  if(e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});