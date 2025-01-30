import { http, HttpResponse } from "msw";
/**
 * 참고 : https://many.tistory.com/79 ,
 * https://mswjs.io/docs/getting-started
 *  */
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("http://example.com/api/v1/words/level/:levelId", (req) => {
    const { levelId } = req.params;
    // 예시 데이터
    const wordsData = [
      { wordId: 1, word: "apple", meaning: "사과", level: "beginner" },
      { wordId: 2, word: "pineapple", meaning: "파인애플", level: "beginner" },
      {
        wordId: 3,
        word: "declare",
        meaning: "선언하다",
        level: "intermediate",
      },
    ];
    const filteredData = wordsData.filter((item) => item.level === levelId);
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      success: true,
      data: filteredData,
    });
  }),
  http.get("http://example.com/api/v1/words/:wordId", (req) => {
    const { wordId } = req.params;

    const wordsData = [
      {
        wordId: 1,
        word: "apple",
        meaning: "사과",
        sentences: [
          {
            sentenceId: 0,
            sentence: "I ate Apple.",
            meaning: "나는 사과를 먹는다",
            wish: false,
          },
          {
            sentenceId: 1,
            sentence: "I have thrown Apples away.",
            meaning: "나는 사과들을 버렸다",
            wish: false,
          },
        ],
      },
      {
        wordId: 2,
        word: "pineapple",
        meaning: "파인애플",
        sentences: [
          {
            sentenceId: 2,
            sentence: "I ate pineApple.",
            meaning: "나는 파인애플을 먹는다",
            wish: false,
          },
          {
            sentenceId: 3,
            sentence: "I have thrown pineApples away.",
            meaning: "나는 파인애플들을 버렸다",
            wish: false,
          },
        ],
      },
      {
        wordId: 3,
        word: "declare",
        meaning: "선언하다",
        sentences: [
          {
            sentenceId: 4,
            sentence: "The president declared martial law",
            meaning: "대통령이 계엄령을 선언했다.",
            wish: false,
          },
        ],
      },
    ];

    const word = wordsData.find((item) => item.wordId === Number(wordId));

    return HttpResponse.json({
      success: true,
      data: word,
    });
  }),
  http.post("http://example.com/api/v1/sentences/wish/:sentenceId", (req) => {
    const { sentenceId } = req.params;
    // 예시 데이터
    const sentencesData = [
      {
        sentenceId: 0,
        sentence: "I ate Apple.",
        meaning: "나는 사과를 먹는다",
        wish: false,
      },
      {
        sentenceId: 1,
        sentence: "I have thrown Apples away.",
        meaning: "나는 사과들을 버렸다",
        wish: false,
      },
      {
        sentenceId: 2,
        sentence: "I ate pineApple.",
        meaning: "나는 파인애플을 먹는다",
        wish: false,
      },
      {
        sentenceId: 3,
        sentence: "I have thrown pineApples away.",
        meaning: "나는 파인애플들을 버렸다",
        wish: false,
      },
      {
        sentenceId: 4,
        sentence: "The president declared martial law",
        meaning: "대통령이 계엄령을 선언했다.",
        wish: false,
      },
    ];

    const sentence = sentencesData.find(
      (item) => item.sentenceId === Number(sentenceId)
    );

    if (sentence) {
      // wish 값을 반전시킴
      sentence.wish = !sentence.wish;
    }
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      success: true,
      data: sentence,
    });
  }),
];
