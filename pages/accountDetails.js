import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { auth } from "../firebase"
import { useRouter } from "next/router"
import Head from "next/head"
import { IconButton } from '@material-ui/core';
import styled from "styled-components"


const accountDetails = () => {
    const user = auth.currentUser
    const router = useRouter()
    const goBack = () => {
        router.push("/")
    }
    return (
        <AccountDetails style={{ height: "100vh", backgroundColor: "#EDEDED" }} className={"w-72"}>
            <Head>
                <title>
                    Account Details
                </title>
            </Head>
            <header style={{
                backgroundColor: "#11887A",
            }} className={"p-5 flex items-center text-white"}>
                <IconButton onClick={goBack} className={"mr-2 focus:outline-none"} n>
                    < ArrowBackIcon className={"text-white"} />
                </IconButton>
                <p className={"text-xl"}>Profile</p>
            </header>
            <div>
                <img src={user?.photoURL} className={"h-52 w-52 rounded-full mx-auto my-3"} />
                <div className={"bg-white shadow-sm px-5 py-2 mb-2"}>
                    <p className={"mb-3"}
                        style={{
                            color: "#11887A"
                        }}
                    >Your Name</p>
                    <h1>{user?.displayName}</h1>
                </div>
                <div className={"bg-white shadow-sm px-5 py-2"}>
                    <p className={"mb-3"}
                        style={{
                            color: "#11887A"
                        }}
                    >Your Email</p>
                    <h1>{user?.email}</h1>
                </div>
            </div>
        </AccountDetails>
    )
}

export default accountDetails

const AccountDetails = styled.div`
@media (max-width: 768px) {
    width: 100%
}
`;
