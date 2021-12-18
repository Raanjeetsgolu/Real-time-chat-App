import React, { useRef, useEffect,useState ,useMemo} from "react";
import Moment from "react-moment";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const Message = ({ msg, user1,user2Status,chat}) => {
  const scrollRef = useRef();
  const user2=chat;
  const [data, setData] = useState("");
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

   onSnapshot(doc(db, "lastMsg", id), (doc) => {
    setData(doc.data());
  });
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  // const user2st=useMemo(() =>, [user2Status])
  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text} 
        {data?.from === user2 && data?.unread && (
              <small className="unread">New</small>
            )}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>{user2Status ? "✔✔" : "✔" }
        </small>
      </p>
    </div>
  );
};

export default Message;
