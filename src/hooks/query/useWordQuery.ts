import { word } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useWordQuery = (wordId: string) => {
  return useQuery({
    queryKey: [word, wordId],
    queryFn: async () => {
      const response = await fetch(
        `http://example.com/api/v1/words/${wordId}`,
        {
          method: "get",
          mode: "no-cors",
        }
      );
      const data = await response.json();

      return data;
    },
    enabled: !!wordId,
  });
};
export default useWordQuery;
