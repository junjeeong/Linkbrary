import Image from "next/image";
import SubmitButton from "../SubMitButton";
import useModalStore from "@/store/useModalStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Modal } from "../modal/modalManager/ModalManager";
import { urlRegex } from "@/util/regex";
import { FolderData } from "@/types/folderType";

const AddLinkInput = ({ folderList }: { folderList: FolderData[] }) => {
  const [link, setLink] = useState("");
  const { isOpen, openModal } = useModalStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleClick = () => {
    if (link === "") {
      toast.error(toastMessages.error.inputLink);
    } else if (!urlRegex.test(link.trim())) {
      toast.error(toastMessages.error.invalidLink);
    } else {
      openModal("AddModal", { list: folderList, link: link });
      setLink("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="flex justify-between items-center bg-white sm:px-[10px] md:px-5 lg:px-5 border border-blue-500 rounded-[10px] w-full sm:w-[325px] md:w-[704px] sm:max-w-[325px] md:max-w-[704px] lg:max-w-[800px] h-[69px] sm:h-[53px] transition-all">
      <div className="flex">
        <Image src="/icons/link.svg" width={20} height={20} alt="link icon" />
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={link}
          placeholder="링크를 추가해 보세요."
          className="sm:ml-[8px] md:ml-3 lg:ml-3 sm:w-[190px] md:w-[530px] lg:w-[630px] overflow-hidden"
        />
      </div>
      <div className="w-[80px] h-[37px]">
        <SubmitButton
          className="w-full h-full text-[14px]"
          onClick={handleClick}
        >
          추가하기
        </SubmitButton>
      </div>

      {isOpen && <Modal />}
    </div>
  );
};

export default AddLinkInput;
