// NAVBAR.JS — controla header, nome do usuário e troca do título da página

document.addEventListener("DOMContentLoaded", () => {

  // Atualiza título automaticamente pelo nome do arquivo atual
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) {
    const file = window.location.pathname.split("/").pop().replace(".html", "");
    const nomes = {
      "dashboard": "Dashboard Master",
      "lojas": "Lojas Cadastradas",
      "produtos": "Produtos",
      "rebaixados": "Produtos Rebaixados",
      "graficos": "Gráficos e Indicadores",
      "relatorios": "Relatórios"
    };
    if (nomes[file]) pageTitle.textContent = nomes[file];
  }

  // Carrega nome do usuário autenticado
  if (typeof auth !== "undefined") {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userNameElement = document.getElementById("userName");
        if (userNameElement) {
          db.collection("usuarios").doc(user.uid).get().then(doc => {
            const dados = doc.data();
            userNameElement.textContent = dados?.nome || "Usuário";
          });
        }
      }
    });
  }

});

// Logout
function logout() {
  if (typeof auth !== "undefined") {
    auth.signOut().then(() => {
      window.location.href = "../login.html";
    });
  }
}
