import { useEffect, useRef } from "react";

export default function Messages({ messages }) {
  // scroll to bottom when receiving new messages
  const chatWindowRef = useRef(null);
  useEffect(() => {
    chatWindowRef.current.scrollTo(0, chatWindowRef.current.scrollHeight);
  }, [messages]);

  const isOdd = (index) => index % 2 === 0;

  return (

      <div
        ref={chatWindowRef}
        className="flex flex-col w-full p-4 py-6 h-[64%] border-solid rounded-xl overflow-scroll scrollbar-hide"
      >
        {messages?.map((message, index) => (
          <div
            className={`flex ${isOdd(index) ? "justify-end" : "justify-start"}`}
            // eslint-disable-next-line react/no-array-index-key
            key={message+index}
          >
            <div
              className={`px-4 py-2 my-1 rounded-3xl max-w-[80%] ${
                isOdd(index) ? "bg-orange-300 text-white" : "bg-white"
              }`}
            >
              {message}
            </div>
          </div>
        ))}
      </div>
  );
}
