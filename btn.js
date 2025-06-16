export function precione_btn() {
  const btn = document.getElementById("btn_menu");
  btn.addEventListener("click", function () {
    this.classList.toggle("open");
  });
}
