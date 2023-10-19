import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import CommentBoxTextarea from "./CommentBox";
import useSessionMessages from "../../../hooks/chat/useSessionMessages";
import useSendingSessionMessage from "../../../hooks/chat/useSendingSessionMessage";
import Messages from "./Messages";


export default function Window({ activeSessionId }) {
  const { messages, mutate } = useSessionMessages(activeSessionId);
  const { trigger: sendSessionMessage, messages: newMessagesAfterSending, isMutating } = useSendingSessionMessage(activeSessionId);
  const [commentText, setCommentText] = useState("");

  const handleClickSending = async () => {
    mutate({messages: [ ...messages, commentText ]}, {revalidate: false});
    await sendSessionMessage({ content: commentText });
    mutate({messages: newMessagesAfterSending});
  };

  return (
    <div className="relative w-full h-full p-10 pb-6 flex flex-col justify-between">
      <Messages messages={messages} isLoading={isMutating} />
      <CommentBoxTextarea
        text={commentText}
        setText={setCommentText}
        onClick={handleClickSending}
      />
      {isMutating &&<div className="absolute inset-0 w-full h-full flex justify-center items-center bg-black/10"><Spinner /></div>}
    </div>
  );
}
