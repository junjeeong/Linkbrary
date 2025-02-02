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

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["links", query, pathname, isTablet], // query, pathname, isTablet이 바뀔 때 fresh -> stale
    queryFn: fetchLinks,
    enabled: !!query, // query가 존재할 때만 요청
  });

  // 로딩 상태 설정
  setIsLoading(isLoading);

  if (isSuccess && data) {
    setLinkCardList(data.list, data.totalCount);
  } else if (isError) {
    console.error(
      "tanstack-query error: 링크 목록 업데이트에 실패했습니다.",
      error
    );
  }
};

export default useFetchLinks;
