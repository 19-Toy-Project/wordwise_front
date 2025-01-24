function AboutPage() {
  return (
    <div className="container mx-auto p-5">
      <h1 className="font-bold text-4xl text-center">개요</h1>
      <div className="flex flex-col gap-5">
        <strong className="text-2xl font-semibold text-indigo-600">
          Wordwise: 영어 발음과 문장 학습을 동시에!
        </strong>
        <p className="text-lg text-gray-700 transition duration-500 hover:text-indigo-600">
          Wordwise는 영어 단어와 문장을 쉐도잉하며 발음, 억양, 그리고 실용적인
          영어 표현을 동시에 배울 수 있는 혁신적인 학습 사이트입니다. 많은
          사람들이 영어 단어를 암기하는 데 집중하지만, 발음과 억양을 제대로
          익히는 데 어려움을 겪고 있습니다. Wordwise는 이러한 문제를 해결하고자,
          실시간 발음 평가와 피드백을 제공하여 학습자의 발음 실력을 향상시킬 수
          있도록 돕습니다.
        </p>
        <p className="text-lg text-gray-700 transition duration-500 hover:text-indigo-600">
          사용자는 자신이 원하는 난이도의 영어 문장을 선택하여 연습할 수 있으며,
          학습 중에는 발음 정확도에 대한 점수를 실시간으로 받을 수 있습니다. 이
          점수는 자신의 발음 실력을 객관적으로 확인할 수 있는 지표가 되어,
          학습의 방향성을 잡는 데 유용합니다. 또한, 잘못 발음한 부분에 대한
          피드백을 즉시 제공하여, 반복 학습을 통해 발음 실수를 점차 교정할 수
          있습니다.
        </p>
        <p className="text-lg text-gray-700 transition duration-500 hover:text-indigo-600">
          Wordwise는 사용자가 얼마나 학습했는지 추적할 수 있는 학습 이력 기능을
          제공합니다. 이를 통해 사용자는 자신의 학습 진행 상황을 한눈에
          파악하고, 목표를 설정하여 체계적으로 학습을 이어나갈 수 있습니다. 학습
          이력을 통해 향상된 발음 점수를 확인하며 성취감을 느낄 수 있으며,
          자신의 학습 계획을 재조정하는 데도 유용합니다.
        </p>
        <p className="text-lg text-gray-700 transition duration-500 hover:text-indigo-600">
          Wordwise의 가장 큰 장점 중 하나는 학습 이력을 시각적으로 추적하고
          관리할 수 있다는 점입니다. 얼마나 많은 문장을 학습했는지, 발음 점수가
          얼마나 향상되었는지 등을 한눈에 볼 수 있어 사용자가 체계적으로 학습
          목표를 설정하고, 동기 부여를 받을 수 있습니다. 또한, 이를 바탕으로
          자기 주도적인 학습 계획을 세우는 데 도움을 줄 수 있습니다. 학습 진행
          상황을 기록하고, 목표를 달성해 나가는 과정은 학습에 대한 흥미와
          성취감을 높이며, 지속적인 학습을 유도합니다.
        </p>
        <p className="text-lg text-gray-700 transition duration-500 hover:text-indigo-600">
          이 사이트는 단순히 영어 단어를 암기하는 데 그치지 않고, 실제 문장
          속에서 단어의 발음과 사용법을 동시에 익힐 수 있도록 도와줍니다. 다양한
          레벨에 맞춘 문장과 단어를 제공하여, 초급부터 고급까지 각기 다른
          학습자의 수준에 맞춰 학습할 수 있습니다. 이로써 학습자는 점차 자신감을
          얻고, 실제 영어 회화에서도 유용한 표현들을 자연스럽게 사용할 수 있게
          됩니다.
        </p>
        <p className="text-lg text-gray-700 transition duration-500 hover:text-indigo-600">
          Wordwise는 영어 발음, 문법, 문장 구조를 동시에 학습할 수 있는 통합적인
          학습 플랫폼으로, 영어 학습자들에게 효과적인 학습 경로를 제공합니다.
          지속적인 학습과 피드백을 통해 영어 실력을 쌓아가며, 더 나아가
          실생활에서의 영어 회화 능력까지 키울 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
