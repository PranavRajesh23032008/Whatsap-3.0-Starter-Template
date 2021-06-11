import { Avatar } from "@material-ui/core";
import styled from "styled-components"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import { IconButton } from "@material-ui/core"
import { Send, ArrowBack } from "@material-ui/icons"
import db, { auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import Message from "./Messages"
import firebase from "firebase"
import { useAuthState } from "react-firebase-hooks/auth";

const ChatScreen = ({ name, pic, email }) => {
    const [user] = useAuthState(auth)
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const router = useRouter()
    const endOfMessagesRef = useRef(null);
    const [messagesSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    const ScrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const send = (e) => {
        e.preventDefault()
        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: message,
            user: user.email,
            photoURL: user.photoURL,
        });
        setMessage("")
        ScrollToBottom();
    }
    return (
        <Container>
            <Header>
                <ButtonIcon className={"mr-3 focus:outline-none cursor-pointer"}>
                    < ArrowBack onClick={() => { router.push("/") }} />
                </ButtonIcon>
                <Avatar src={pic} onClick={openModal} className={"cursor-pointer"} />
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md pt-5 px-5 my-8 overflow-hidden justify-content-center text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <div className="flex items-center">
                                        <img className={"w-40 h-40 rounded-l-2xl"} src={pic} />
                                        <div className={"p-2"}>
                                            <span style={{
                                                color: "#11887A"
                                            }} className={"font-bold"}>Name:</span> {name}
                                            <br />
                                            <span style={{
                                                color: "#11887A"
                                            }} className={"font-bold"}>Email:</span>{email}
                                            <br />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="button" className={"focus:outline-none"}>

                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
                <HeaderInformation style={{
                    marginLeft: 10,
                }}>
                    <p style={{ color: "#515151" }} className={"text-lg font-semibold "}>{name}</p>
                </HeaderInformation>
            </Header>
            <MessageContainer className={"removeScroller"}>
                {ScrollToBottom}
                {messagesSnapshot?.docs.map((message) => (
                    <Message key={message.id} user={message.data().user} message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }} />
                ))}
            </MessageContainer>
            <div ref={endOfMessagesRef} />
            <InputContainer>
                <Input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={`Send a message to ${name}`}
                />
                <ButtonIcon className={"focus:outline-none"} disabled={!message} type="submit" onClick={send} >
                    <Send />
                </ButtonIcon>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
display: flex;
flex-direction: column;
flex: 0.65;
height: 100vh;
`;

const HeaderInformation = styled.div``;

const Header = styled.div`
align-items: center;
  padding: 20px;
  display: flex;
  border-bottom: 1px solid lightgray;
  background-color: #f5f5f5;
`;

const MessageContainer = styled.div`
flex: 1;
overflow: scroll;
background-color: #E4DBD6
`;

const Input = styled.input`
flex: 1;
outline: 0;
border: none;
background-color: transparent
`;

const InputContainer = styled.form`
align-items: center;
padding: 20px;
display: flex;
border-top: 1px solid lightgray;
background-color: #f5f5f5;
`;

const ButtonIcon = styled(IconButton)`
@media (min-width: 768px) {
  display: none;
}
`;