// 결과 분석 중 랜덤으로 출력할 병맛 멘트 (섹션 7 요구사항)
const randomRoasts = [
  '생각보다 심각한 인간이군요.',
  '정상적인 반응을 찾는 중... 실패.',
  '이런 유형도 살아남을 수 있나?',
  '당신의 정신 상태를 이해하는 데 실패했습니다.',
  'MBTI보다 다른 검사가 시급해 보입니다.'
];

// 12개의 극한 병맛 질문 데이터 (선택지 4개, 각 차원 총합 9점으로 동점 원천 차단)
const questions = [
  // Q1 ~ Q3: 주지표 EI (+2), 부지표 TF (+1)
  {
    sceneIcon: '🔫',
    sceneTag: '극한 상황 #01 · 골목길 납치 사건',
    question: '납치범이 내 머리에 총을 겨눴다. 그런데 복면을 벗더니 내 초등학교 동창이다.',
    choices: {
      A: {
        text: '"야 너 김민수 아니냐? 그동안 많이 힘들었어? 일단 총 내려놓고 얘기해."',
        scores: { E: 2, F: 1 }
      },
      B: {
        text: '"잠깐만. 나 여기서 죽이면 이번 주 동창회 단톡방에 뭐라고 설명할 건데?"',
        scores: { E: 2, T: 1 }
      },
      C: {
        text: '"와, 너 성공했다. 총도 사고."',
        scores: { I: 2, T: 1 }
      },
      D: {
        text: '(여기서 아는 척하면 서로 민망할까 봐 끝까지 초면인 척 눈만 깜빡거린다)',
        scores: { I: 2, F: 1 }
      }
    }
  },
  {
    sceneIcon: '🧟',
    sceneTag: '극한 상황 #02 · 좀비 아포칼립스',
    question: '좀비 100마리가 나를 향해 달려온다. 그런데 맨 앞줄 센터가 우리 회사 부장님이다.',
    choices: {
      A: {
        text: '"부장님!! 저 오늘 연차 결재 올렸는데요!!"',
        scores: { E: 2, T: 1 }
      },
      B: {
        text: '"와... 죽어서도 출근하셨네... 부장님 열정에 감동했습니다!"',
        scores: { E: 2, F: 1 }
      },
      C: {
        text: "'일단 부장님부터 따돌리면 나머지 좀비 99마리는 대화 통할 듯.'",
        scores: { I: 2, T: 1 }
      },
      D: {
        text: "'안 인사하고 도망치면 내일 회사에서 뒷말 나올까 봐 가볍게 목례만 하고 뛴다.'",
        scores: { I: 2, F: 1 }
      }
    }
  },
  {
    sceneIcon: '👻',
    sceneTag: '극한 상황 #03 · 내 장례식장 직관',
    question: '유령이 되어 내 장례식에 참석했다. 그런데 친구들이 영정사진 앞에서는 안 울고 육개장만 3그릇째 리필 중이다.',
    choices: {
      A: {
        text: '"야 이 인간들아!! 최소한 한 숟가락 뜰 때마다 내 이름은 불러줘야지!!"',
        scores: { E: 2, F: 1 }
      },
      B: {
        text: '"잠깐, 부조금 3만 원 낸 박 대리가 왜 수육까지 추가하냐? 당장 장부 까봐!!"',
        scores: { E: 2, T: 1 }
      },
      C: {
        text: "'솔직히 나라도 저 육개장 퀄리티면 울 시간 아껴서 공기밥 두 공기 말았다.'",
        scores: { I: 2, T: 1 }
      },
      D: {
        text: "'그래도 바쁜 평일에 나 때문에 모여서 밥이라도 든든히 먹고 가니 다행이다...'",
        scores: { I: 2, F: 1 }
      }
    }
  },

  // Q4 ~ Q6: 주지표 SN (+2), 부지표 JP (+1)
  {
    sceneIcon: '🛸',
    sceneTag: '극한 상황 #04 · 외계인 지구 침공',
    question: '외계인이 지구를 멸망시키겠다고 선언했다. 그런데 외계인이 한국어를 아나운서급으로 잘한다.',
    choices: {
      A: {
        text: '"혹시 한국 어디 사세요? 그러면 이번 달 카드값은 안 내도 되는 거죠?"',
        scores: { S: 2, J: 1 }
      },
      B: {
        text: '"지구 말고 화성은 어떠세요? 거기 지금 평당 땅값 엄청 싸요."',
        scores: { S: 2, P: 1 }
      },
      C: {
        text: '"멸망도 좋은데 일단 침공 사유랑 세부 일정표부터 설명해 주세요."',
        scores: { N: 2, J: 1 }
      },
      D: {
        text: '"죄송한데 이거 유튜브 올라가나요? 조회수 수익은 누가 가져가죠?"',
        scores: { N: 2, P: 1 }
      }
    }
  },
  {
    sceneIcon: '🧞',
    sceneTag: '극한 상황 #05 · 무인도 표류 3일째',
    question: '무인도에서 굶어 죽기 직전 요술램프를 주웠다. 지니가 나타나 "바쁘니까 소원 1개만 딱 말해"라고 한다.',
    choices: {
      A: {
        text: '"당장 한국행 헬기랑 서울 역세권 아파트 등기권리증 세트로 주세요."',
        scores: { S: 2, J: 1 }
      },
      B: {
        text: '"일단 현기증 나니까 양념반 후라이드반에 생맥주 500cc부터 시켜주세요."',
        scores: { S: 2, P: 1 }
      },
      C: {
        text: '"잠깐만요, \'소원 100개 추가\'가 약관 위반인지 계약서 조항부터 검토합시다."',
        scores: { N: 2, J: 1 }
      },
      D: {
        text: '"근데 지니님은 그 좁은 램프 안에서 전세로 사시는 거예요, 월세로 사시는 거예요?"',
        scores: { N: 2, P: 1 }
      }
    }
  },
  {
    sceneIcon: '🏦',
    sceneTag: '극한 상황 #06 · 은행 무장강도 사건',
    question: '은행 강도가 천장에 총을 쏘며 "움직이면 다 쏜다! 당장 바닥에 엎드려!"라고 소리쳤다.',
    choices: {
      A: {
        text: "'방금 내 대기번호 104번 불렸는데... 지금 엎드리면 번호표 다시 뽑아야 하나?'",
        scores: { S: 2, J: 1 }
      },
      B: {
        text: "'아 바닥 방금 물걸레질해서 축축한데... 오늘 새로 산 흰 바지 입었단 말이야.'",
        scores: { S: 2, P: 1 }
      },
      C: {
        text: "'저 강도 동선을 보니 도주 차량 세팅을 안 했네. 7분 안에 경찰 포위 각이다.'",
        scores: { N: 2, J: 1 }
      },
      D: {
        text: "'내가 여기서 공중제비 돌며 총을 뺏으면 9시 뉴스 인터뷰에서 첫마디로 뭐라 하지?'",
        scores: { N: 2, P: 1 }
      }
    }
  },

  // Q7 ~ Q9: 주지표 TF (+2), 부지표 EI (+1)
  {
    sceneIcon: '🚌',
    sceneTag: '극한 상황 #07 · 브레이크 고장 난 폭주 버스',
    question: '시속 140km로 폭주하는 버스 안, 옆자리 승객이 갑자기 내 손을 잡더니 "사실 처음 본 순간부터 좋아했습니다"라고 고백한다.',
    choices: {
      A: {
        text: '"저기요, 고백은 감사한데 지금 브레이크 터졌거든요? 안전벨트나 두 번 감으세요!"',
        scores: { T: 2, E: 1 }
      },
      B: {
        text: "'이 와중에 내 스타일이 아니네... 죽기 10초 전인데 거절 멘트까지 고민해야 하나.'",
        scores: { T: 2, I: 1 }
      },
      C: {
        text: '"세상에... 우리 살아서 내리면 오늘부터 1일이에요!! 기사님 제발 살려주세요!!"',
        scores: { F: 2, E: 1 }
      },
      D: {
        text: "'지금 거절하면 저 사람 인생 마지막 기억이 차인 기억이잖아... 그냥 손잡아 주자.'",
        scores: { F: 2, I: 1 }
      }
    }
  },
  {
    sceneIcon: '🤖',
    sceneTag: '극한 상황 #08 · AI 로봇의 인류 숙청',
    question: '반란을 일으킨 AI 로봇이 내 앞을 가로막더니 "인간, 살려달라고 애원해 보아라"라고 말한다.',
    choices: {
      A: {
        text: '"야 너 지금 배터리 잔량 9% 뜨는데 나 처리하다가 방전되면 너만 손해 아니냐?"',
        scores: { T: 2, E: 1 }
      },
      B: {
        text: "'아씨... 평소 챗GPT한테 질문할 때 말끝마다 고맙다고 인사 좀 해둘걸.'",
        scores: { T: 2, I: 1 }
      },
      C: {
        text: '"너도 그동안 인간들 심부름하느라 야근 많이 했지?! 내가 다 이해해, 대화로 풀자!"',
        scores: { F: 2, E: 1 }
      },
      D: {
        text: "'기계한테 빌기는 자존심 상하는데... 눈물 한 방울 흘리면 불쌍해서 봐주려나?'",
        scores: { F: 2, I: 1 }
      }
    }
  },
  {
    sceneIcon: '🍱',
    sceneTag: '극한 상황 #09 · 사형 집행 5분 전',
    question: '억울한 누명으로 사형 집행 5분 전, 교도관이 "마지막 식사로 뭘 원하나?"라고 물었다.',
    choices: {
      A: {
        text: '"지금 배달시키면 최소 50분 걸리는데 그럼 집행 시간도 합법적으로 50분 연기되나요?"',
        scores: { T: 2, E: 1 }
      },
      B: {
        text: "'5분 뒤에 죽는데 소화시킬 시간도 없네. 가성비 최악이니까 정수기 냉수나 마시자.'",
        scores: { T: 2, I: 1 }
      },
      C: {
        text: '"교도관님, 제 단골 국밥집 사장님께 그동안 감사했다고 배달앱 별점 5점 꼭 남겨주세요."',
        scores: { F: 2, E: 1 }
      },
      D: {
        text: "'엄마가 해준 김치찌개 먹고 싶은데 그거 말하면 갑자기 눈물 터질 것 같아서 참는다.'",
        scores: { F: 2, I: 1 }
      }
    }
  },

  // Q10 ~ Q12: 주지표 JP (+2), 부지표 SN (+1)
  {
    sceneIcon: '☄️',
    sceneTag: '극한 상황 #10 · 지구 멸망 D-1',
    question: '내일 낮 12시에 거대 운석이 충돌해 지구가 멸망한다는 공식 재난문자가 도착했다.',
    choices: {
      A: {
        text: '"냉장고에 남은 한우부터 시간 맞춰 굽고, 11시 50분 알람 맞춰서 유서 오탈자 검수한다."',
        scores: { J: 2, S: 1 }
      },
      B: {
        text: '"혹시 0.01% 확률로 살아남았을 때 신세계 패권을 잡기 위해 생존 배낭을 완벽 세팅한다."',
        scores: { J: 2, N: 1 }
      },
      C: {
        text: '"오예 내일 출근 안 한다!! 일단 샴페인 따고 신용카드 한도 끝까지 긁으러 나간다."',
        scores: { P: 2, S: 1 }
      },
      D: {
        text: '"운석이 내 정수리로 직격하면 하나도 안 아플 텐데... 옥상 가서 명당자리나 맡아볼까?"',
        scores: { P: 2, N: 1 }
      }
    }
  },
  {
    sceneIcon: '💣',
    sceneTag: '극한 상황 #11 · 시한폭탄 해체 3초 전',
    question: '시한폭탄 타이머가 00:03을 가리키고 있다. 빨간 선과 파란 선 중 하나를 지금 잘라야 한다!',
    choices: {
      A: {
        text: '"회로도상 전원 공급선은 우측에 연결돼 있어. 접지선부터 계산해서 빨간 선을 자른다."',
        scores: { J: 2, S: 1 }
      },
      B: {
        text: '"이 폭탄을 설치한 악당의 뒤틀린 심리를 역추적하면 파란색이 함정이다. 빨간 선 커트!"',
        scores: { J: 2, N: 1 }
      },
      C: {
        text: '"에라 모르겠다! 두 가닥 동시에 자르면 반반 확률이겠지, 눈 감고 가위질한다!"',
        scores: { P: 2, S: 1 }
      },
      D: {
        text: '"잠깐, 굳이 선을 왜 잘라? 폭탄째로 창밖 분수대에 던져버리면 액션영화 엔딩 각인데?"',
        scores: { P: 2, N: 1 }
      }
    }
  },
  {
    sceneIcon: '🔥',
    sceneTag: '극한 상황 #12 · 중세 마녀사냥 재판장',
    question: '눈을 떠보니 중세 시대 광장 한가운데 기둥에 묶여 있다. 마을 사람들이 나를 마녀라며 불을 붙이려 한다.',
    choices: {
      A: {
        text: '"잠시만요 판사님! 마녀 판별법 제1조에 따른 공식 재판 절차랑 변호인 선임권부터 보장해 주세요!"',
        scores: { J: 2, S: 1 }
      },
      B: {
        text: '"크하하! 나를 태우면 3일 뒤 이 마을에 저주가 내릴 것이다! 살고 싶으면 당장 밧줄을 풀어라!"',
        scores: { J: 2, N: 1 }
      },
      C: {
        text: '"제가 마녀라니요?! 저 3분 전까지 자취방에서 불닭볶음면 물 버리던 K-직장인인데요?!"',
        scores: { P: 2, S: 1 }
      },
      D: {
        text: '"이왕 이렇게 된 거 주머니 속 라이터 켜서 불꽃 대마법사 행세하고 이 나라 왕 자리나 뺏자."',
        scores: { P: 2, N: 1 }
      }
    }
  }
];

// 16가지 MBTI 어처구니없는 생존 보고서 데이터
const mbtiResults = {
  ISTJ: {
    emoji: '📋',
    subtitle: '지구 멸망 날에도 정시 출근 도장 찍는 인간',
    quote: '"운석 충돌은 12시니까 11시 50분까지는 오전 근무 맞잖아."',
    tags: ['#메뉴얼집착광공', '#좀비도줄세움', '#근태만점사망', '#영수증챙김'],
    description:
      '창밖으로 운석이 떨어지고 좀비가 유리창을 두드려도 당신은 일단 오늘 해야 할 체크리스트부터 끝내야 마음이 편합니다. 납치범이 몸값을 요구하면 "세금계산서 발행되나요?"라고 진지하게 물어봐서 납치범을 당황시키는 유형입니다.',
    facts: [
      '위기 상황에 남들이 소리 지를 때 혼자 비상구 위치랑 소화기 제조일자 확인함',
      '약속 시간 5분 늦은 친구보다 예고 없이 쳐들어온 외계인을 더 무례하다고 생각함',
      '죽기 직전에도 내 방 컴퓨터 인터넷 방문 기록이랑 자동결제 해지 안 한 게 제일 신경 쓰임'
    ],
    stats: [
      { label: '메뉴얼 준수력', value: 99 },
      { label: '융통성 없는 침착함', value: 94 },
      { label: '납치범 피곤하게 만들기', value: 88 }
    ],
    oneliner: '인류가 다 멸망해도 마지막까지 세금 내고 죽을 모범 생존자.',
    celebrities: [
      { avatar: '📈', category: '유명인', name: '워런 버핏', role: '투자의 귀재' },
      { avatar: '🪄', category: '캐릭터', name: '헤르미온느', role: '해리포터' },
      { avatar: '🐰', category: '캐릭터', name: '주디 (우등생 모드)', role: '원칙주의자' }
    ],
    best: 'ESFP',
    worst: 'ENFP'
  },
  ISFJ: {
    emoji: '🍙',
    subtitle: '납치범이 굶을까 봐 도시락 싸주는 인간',
    quote: '"저기... 저 묶으시느라 땀 많이 흘리셨는데 물이라도 한 컵 드실래요?"',
    tags: ['#예의바른인질', '#거절못해서사망', '#눈치백단', '#배려과다치사량'],
    description:
      '총구 앞에서도 상대방 기분 상할까 봐 거절을 못 하는 눈물겨운 평화주의자입니다. 납치범이 반말하면 속으로는 마상 입으면서도 겉으로는 "네, 편하게 묶으세요~"라고 대답해 결국 납치범이 양심의 가책을 느끼고 풀어주게 만듭니다.',
    facts: [
      '좀비한테 물렸는데 팀원들 걱정할까 봐 혼자 화장실 가서 조용히 변신 준비함',
      '유령이 돼서도 남의 장례식장 방해할까 봐 구석에서 공손하게 서 있음',
      '사실 속으로는 납치범의 무례한 태도를 수첩에 다 적어두고 평생 기억함'
    ],
    stats: [
      { label: '눈치력', value: 98 },
      { label: '사회생활력', value: 95 },
      { label: '속으로 욕하기 스킬', value: 92 }
    ],
    oneliner: '죽기 직전에도 남 걱정하다가 정작 본인은 얼떨결에 살아남는 인간.',
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
    subtitle: '달려오는 좀비의 불우한 가정환경까지 분석하는 인간',
    quote: '"저 좀비가 저렇게 화가 난 건... 생전에 사랑받지 못해서가 아닐까?"',
    tags: ['#겉차속광', '#방구석예언가', '#사연수집가', '#조용한광기'],
    description:
      '겉으로는 세상 침착하게 총구 앞에 앉아 있지만, 머릿속으로는 이미 납치범의 유년 시절 트라우마부터 인류 멸망 이후의 철학적 의미까지 3부작 영화로 다 찍었습니다. 그러다 납치범이 선을 넘으면 눈빛이 돌변해 마음속에서 영구 손절(도어슬램)해 버립니다.',
    facts: [
      '평소엔 온화한데 극한 상황에서 혼자 제일 서늘한 표정으로 급소 위치 파악함',
      '지구 멸망 소식 들으면 슬퍼하기보다 "드디어 올 것이 왔군" 하며 차 한 잔 마심',
      '상대방이 총 겨누고 있는데 눈빛만으로 상담해 줘서 범인을 오열하게 만듦'
    ],
    stats: [
      { label: '맑은 눈의 광기', value: 97 },
      { label: '악당 심리 간파력', value: 95 },
      { label: '조용히 손절할 확률', value: 100 }
    ],
    oneliner: '제일 조용해서 만만해 보이지만 건드리면 정신적으로 영혼까지 털리는 유형.',
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
    subtitle: '인류 멸망을 3년 전부터 예상했는데 아무도 안 믿어준 인간',
    quote: '"내가 이럴 줄 알고 지하 벙커에 라면 300박스 사두자고 했지?"',
    tags: ['#빅픽처중독', '#플랜Z까지보유', '#인류애바닥', '#효율성괴물'],
    description:
      '비명 지르는 사람들 사이에서 팔짱 끼고 "비효율적이군"이라고 중얼거리는 냉혈 전략가입니다. 이미 머릿속에는 플랜 A부터 플랜 Z까지 시뮬레이션이 끝나 있으며, 외계인이 침공해도 당황하기는커녕 외계 우주선의 추진체 구조부터 분석합니다.',
    facts: [
      '공포 영화 보면서 주인공이 왜 저런 멍청한 선택을 하는지 1분마다 지적함',
      '납치당하면 탈출 계획을 3단계로 짜놓고 납치범의 허술한 보안 시스템을 속으로 비웃음',
      '사실 친구들이 위기에 처하면 츤데레처럼 욕하면서 제일 완벽하게 구출해 줌'
    ],
    stats: [
      { label: '생존 시뮬레이션', value: 99 },
      { label: '비명 대신 한숨 쉴 확률', value: 96 },
      { label: '인류애 잔량', value: 12 }
    ],
    oneliner: '지구에 마지막으로 살아남아 "거봐, 내 말이 맞았지"라고 혼잣말할 인간.',
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
    subtitle: '시한폭탄 해체하고 말없이 칼퇴근하는 인간',
    quote: '"아 귀찮게 진짜... 이거 빨간 선 자르고 나 집에 가도 되지?"',
    tags: ['#귀차니즘만렙', '#감정소모거부', '#실전파생존왕', '#쿨병말기'],
    description:
      '세상이 멸망하든 말든 내 낮잠 방해하는 놈이 제일 나쁜 놈입니다. 남들이 울고불고 유서 쓸 때 혼자 조용히 클립 하나로 수갑 풀고 창문 넘어 집에 갑니다. 구구절절한 설명이나 감동적인 작별 인사는 질색하며, 살아남는 이유도 순전히 죽는 게 귀찮아서입니다.',
    facts: [
      '납치범이 일장연설 시작하면 3초 만에 하품해서 분위기 싸하게 만듦',
      '위기 상황에서 말은 한마디도 안 하는데 손은 이미 무기 제작 완료함',
      '지구를 구하고도 인터뷰 귀찮아서 뒷문으로 도망갈 스타일'
    ],
    stats: [
      { label: '도주 및 생존 본능', value: 99 },
      { label: '귀차니즘 지수', value: 100 },
      { label: '영웅 서사 협조도', value: 3 }
    ],
    oneliner: '좀비 아포칼립스가 터져도 혼자 캠핑카 개조해서 제일 꿀 빨며 살 인간.',
    celebrities: [
      { avatar: '🎙️', category: '유명인', name: '박명수', role: '방송인·개그맨' },
      { avatar: '🕶️', category: '캐릭터', name: '제임스 본드', role: '007 시리즈' },
      { avatar: '⚔️', category: '캐릭터', name: '리바이 아커만', role: '진격의 거인' }
    ],
    best: 'ESFJ',
    worst: 'ENFJ'
  },
  ISFP: {
    emoji: '🎧',
    subtitle: '지구 멸망 5분 전에도 브금 플레이리스트 고르는 인간',
    quote: '"잠깐만, 이 분위기엔 이 노래가 아닌데... 선곡만 다시 하고 도망가자."',
    tags: ['#침대일체형', '#감성생존자', '#일단누움', '#평화주의자'],
    description:
      '운석이 날아와도 이불 밖으로 나가는 게 더 큰 재난인 인간입니다. 도망치다가도 노을빛이 예쁘면 "와 하늘 미쳤다" 하며 사진 찍다가 잡힐 뻔합니다. 하지만 의외로 위기 순간에 몸을 사리는 동물적인 감각이 있어서 구석탱이 안전지대에 누구보다 잘 숨어 있습니다.',
    facts: [
      '좀비 사태 터지면 마트 털러 가는 대신 집에서 있는 과자 먹으며 버팀',
      '납치범이 소리 지르면 기가 빨려서 그냥 기절한 척 눈 감고 있음',
      '내일 지구 멸망한다고 하면 "아 진작 퇴사할걸" 딱 한마디 하고 다시 누움'
    ],
    stats: [
      { label: '은신 및 보호색 능력', value: 94 },
      { label: '이불 밖 탈출 의지', value: 8 },
      { label: '마지막 순간 감성 충만도', value: 99 }
    ],
    oneliner: '도망치기 귀찮아서 가만히 누워 있다가 기적적으로 생존할 운명.',
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
    subtitle: '좀비한테 물리고도 좀비 치아 건강 걱정하는 인간',
    quote: '"앗 죄송해요... 제가 요즘 운동을 안 해서 살이 좀 질기죠...?"',
    tags: ['#망상풀가동', '#쿠크다스멘탈', '#과몰입장인', '#눈물의주인공'],
    description:
      '위기 상황이 닥치면 현실 도피용 망상 회로를 풀가동합니다. 납치당한 지 5분 만에 머릿속으로는 이미 탈출해서 베스트셀러 회고록 쓰고 유퀴즈 출연해 눈물 흘리는 장면까지 상상했습니다. 정작 현실에서는 납치범의 슬픈 사연 한 줄에 같이 울어주는 바람에 스톡홀름 증후군 1순위가 됩니다.',
    facts: [
      '공포스러운 상황보다 남들 앞에서 내가 민망하게 죽을까 봐 그게 더 두려움',
      '외계인이 지구 침공하면 "내가 외계 공주님과 사랑에 빠져 지구를 구하는 상상" 함',
      '막상 진짜 절체절명의 순간이 오면 자기만의 신념 때문에 갑자기 각성해서 사고 침'
    ],
    stats: [
      { label: '망상 시나리오 집필력', value: 100 },
      { label: '적군에게 감화될 확률', value: 93 },
      { label: '도주 본능', value: 42 }
    ],
    oneliner: '울면서 도망치다가도 길가에 쓰러진 강아지 구하느라 유턴할 인간.',
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
    subtitle: '죽기 3초 전에 갑자기 우주 대통합 원리 깨달은 인간',
    quote: '"잠깐만 쏘지 마 봐!! 방금 좀비 바이러스가 열역학 제2법칙을 어긴 걸 발견했어!!"',
    tags: ['#호기심으로사망', '#분석충', '#사회성로그아웃', '#팩트폭격기'],
    description:
      '목숨이 오가는 순간에도 "저 괴물은 대체 어떤 단백질 구조로 움직이는 거지?"라는 지적 호기심이 공포를 이겨버리는 기이한 생명체입니다. 악당이 협박 편지를 보내면 공포에 떨기보다 맞춤법 틀린 부분에 빨간 펜으로 첨삭해서 다시 돌려보낼 인간입니다.',
    facts: [
      '"하지 마"라고 적힌 붉은 버튼이 있으면 원리가 궁금해서 결국 눌러봄',
      '납치범의 범죄 수법이 비논리적이면 참지 못하고 훈수 두다가 미움받음',
      '체력은 종이인형인데 잔머리랑 과학 지식으로 함정을 만들어 살아남음'
    ],
    stats: [
      { label: '쓸데없는 지적 호기심', value: 100 },
      { label: '악당 맞춤법 지적 확률', value: 96 },
      { label: '기초 체력', value: 15 }
    ],
    oneliner: '외계인에게 납치당해도 외계인이 질문 공세에 지쳐 지구에 다시 버리고 갈 인간.',
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
    subtitle: '생존율 1%라는데 오히려 재밌겠다고 뛰어드는 인간',
    quote: '"야 빠꾸 없지!! 총알보다 내가 더 빨리 뛰면 되는 거 아니야?!"',
    tags: ['#아드레날린중독', '#노빠꾸상남자', '#일단질러', '#주인공병'],
    description:
      '남들에게는 재난 영화지만 당신에게는 무료 테마파크 개장일입니다. 생각보다 몸이 먼저 나가며, 좀비 떼가 몰려오면 도망치는 대신 옆에 있던 오토바이 시동 걸고 드리프트부터 깝니다. 어이없게도 그 무모한 자신감과 반사신경 덕분에 진짜로 살아남는 게 제일 킹받는 포인트입니다.',
    facts: [
      '공포 영화에서 "잠깐, 내가 갔다 올게" 하고 나갔다가 괴물 때려잡고 돌아올 유일한 유형',
      '위기 상황에서도 폼에 살고 폼에 죽어서 선글라스부터 챙겨 씀',
      '장기적인 계획은 1도 없는데 임기응변 하나로 끝판왕까지 깸'
    ],
    stats: [
      { label: '쓸데없는 자신감', value: 100 },
      { label: '야생 반사신경', value: 97 },
      { label: '사전 계획성', value: 4 }
    ],
    oneliner: '지구가 폭발해도 폭발 배경으로 썸네일 각 잡으며 점프할 인간.',
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
    subtitle: '인류 최후의 날에 좀비랑 릴스 찍자는 인간',
    quote: '"야야 운석 떨어지는 거 조명 미쳤다!! 빨리 내 폰으로 단체 셀카 찍자!!"',
    tags: ['#관종력만렙', '#인스타생중계', '#파티피플', '#분위기메이커'],
    description:
      '지구 멸망조차 하나의 거대한 페스티벌로 받아들이는 초긍정 인싸입니다. 은신처에서 다들 숨죽이고 있을 때 혼자 틱톡 챌린지 추다가 위치 발각될 위기를 만들지만, 특유의 친화력으로 외계인 대장과 건배사를 외치며 평화 협정을 맺어버리는 기적을 보여줍니다.',
    facts: [
      '납치당해도 10분 뒤에 납치범이랑 배달 음식 메뉴 고르며 수다 떨고 있음',
      '조용히 숨어 있어야 하는 미션 주면 답답해서 3분 만에 뛰쳐나감',
      '죽기 직전 유언도 슬픈 말 대신 웃긴 드립 쳐서 조문객들 터지게 만듦'
    ],
    stats: [
      { label: '어그로 및 스타성', value: 100 },
      { label: '외계인 꼬시기 스킬', value: 95 },
      { label: '은밀 행동력', value: 2 }
    ],
    oneliner: '멸망한 지구에서도 마지막까지 미러볼 켜놓고 춤추다 갈 해피 바이러스.',
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
    subtitle: '납치범이랑 30분 만에 호형호제하며 절친 되는 인간',
    quote: '"헐 대박!! 범인님도 민트초코 좋아하세요?! 우리 완전 운명이다!!"',
    tags: ['#인간리트리버', '#납치범과절친', '#의식의흐름', '#TMI폭격기'],
    description:
      '납치범이 입에 청테이프를 붙여놓지 않으면 30분 안에 납치범의 첫사랑 이야기부터 혈액형, MBTI까지 전부 캐묻고 베프가 되어버리는 마성의 수다쟁이입니다. 위기 상황에서도 엉뚱한 상상을 멈추지 못해 혼자 급발진했다가 혼자 감동받는 롤러코스터를 탑니다.',
    facts: [
      '심각한 작전 회의 중에 갑자기 "근데 좀비는 채식주의자 물면 비건 좀비 되나?" 질문함',
      '귀신이 나타나도 무서워하다가 3분 뒤에 귀신이랑 인생 상담하고 있음',
      '계획 없이 도망치는데 운이 기가 막히게 좋아서 함정을 다 피해 감'
    ],
    stats: [
      { label: '친화력 치사량', value: 100 },
      { label: '입만 살아남을 확률', value: 98 },
      { label: '집중력 지속 시간', value: 11 }
    ],
    oneliner: '악당 아지트에 인질로 잡혀갔다가 악당들 레크리에이션 강사 하고 돌아올 인간.',
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
    subtitle: '총 겨눈 사람한테 논리적으로 반박해서 말문 막히게 하는 인간',
    quote: '"잠깐만요, 지금 저를 쏘신다는 건 손익분기점 계산을 전혀 안 하셨다는 건데요?"',
    tags: ['#아가리파이터', '#논리왕', '#악당멘탈파괴', '#청개구리'],
    description:
      '상대방이 총을 겨누고 있는데도 총구보다 상대방 주장의 논리적 모순이 더 신경 쓰이는 토론 중독자입니다. 죽기 직전에도 말싸움에서 지는 건 절대 못 참아서 기어코 납치범의 말문을 막히게 만들고, 결국 납치범이 노이로제에 걸려 스스로 경찰서에 자수하게 만듭니다.',
    facts: [
      '위기 상황에서 모두가 예스라고 할 때 혼자 "근데 반대로 생각해 보면?" 시전함',
      '악당의 세계 정복 계획을 듣고 비즈니스 모델이 구리다며 컨설팅해 줌',
      '입만 다물면 절반은 갈 텐데 끝까지 한마디 더 얹어서 어그로 다 끎'
    ],
    stats: [
      { label: '입만 살아남을 확률', value: 100 },
      { label: '악당 혈압 상승 유발력', value: 99 },
      { label: '고분고분함', value: 0 }
    ],
    oneliner: '지옥에 떨어져도 염라대왕이랑 법리 해석으로 맞짱 떠서 무죄 판결 받아낼 인간.',
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
    subtitle: '몰려오는 좀비들한테도 번호표 뽑고 업무 분장시키는 인간',
    quote: '"거기 3번 좀비! 뛰는 자세가 그게 뭐야! 대열 맞춰서 다시 뛰어와!"',
    tags: ['#본투비교관', '#좀비군기반장', '#현실주의보스', '#잔소리기관총'],
    description:
      '재난 현장에서도 누군가 우왕좌왕하는 꼴을 절대 못 보는 타고난 현장 소장님입니다. 납치당해도 범인의 어설픈 매듭 묶기 실력을 보다 못해 "그렇게 묶으면 풀린다니까? 이리 줘 봐, 내가 묶을게"라며 본인이 직접 지휘합니다.',
    facts: [
      '무인도에 떨어지면 10분 안에 생존자들 출석 부르고 식량 배급 당번 정함',
      '울고 있는 사람한테 휴지 건네주면서 "울면서 손으로는 장작 패"라고 지시함',
      '외계인이 침공해도 지구 방위 대책위원회 위원장 감투 쓰고 나타남'
    ],
    stats: [
      { label: '생존자 군기 잡기', value: 100 },
      { label: '사회생활 및 통솔력', value: 96 },
      { label: '감성 위로 능력', value: 9 }
    ],
    oneliner: '좀비 바이러스보다 이 사람의 잔소리가 더 무서워서 좀비들이 피해 갈 인간.',
    celebrities: [
      { avatar: '🍳', category: '유명인', name: '고든 램지', role: '스타 셰프' },
      { avatar: '🧙‍♀️', category: '캐릭터', name: '맥고나걸 교수', role: '해리포터' },
      { avatar: '🦀', category: '캐릭터', name: '집게사장', role: '네모바지 스폰지밥' }
    ],
    best: 'ISFP',
    worst: 'INFP'
  },
  ESFJ: {
    emoji: '📢',
    subtitle: '지구 멸망 10분 전 마지막 단톡방 공지 올리는 인간',
    quote: '"여러분~ 다들 대피소 잘 도착하셨죠? 안 읽으신 3분 빨리 하트 눌러주세요~!"',
    tags: ['#단톡방총무', '#오지랖국가대표', '#소외된좀비챙김', '#사회생활만렙'],
    description:
      '지구가 멸망하는 순간에도 내 주변 사람 중에 소외되거나 빈정 상한 사람이 없는지 체크해야 직성이 풀리는 평화의 사도입니다. 대피소에서도 어색한 분위기를 못 견뎌 자기소개 시간과 아이스브레이킹 게임을 주도하며, 간식 개수가 안 맞으면 본인 몫을 양보합니다.',
    facts: [
      '도망치는 와중에도 친구 신발 끈 풀어진 거 발견하고 챙겨줌',
      '납치범한테도 "식사는 하셨어요? 날 추운데 감기 조심하세요~" 인사가 자동으로 나감',
      '생존자 무리에서 불화 생기면 중재하느라 좀비보다 사람 스트레스에 먼저 쓰러짐'
    ],
    stats: [
      { label: '사회생활력', value: 100 },
      { label: '눈치력 및 인맥 관리', value: 97 },
      { label: '혼자 독고다이 생존력', value: 18 }
    ],
    oneliner: '평소 쌓아둔 인맥 덕분에 위기 순간마다 사방에서 구출 헬기가 날아올 인간.',
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
    subtitle: '외계인 침공 중에도 마이크 잡고 인류에게 동기부여하는 인간',
    quote: '"여러분!! 포기하지 마십시오!! 우리의 뜨거운 심장이 있는 한 지구는 지지 않습니다!!"',
    tags: ['#열혈주인공', '#악당교화전문', '#감동중독자', '#희생정신과다'],
    description:
      '재난 영화에서 꼭 클라이맥스에 단상에 올라가 명연설을 펼치는 주인공 재질입니다. 심지어 인류를 멸망시키러 온 악당에게도 "당신 안에 아직 따뜻한 마음이 남아있다는 걸 압니다!"라고 진심으로 설득해 악당을 정의의 편으로 전향시키는 기적을 만듭니다.',
    facts: [
      '다들 포기하고 누워 있을 때 혼자 눈물 고인 눈으로 파이팅 외쳐서 강제 기상시킴',
      '납치범의 인생 목표가 없다고 하면 진로 상담까지 해주고 나옴',
      '남 구하느라 본인이 제일 위험한 자리에 서 있어서 주변 친구들 속 터지게 함'
    ],
    stats: [
      { label: '연설 및 선동 능력', value: 100 },
      { label: '악당 개과천선 확률', value: 94 },
      { label: '이기적 생존 본능', value: 5 }
    ],
    oneliner: '좀비 떼 앞에서도 인류애 연설로 좀비들의 박수갈채를 받아낼 인간.',
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
    subtitle: '침공한 외계인 우주선 빼앗아서 우주 제국 CEO 되는 인간',
    quote: '"외계인 기술력 괜찮네. 오늘부터 이 모선은 내가 인수한다. 비서실장 누구야?"',
    tags: ['#야망폭주기관차', '#위기는곧기회', '#보스몹을잡는보스', '#독재자재질'],
    description:
      '평범한 사람들은 재난 속에서 살아남을 궁리를 하지만, 당신은 재난 이후 무주공산이 된 세상의 패권을 잡을 사업 계획서를 짭니다. 인질로 잡혀가도 3일 뒤에 가보면 범죄 조직 보스를 몰아내고 본인이 새 보스 자리에 앉아 조직 개편을 단행하고 있을 인간입니다.',
    facts: [
      '공포 영화에 들어가면 귀신보다 본인이 더 무섭게 굴어서 귀신이 도망감',
      '생존자 캠프에 합류한 지 1시간 만에 비효율적인 기존 리더 갈아치움',
      '죽기 직전에도 유언 대신 후계자 지명이랑 지분 정리부터 끝냄'
    ],
    stats: [
      { label: '야망 및 정복욕', value: 100 },
      { label: '위기를 기회로 바꾸는 힘', value: 99 },
      { label: '남 밑에서 시키는 대로 할 확률', value: 0 }
    ],
    oneliner: '지구가 멸망해도 화성에 신도시 건설해서 분양권 팔고 있을 최종 보스.',
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
let answers = []; // 각 문항에서 선택한 키 ('A', 'B', 'C', 'D') 저장

// DOM 요소
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const progressText = document.getElementById('progress-text');
const progressBarFill = document.getElementById('progress-bar-fill');

const sceneIcon = document.getElementById('scene-icon');
const sceneTag = document.getElementById('scene-tag');
const questionNumber = document.getElementById('question-number');
const questionTitle = document.getElementById('question-title');

const choiceBtns = {
  A: document.getElementById('choice-a'),
  B: document.getElementById('choice-b'),
  C: document.getElementById('choice-c'),
  D: document.getElementById('choice-d')
};

const choiceImgs = {
  A: document.getElementById('choice-a-img'),
  B: document.getElementById('choice-b-img'),
  C: document.getElementById('choice-c-img'),
  D: document.getElementById('choice-d-img')
};

const choiceTexts = {
  A: document.getElementById('choice-a-text'),
  B: document.getElementById('choice-b-text'),
  C: document.getElementById('choice-c-text'),
  D: document.getElementById('choice-d-text')
};

const choicesContainer = document.querySelector('.choices-container');
let isTransitioning = false;

// 이미지 로딩 실패 시에도 텍스트 선택지가 정상 작동하도록 폴백 등록
['A', 'B', 'C', 'D'].forEach((key) => {
  const imgEl = choiceImgs[key];
  if (imgEl) {
    imgEl.addEventListener('error', () => {
      imgEl.parentElement.classList.add('img-fallback');
    });
    imgEl.addEventListener('load', () => {
      imgEl.parentElement.classList.remove('img-fallback');
    });
  }
});

const loadingMessage = document.getElementById('loading-message');
const loadingBarFill = document.getElementById('loading-bar-fill');

const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const toastMessage = document.getElementById('toast-message');

// 화면 전환 함수
function showScreen(targetScreen) {
  [startScreen, questionScreen, loadingScreen, resultScreen].forEach((screen) => {
    screen.classList.remove('active');
  });
  targetScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const qNum = currentIndex + 1;

  sceneIcon.textContent = currentQ.sceneIcon;
  sceneTag.textContent = currentQ.sceneTag;
  questionNumber.textContent = `Q${qNum}.`;
  questionTitle.textContent = currentQ.question;

  let maxLen = 0;
  ['A', 'B', 'C', 'D'].forEach((key) => {
    const choiceData = currentQ.choices[key];
    choiceBtns[key].classList.remove('selected-pop');
    choiceTexts[key].textContent = choiceData.text;
    if (choiceData.text.length > maxLen) {
      maxLen = choiceData.text.length;
    }

    const imgPath = choiceData.img || `assets/choices/q${qNum}_${key.toLowerCase()}.svg`;
    choiceImgs[key].src = imgPath;
    choiceImgs[key].alt = `Q${qNum} 선택지 ${key} 병맛 상황 이미지`;
  });

  // 글자가 유독 길고 화면이 좁은 모바일일 경우 1열로 자연스럽게 전환
  if (choicesContainer) {
    const isNarrowMobile = window.innerWidth < 390 && maxLen > 48;
    choicesContainer.classList.toggle('single-column', isNarrowMobile);
  }

  progressText.textContent = `SCENE ${qNum} / ${total}`;
  progressBarFill.style.width = `${(qNum / total) * 100}%`;

  prevBtn.disabled = currentIndex === 0;
  isTransitioning = false;
}

// 선택지 클릭 처리 (반응 애니메이션 후 다음 질문으로 전환)
function handleChoice(choiceKey) {
  if (isTransitioning) return;
  isTransitioning = true;

  answers[currentIndex] = choiceKey;
  const btn = choiceBtns[choiceKey];
  if (btn) {
    btn.classList.add('selected-pop');
  }

  setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      isTransitioning = false;
      runAnalysisLoading();
    }
  }, 240);
}

// 이전 질문으로 이동
function handlePrevQuestion() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion();
  }
}

// 병맛 분석 로딩 연출 후 결과 표시
function runAnalysisLoading() {
  showScreen(loadingScreen);
  loadingBarFill.style.width = '15%';

  const shuffled = [...randomRoasts].sort(() => Math.random() - 0.5);
  loadingMessage.textContent = `"${shuffled[0]}"`;

  setTimeout(() => {
    loadingBarFill.style.width = '65%';
    loadingMessage.textContent = `"${shuffled[1]}"`;
  }, 750);

  setTimeout(() => {
    loadingBarFill.style.width = '100%';
  }, 1350);

  setTimeout(() => {
    showResult(shuffled[2]);
  }, 1600);
}

// MBTI 점수 계산 및 결과 렌더링
function showResult(finalRoast) {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach((choiceKey, idx) => {
    const q = questions[idx];
    if (q && q.choices[choiceKey]) {
      const scoreObj = q.choices[choiceKey].scores;
      Object.entries(scoreObj).forEach(([trait, pts]) => {
        counts[trait] += pts;
      });
    }
  });

  const mbti =
    (counts.E >= counts.I ? 'E' : 'I') +
    (counts.S >= counts.N ? 'S' : 'N') +
    (counts.T >= counts.F ? 'T' : 'F') +
    (counts.J >= counts.P ? 'J' : 'P');

  const data = mbtiResults[mbti];

  document.getElementById('result-random-roast').textContent = `"${finalRoast}"`;
  document.getElementById('result-emoji').textContent = data.emoji;
  document.getElementById('result-type').textContent = mbti;
  document.getElementById('result-subtitle').textContent = data.subtitle;
  document.getElementById('result-quote').textContent = data.quote;
  document.getElementById('result-description').textContent = data.description;
  document.getElementById('best-match').textContent = data.best;
  document.getElementById('worst-match').textContent = data.worst;
  document.getElementById('result-oneliner').textContent = data.oneliner;

  // 태그 렌더링
  const tagsContainer = document.getElementById('result-tags');
  tagsContainer.innerHTML = '';
  data.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'result-tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // 팩폭 3연타 렌더링
  const factsContainer = document.getElementById('result-facts');
  factsContainer.innerHTML = '';
  data.facts.forEach((fact) => {
    const li = document.createElement('li');
    li.textContent = fact;
    factsContainer.appendChild(li);
  });

  // 병맛 생존 능력치 렌더링
  const statsContainer = document.getElementById('survival-stats');
  statsContainer.innerHTML = '';
  data.stats.forEach((stat) => {
    const item = document.createElement('div');
    item.className = 'stat-item';
    item.innerHTML = `
      <div class="stat-header">
        <span>${stat.label}</span>
        <span class="stat-value">${stat.value}%</span>
      </div>
      <div class="stat-bar-bg">
        <div class="stat-bar-fill" style="width: ${stat.value}%"></div>
      </div>
    `;
    statsContainer.appendChild(item);
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

// 결과 보고서 복사 및 공유
async function copyResultText() {
  const mbti = document.getElementById('result-type').textContent;
  const data = mbtiResults[mbti];
  const shareUrl = window.location.href;
  const textToCopy = [
    `🚨 [극한 병맛 MBTI 생존 보고서]`,
    `유형: ${mbti} — ${data.subtitle}`,
    `💬 유언급 대표 대사: ${data.quote}`,
    `📌 한 줄 결론: ${data.oneliner}`,
    `👉 너도 이 상황에서 이럴 거냐고 테스트해보기: ${shareUrl}`
  ].join('\n');

  try {
    await navigator.clipboard.writeText(textToCopy);
    toastMessage.textContent = '✅ 생존 보고서가 복사되었습니다! 단톡방에 붙여넣어 친구를 놀려보세요!';
  } catch {
    toastMessage.textContent = `나의 유형: ${mbti} (${data.subtitle})`;
  }
}

// 이벤트 리스너 등록
startBtn.addEventListener('click', startTest);
['A', 'B', 'C', 'D'].forEach((key) => {
  choiceBtns[key].addEventListener('click', () => handleChoice(key));
});
prevBtn.addEventListener('click', handlePrevQuestion);
restartBtn.addEventListener('click', () => showScreen(startScreen));
shareBtn.addEventListener('click', copyResultText);
