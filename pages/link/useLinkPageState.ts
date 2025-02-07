import useViewport from "@/hooks/useViewport";
import useModalStore from "@/store/useModalStore";
import useFolderName from "@/hooks/useFolderName";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderType";

const useLinkPageState = (
  initialLinkList: LinkData[],
  initialFolderList: FolderData[],
  initialTotalCount: number
) => {
  const router = useRouter();
  const { query } = router;
  const { isOpen } = useModalStore();
  const { isMobile, isTablet } = useViewport();
  const [linkListData, setLinkListData] = useState({
    list: initialLinkList,
    totalCount: initialTotalCount,
  });
  const [folderList, setFolderList] = useState(initialFolderList);
  const [isLoading, setIsLoading] = useState(false);
  const [queryKeys, setQueryKeys] = useState({
    pathname: router.pathname,
    page: query.page,
    search: query.search,
    folderId: query.folder,
    isTablet: isTablet,
  });
  const [folderName] = useFolderName(queryKeys.folderId);

  useEffect(() => {
    setQueryKeys({
      pathname: router.pathname,
      page: query.page,
      search: query.search as string,
      folderId: query.folder as string,
      isTablet: isTablet,
    });
  }, [query.search, query.folder, router.pathname, query.page, isTablet]);

  return {
    linkListData,
    setLinkListData,
    folderList,
    setFolderList,
    folderName,
    isLoading,
    setIsLoading,
    queryKeys,
    setQueryKeys,
    isMobile,
    isTablet,
    isOpen,
  };
};

export default useLinkPageState;
