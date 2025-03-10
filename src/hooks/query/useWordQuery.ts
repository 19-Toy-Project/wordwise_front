import { word } from "@/constants/queryKey";
import { useCookie } from "@/contexts/cookie.context";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";

const useWordQuery = (wordId: string) => {
  const { cookie } = useCookie();
  return useQuery({
    queryKey: [word, wordId],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/words/${wordId}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    },
    enabled: !!wordId,
  });
};
export default useWordQuery;
