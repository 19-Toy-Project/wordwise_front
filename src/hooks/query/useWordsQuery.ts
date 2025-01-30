import { words } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useWordsQuery = (levelId: string) => {
  return useQuery({
    queryKey: [words, levelId],
    queryFn: async () => {
      const response = await fetch(
        `http://example.com/api/v1/words/level/${levelId}`,
        {
          method: "get",
          mode: "no-cors",
        }
      );
      const data = await response.json();

      return data;
    },
    enabled: !!levelId, // `levelId`가 존재할 때만 실행
  });
};

export default useWordsQuery;
