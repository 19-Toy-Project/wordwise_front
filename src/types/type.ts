export type WordType = {
  wordId: number;
  word_en: string;
  word_krs: { word_kr: string }[];
  level: string;
};
export type SentenceType = {
  sentenceId: number;
  sentence_kr: string;
  sentence: string;
  wish?: boolean;
};

export type UserType = {
  userTier: string;
  userName: string;
  userEmail: string;
};

export type ToastType = {
  id?: string;
  label: string;
};
