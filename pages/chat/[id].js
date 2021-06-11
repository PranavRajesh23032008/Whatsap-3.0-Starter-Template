import Sidebar from "../../components/Sidebar"
import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth"
import db, { auth } from "../../firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import getRecipientEmail from "../../utils/getRecipientEmail"
import { useRouter } from "next/router"
import ChatScreen from "../../components/ChatScreen.js"

const Chat = ({ chat, messages }) => {
    const [user] = useAuthState(auth)
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
    );
    const router = useRouter()
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <div className={"flex"}>
            {recipient ? (
                <title>You are currently Chatting with {recipient?.name}</title>
            ) : (<title>You are currently Chatting with {recipientEmail}</title>)
            }
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <ChatScreenContainer>
                {recipient ? (
                    <ChatScreen
                        pic={recipient?.photoURL}
                        name={recipient?.name}
                        email={recipient?.email}
                    />) : (
                    <ChatScreen
                        pic={recipient?.photoURL}
                        name={recipientEmail}
                    />
                )}
            </ChatScreenContainer>
        </div >
    )
}

export default Chat

export async function getServerSideProps(context) {
    const messageRef = await db.collection("chats").doc(context.query.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get();
    const messages = messageRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
        .map((messages) => ({
            ...messages,
            times: messages.timestamp.toDate().getTime()
        }))

    const chatRef = await db.collection("chats").doc(context.query.id).get();
    const chat = {
        id: chatRef.id,
        ...chatRef.data(),
    }
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}

const SidebarContainer = styled.div`
@media (max-width: 768px) {
    display: none;
};
`;

const ChatScreenContainer = styled.div`
flex: 1;
height: 100vh;
`
