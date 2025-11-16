auth.onAuthStateChanged(async user => {
  const estaNaMaster = window.location.pathname.includes("master/");
  const estaNaLoja   = window.location.pathname.includes("loja/");

  // Se NÃO está logado → voltamos ao login
  if (!user) {
    window.location.href = "../login.html";
    return;
  }

  // Busca dados do usuário
  const doc = await db.collection("usuarios").doc(user.uid).get();
  const dados = doc.data();

  // Salvar usuário MASTER no localStorage
  if (dados.tipo === "master") {
    localStorage.setItem("MASTER_USER", JSON.stringify({
      uid: user.uid,
      nome: dados.nome,
      email: user.email
    }));
  }

  // Se o usuário é MASTER e está tentando entrar na área LOJA → bloquear
  if (dados.tipo === "master" && estaNaLoja) {
    window.location.href = "../master/dashboard.html";
    return;
  }

  // Se o usuário é LOJA e está tentando entrar na área MASTER → bloquear
  if (dados.tipo === "loja" && estaNaMaster) {
    window.location.href = "../loja/dashboard.html";
    return;
  }

  // 🚀 EVITAMOS REDIRECIONAR SE ELE ESTÁ NA PÁGINA CERTA
  // Agora o usuário pode navegar entre páginas sem ser empurrado.
});
