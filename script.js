// 12개의 MBTI 질문 데이터 (각 지표별 3문항씩 구성하여 동점 방지)
const questions = [
  // E vs I (외향 vs 내향)
  {
    dimension: 'EI',
    question: '주말이 찾아왔을 때, 에너지를 충전하는 나만의 방식은?',
    choiceA: { text: '친구들과 만나 핫플을 가거나 수다를 떨며 스트레스를 푼다.', value: 'E' },
    choiceB: { text: '집에서 좋아하는 영화나 취미를 즐기며 혼자만의 시간을 보낸다.', value: 'I' }
  },
  {
    dimension: 'EI',
    question: '처음 보는 사람들이 많은 모임에 참석했을 때 나는?',
    choiceA: { text: '먼저 말을 걸거나 분위기를 띄우며 새로운 사람들과 쉽게 어울린다.', value: 'E' },
    choiceB: { text: '누군가 말을 걸어줄 때까지 조용히 관찰하며 아는 사람 곁에 있는다.', value: 'I' }
  },
  {
    dimension: 'EI',
    question: '평소 생각을 정리할 때 더 편한 방식은?',
    choiceA: { text: '주변 사람들과 대화하면서 생각을 말로 꺼내며 정리한다.', value: 'E' },
    choiceB: { text: '머릿속으로 충분히 혼자 생각하고 정리한 뒤에 이야기한다.', value: 'I' }
  },

  // S vs N (감각 vs 직관)
  {
    dimension: 'SN',
    question: '새로운 프로젝트나 일을 배울 때 더 선호하는 설명은?',
    choiceA: { text: '실제 사례와 구체적인 단계별 매뉴얼이 있는 실용적인 설명', value: 'S' },
    choiceB: { text: '전체적인 큰 그림과 방향성, 숨은 의미를 알려주는 개념적인 설명', value: 'N' }
  },
  {
    dimension: 'SN',
    question: '사과를 보면 가장 먼저 떠오르는 생각은?',
    choiceA: { text: '빨갛고 아삭하고 달콤한 과일, 혹은 요즘 사과 가격', value: 'S' },
    choiceB: { text: '백설공주, 뉴턴의 만유인력, 애플(Apple) 로고 등 연상되는 이야기', value: 'N' }
  },
  {
    dimension: 'SN',
    question: '비행기를 타기 전, 나의 머릿속에 주로 스치는 생각은?',
    choiceA: { text: '탑승 게이트 번호, 수하물 무게, 기내식 메뉴 등 현실적인 체크 사항', value: 'S' },
    choiceB: { text: '구름 위를 나는 기분이나 영화 같은 일이 벌어지면 어떨까 하는 상상', value: 'N' }
  },

  // T vs F (사고 vs 감정)
  {
    dimension: 'TF',
    question: '친구가 "나 요즘 너무 우울해서 화분을 하나 샀어"라고 말한다면?',
    choiceA: { text: '"무슨 화분 샀어? 키우기 쉬운 식물이야?" 하고 화분에 대해 묻는다.', value: 'T' },
    choiceB: { text: '"요즘 무슨 일 있어? 왜 우울했어ㅠㅠ" 하고 친구의 기분을 먼저 살핀다.', value: 'F' }
  },
  {
    dimension: 'TF',
    question: '팀 과제를 하다가 의견 충돌이 생겼을 때 더 중요하게 여기는 것은?',
    choiceA: { text: '어느 쪽 의견이 더 논리적이고 결과물의 완성도를 높일 수 있는가', value: 'T' },
    choiceB: { text: '팀원들 중에 상처받거나 소외감을 느끼는 사람 없이 조화로운가', value: 'F' }
  },
  {
    dimension: 'TF',
    question: '힘든 일을 겪고 조언을 구하는 친구에게 해주고 싶은 말은?',
    choiceA: { text: '상황을 객관적으로 분석해 주고 현실적인 해결책을 제시한다.', value: 'T' },
    choiceB: { text: '일단 친구의 속상한 마음에 깊이 공감해 주고 따뜻하게 위로한다.', value: 'F' }
  },

  // J vs P (판단 vs 인식)
  {
    dimension: 'JP',
    question: '기다리던 여행을 떠나기 전 나의 준비 스타일은?',
    choiceA: { text: '시간대별 동선, 맛집 리스트, 예약까지 꼼꼼하게 계획표를 짠다.', value: 'J' },
    choiceB: { text: '숙소와 교통편만 정해두고 그날의 기분과 날씨에 따라 자유롭게 다닌다.', value: 'P' }
  },
  {
    dimension: 'JP',
    question: '마감 기한이 있는 과제나 업무를 처리할 때 나는?',
    choiceA: { text: '미리 일정을 나누어 계획대로 차근차근 여유 있게 끝내놓는다.', value: 'J' },
    choiceB: { text: '마감 직전에 몰입도가 폭발하며 벼락치기로 빠르게 완성한다.', value: 'P' }
  },
  {
    dimension: 'JP',
    question: '정성껏 세워둔 주말 계획이 갑작스러운 사정으로 취소되었다면?',
    choiceA: { text: '계획이 틀어져서 아쉽고 빠르게 대체할 새로운 계획을 세운다.', value: 'J' },
    choiceB: { text: '"오히려 좋아!" 갑자기 생긴 여유 시간에 그날 끌리는 일을 한다.', value: 'P' }
  }
];

// 16가지 MBTI 결과 데이터
const mbtiResults = {
  ISTJ: {
    emoji: '📋',
    subtitle: '청렴결백한 논리주의자',
    tags: ['#책임감끝판왕', '#원칙주의', '#신중함', '#현실적'],
    description:
      '한 번 시작한 일은 끝까지 해내는 강한 책임감을 지니고 있어요. 정리정돈과 계획적인 생활을 선호하며, 약속과 규칙을 소중히 여겨 주변 사람들에게 깊은 신뢰를 받는 유형입니다.',
    celebrities: [
      { avatar: '📈', category: '유명인', name: '워런 버핏', role: '투자의 귀재' },
      { avatar: '🪄', category: '캐릭터', name: '헤르미온느', role: '해리포터' },
      { avatar: '🐰', category: '캐릭터', name: '토끼 (주디)', role: '원칙주의 우등생' }
    ],
    best: 'ESFP',
    worst: 'ENFP'
  },
  ISFJ: {
    emoji: '🛡️',
    subtitle: '용감한 수호자',
    tags: ['#세심한배려', '#경청왕', '#성실함', '#온화함'],
    description:
      '조용하고 차분하지만 내면은 누구보다 단단하고 따뜻한 사람입니다. 주변 사람들의 작은 변화도 잘 캐치하며, 소중한 사람들을 챙기고 돕는 데서 큰 보람을 느낍니다.',
    celebrities: [
      { avatar: '🛡️', category: '캐릭터', name: '캡틴 아메리카', role: '어벤져스' },
      { avatar: '🎤', category: '유명인', name: '태연', role: '소녀시대 가수' },
      { avatar: '🌱', category: '캐릭터', name: '샘와이즈 갬지', role: '반지의 제왕' }
    ],
    best: 'ESTP',
    worst: 'ENTP'
  },
  INFJ: {
    emoji: '🔮',
    subtitle: '선의의 옹호자',
    tags: ['#깊은통찰력', '#이상주의', '#공감능력', '#신념'],
    description:
      '사람과 세상을 깊이 있게 바라보는 통찰력이 뛰어납니다. 조용해 보이지만 확고한 가치관과 따뜻한 공감 능력을 동시에 지니고 있어 주변에 깊은 울림을 주는 유형입니다.',
    celebrities: [
      { avatar: '❄️', category: '캐릭터', name: '엘사', role: '겨울왕국' },
      { avatar: '🧙‍♂️', category: '캐릭터', name: '알버스 덤블도어', role: '해리포터' },
      { avatar: '🕊️', category: '유명인', name: '마더 테레사', role: '노벨평화상 수상자' }
    ],
    best: 'ENFP',
    worst: 'ESTP'
  },
  INTJ: {
    emoji: '♟️',
    subtitle: '용의주도한 전략가',
    tags: ['#전략적사고', '#독립적', '#완벽추구', '#분석력'],
    description:
      '풍부한 상상력과 철두철미한 계획을 겸비한 전략가입니다. 지적 호기심이 많고 문제를 본질적으로 해결하는 것을 즐기며, 목표를 향해 꾸준히 나아가는 추진력이 돋보입니다.',
    celebrities: [
      { avatar: '🚀', category: '유명인', name: '일론 머스크', role: '테슬라·스페이스X' },
      { avatar: '🕰️', category: '캐릭터', name: '닥터 스트레인지', role: '마블 히어로' },
      { avatar: '🎻', category: '캐릭터', name: '베토벤', role: '고전 음악의 거장' }
    ],
    best: 'ENFP',
    worst: 'ESFP'
  },
  ISTP: {
    emoji: '🛠️',
    subtitle: '만능 재주꾼',
    tags: ['#효율중시', '#쿨한매력', '#관찰력', '#임기응변'],
    description:
      '과묵하면서도 상황 판단이 빠르고 손재주와 문제 해결 능력이 뛰어납니다. 불필요한 감정 소모를 싫어하고 효율성을 중시하며, 위기 상황에서도 침착하게 해답을 찾아냅니다.',
    celebrities: [
      { avatar: '🎙️', category: '유명인', name: '박명수', role: '방송인·개그맨' },
      { avatar: '🕶️', category: '캐릭터', name: '제임스 본드', role: '007 시리즈' },
      { avatar: '⚔️', category: '캐릭터', name: '리바이 아커만', role: '진격의 거인' }
    ],
    best: 'ESFJ',
    worst: 'ENFJ'
  },
  ISFP: {
    emoji: '🎨',
    subtitle: '호기심 많은 예술가',
    tags: ['#감성충만', '#온화한성격', '#자유로움', '#현재에충실'],
    description:
      '다정하고 온화하며 자신만의 고유한 감성과 취향을 지닌 예술가형입니다. 타인을 있는 그대로 존중하며, 경쟁보다는 평화롭고 여유로운 일상 속에서 행복을 발견합니다.',
    celebrities: [
      { avatar: '🕺', category: '유명인', name: '마이클 잭슨', role: '팝의 황제' },
      { avatar: '⚡', category: '캐릭터', name: '해리 포터', role: '해리포터 주인공' },
      { avatar: '🦥', category: '캐릭터', name: '플래시 (나무늘보)', role: '주토피아' }
    ],
    best: 'ENFJ',
    worst: 'ENTJ'
  },
  INFP: {
    emoji: '🌷',
    subtitle: '열정적인 중재자',
    tags: ['#낭만주의', '#풍부한감수성', '#진정성', '#따뜻한마음'],
    description:
      '차분하고 수줍어 보이지만 마음속에는 뜨거운 열정과 낭만을 품고 있습니다. 진정성 있는 관계를 소중히 여기며, 상상력이 풍부하고 타인의 아픔에 깊이 공감합니다.',
    celebrities: [
      { avatar: '🎶', category: '유명인', name: '아이유 (IU)', role: '싱어송라이터·배우' },
      { avatar: '🌻', category: '유명인', name: '빈센트 반 고흐', role: '후기 인상파 화가' },
      { avatar: '🌹', category: '캐릭터', name: '어린 왕자', role: '생텍쥐페리 소설' }
    ],
    best: 'ENFJ',
    worst: 'ESTJ'
  },
  INTP: {
    emoji: '🔭',
    subtitle: '논리적인 사색가',
    tags: ['#아이디어뱅크', '#호기심천국', '#논리분석', '#독창성'],
    description:
      '끊임없이 탐구하고 사색하는 지식 탐험가입니다. 남들이 당연하게 여기는 것에도 "왜?"라는 질문을 던지며, 독창적인 관점과 날카로운 분석력으로 새로운 해답을 찾아냅니다.',
    celebrities: [
      { avatar: '🍎', category: '유명인', name: '알베르트 아인슈타인', role: '이론물리학자' },
      { avatar: '💻', category: '유명인', name: '빌 게이츠', role: '마이크로소프트 창업자' },
      { avatar: '🔍', category: '캐릭터', name: '셜록 홈즈', role: '명탐정 캐릭터' }
    ],
    best: 'ENTJ',
    worst: 'ESFJ'
  },
  ESTP: {
    emoji: '🏄',
    subtitle: '모험을 즐기는 사업가',
    tags: ['#행동파', '#센스만점', '#도전정신', '#현실감각'],
    description:
      '생각보다 행동이 앞서는 넘치는 에너지의 소유자입니다. 스릴과 변화를 즐기며 뛰어난 순발력과 유머 감각으로 어디서든 자연스럽게 중심인물이 되는 매력이 있습니다.',
    celebrities: [
      { avatar: '🥊', category: '캐릭터', name: '마석도 (마동석)', role: '영화 범죄도시' },
      { avatar: '🤠', category: '캐릭터', name: '인디아나 존스', role: '모험가 고고학자' },
      { avatar: '🚀', category: '캐릭터', name: '버즈 라이트이어', role: '토이스토리' }
    ],
    best: 'ISFJ',
    worst: 'INFJ'
  },
  ESFP: {
    emoji: '🎉',
    subtitle: '자유로운 영혼의 연예인',
    tags: ['#분위기메이커', '#긍정에너지', '#사교성갑', '#즐거움추구'],
    description:
      '주변을 단숨에 밝게 만드는 타고난 엔터테이너입니다. 사람들과 어울리는 것을 좋아하고 현재의 순간을 신나게 즐길 줄 알며, 특유의 친화력으로 누구와도 금방 친해집니다.',
    celebrities: [
      { avatar: '👒', category: '캐릭터', name: '몽키 D. 루피', role: '원피스 주인공' },
      { avatar: '💋', category: '유명인', name: '마릴린 먼로', role: '할리우드 아이콘' },
      { avatar: '⛄', category: '캐릭터', name: '올라프', role: '겨울왕국' }
    ],
    best: 'ISTJ',
    worst: 'INTJ'
  },
  ENFP: {
    emoji: '🌈',
    subtitle: '재기발랄한 활동가',
    tags: ['#해피바이러스', '#창의력폭발', '#열정만수르', '#인간비타민'],
    description:
      '자유롭고 창의적이며 언제나 새로운 가능성을 찾아 떠나는 열정가입니다. 사람들에게 긍정적인 영감을 불어넣으며, 솔직하고 풍부한 표현력으로 주변에 활기를 선물합니다.',
    celebrities: [
      { avatar: '🧽', category: '캐릭터', name: '스폰지밥', role: '네모바지 스폰지밥' },
      { avatar: '🧞', category: '캐릭터', name: '지니', role: '디즈니 알라딘' },
      { avatar: '💜', category: '유명인', name: 'RM (방탄소년단)', role: '아티스트·리더' }
    ],
    best: 'INFJ',
    worst: 'ISTJ'
  },
  ENTP: {
    emoji: '⚡',
    subtitle: '뜨거운 논쟁을 즐기는 변론가',
    tags: ['#다재다능', '#재치입담', '#고정관념타파', '#도전적'],
    description:
      '두뇌 회전이 빠르고 지적인 도전을 즐기는 혁신가입니다. 틀에 박힌 방식을 거부하고 색다른 아이디어를 쏟아내며, 유쾌한 입담과 자신감으로 대화를 이끕니다.',
    celebrities: [
      { avatar: '🤖', category: '캐릭터', name: '아이언맨 (토니 스타크)', role: '마블 히어로' },
      { avatar: '🦊', category: '캐릭터', name: '닉 와일드', role: '주토피아 여우' },
      { avatar: '💡', category: '유명인', name: '토머스 에디슨', role: '발명왕' }
    ],
    best: 'INFJ',
    worst: 'ISFJ'
  },
  ESTJ: {
    emoji: '🏛️',
    subtitle: '엄격한 관리자',
    tags: ['#리더십', '#체계적', '#추진력', '#현실주의'],
    description:
      '사물과 사람을 체계적으로 조직하고 이끄는 데 탁월한 능력이 있습니다. 명확한 기준과 현실적인 판단력으로 목표를 빠르게 달성하는 든든한 리더 유형입니다.',
    celebrities: [
      { avatar: '🍳', category: '유명인', name: '고든 램지', role: '스타 셰프' },
      { avatar: '🧙‍♀️', category: '캐릭터', name: '맥고나걸 교수', role: '해리포터' },
      { avatar: '🦀', category: '캐릭터', name: '집게사장', role: '네모바지 스폰지밥' }
    ],
    best: 'ISFP',
    worst: 'INFP'
  },
  ESFJ: {
    emoji: '🤝',
    subtitle: '사교적인 외교관',
    tags: ['#친화력최고', '#다정다감', '#협동심', '#세심한챙김'],
    description:
      '주변 사람들에게 따뜻한 관심을 쏟고 조화로운 분위기를 만드는 데 앞장섭니다. 공감 능력과 책임감이 모두 뛰어나 모임이나 조직에서 없어서는 안 될 든든한 존재입니다.',
    celebrities: [
      { avatar: '🤠', category: '캐릭터', name: '우디', role: '토이스토리 보안관' },
      { avatar: '🎸', category: '유명인', name: '테일러 스위프트', role: '팝 스타' },
      { avatar: '🍰', category: '캐릭터', name: '모니카 겔러', role: '시트콤 프렌즈' }
    ],
    best: 'ISTP',
    worst: 'INTP'
  },
  ENFJ: {
    emoji: '🌟',
    subtitle: '정의로운 사회운동가',
    tags: ['#따뜻한카리스마', '#이타주의', '#성장메이트', '#소통왕'],
    description:
      '타인의 잠재력을 발견하고 함께 성장하도록 이끄는 따뜻한 리더입니다. 뛰어난 언변과 진심 어린 공감으로 사람들의 마음을 움직이며 더 나은 세상을 꿈꿉니다.',
    celebrities: [
      { avatar: '🎙️', category: '유명인', name: '오프라 윈프리', role: '토크쇼의 여왕' },
      { avatar: '🔥', category: '캐릭터', name: '렌고쿠 쿄쥬로', role: '귀멸의 칼날' },
      { avatar: '🐰', category: '캐릭터', name: '주디 홉스', role: '주토피아 경찰관' }
    ],
    best: 'INFP',
    worst: 'ISTP'
  },
  ENTJ: {
    emoji: '👑',
    subtitle: '대담한 통솔자',
    tags: ['#카리스마', '#결단력', '#비전제시', '#성취지향'],
    description:
      '확실한 비전과 강한 추진력으로 큰 목표를 현실로 만들어내는 타고난 통솔자입니다. 어려운 과제 앞에서도 주저하지 않으며 효율적인 전략으로 팀을 성공으로 이끕니다.',
    celebrities: [
      { avatar: '📱', category: '유명인', name: '스티브 잡스', role: '애플 공동창업자' },
      { avatar: '👨‍🍳', category: '유명인', name: '백종원', role: '요리연구가·사업가' },
      { avatar: '👠', category: '캐릭터', name: '미란다 프리슬리', role: '악마는 프라다를 입는다' }
    ],
    best: 'INTP',
    worst: 'ISFP'
  }
};

// 상태 관리
let currentIndex = 0;
let answers = []; // 각 문항에서 선택한 값 ('E', 'I', 'S', 'N', 'T', 'F', 'J', 'P') 저장

// DOM 요소
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const progressText = document.getElementById('progress-text');
const progressBarFill = document.getElementById('progress-bar-fill');

const questionNumber = document.getElementById('question-number');
const questionTitle = document.getElementById('question-title');
const choiceABtn = document.getElementById('choice-a');
const choiceBBtn = document.getElementById('choice-b');
const choiceAText = document.getElementById('choice-a-text');
const choiceBText = document.getElementById('choice-b-text');

const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const toastMessage = document.getElementById('toast-message');

// 화면 전환 함수
function showScreen(targetScreen) {
  [startScreen, questionScreen, resultScreen].forEach((screen) => {
    screen.classList.remove('active');
  });
  targetScreen.classList.add('active');
}

// 테스트 시작
function startTest() {
  currentIndex = 0;
  answers = [];
  toastMessage.textContent = '';
  renderQuestion();
  showScreen(questionScreen);
}

// 현재 질문 화면 렌더링
function renderQuestion() {
  const currentQ = questions[currentIndex];
  const total = questions.length;

  questionNumber.textContent = `Q${currentIndex + 1}.`;
  questionTitle.textContent = currentQ.question;
  choiceAText.textContent = currentQ.choiceA.text;
  choiceBText.textContent = currentQ.choiceB.text;

  progressText.textContent = `${currentIndex + 1} / ${total}`;
  progressBarFill.style.width = `${((currentIndex + 1) / total) * 100}%`;

  prevBtn.disabled = currentIndex === 0;
}

// 선택지 클릭 처리
function handleChoice(choiceKey) {
  const currentQ = questions[currentIndex];
  const selectedValue = currentQ[choiceKey].value;
  answers[currentIndex] = selectedValue;

  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

// 이전 질문으로 이동
function handlePrevQuestion() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion();
  }
}

// MBTI 결과 계산 및 표시
function showResult() {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach((val) => {
    if (counts[val] !== undefined) {
      counts[val] += 1;
    }
  });

  const mbti =
    (counts.E >= counts.I ? 'E' : 'I') +
    (counts.S >= counts.N ? 'S' : 'N') +
    (counts.T >= counts.F ? 'T' : 'F') +
    (counts.J >= counts.P ? 'J' : 'P');

  const data = mbtiResults[mbti];

  document.getElementById('result-emoji').textContent = data.emoji;
  document.getElementById('result-subtitle').textContent = data.subtitle;
  document.getElementById('result-type').textContent = mbti;
  document.getElementById('result-description').textContent = data.description;
  document.getElementById('best-match').textContent = data.best;
  document.getElementById('worst-match').textContent = data.worst;

  // 태그 렌더링
  const tagsContainer = document.getElementById('result-tags');
  tagsContainer.innerHTML = '';
  data.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'result-tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // 같은 유형의 유명인 & 캐릭터 렌더링
  const celebrityContainer = document.getElementById('celebrity-list');
  celebrityContainer.innerHTML = '';
  data.celebrities.forEach((person) => {
    const card = document.createElement('div');
    card.className = 'celebrity-card';
    card.innerHTML = `
      <div class="celebrity-avatar" aria-hidden="true">${person.avatar}</div>
      <span class="celebrity-category">${person.category}</span>
      <strong class="celebrity-name">${person.name}</strong>
      <span class="celebrity-role">${person.role}</span>
    `;
    celebrityContainer.appendChild(card);
  });

  // 4가지 지표 비율 막대 렌더링
  renderScoreBars(counts);

  showScreen(resultScreen);
}

function renderScoreBars(counts) {
  const pairs = [
    { left: 'E', leftName: '외향 (E)', right: 'I', rightName: '내향 (I)' },
    { left: 'S', leftName: '감각 (S)', right: 'N', rightName: '직관 (N)' },
    { left: 'T', leftName: '사고 (T)', right: 'F', rightName: '감정 (F)' },
    { left: 'J', leftName: '판단 (J)', right: 'P', rightName: '인식 (P)' }
  ];

  const container = document.getElementById('score-bars');
  container.innerHTML = '';

  pairs.forEach((pair) => {
    const leftScore = counts[pair.left];
    const rightScore = counts[pair.right];
    const total = leftScore + rightScore || 1;
    const leftPercent = Math.round((leftScore / total) * 100);
    const rightPercent = 100 - leftPercent;

    const row = document.createElement('div');
    row.className = 'score-row';
    row.innerHTML = `
      <div class="score-labels">
        <span class="${leftPercent >= rightPercent ? 'winner' : ''}">${pair.leftName} ${leftPercent}%</span>
        <span class="${rightPercent > leftPercent ? 'winner' : ''}">${rightPercent}% ${pair.rightName}</span>
      </div>
      <div class="score-track">
        <div class="score-fill-left" style="width: ${leftPercent}%"></div>
        <div class="score-fill-right" style="width: ${rightPercent}%"></div>
      </div>
    `;
    container.appendChild(row);
  });
}

// 결과 텍스트 클립보드 복사
async function copyResultText() {
  const mbti = document.getElementById('result-type').textContent;
  const subtitle = document.getElementById('result-subtitle').textContent;
  const celebs = mbtiResults[mbti]
    ? mbtiResults[mbti].celebrities.map((c) => c.name).join(', ')
    : '';
  const textToCopy = `[나의 MBTI 성격 유형 테스트]\n제 유형은 "${mbti} (${subtitle})" 입니다!\n같은 유형의 인물/캐릭터: ${celebs}`;

  try {
    await navigator.clipboard.writeText(textToCopy);
    toastMessage.textContent = '✅ 결과가 클립보드에 복사되었습니다!';
  } catch {
    toastMessage.textContent = `나의 결과: ${mbti} (${subtitle})`;
  }
}

// 이벤트 리스너 등록
startBtn.addEventListener('click', startTest);
choiceABtn.addEventListener('click', () => handleChoice('choiceA'));
choiceBBtn.addEventListener('click', () => handleChoice('choiceB'));
prevBtn.addEventListener('click', handlePrevQuestion);
restartBtn.addEventListener('click', () => showScreen(startScreen));
shareBtn.addEventListener('click', copyResultText);

