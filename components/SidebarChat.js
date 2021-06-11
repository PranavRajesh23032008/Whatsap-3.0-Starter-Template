import { Avatar } from "@material-ui/core"
import getRecipientEmail from "../utils/getRecipientEmail"
import { useRouter } from "next/router"
import { useCollection } from "react-firebase-hooks/firestore"
import db, { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const SidebarChat = ({ id, users }) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(users, user))
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);
    const goToChat = () => {
        router.push(`/chat/${id}`)
    }
    return (
        <div onClick={goToChat} className={"flex items-center bg-gray-100 w-full cursor-pointer p-5 active:bg-white"}>
            {recipient ? (
                <Avatar src={recipient?.photoURL} />
            ) : (
                <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
            )}

            {recipient ? (
                <p className={"font-semibold text-lg ml-2"}>
                    {recipient?.name}
                </p>
            ) : (
                <p className={"font-semibold text-lg ml-2"}>{recipientEmail}</p>
            )}

        </div>
    )
}

export default SidebarChat
