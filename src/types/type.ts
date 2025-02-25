export type WordType = {
  wordId: number;
  word_en: string;
  word_krs: string[];
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
