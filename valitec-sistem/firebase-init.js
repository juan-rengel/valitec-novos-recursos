const firebaseConfig = {
    apiKey: "AIzaSyDPIlkTLbaeUiuvfvijWf5fofREw5oE8ic",
    authDomain: "valitec-mj.firebaseapp.com",
    projectId: "valitec-mj",
    storageBucket: "valitec-mj.firebasestorage.app",
    messagingSenderId: "616592039657",
    appId: "1:616592039657:web:3827a890474111be85da78"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

