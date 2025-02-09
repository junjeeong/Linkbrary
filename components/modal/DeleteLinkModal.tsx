import useModalStore from "@/store/useModalStore";
import SubmitButton from "../SubMitButton";
import ModalContainer from "./modalComponents/ModalContainer";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import { useQueryClient } from "@tanstack/react-query";

const DeleteLinkModal = ({
  link,
  linkId,
}: {
  link: string;
  linkId: number;
}) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  const { deleteLink } = useLinkCardStore();

  const handleDelete = async () => {
    try {
      await deleteLink(linkId);
      closeModal();
      toast.success(toastMessages.success.deleteLink);
      queryClient.invalidateQueries({ queryKey: ["linkList"] });
    } catch (error) {
      toast.error(toastMessages.error.deleteLink);
    }
  };

  return (
    <ModalContainer title="링크 삭제" subtitle={link}>
      <SubmitButton
        type="button"
        onClick={handleDelete}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteLinkModal;
