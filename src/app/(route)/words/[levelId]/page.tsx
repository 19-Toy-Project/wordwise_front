import WordItem from "./_components/WordItem";

export default async function WordLevelPage() {
  const { data: words } = {
    data: [
      {
        wordId: 1,
        word: "apple",
        meaning: "사과",
      },
      {
        wordId: 2,
        word: "pineapple",
        meaning: "파인애플",
      },
    ],
  };
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-3">
        {words.map((word) => (
          <WordItem key={word.wordId} word={word} />
        ))}
      </div>
    </div>
  );
}
