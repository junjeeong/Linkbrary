import { useQuery } from "@tanstack/react-query";
import { getFolder } from "@/lib/api/folder";

const useFolderName = (folderId: string | string[] | undefined) => {
  const { data: folderName, error } = useQuery({
    queryKey: ["folderName", folderId],
    queryFn: async () => {
      if (!folderId) return null; // folderId가 없을 경우 기본값
      const res = await getFolder(folderId as string);
      return res.name;
    },
    enabled: !!folderId, // folderId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  });

  // 로딩 및 에러 처리
  if (error) {
    console.error("Failed to fetch folder Name:", error);
  }

  return [folderName];
};

export default useFolderName;
