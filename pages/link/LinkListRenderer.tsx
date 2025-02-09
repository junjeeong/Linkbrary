import LinkCard from "@/components/Link/LinkCard";
import LinkCardSkeleton from "@/components/skeleton/LinkCardSkeleton";
import RenderEmptyLinkMessage from "@/components/Link/RenderEmptyLinkMessage";
import Pagination from "@/components/Pagination";
import CardsLayout from "@/components/Layout/CardsLayout";
import { LinkData } from "@/types/linkTypes";

interface LinkListRendererProps {
  isLoading: boolean;
  linkListData: { list: LinkData[]; totalCount: number };
}

export const LinkListRenderer = ({
  isLoading,
  linkListData,
}: LinkListRendererProps) => {
  if (isLoading) {
    return (
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <LinkCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (linkListData.list.length > 0) {
    return (
      <>
        <CardsLayout>
          {linkListData.list.map((link) => (
            <LinkCard key={link.id} info={link} />
          ))}
        </CardsLayout>
        <Pagination totalCount={linkListData.totalCount} />
      </>
    );
  }

  return <RenderEmptyLinkMessage />;
};
