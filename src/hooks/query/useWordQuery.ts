import { word } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useWordQuery = (wordId: string) => {
  return useQuery({
    queryKey: [word, wordId],
    queryFn: async () => {
      return {
        data: {
          word: "apple",
          meaning: "사과",
          sentences: [
            {
              sentenceId: 0,
              sentence: "I ate Apple.",
              meaning: "나는 사과를 먹는다",
              wish: false,
            },
          ],
        },
      };
    },
    enabled: !!wordId,
  });
};
export default useWordQuery;
