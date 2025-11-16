// SIDEBAR.JS — toggle e ativação do link atual
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const links = document.querySelectorAll(".sidebar nav a");
  const paginaAtual = window.location.pathname.split("/").pop();

  // ativa o link correto
  links.forEach(link => {
    if (link.getAttribute("href") === paginaAtual || (paginaAtual === "" && link.getAttribute("href") === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // comportamento de toggle (abre/fecha)
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // adiciona/remova a classe open
      sidebar.classList.toggle("open");
    });
  }

  // click fora da sidebar fecha (mobile)
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 900) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove("open");
      }
    }
  });

  // se for resize, remove open para evitar estado quebrado
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      sidebar.classList.remove("open");
    }
  });
});
