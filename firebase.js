import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCAOqg1sJrv-1awkU4-sNAZkO2z7l5gwUM",
    authDomain: "whatsapp-clone-coaching-call.firebaseapp.com",
    projectId: "whatsapp-clone-coaching-call",
    storageBucket: "whatsapp-clone-coaching-call.appspot.com",
    messagingSenderId: "1094168313642",
    appId: "1:1094168313642:web:ac374a1223d759a70e2853"
};

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, googleAuthProvider }
export default db