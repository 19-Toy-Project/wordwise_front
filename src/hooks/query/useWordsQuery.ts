import { words } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

interface Words {
  levelId: string;
  page: number;
  size: number;
}
const useWordsQuery = ({ levelId, page, size }: Words) => {
  return useQuery({
    queryKey: [words, levelId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/words?page=${page}&size=${size}&type=${levelId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      return data;
    },
    enabled: !!levelId, // `levelId`가 존재할 때만 실행
  });
};

export default useWordsQuery;
