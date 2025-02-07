import { word } from "@/constants/queryKey";
import { useCookie } from "@/contexts/cookie.context";
import { SentenceType, WordType } from "@/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type WishMutationParams = {
  sentenceId: number;
  wish: boolean;
};
type OldData = Omit<WordType, "level"> & { sentences: SentenceType[] };
const useWordMutation = ({ wordId }: { wordId: string }) => {
  const { cookie } = useCookie();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async ({ sentenceId, wish }: WishMutationParams) => {
      const response = await fetch(
        `http://localhost:8080/api/v1/sentences/wish/${sentenceId}?state=${wish}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    },
    onMutate: async ({ sentenceId, wish }: WishMutationParams) => {
      await queryClient.cancelQueries({ queryKey: [word, wordId] });
      const previousWish = queryClient.getQueryData<{ data: WordType }>([
        word,
        wordId,
      ]);
      if (!previousWish) return { previousWish };

      queryClient.setQueryData(
        [word, wordId],
        (old: { data?: OldData } | undefined) => {
          return {
            ...old,
            data: {
              ...old?.data,
              sentences: old?.data?.sentences.map((sentence) => {
                if (sentence.sentenceId === sentenceId) {
                  return { ...sentence, wish };
                }
                return sentence;
              }),
            },
          };
        }
      );

      return { previousWish };
    },
    onError: (_error, _addWish, context) => {
      // 🔹 에러 발생 시 롤백
      if (context?.previousWish) {
        queryClient.setQueryData([word, wordId], context.previousWish);
      }
    },
  });

  return addMutation;
};
export default useWordMutation;
