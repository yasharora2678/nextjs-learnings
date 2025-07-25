import PostList from "@/components/posts/PostList";
import { fetchTopPostsBySearch } from "@/lib/query/post";
import React from "react";

type SearchPageProps = {
  searchParams: Promise<{ term: string }>;
};

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const { term } = await searchParams;
  return (
    <div>
      <h1 className="text-blue-600 font-medium italic">
        Search Results for {term}
      </h1>
      <PostList fetchData={() => fetchTopPostsBySearch(term)} />
    </div>
  );
};

export default SearchPage;
