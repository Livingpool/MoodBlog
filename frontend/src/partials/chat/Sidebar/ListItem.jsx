import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button
} from "@material-tailwind/react";
import { useState } from "react";
import Swal from "sweetalert2";
import useDeletingSession from "../../../hooks/chat/useDeletingSession";
import useEditingSessionTitle from "../../../hooks/chat/useEditingSessionTitle";

export default function ChatListItem({
  title,
  id,
  activeSessionId,
  setActiveSessionId
}) {
  const { trigger: editSession } = useEditingSessionTitle(id);
  const { trigger: deleteSession } = useDeletingSession(id);
  const [open, setOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);
  const handleOpen = () => setOpen(!open);

  const handleEditingSession = async () => {
    editSession(inputTitle);
    handleOpen();
    await Swal.fire({
      title: "編輯成功",
      icon: "success",
      confirmButtonText: "繼續"
    });
    window.location.reload();
  };

  const handleDeletingSession = async () => {
    deleteSession();
    await Swal.fire({
      title: "刪除成功",
      icon: "success",
      confirmButtonText: "繼續"
    });
    window.location.reload();
  };

  return (
    <>
      <ListItem
        onClick={() => setActiveSessionId(id)}
        className={`group relative${
          activeSessionId === id ? " bg-slate-100" : ""
        }`}
        ripple={false}
        key={id}
      >
        <ListItemPrefix>
          <ChatBubbleBottomCenterIcon className="h-5 w-5 mr-2" />
        </ListItemPrefix>
        {title}
        <ListItemSuffix className="flex gap-2 opacity-0 group-hover:opacity-100">
          <PencilIcon onClick={handleOpen} className="h-5 w-5" />
          <ArchiveBoxXMarkIcon
            onClick={handleDeletingSession}
            className="h-5 w-5"
          />
        </ListItemSuffix>
      </ListItem>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Edit Chat Title</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              label="Title"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button
            variant="gradient"
            color="orange"
            onClick={handleEditingSession}
          >
            send
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
