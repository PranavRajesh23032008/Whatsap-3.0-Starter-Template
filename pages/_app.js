import '../styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth"
import db, { auth } from "../firebase.js"
import { useEffect } from "react"
import Login from "./login.js"
import Loading from "./loading.js"
import firebase from "firebase"

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.email).set(
        {
          email: user.email,
          name: user.displayName,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
          uuid: user.uid
        },
      );
    }
  }, [user])
  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />
}

export default MyApp
