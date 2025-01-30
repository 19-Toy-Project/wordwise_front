import { useQuery } from "@tanstack/react-query";

const useWishQuery = ({
  wish,
  sentenceId,
}: {
  wish: boolean;
  sentenceId: number;
}) => {
  return useQuery({
    queryKey: [wish, sentenceId],
    queryFn: async () => {
      return { sentenceId, wish };
    }, // wish get 하는 함수 불러오기
  });
};
export default useWishQuery;
