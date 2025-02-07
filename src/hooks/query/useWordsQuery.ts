import { words } from "@/constants/queryKey";
import { useCookie } from "@/contexts/cookie.context";
import { useQuery } from "@tanstack/react-query";

type WordType = { page: number; size: number; levelId: string };
const useWordsQuery = ({ page, size, levelId }: WordType) => {
  const { cookie } = useCookie();
  return useQuery({
    queryKey: [words, levelId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/words?page=${page}&size=${size}&type=${levelId}`,
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
      console.log(data);
      return data;
    },
    enabled: !!levelId, // `levelId`가 존재할 때만 실행
  });
};

export default useWordsQuery;
