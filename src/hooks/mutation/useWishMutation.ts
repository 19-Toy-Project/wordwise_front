import { useMutation, useQueryClient } from "@tanstack/react-query";

type WishProps = { wish: boolean; sentenceId: number };
const useWishMutation = ({ wish, sentenceId }: WishProps) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async () => {
      if (!wish) {
      } // post
      else {
        //delete
      }
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
