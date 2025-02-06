import { word } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useWordQuery = (wordId: string) => {
  return useQuery({
    queryKey: [word, wordId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/words/${wordId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
    enabled: !!wordId,
  });
};
export default useWordQuery;
