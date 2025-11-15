auth.onAuthStateChanged(user => {
if (!user) {
window.location.href = "login.html";
return;
}


// Carrega permissões do usuário
db.collection("usuarios").doc(user.uid).get().then(doc => {
const dados = doc.data();


if (dados.tipo === "master")
window.location.href = "master/dashboard.html";
else
window.location.href = "loja/dashboard.html";
});
});