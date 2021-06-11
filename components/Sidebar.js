import { Avatar, Menu, MenuItem, IconButton } from "@material-ui/core"
import { auth } from '../firebase'
import db from '../firebase'
import styled from "styled-components"
import { AccountCircle, Chat, ExitToAppOutlined } from "@material-ui/icons"
import { Dialog, Transition } from '@headlessui/react'
import * as EmailValidator from "email-validator"
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth"
import SidebarChat from "./SidebarChat"

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    var [prompt, setPrompt] = useState("")
    const userChatsReference = db
        .collection("chats")
        .where("users", "array-contains", user?.email);
    const [chatsSnapshot] = useCollection(userChatsReference);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ViewAccountDetails = () => {
        router.push("/accountDetails")
    }

    const signOut = () => {
        router.push("/")
        auth.signOut()
    }

    function closeModal() {
        setIsOpen(false)
        setPrompt("")
    }

    function openModal() {
        setIsOpen(true)
    }

    const createChat = (e) => {
        e.preventDefault()
        prompt = prompt.toLowerCase()
        const chatAlreadyExists = (recipientEmail) =>
            !!chatsSnapshot?.docs.find((chat) =>
                chat.data().users.find((user) => user === recipientEmail)?.length > 0
            )
        if (EmailValidator.validate(prompt) === true) {
            if (prompt === user?.email) {
                alert("You cannot chat with yourself")
            } else {
                if (EmailValidator.validate(prompt) && !chatAlreadyExists(prompt)) {
                    db.collection("chats").add({
                        users: [user?.email, prompt]
                    })
                } else {
                    alert(`\"${prompt}\" already exists`)
                }

            }
        } else {
            alert(`\"${prompt}\" is an invalid email format`)
        }
        console.log(prompt)
        closeModal()
    }

    return (
        <SidebarComponent style={{ backgroundColor: "#F8F8F8" }}>
            {/* Top of Sidebar */}
            <SidebarTopPart className={" bg-gray-200 flex items-center p-5"}>
                <Avatar className={"cursor-pointer"} onClick={handleClick} src={user?.photoURL} />

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={ViewAccountDetails}><AccountCircle className={"mr-2"} /> Accout Details</MenuItem>
                    <MenuItem onClick={signOut}><ExitToAppOutlined className={"mr-2"} /> Sign Out</MenuItem>
                </Menu>
                <div style={{
                    width: "92.7%",
                    justifyContent: "flex-end",
                }} className={"flex flex-1 items-center text-gray-500 "}>
                    <IconButton type="button"
                        onClick={openModal}
                        className={"focus:outline-none"}>
                        <Chat />
                    </IconButton>
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
                                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Enter Email to create a Chat
                                        </Dialog.Title>
                                        <form>
                                            <div className="my-5">
                                                <input
                                                    value={prompt}
                                                    onChange={e => setPrompt(e.target.value)}
                                                    placeholder={"Email"}
                                                    className={"focus:outline-none w-full p-1 bg-gray-100 rounded-md"}
                                                />
                                            </div>

                                            <div className="mt-4 text-right">
                                                <button
                                                    type="submit"
                                                    className="justify-between px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                                                    onClick={createChat}
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </SidebarTopPart>
            {/* Chat List */}
            {/* <div style={{ height: "87.5vh" }} className={"removeScroller overflow-scroll"}>
                {chatsSnapshot?.docs.map((chat) => (
                    <SidebarChat key={chat.id} id={chat.id} users={chat.data().users} />
                ))}
            </div> */}
            <div className={"flex-1  removeScroller overflow-scroll"}>
                {chatsSnapshot?.docs.map((chat) => (
                    <>
                        <SidebarChat key={chat.id} id={chat.id} users={chat.data().users} />
                    </>
                ))}
            </div>

        </SidebarComponent>
    )
}

export default Sidebar

const SidebarComponent = styled.div`
    flex: 0.45;
    display: flex;
    flex-direction: column;
    height: 100vh;
    @media (min-width: 768px) {
        width: 270px
    }
`;

const SidebarTopPart = styled.div`
position: sticky;
z-index: 100;
top: 0;
display: flex;
align-items: center;
`;