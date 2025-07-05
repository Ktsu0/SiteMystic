document.addEventListener("DOMContentLoaded", function () {
  const boxMenu = document.querySelector(".box-menu");
  const toggleWrapper = document.querySelector(".box-menu .wrapper");
  const menuIcon = document.getElementById("menu-icon");
  const links = document.querySelectorAll(".menu_v a");

  toggleWrapper.addEventListener("click", function () {
    // Adiciona fade-out visual
    menuIcon.classList.add("fade-out");

    // Aguarda a animação de fade
    setTimeout(() => {
      const isOpen = boxMenu.classList.toggle("full-menu");

      // Troca as classes do ícone
      menuIcon.classList.remove("fa-bars", "fa-xmark"); // remove ambos
      menuIcon.classList.add(isOpen ? "fa-xmark" : "fa-bars");

      // Reativa o fade-in
      menuIcon.classList.remove("fade-out");
    }, 400); // corresponde ao tempo da transição CSS
  });

  // Gerenciar a classe "active" nos links do menu
  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((el) => el.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
