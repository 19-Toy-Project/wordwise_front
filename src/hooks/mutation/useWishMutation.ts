import { useMutation, useQueryClient } from "@tanstack/react-query";

type WishProps = { wish: boolean; sentenceId: number };
const useWishMutation = ({ wish, sentenceId }: WishProps) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://example.com/api/v1/sentences/wish/${sentenceId}`,
        {
          method: "post",
          mode: "no-cors",
        }
      );
      const data = await response.json();
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [wish, sentenceId] });

      const previousWish = queryClient.getQueryData([wish, sentenceId]);

      queryClient.setQueryData([wish, sentenceId], (old: WishProps) => {
        if (!old) return old;
        return { sentenceId, wish: !old.wish };
      });

      return { previousWish };
    },
    onError: (error, addWish, context) => {
      queryClient.setQueryData([wish, sentenceId], context?.previousWish);
    },
  });

  return addMutation;
};
export default useWishMutation;
