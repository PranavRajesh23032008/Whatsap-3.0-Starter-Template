import { Button } from "@material-ui/core"
import { auth, googleAuthProvider } from "../firebase.js"

const login = () => {
    const googleSignIn = () => {
        auth.signInWithRedirect(googleAuthProvider)
    }
    return (
        <div
            className={"rounded-sm text-center shadow-lg p-5"}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)"
            }}
        >
            <title>Login</title>
            <img className={"cursor-pointer h-52 w-52 "} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"} />
            <Button
                onClick={googleSignIn}
                style={{
                    marginTop: "30px",
                    marginBottom: "20px",
                    backgroundColor: "rgba(0, 0,0, 0.1)"

                }}
                className={" mt-10 text-center mx-auto focus:outline-none"}>Login using Google</Button>
        </div>
    )
}

export default login
