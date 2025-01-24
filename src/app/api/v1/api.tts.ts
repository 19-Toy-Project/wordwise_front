export const getSpeech = (text: string) => {
  // SpeechSynthesisVoice 배열 초기화
  const voices = window.speechSynthesis.getVoices();

  const speech = (txt: string) => {
    const lang = "en-EN";
    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;

    // 언어에 맞는 voice 찾기
    const targetVoice = voices.find(
      (voice) => voice.lang === lang || voice.lang === lang.replace("-", "_")
    );

    if (targetVoice) {
      utterThis.voice = targetVoice;
    }

    // 음성을 재생
    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};
