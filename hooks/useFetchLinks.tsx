import { useEffect } from "react";
import { useRouter } from "next/router";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import { useQuery } from "@tanstack/react-query";
import useViewport from "./useViewport";

// 링크 페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (
  setLinkCardList: (list: LinkData[], totalCount: number) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { isTablet } = useViewport();

  const fetchLinks = async () => {
    // 경로에 따라 API 엔드포인트 분기
    let endpoint =
      pathname === "/favorite"
        ? "/api/favorites"
        : query?.folder
          ? `/api/folders/${query.folder}/links`
          : "/api/links";

    const res = await proxy.get(endpoint, {
      params: {
        page: query?.page,
        pageSize: isTablet ? 6 : 9,
        search: query?.search,
      },
    });
    return res.data;
  };

  const { isLoading } = useQuery({
    queryKey: ["links", query, pathname, isTablet], // query, pathname, isTablet이 바뀔 때 fresh -> stale
    queryFn: fetchLinks,
    enabled: !!query, // query가 존재할 때만 요청
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    select: (data) => setLinkCardList(data.list, data.totalCount),
  });

  // 로딩 상태 설정
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);
};

export default useFetchLinks;
