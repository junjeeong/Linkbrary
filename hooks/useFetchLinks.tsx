import { useEffect } from "react";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import { useQuery } from "@tanstack/react-query";

interface QueryKeys {
  pathname: string;
  page?: string | string[] | undefined;
  search?: string | string[] | undefined;
  folder?: string | string[] | undefined;
  isTablet: boolean;
}

// 링크 페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (
  setLinkListData: (data: { list: LinkData[]; totalCount: number }) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  queryKeys: QueryKeys
) => {
  const { pathname, folder, page, search, isTablet } = queryKeys;

  const fetchLinks = async () => {
    // 경로에 따라 API 엔드포인트 분기
    let endpoint =
      pathname === "/favorite"
        ? "/api/favorites"
        : folder
          ? `/api/folders/${folder}/links`
          : "/api/links";

    try {
      const res = await proxy.get(endpoint, {
        params: {
          page: page,
          pageSize: isTablet ? 6 : 9,
          search: search,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error("새로운 링크 목록을 불러오는데 실패했습니다");
    }
  };

  const { data, error, isSuccess, isLoading } = useQuery({
    queryKey: ["linkList", folder, search, pathname, isTablet], // query, pathname, isTablet이 바뀔 때 fresh -> stale
    queryFn: fetchLinks,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  });

  //
  useEffect(() => {
    if (isSuccess) {
      setLinkListData({ list: data.list, totalCount: data.totalCount });
    } else if (error) {
      console.error(error.message);
    }
  }, [data, error, isSuccess, setLinkListData]);

  // 로딩 상태 설정
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);
};

export default useFetchLinks;
