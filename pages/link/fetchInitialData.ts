import axiosInstance from "@/lib/api/axiosInstanceApi";
import { FolderData } from "@/types/folderType";
import { LinkData } from "@/types/linkTypes";

// 반환 타입을 union type으로 수정
const fetchInitialData = async (
  token: string,
  endpoint: string
): Promise<{ list: LinkData[]; totalCount: number } | FolderData[]> => {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // 데이터 구조가 올바른지 확인 필요
};

export default fetchInitialData;
