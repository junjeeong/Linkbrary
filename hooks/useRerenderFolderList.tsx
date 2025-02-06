import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/lib/api/folder";
import { FolderData } from "@/types/folderType";

// 모달이 닫혔을 때 새로운 FolderList를 보여주는 커스텀 훅
const useRerenderFolderList = (
  isOpen: boolean,
  setFolderList: React.Dispatch<React.SetStateAction<FolderData[]>>
) => {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["folderList"],
    queryFn: getFolders,
    enabled: isOpen,
    staleTime: 1000 * 60 * 5,
  });

  if (isSuccess) {
    setFolderList(data);
  } else if (isError) {
    console.error(
      "tanstack-query error : 새로운 폴더 목록을 불러오지 못했습니다.",
      error
    );
  }
};

export default useRerenderFolderList;
