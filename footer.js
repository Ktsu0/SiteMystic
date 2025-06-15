function createFooter() {
    // Pega o footer já existente no HTML
    const footer = document.getElementById("footer");
    
    // Cria o container dos botões
    const btns_footer = document.createElement("div");
    btns_footer.id = "btns_footer";

    // Botão WhatsApp
    const btnWhatsapp = document.createElement("button");
    btnWhatsapp.className = "btn_footer";
    btnWhatsapp.id = "btnWhatsapp";

    const iconWhatsapp = document.createElement("i");
    iconWhatsapp.className = "icon fa-brands fa-whatsapp icontwo";

    btnWhatsapp.appendChild(iconWhatsapp);
    btnWhatsapp.addEventListener("click", () => {
        window.open("https://wa.me/seuNumero", "_blank");
    });

    // Botão Instagram
    const btnInstagram = document.createElement("button");
    btnInstagram.className = "btn_footer";
    btnInstagram.id = "btnInstagram";

    const iconInstagram = document.createElement("i");
    iconInstagram.className = "icon fa-brands fa-instagram icontheer";

    btnInstagram.appendChild(iconInstagram);
    btnInstagram.addEventListener("click", () => {
        window.open("https://instagram.com/seuUsuario", "_blank");
    });

    // Adiciona os botões no container
    btns_footer.appendChild(btnWhatsapp);
    btns_footer.appendChild(btnInstagram);

    // Limpa o footer antes de inserir os botões para evitar duplicação
    footer.innerHTML = "";

    // Adiciona o container dos botões dentro do footer já existente
    footer.appendChild(btns_footer);
}

document.addEventListener('DOMContentLoaded', createFooter);