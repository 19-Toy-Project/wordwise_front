import { useCookie } from "@/contexts/cookie.context";
import { useMutation } from "@tanstack/react-query";

type RecordType = {
  sentenceId: number;
  file: File;
};
const useRecordMutation = () => {
  const { cookie } = useCookie();
  const addMutation = useMutation({
    mutationFn: async ({ sentenceId, file }: RecordType) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/sentences/record/${sentenceId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-Type": "multipart/form-data",
          },
          body: file,
        }
      );

      const data = await response.json();
      return data;
    },
    onError: (error) => {
      return error;
    },
  });

  return addMutation;
};

export default useRecordMutation;
