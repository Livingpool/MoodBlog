import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CommentBoxTextarea({ text, setText, onClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isComposing, setIsComposing] = useState(false); // to prevent Chinese typing problem

  const handleSend = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setText("");
      await onClick(); // API
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // 檢查是否處於中文輸入模式的 Enter
    if (isComposing) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <div className="relative w-full">
      <Textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        label="Message"
        rows={6}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        disabled={isLoading}
      />
      <div className="flex w-full justify-between py-1.5">
        <IconButton
          variant="text"
          color="blue-gray"
          size="sm"
          onClick={() =>
            Swal.fire({
              title: "尚未開放此功能",
              confirmButtonText: "繼續"
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </IconButton>
        <div className="flex gap-2">
          <Button
            size="sm"
            color="red"
            variant="text"
            className="rounded-md text-red-400"
            onClick={() => setText("")}
          >
            Clear
          </Button>
          <Button
            size="sm"
            className="rounded-md bg-slate-600"
            onClick={handleSend}
          >
            Send a message
          </Button>
        </div>
      </div>
    </div>
  );
}
