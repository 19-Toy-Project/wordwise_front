import { words } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useWordsQuery = (levelId: string) => {
  return useQuery({
    queryKey: [words, levelId],
    queryFn: async () => {
      return {
        data: [
          {
            wordId: 1,
            word: "apple",
            meaning: "사과",
          },
          {
            wordId: 2,
            word: "pineapple",
            meaning: "파인애플",
          },
        ],
      };
    },
    enabled: !!levelId,
  });
};

export default useWordsQuery;
