import { word } from "@/constants/queryKey";
import { useCookie } from "@/contexts/cookie.context";
import { useQuery } from "@tanstack/react-query";

const useWordQuery = (wordId: string) => {
  const { cookie } = useCookie();
  return useQuery({
    queryKey: [word, wordId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/words/${wordId}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    },
    enabled: !!wordId,
  });
};
export default useWordQuery;
