import { search } from "@/constants/queryKey";
import { useCookie } from "@/contexts/cookie.context";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";

const useSearchQuery = ({
  page,
  size,
  keyword,
}: {
  page: number;
  size: number;
  keyword: string;
}) => {
  const { cookie } = useCookie();
  return useQuery({
    queryKey: [search, keyword],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/search?keyword=${keyword}&page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const data = await response.json();
      return data;
    },
    enabled: !!keyword,
  });
};

export default useSearchQuery;
