import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import moment from "moment";

const Messages = ({ user, message }) => {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
    return (
        <TypeOfMessage>
            {message.message}
            <TimeStamp>
                {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
            </TimeStamp>
        </TypeOfMessage>
    )
}

export default Messages

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
`;

const Sender = styled(MessageElement)`
  background-color: #E1FFC7;
  word-break: break-word;
  margin-left: auto
`;

const Reciever = styled(MessageElement)`
  background-color: #fff;
  word-break: break-word;
`;

const TimeStamp = styled.div`
color: gray;
padding: 10px;
font-size: 9px;
position: absolute;
bottom: 0;
text-align: right;
right: 0;
`;