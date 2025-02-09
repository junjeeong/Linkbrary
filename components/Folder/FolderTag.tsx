import { FolderData } from "@/types/folderType";

const FolderTag = ({
  folderList,
  queryKeys,
  setQueryKeys,
}: {
  folderList: FolderData[];
  queryKeys: any;
  setQueryKeys: any;
}) => {
  const folderStyle =
    "w-[100px] h-[35px] px-[15px] text-sm whitespace-nowrap truncate border border-purple100 rounded-md hover:bg-purple100 hover:text-white";

  const handleSubmit = (selectedFolderId: number | string) => {
    setQueryKeys((prev: any) => ({ ...prev, folderId: selectedFolderId }));
  };

  return (
    <ul className="flex flex-wrap gap-[8px] md:w-[80%] lg:w-[80%]">
      <li>
        <button className={folderStyle} onClick={() => handleSubmit("")}>
          전체
        </button>
      </li>
      {folderList.slice(0, 8).map((folder) => (
        <li key={folder.id}>
          <button
            className={`${folderStyle} ${folder.id === Number(queryKeys.folder) && "bg-purple100 text-white"}`}
            type="submit"
            onClick={() => handleSubmit(folder.id)}
          >
            {folder.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FolderTag;
