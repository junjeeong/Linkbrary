import Image from "next/image";
import { ChangeEvent, useState } from "react";

export const SearchInput = ({ setQueryKeys }: { setQueryKeys: any }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    setValue("");
    setQueryKeys((prev: any) => ({ ...prev, search: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryKeys((prev: any) => ({ ...prev, search: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-[8px] bg-gray-100 px-[16px] py-[15px] rounded-[10px] w-full h-[54px] sm:h-[43px] md:h-[54px] transition-all"
    >
      <Image
        src="/icons/search.svg"
        width={16}
        height={16}
        alt="search button"
      />
      <input
        value={value}
        onChange={handleChange}
        placeholder="링크를 검색해 보세요."
        className="flex-grow bg-transparent placeholder:text-gray-500"
      />
      {value && (
        <button
          className="flex justify-center items-center bg-white rounded-full font-bold text-gray-500 size-6"
          type="button"
          onClick={handleClick}
        >
          ×
        </button>
      )}
    </form>
  );
};

export default SearchInput;
