import { useState } from "react";
import { useSearchParams } from "react-router";
import type { PageType } from "../types/PageType";

export const usePagination = ({ pageURL }: { pageURL?: PageType } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const param = pageURL ?? "page";
  const currentPage = Number(searchParams.get(param)) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const updatePageParam = new URLSearchParams(prev);
      updatePageParam.set(param, page.toString());
      return updatePageParam;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    handlePageChange(1);
  };

  const clearPageParam = () => {
    setSearchParams(new URLSearchParams()); // Reinicia los parámetros de la URL
  };

  return {
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearch,
    clearPageParam,
  };
};
