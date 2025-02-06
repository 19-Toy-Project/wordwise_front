import { useMutation } from "@tanstack/react-query";

type RecordType = {
  sentenceId: number;
  file: File;
};
const useRecordMutation = ({ sentenceId, file }: RecordType) => {
  const addMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/sentences/record/${sentenceId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json;" },
          body: JSON.stringify({ file: file }),
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
