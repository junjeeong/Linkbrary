import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parse } from "cookie";
import { LinkData } from "@/types/linkTypes";
import { Modal } from "@/components/modal/modalManager/ModalManager";
import { SearchInput } from "../../components/Search/SearchInput";
import { FolderData } from "@/types/folderType";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import useModalStore from "@/store/useModalStore";
import Pagination from "@/components/Pagination";
import AddLinkInput from "@/components/Link/AddLinkInput";
import Container from "@/components/Layout/Container";
import SearchResultMessage from "@/components/Search/SearchResultMessage";
import FolderTag from "@/components/Folder/FolderTag";
import AddFolderButton from "@/components/Folder/AddFolderButton";
import FolderActionsMenu from "@/components/Folder/FolderActionsMenu";
import CardsLayout from "@/components/Layout/CardsLayout";
import LinkCard from "@/components/Link/LinkCard";
import RenderEmptyLinkMessage from "@/components/Link/RenderEmptyLinkMessage";
import useFetchLinks from "@/hooks/useFetchLinks";
import useViewport from "@/hooks/useViewport";
import useFolderName from "@/hooks/useFolderName";
import LinkCardSkeleton from "@/components/skeleton/LinkCardSkeleton";

interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
  totalCount: number;
}

// /link 페이지 접속시에 초기렌더링 데이터(전체 폴더, 전체링크리스트)만 fetch해서 client로 전달.
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  // accessToken이 없으면 클라이언트에서 실행될 때 /login 페이지로 이동시킴.
  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const fetchData = async (endpoint: string) => {
    const res = await axiosInstance.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  };

  const [links, folders] = await Promise.all([
    fetchData("/links"),
    fetchData("/folders"),
  ]);

  return {
    props: {
      linkList: links.list || [],
      folderList: folders || [],
      totalCount: links.totalCount || 0,
    },
  };
};

const LinkPage = ({
  linkList: initialLinkList,
  folderList: initialFolderList,
  totalCount: initialTotalCount,
}: LinkPageProps) => {
  const router = useRouter();
  const { query } = router;
  const { isMobile, isTablet } = useViewport();
  const { isOpen } = useModalStore();
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
    folder: query.folder,
    isTablet: isTablet,
  });
  const [folderName] = useFolderName(queryKeys.folder);

  useEffect(() => {
    setQueryKeys({
      pathname: router.pathname,
      page: query.page,
      search: query.search as string,
      folder: query.folder as string,
      isTablet: isTablet,
    });
  }, [
    query.search,
    isTablet,
    query.folder,
    router.pathname,
    setQueryKeys,
    query.page,
  ]);

  // 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
  useFetchLinks(setLinkListData, setIsLoading, queryKeys);

  return (
    <>
      <div className="flex justify-center items-center bg-gray100 w-full h-[219px]">
        <AddLinkInput folderList={folderList} />
      </div>
      <Container>
        <main className="relative mt-[40px]">
          <SearchInput setQueryKeys={setQueryKeys} />
          {queryKeys.search && (
            <SearchResultMessage message={queryKeys.search} />
          )}
          <div className="flex justify-between mt-[40px]">
            {folderList && (
              <FolderTag
                folderList={folderList}
                queryKeys={queryKeys}
                setQueryKeys={setQueryKeys}
              />
            )}
            {!isMobile && <AddFolderButton setFolderList={setFolderList} />}
          </div>
          <div className="flex justify-between items-center my-[24px]">
            {queryKeys.folder && (
              <>
                <h1 className="text-2xl">{folderName as string}</h1>
                <FolderActionsMenu
                  setFolderList={setFolderList}
                  folderId={queryKeys.folder}
                  linkCount={linkListData.totalCount}
                />
              </>
            )}
          </div>
          {isLoading ? (
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <LinkCardSkeleton key={index} />
              ))}
            </div>
          ) : linkListData.list.length !== 0 ? (
            <>
              <CardsLayout>
                {linkListData.list.map((link) => (
                  <LinkCard key={link.id} info={link} />
                ))}
              </CardsLayout>
              <Pagination totalCount={linkListData.totalCount} />
            </>
          ) : (
            <RenderEmptyLinkMessage />
          )}
        </main>
      </Container>
      {isOpen && <Modal />}
      {isMobile && (
        <AddFolderButton setFolderList={setFolderList} isModal={true} />
      )}
    </>
  );
};

export default LinkPage;
