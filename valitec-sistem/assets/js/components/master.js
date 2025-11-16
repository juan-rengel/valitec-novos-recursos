// master.js — Componentes básicos do Painel MASTER
// Compatível com Firebase e layout atual

/* -----------------------------------------
   1. TOGGLE DA SIDEBAR (mobile)
----------------------------------------- */
const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector("#toggleSidebar");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

/* -----------------------------------------
   2. ALTERAR TEMA (Dark / Light)
----------------------------------------- */
const themeBtn = document.querySelector("#toggleTheme");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });
}

// Restaurar tema salvo
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

/* -----------------------------------------
   3. HEADER — Carregar nome do usuário MASTER
----------------------------------------- */
function carregarUsuarioMaster() {
  const nomeSpan = document.querySelector("#usuarioMaster");

  if (!nomeSpan) return;

  const userData = JSON.parse(localStorage.getItem("MASTER_USER"));

  if (userData && userData.nome) {
    nomeSpan.textContent = userData.nome;
  } else {
    nomeSpan.textContent = "MASTER";
  }
}
carregarUsuarioMaster();

/* -----------------------------------------
   4. LOGOUT DO MASTER
----------------------------------------- */
const logoutBtn = document.querySelector("#logoutMaster");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("MASTER_USER");
    window.location.href = "master-login.html";
  });
}

/* -----------------------------------------
   5. FUNÇÕES GERAIS PARA FUTUROS DASHBOARDS
----------------------------------------- */

// Carregar dados de forma assíncrona (Firebase futuramente)
async function carregarDados(path) {
  try {
    const response = await fetch(path);
    return await response.json();
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
    return null;
  }
}

// Atualizar card genérico
function atualizarCard(id, valor) {
  const el = document.querySelector(`#${id}`);
  if (el) el.textContent = valor;
}

/* -----------------------------------------
   6. Tabelas — Filtro Global
----------------------------------------- */
function aplicarFiltroTabela(tabelaId, campoBuscaId) {
  const tabela = document.getElementById(tabelaId);
  const campo = document.getElementById(campoBuscaId);

  if (!tabela || !campo) return;

  campo.addEventListener("keyup", () => {
    const filtro = campo.value.toLowerCase();
    const linhas = tabela.getElementsByTagName("tr");

    for (let i = 1; i < linhas.length; i++) {
      const textoLinha = linhas[i].textContent.toLowerCase();
      linhas[i].style.display = textoLinha.includes(filtro) ? "" : "none";
    }
  });
}

/* -----------------------------------------
   7. Exportação (CSV)
----------------------------------------- */
function exportarCSV(tabelaId, nomeArquivo = "dados.csv") {
  const tabela = document.getElementById(tabelaId);
  if (!tabela) return;

  let csv = "";
  const linhas = tabela.querySelectorAll("tr");

  linhas.forEach(linha => {
    const colunas = linha.querySelectorAll("td, th");
    const valores = [];

    colunas.forEach(col => valores.push(col.innerText.replace(/,/g, " ")));

    csv += valores.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = nomeArquivo;
  link.click();
}

// Disponível globalmente
window.Master = {
  aplicarFiltroTabela,
  exportarCSV,
  atualizarCard,
  carregarDados
};