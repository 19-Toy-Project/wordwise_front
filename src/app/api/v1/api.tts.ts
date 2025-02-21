interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export const getSpeech = (text: string) => {
  // SpeechSynthesisVoice 배열 초기화
  const voices = window.speechSynthesis.getVoices();

  const speech = (txt: string) => {
    const lang = "en-US";
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

export const setSpeech = (callback: (transcript: string) => void) => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "en-US"; // Set language for recognition
  recognition.continuous = false; // Continuous recognition
  recognition.interimResults = true; // Show interim results

  // Start listening for speech
  recognition.start();

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    // Call the callback function with the transcribed text
    callback(transcript);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.log("Speech recognition error:", event.error);
    callback("마이크 에러");
  };

  // recognition.onend = () => {
  //   console.log("Speech recognition service has stopped.");
  // };
};
