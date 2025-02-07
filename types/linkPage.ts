export interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
  totalCount: number;
}

export interface LinkPageState {
  linkListData: LinkData[];
  setLinkListData : ;
  folderList : FolderData[];
  setFolderList;
  folderName: string;
  isLoading :boolean;
  setIsLoading ;
  queryKeys : ;
  setQueryKeys;
  isMobile;
  isTablet;
  isOpen;
}