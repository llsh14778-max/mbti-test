// ============================================================================
// 총구 앞 MBTI — 지구 대표로 끌려갔습니다 (시나리오·엔딩·MBTI 데이터 모듈)
// ============================================================================

const SCENARIO_SCENES = [
  // --------------------------------------------------------------------------
  // ACT 1. 잘못 걸린 인생
  // --------------------------------------------------------------------------
  {
    id: 1,
    act: 'ACT 1 · 잘못 걸린 인생',
    sceneCode: 'SCENE 01',
    title: '웃는 얼굴의 총구',
    dimension: 'EI',
    mainImg: 'main.jpg',
    getNarration: () =>
      '어두운 골목. 누군가 파란 천막 아래에서 너를 향해 총을 겨누고 있다.\n그런데 이 사람, 이상하게 행복해 보인다.\n총구는 네 눈앞에 있고, 남자의 금니가 유난히 반짝인다.',
    getDialogue: () => ({
      speaker: '의문의 금니 사내',
      line: '"움직이지 마."'
    }),
    choices: {
      A: {
        text: '"형님, 잠깐만요. 혹시 대화로 풀 수 있는 부분일까요?"',
        img: 'assets/choices/q1_a.svg',
        mbti: 'E',
        reaction: {
          speaker: '의문의 금니 사내',
          line: '"와... 나 지금 협박하는 건데 왜 고객센터에 민원 상담 접수하는 것처럼 말해?"',
          desc: '남자가 당황하며 총구를 살짝 내린다. 네 공손한 상담원 톤에 오히려 기가 눌린 눈치다.',
          flagKey: 'firstContact',
          flagValue: 'counselor',
          flagLabel: '총구 앞 민원 상담 시도',
          memoryText: '총구 앞에서 두 손을 모으고 "대화로 풀 수 있는 부분일까요?"라며 고객센터 말투로 협상을 시도함'
        }
      },
      B: {
        text: '말은 아낀다. 일단 주변 출구와 남자의 행동을 관찰한다. 속으로는 이미 퇴사 사유서 작성 중이다.',
        img: 'assets/choices/q1_b.svg',
        mbti: 'I',
        reaction: {
          speaker: '의문의 금니 사내',
          line: '"얘는 왜 아무 말도 안 하고 눈알만 굴리지? 내가 더 불안한데?"',
          desc: '네가 비명조차 지르지 않고 골목 폭과 탈출 각도를 암산하자 남자가 멋쩍게 헛기침을 한다.',
          flagKey: 'firstContact',
          flagValue: 'observer',
          flagLabel: '무언의 탈출각 측정 및 퇴사 사유서 작성',
          memoryText: '총구 앞에서도 비명 대신 속으로 퇴사 사유서를 쓰며 골목길 탈출 각도를 암산함'
        }
      },
      C: {
        text: '"형님 혹시 김 씨세요? 제가 김 씨들이랑은 좀 잘 맞는데."',
        img: 'assets/choices/q1_c.svg',
        mbti: 'E',
        reaction: {
          speaker: '의문의 금니 사내',
          line: '"나 박 씨야."',
          desc: '첫 대화부터 지연·학연·혈연 타령을 했다가 본관도 못 맞추고 분위기만 싸해졌다.',
          flagKey: 'firstContact',
          flagValue: 'networker',
          flagLabel: '총구 앞 성씨 인맥 타령 실패',
          memoryText: '생사가 걸린 골목길에서 초면인 괴한에게 "혹시 김 씨세요?"라며 인맥부터 확인함'
        }
      },
      D: {
        text: '일단 침묵한다. 저 사람 웃는 이유부터 알아야겠다.',
        img: 'assets/choices/q1_d.svg',
        mbti: 'I',
        reaction: {
          speaker: '의문의 금니 사내',
          line: '"아니 무슨 압박 면접 보냐고. 왜 너 혼자 날 심사하는 표정이야?"',
          desc: '남자가 네 무표정한 시선을 견디지 못하고 먼저 침묵을 깬다.',
          flagKey: 'firstContact',
          flagValue: 'silent_judge',
          flagLabel: '침묵으로 납치범 기선 제압',
          memoryText: '총을 겨눈 남자 앞에서 눈 하나 깜짝 안 하고 침묵으로 압박 면접 분위기를 조성함'
        }
      }
    }
  },

  {
    id: 2,
    act: 'ACT 1 · 잘못 걸린 인생',
    sceneCode: 'SCENE 02',
    title: '알고 보니 동창',
    dimension: 'SN',
    mainImg: 'assets/scenes/s02_main.svg',
    getNarration: (state) => {
      const prev = state.flags.firstContact;
      let prefix = '남자가 갑자기 총을 내린다.';
      if (prev === 'counselor') {
        prefix = '남자가 총을 내리며 투덜거린다. "아까부터 말투가 이상해서 그런데, 너 혹시 고객센터에서 일하냐?"';
      } else if (prev === 'observer' || prev === 'silent_judge') {
        prefix = '남자가 총을 내리며 툴툴거린다. "야, 아까는 왜 한마디도 안 했어? 나 혼자 민망했잖아."';
      } else if (prev === 'networker') {
        prefix = '남자가 총을 내리며 어이없다는 듯 웃는다. "야, 박 씨라고 박 씨. 네가 내 성씨도 까먹냐?"';
      }
      return `${prefix}\n얼굴을 자세히 보니 초등학교 6학년 때 같은 반이었던 것 같기도 하다.\n그런데 네 기억 속에서는 분명히 급식 먹다가 울던 애였다.`;
    },
    getDialogue: () => ({
      speaker: '초등학교 동창 (추정)',
      line: '"야, 너 진짜 나 기억 안 나?"'
    }),
    choices: {
      A: {
        text: '"잠깐. 네가 여기 있는 데는 분명 이유가 있겠지. 혹시 복수극이냐?"',
        img: 'assets/choices/q2_a.svg',
        mbti: 'N',
        reaction: {
          speaker: '초등학교 동창 박민수',
          line: '"무슨 넷플릭스 스릴러 찍냐? 내가 너한테 복수를 왜 해!"',
          desc: '순식간에 12년 전 우유 당번 사건까지 거슬러 올라간 네 망상에 동창이 고개를 절레절레 흔든다.',
          flagKey: 'classmateMemory',
          flagValue: 'revenge_theory',
          flagLabel: '12년 만의 복수극 음모론 제기',
          memoryText: '오랜만에 만난 초등학교 동창을 보자마자 12년 만의 치밀한 복수극 시나리오를 의심함'
        }
      },
      B: {
        text: '이름표에 적힌 학교와 졸업 연도를 확인해 기억을 맞춰본다.',
        img: 'assets/choices/q2_b.svg',
        mbti: 'S',
        reaction: {
          speaker: '초등학교 동창 박민수',
          line: '"와, 사람 얼굴을 보라고! 왜 내 점퍼 명찰이랑 생년월일부터 대조해?"',
          desc: '정확한 팩트 체크 끝에 6학년 3반 17번 박민수라는 사실을 데이터로 확인했다.',
          flagKey: 'classmateMemory',
          flagValue: 'fact_check',
          flagLabel: '명찰·졸업연도 데이터 대조 완료',
          memoryText: '동창의 반가운 얼굴 대신 옷에 붙은 명찰과 졸업 연도 숫자부터 팩트 체크함'
        }
      },
      C: {
        text: '"너 예전에 급식에 돈가스 나오는 날 울었던 애 맞지?"',
        img: 'assets/choices/q2_c.svg',
        mbti: 'S',
        reaction: {
          speaker: '초등학교 동창 박민수',
          line: '"야!! 그걸 왜 아직도 기억해?! 그날 소스 안 줬다고 운 거 비밀이랬잖아!!"',
          desc: '쓸데없이 디테일한 12년 전 흑역사 폭격에 동창의 얼굴이 새빨개진다.',
          flagKey: 'classmateMemory',
          flagValue: 'pork_cutlet',
          flagLabel: '급식 돈가스 오열 흑역사 발굴',
          memoryText: '총 든 동창에게 12년 전 급식 돈가스 소스 안 줬다고 울었던 흑역사를 정확히 짚어냄'
        }
      },
      D: {
        text: '"설마 내가 잊은 약속 때문에 이런 대서사시가 시작된 거냐?"',
        img: 'assets/choices/q2_d.svg',
        mbti: 'N',
        reaction: {
          speaker: '초등학교 동창 박민수',
          line: '"우리 사이에 무슨 대서사시가 있어! 문방구에서 500원 빌려 간 거밖에 없잖아!"',
          desc: '혼자 세계관을 확장하며 비장해진 너를 보며 동창이 한숨을 쉰다.',
          flagKey: 'classmateMemory',
          flagValue: 'epic_saga',
          flagLabel: '혼자만의 대서사시 세계관 과몰입',
          memoryText: '문방구 500원 채무 관계를 우주적 운명의 대서사시로 포장함'
        }
      }
    }
  },

  {
    id: 3,
    act: 'ACT 1 · 잘못 걸린 인생',
    sceneCode: 'SCENE 03',
    title: '납치범의 정체',
    dimension: 'TF',
    mainImg: 'assets/scenes/s03_main.svg',
    getNarration: (state) => {
      const mem = state.flags.classmateMemory;
      let extra = '';
      if (mem === 'pork_cutlet') {
        extra = '민수는 아직도 돈가스 얘기가 창피한지 헛기침을 하더니 총을 뒤집어 보인다.\n';
      } else if (mem === 'revenge_theory' || mem === 'epic_saga') {
        extra = '민수는 네 거창한 상상력을 진정시키려는 듯 총을 뒤집어 보인다.\n';
      } else {
        extra = '민수는 점퍼 깃을 정리하더니 총을 뒤집어 보인다.\n';
      }
      return `${extra}총 손잡이에 완구 회사 로고가 선명하게 붙어 있다.\n"야, 촬영 소품이야. 안심해."\n그러더니 반짝이는 명함을 건넨다.\n[은하인사관리공단 — 지구 채용팀 대리 박민수]`;
    },
    getDialogue: () => ({
      speaker: '은하인사관리공단 박민수 대리',
      line: '"축하한다. 네가 지구 대표 후보로 선정됐어. 다만 지금까지의 절차는 약간 불법적인 것 같기도 해."'
    }),
    choices: {
      A: {
        text: '"불법인 걸 아시면 일단 사과부터 하셔야 하는 거 아닌가요?"',
        img: 'assets/choices/q3_a.svg',
        mbti: 'F',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"미안하다! 내가 지구 출장이 오랜만이라 실적이 급했어! 마음 상했지?"',
          desc: '절차의 위법성보다 놀란 내 마음의 상처를 먼저 짚자 민수가 두 손을 싹싹 빈다.',
          flagKey: 'recruitResponse',
          flagValue: 'demand_apology',
          flagLabel: '불법 채용에 대한 진심 어린 사과 요구',
          memoryText: '우주 기관에 납치되는 와중에도 도의적 사과와 감정적 예의부터 따짐'
        }
      },
      B: {
        text: '"선정 기준이 뭐죠? 지원하지도 않았는데요."',
        img: 'assets/choices/q3_b.svg',
        mbti: 'T',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"우리 공단 AI가 골목길에서 총 맞고도 안 도망칠 멘탈 상위 0.1%를 뽑았거든."',
          desc: '감정 동요 없이 선발 알고리즘의 타당성부터 따지는 너를 보며 민수가 흡족해한다.',
          flagKey: 'recruitResponse',
          flagValue: 'ask_criteria',
          flagLabel: '무지원 전형 선발 알고리즘 검증',
          memoryText: '지구 대표로 뽑혔다는 말에 기뻐하기보다 선발 기준과 평가 지표부터 요구함'
        }
      },
      C: {
        text: '"급여, 계약 기간, 복리후생부터 설명해 주세요."',
        img: 'assets/choices/q3_c.svg',
        mbti: 'T',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"역시 K-직장인! 4대 보험 대신 은하계 산재보험 적용되고, 식대는 무제한이야."',
          desc: '지구의 운명보다 근로계약 조건과 4대 보험 유무를 먼저 챙기는 철저한 실리주의를 보여줬다.',
          flagKey: 'recruitResponse',
          flagValue: 'check_salary',
          flagLabel: '우주 공단 연봉 및 복리후생 협상',
          memoryText: '지구 대표직 제안을 받자마자 급여 테이블과 복리후생 조건부터 요구함'
        }
      },
      D: {
        text: '"야... 너 그동안 많이 외로웠구나. 근데 왜 하필 나야?"',
        img: 'assets/choices/q3_d.svg',
        mbti: 'F',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"엉엉... 지구 지사 발령받고 친구가 한 명도 없었어... 네 생각이 제일 먼저 나더라..."',
          desc: '갑자기 동창의 타지 생활 외로움을 위로해 주는 바람에 골목길이 눈물바다가 될 뻔했다.',
          flagKey: 'recruitResponse',
          flagValue: 'comfort_friend',
          flagLabel: '우주 공무원 동창의 고독 위로',
          memoryText: '장난감 총을 들고 나타난 동창의 외로운 우주 직장생활을 다독여줌'
        }
      }
    }
  },

  {
    id: 4,
    act: 'ACT 1 · 잘못 걸린 인생',
    sceneCode: 'SCENE 04',
    title: '우주로 가는 셔틀버스',
    dimension: 'JP',
    mainImg: 'assets/scenes/s04_main.svg',
    getNarration: () =>
      '골목 뒤에 검은 승합차가 비상등을 켜고 기다리고 있다.\n차량 앞유리에는 A4 용지가 청테이프로 붙어 있다.\n[은하인사관리공단 — 지구 대표 최종 면접 셔틀]\n[※ 무단 결석 시 지구에 불이익이 발생할 수 있습니다.]',
    getDialogue: () => ({
      speaker: '은하인사관리공단 박민수 대리',
      line: '"자, 빨리 타. 면접 늦으면 지구가 불리해."'
    }),
    choices: {
      A: {
        text: '"일단 타고 가면서 상황을 보죠. 재밌네."',
        img: 'assets/choices/q4_a.svg',
        mbti: 'P',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"오, 적응력 미쳤는데? 역시 내가 사람 하나는 잘 골랐어!"',
          desc: '행선지도 모른 채 소풍 가는 기분으로 조수석 문을 열고 폴짝 올라탔다.',
          flagKey: 'boardingStyle',
          flagValue: 'spontaneous',
          flagLabel: '무계획 탑승 완료',
          memoryText: '정체불명의 우주 면접 셔틀버스를 보자마자 "재밌네"라며 일단 올라탐'
        }
      },
      B: {
        text: '"면접 일정표랑 이동 경로부터 보여주세요."',
        img: 'assets/choices/q4_b.svg',
        mbti: 'J',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"여기 타임테이블 출력물 있어. 예상 소요 시간은 신호 안 걸리면 14분이다."',
          desc: '탑승 전 분 단위 타임테이블과 귀가 시간까지 체크한 뒤에야 안전벨트를 맸다.',
          flagKey: 'boardingStyle',
          flagValue: 'planned',
          flagLabel: '면접 타임테이블 및 동선 사전 확보',
          memoryText: '우주 면접장에 끌려가면서도 분 단위 일정표와 이동 경로부터 제출하라고 요구함'
        }
      },
      C: {
        text: '차에 타면서 "아 근데 우주 휴게소 있어요?"라고 묻는다.',
        img: 'assets/choices/q4_c.svg',
        mbti: 'P',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"안드로메다 휴게소 호두과자가 유명하긴 한데 오늘은 직통으로 간다."',
          desc: '지구 멸망이 걸린 면접길에 휴게소 알감자와 호두과자부터 챙기는 여유를 부렸다.',
          flagKey: 'boardingStyle',
          flagValue: 'rest_stop',
          flagLabel: '우주 휴게소 간식 유무 체크',
          memoryText: '지구 대표 최종 면접 셔틀에 타면서 "우주 휴게소 있어요?"라고 해맑게 질문함'
        }
      },
      D: {
        text: '"일정이랑 절차가 하나도 없잖아요. 담당자 누구예요?"',
        img: 'assets/choices/q4_d.svg',
        mbti: 'J',
        reaction: {
          speaker: '은하인사관리공단 박민수 대리',
          line: '"담당자가 바로 나야 임마! 일단 타면서 공문 파일 보여줄게!"',
          desc: '주먹구구식 우주 공단 행정 처리에 일침을 날리며 체계적인 절차 준수를 요구했다.',
          flagKey: 'boardingStyle',
          flagValue: 'audit_process',
          flagLabel: '우주 공단 주먹구구 행정 절차 지적',
          memoryText: '청테이프로 종이 붙여놓은 우주 셔틀버스의 허술한 행정 절차를 정면 지적함'
        }
      }
    }
  },

  // --------------------------------------------------------------------------
  // ACT 2. 지구 대표 면접
  // --------------------------------------------------------------------------
  {
    id: 5,
    act: 'ACT 2 · 지구 대표 면접',
    sceneCode: 'SCENE 05',
    title: '예상 밖의 동승자',
    dimension: 'EI',
    mainImg: 'assets/scenes/s05_main.svg',
    getNarration: (state) => {
      const board = state.flags.boardingStyle;
      let intro = '승합차 문을 열자 이미 승객 세 명이 앉아 있다.';
      if (board === 'rest_stop') {
        intro = '휴게소 타령을 하며 승합차 문을 열자, 이미 승객 세 명이 앉아 있다.';
      } else if (board === 'planned' || board === 'audit_process') {
        intro = '일정표를 챙겨 들고 승합차 문을 열자, 이미 승객 세 명이 앉아 있다.';
      }
      return `${intro}\n첫째는 회사 부장님처럼 생긴 좀비.\n둘째는 아무 말 없이 양념치킨을 뜯는 외계인.\n마지막 하나는 이상하게 낯익은 네 전 애인이다.\n아무도 이 미친 조합을 설명해 주지 않는다.`;
    },
    getDialogue: () => ({
      speaker: '전 애인 (경쟁 후보자)',
      line: '"...너도 지원했어?"'
    }),
    choices: {
      A: {
        text: '일단 구석에 앉아 이게 무슨 조합인지 혼자 정리한다.',
        img: 'assets/choices/q5_a.svg',
        mbti: 'I',
        reaction: {
          speaker: '치킨 먹는 외계인',
          line: '"(바삭) 조용한 지구인이군. 닭다리 하나 줄까?"',
          desc: '맨 뒷자리 구석에 찌그러져 상황 파악 회로를 돌리자 옆자리 외계인이 치킨 무를 건넨다.',
          flagKey: 'shuttleSocial',
          flagValue: 'corner_solo',
          flagLabel: '구석 자리 확보 및 단독 상황 분석',
          memoryText: '좀비·외계인·전 애인이 탄 차 안에서 조용히 구석 자리를 사수하며 뇌 정지를 겪음'
        }
      },
      B: {
        text: '"안녕하세요. 혹시 다들 어떻게 오셨어요?" 단체 대화를 시작한다.',
        img: 'assets/choices/q5_b.svg',
        mbti: 'E',
        reaction: {
          speaker: '좀비 부장님',
          line: '"크어어... 난 야근하다가 끌려왔네... 자네는 몇 기인가?"',
          desc: '지옥 같은 어색함을 깨고 아이스브레이킹을 시도해 좀비 부장님과 명함 교환까지 성공했다.',
          flagKey: 'shuttleSocial',
          flagValue: 'icebreaker',
          flagLabel: '좀비·외계인·전 애인 단체 토크 진행자',
          memoryText: '좀비와 외계인, 전 애인이 동승한 차 안에서 해맑게 단체 아이스브레이킹 대화를 주도함'
        }
      },
      C: {
        text: '전 애인과 눈이 마주치지 않도록 창밖만 본다. 그런데 창밖에도 전 애인이 비친다.',
        img: 'assets/choices/q5_c.svg',
        mbti: 'I',
        reaction: {
          speaker: '전 애인 (경쟁 후보자)',
          line: '"야, 유리창 반사 각도로 내 얼굴 쳐다보지 마. 다 보여."',
          desc: '차창 선팅이 너무 진해서 창밖 풍경 대신 전 애인과 2K 화질로 눈이 마주쳐 버렸다.',
          flagKey: 'shuttleSocial',
          flagValue: 'window_reflect',
          flagLabel: '차창 반사각으로 전 애인과 강제 아이컨택',
          memoryText: '전 애인을 피하려고 창밖만 봤다가 선팅 유리에 비친 전 애인과 내내 눈이 마주침'
        }
      },
      D: {
        text: '"잠깐, 여기서 저 아는 사람 있는 분?" 분위기를 파악하려고 말을 건다.',
        img: 'assets/choices/q5_d.svg',
        mbti: 'E',
        reaction: {
          speaker: '전 애인 & 박민수 대리',
          line: '"나랑 걔 빼면 좀비랑 외계인밖에 없는데 누굴 더 알겠다는 거야?!"',
          desc: '전 애인의 기선을 제압하려다 차 안 모든 생명체의 어그로를 한 몸에 끌었다.',
          flagKey: 'shuttleSocial',
          flagValue: 'public_poll',
          flagLabel: '셔틀버스 내 인지도 공개 거수 투표',
          memoryText: '전 애인이 타고 있는 셔틀버스 안에서 "여기서 저 아는 분?"이라며 공개 투표를 진행함'
        }
      }
    }
  },

  {
    id: 6,
    act: 'ACT 2 · 지구 대표 면접',
    sceneCode: 'SCENE 06',
    title: '우주의 면접장',
    dimension: 'SN',
    mainImg: 'assets/scenes/s06_main.svg',
    getNarration: (state) => {
      const social = state.flags.shuttleSocial;
      let arrivalNote = '차가 도착한 곳은 거대한 우주 기지가 아니라 경기도 외곽의 낡은 판넬 창고다.';
      if (social === 'icebreaker') {
        arrivalNote = '좀비 부장님과 인생 얘기를 나누다 보니 어느새 낡은 판넬 창고 앞에 도착했다.';
      } else if (social === 'window_reflect') {
        arrivalNote = '창문에 비친 전 애인 얼굴만 어색하게 보다가 드디어 낡은 판넬 창고 앞에 도착했다.';
      }
      return `${arrivalNote}\n문 앞에는 매직으로 쓴 손글씨 안내문이 붙어 있다.\n['지구 대표 최종 면접장 — 신발 벗고 들어오세요']\n창고 안에는 다이소에서 산 것 같은 땡땡이 넥타이를 맨 외계인 면접관 세 명이 앉아 있다.`;
    },
    getDialogue: () => ({
      speaker: '중앙 외계인 면접관',
      line: '"지원자분, 우리 은하인사관리공단에 대해 얼마나 알고 오셨습니까?"'
    }),
    choices: {
      A: {
        text: '안내문과 명함에 있는 정보를 토대로 설명한다.',
        img: 'assets/choices/q6_a.svg',
        mbti: 'S',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"명함 폰트 크기랑 슬리퍼 켤레 수까지 외우셨군요. 팩트 위주 답변 좋습니다."',
          desc: '직접 눈으로 확인한 명함 직함과 창고 입구 안내문 문구를 토씨 하나 안 틀리고 읊었다.',
          flagKey: 'interviewPitch',
          flagValue: 'factual_card',
          flagLabel: '명함 및 현장 실물 정보 기반 정석 답변',
          memoryText: '우주 면접관 앞에서 명함에 적힌 글자와 신발장 슬리퍼 개수만 팩트로 브리핑함'
        }
      },
      B: {
        text: '"이 조직이 지구인을 뽑는 데에는 분명 거대한 목적이 있을 거라고 생각합니다."',
        img: 'assets/choices/q6_b.svg',
        mbti: 'N',
        reaction: {
          speaker: '우측 외계인 면접관',
          line: '"오... 사실 그냥 결원 보충인데 그렇게 말하니까 되게 있어 보이네요."',
          desc: '구체적인 정보는 하나도 없지만 웅장한 비전과 우주적 사명감을 포장해 면접관을 감동시켰다.',
          flagKey: 'interviewPitch',
          flagValue: 'grand_purpose',
          flagLabel: '우주적 빅픽처 의미 부여 성공',
          memoryText: '낡은 창고 면접장에서 은하계의 거대한 목적과 비전을 역설해 면접관을 홀림'
        }
      },
      C: {
        text: '"일단 여긴 은하인사관리공단이고, 제가 본 건 창고랑 셔틀버스뿐입니다."',
        img: 'assets/choices/q6_c.svg',
        mbti: 'S',
        reaction: {
          speaker: '좌측 외계인 면접관',
          line: '"지나치게 솔직하시군요. 예산 삭감돼서 창고 빌린 건 어떻게 아시고..."',
          desc: '보이는 그대로만 담백하게 말했을 뿐인데 외계 공단의 예산 부족 사정을 정통으로 찔렀다.',
          flagKey: 'interviewPitch',
          flagValue: 'raw_observation',
          flagLabel: '창고 면접장 예산 부족 팩트 폭격',
          memoryText: '외계 면접관에게 "제가 본 건 낡은 창고랑 셔틀버스뿐입니다"라고 있는 그대로 팩폭함'
        }
      },
      D: {
        text: '"아마 지구와 우주 문명의 관계를 재설계하려는 프로젝트 아닐까요?"',
        img: 'assets/choices/q6_d.svg',
        mbti: 'N',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"잠깐, 적으세요! 저 문장 우리 상반기 사업보고서 제목으로 씁시다!"',
          desc: '네가 즉석에서 던진 거창한 추론이 외계 공단의 올해 슬로건으로 채택되어 버렸다.',
          flagKey: 'interviewPitch',
          flagValue: 'civilization_redesign',
          flagLabel: '우주 공단 사업보고서 슬로건 창시',
          memoryText: '즉석에서 지어낸 "지구와 우주 문명 재설계 프로젝트"라는 말로 외계인 사업보고서 제목을 만들어줌'
        }
      }
    }
  },

  {
    id: 7,
    act: 'ACT 2 · 지구 대표 면접',
    sceneCode: 'SCENE 07',
    title: '인류를 대표하는 질문',
    dimension: 'TF',
    mainImg: 'assets/scenes/s07_main.svg',
    getNarration: () =>
      '외계인 면접관이 심각한 표정으로 서류철을 펼친다.\n두 번째 면접관이 받아 적을 준비를 하고, 세 번째 면접관은 네 이력서 대신 배달의민족 주문 내역을 보고 있다.\n"치킨을 일주일에 네 번이나 드셨군요."\n갑자기 창고 안의 공기가 무거워진다.',
    getDialogue: () => ({
      speaker: '중앙 외계인 면접관',
      line: '"본론으로 들어가죠. 인간은 도대체 왜 서로 싸웁니까?"'
    }),
    choices: {
      A: {
        text: '"사람마다 이해관계가 다르고, 판단 기준도 다르기 때문입니다."',
        img: 'assets/choices/q7_a.svg',
        mbti: 'T',
        reaction: {
          speaker: '두 번째 외계인 면접관',
          line: '"명쾌하군요. 역시 자원 배분과 의사결정 프로토콜의 충돌이 핵심이죠."',
          desc: '감정 호소 없이 인류 갈등의 구조를 이해관계와 판단 기준으로 깔끔하게 정의했다.',
          flagKey: 'humanityDefense',
          flagValue: 'logic_interest',
          flagLabel: '인류 갈등의 이해관계 구조 분석',
          memoryText: '"인간은 왜 싸우는가"라는 질문에 이해관계와 판단 기준의 차이라며 논문급 답변을 내놓음'
        }
      },
      B: {
        text: '"싸우기도 하지만 서로 아끼고 화해하기도 합니다. 그걸 함께 봐주셨으면 합니다."',
        img: 'assets/choices/q7_b.svg',
        mbti: 'F',
        reaction: {
          speaker: '세 번째 외계인 면접관',
          line: '"크흡... 맞아요, 치킨도 혼자 안 드시고 리뷰 이벤트 참여해서 나누시더군요."',
          desc: '인류의 따뜻한 화해와 사랑을 강조하자 배민 내역을 보던 면접관이 감동의 눈물을 훔친다.',
          flagKey: 'humanityDefense',
          flagValue: 'warm_harmony',
          flagLabel: '인류의 사랑과 화해 감성 변호',
          memoryText: '외계인 면접관에게 인간의 싸움뿐 아니라 서로 아끼고 화해하는 마음도 봐달라고 호소함'
        }
      },
      C: {
        text: '"일단 싸움의 원인과 빈도를 구분해서 봐야 할 것 같습니다."',
        img: 'assets/choices/q7_c.svg',
        mbti: 'T',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"질문을 받자마자 분류 체계부터 잡으시다니, 우리 감사팀 체질이시네요."',
          desc: '인류애에 대한 질문조차 원인과 빈도 매트릭스로 쪼개서 분석하는 냉철함을 뽐냈다.',
          flagKey: 'humanityDefense',
          flagValue: 'classify_data',
          flagLabel: '인류 분쟁 원인·빈도 통계 분류',
          memoryText: '인류의 싸움 이유를 묻는 철학적 질문에 원인과 빈도 통계부터 구분하자고 답변함'
        }
      },
      D: {
        text: '"저희가 좀 모자랄 때도 있는데요. 그래도 누군가를 위해 희생하기도 해요."',
        img: 'assets/choices/q7_d.svg',
        mbti: 'F',
        reaction: {
          speaker: '두 번째 외계인 면접관',
          line: '"솔직한 인정과 따뜻한 진심... 은하계 면접 정석 답변이군요."',
          desc: '인간의 부족함을 솔직히 인정하면서도 서로를 향한 희생정신을 진심 어린 목소리로 전했다.',
          flagKey: 'humanityDefense',
          flagValue: 'humble_sacrifice',
          flagLabel: '인류의 부족함과 희생정신 고백',
          memoryText: '인류가 조금 모자랄 때도 있지만 누군가를 위해 희생하기도 한다며 진심으로 변호함'
        }
      }
    }
  },

  {
    id: 8,
    act: 'ACT 2 · 지구 대표 면접',
    sceneCode: 'SCENE 08',
    title: '최후의 PPT',
    dimension: 'JP',
    mainImg: 'assets/scenes/s08_main.svg',
    getNarration: () =>
      '면접관이 책상을 탁 치며 선언한다.\n"3분 뒤 지구의 운명을 결정하는 최종 발표를 진행하겠습니다."\n네 앞에 낡은 노트북이 놓인다. 바탕화면에는 파일 하나가 덩그러니 있다.\n[지구살려주세요_최종_진짜최종_수정본(7).pptx]\n더블클릭해 열어보니 눈부신 백지 슬라이드다.',
    getDialogue: () => ({
      speaker: '중앙 외계인 면접관',
      line: '"발표 준비 시간은 3분입니다. 시작하십시오."'
    }),
    choices: {
      A: {
        text: '당장 발표 구조를 짠다. 제목, 핵심 메시지, 결론부터.',
        img: 'assets/choices/q8_a.svg',
        mbti: 'J',
        reaction: {
          speaker: '두 번째 외계인 면접관',
          line: '"3분 만에 서론-본론-결론 3단 목차를 완성하다니, K-직장인의 영혼이 느껴집니다."',
          desc: '백지 슬라이드 위에서도 흔들리지 않고 1분 만에 개요와 결론 구조를 타이핑해 넣었다.',
          flagKey: 'pptStrategy',
          flagValue: 'structured_outline',
          flagLabel: '3분 만에 서론·본론·결론 목차 완성',
          memoryText: '백지 PPT를 보고도 당황하지 않고 3분 만에 제목·핵심 메시지·결론 목차를 세팅함'
        }
      },
      B: {
        text: '"일단 말하면서 슬라이드도 채우죠. 상황 봐가면서 갑시다."',
        img: 'assets/choices/q8_b.svg',
        mbti: 'P',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"발표와 제작을 실시간 라이브로 동시에 하겠다고요?! 광기가 대단하군요!"',
          desc: '노트북을 덮지도 않고 실시간 타이핑 라이브 토크쇼 방식으로 밀어붙이기로 했다.',
          flagKey: 'pptStrategy',
          flagValue: 'live_improv',
          flagLabel: '실시간 슬라이드 타이핑 라이브 발표',
          memoryText: '빈 PPT를 앞에 두고 "일단 말하면서 실시간으로 슬라이드 채우죠"라며 라이브 발표를 강행함'
        }
      },
      C: {
        text: '3분 안에 가능한 발표 분량을 계산하고 우선순위를 정한다.',
        img: 'assets/choices/q8_c.svg',
        mbti: 'J',
        reaction: {
          speaker: '세 번째 외계인 면접관',
          line: '"초당 발화 음절 수까지 계산해서 핵심 슬라이드 1장만 파는 전략이군요!"',
          desc: '무리하게 장수를 늘리지 않고 3분 내에 소화 가능한 핵심 지표 1장만 완벽하게 세팅했다.',
          flagKey: 'pptStrategy',
          flagValue: 'time_priority',
          flagLabel: '3분 가용 분량 계산 및 우선순위 압축',
          memoryText: '지구 멸망 3분 전에도 발표 가능 분량을 계산해 우선순위부터 배분함'
        }
      },
      D: {
        text: '"PPT는 모르겠고 일단 첫 멘트는 웃기게 가죠."',
        img: 'assets/choices/q8_d.svg',
        mbti: 'P',
        reaction: {
          speaker: '우측 외계인 면접관',
          line: '"빈 화면에 궁서체로 \'안녕하십니까 외계인 형님들\' 한 줄만 치고 끝냈어요?!"',
          desc: '슬라이드 디자인은 과감히 포기하고 오프닝 입담 하나로 우주 면접장을 뒤집기로 했다.',
          flagKey: 'pptStrategy',
          flagValue: 'funny_hook',
          flagLabel: 'PPT 포기 및 오프닝 개그 승부수',
          memoryText: '빈 슬라이드는 내팽개치고 오프닝 첫 멘트를 어떻게 웃길지부터 고민함'
        }
      }
    }
  },

  // --------------------------------------------------------------------------
  // ACT 3. 지구 멸망 직전의 사회생활
  // --------------------------------------------------------------------------
  {
    id: 9,
    act: 'ACT 3 · 지구 멸망 직전의 사회생활',
    sceneCode: 'SCENE 09',
    title: '전 애인의 증언',
    dimension: 'EI',
    mainImg: 'assets/scenes/s09_main.svg',
    getNarration: (state) => {
      const ppt = state.flags.pptStrategy;
      let startLine = '네가 발표를 시작하려는 순간, 창고 문이 벌컥 열린다.';
      if (ppt === 'funny_hook') {
        startLine = '네가 비장하게 웃긴 첫 멘트를 던지려는 순간, 창고 문이 벌컥 열린다.';
      } else if (ppt === 'structured_outline' || ppt === 'time_priority') {
        startLine = '네가 완벽하게 정리한 1번 슬라이드를 띄우는 순간, 창고 문이 벌컥 열린다.';
      }
      return `${startLine}\n아까 셔틀버스에 타고 있던 전 애인이 걸어 들어온다.\n"잠깐만요! 저 사람 지구 대표로 뽑으면 안 됩니다!"\n면접관이 근거를 묻자 전 애인이 휴대폰 화면을 띄운다.\n우주 전체가 쥐 죽은 듯 조용해진다.`;
    },
    getDialogue: () => ({
      speaker: '전 애인 (긴급 참고인)',
      line: '"증거 있습니다. 카톡 읽씹 74번."'
    }),
    choices: {
      A: {
        text: '"잠깐만, 당사자끼리 얘기하죠." 직접 대화를 시도한다.',
        img: 'assets/choices/q9_a.svg',
        mbti: 'E',
        reaction: {
          speaker: '전 애인 (긴급 참고인)',
          line: '"그때는 읽씹하더니 우주 면접장에선 바로 대화가 되네?!"',
          desc: '면접관들 앞에서 주저하지 않고 전 애인에게 정면으로 대화를 요청해 상황을 수습하려 나섰다.',
          flagKey: 'exResponse',
          flagValue: 'direct_talk',
          flagLabel: '전 애인 읽씹 폭로에 당사자 직접 대화 요청',
          memoryText: '우주 면접장에서 카톡 읽씹 74번이 폭로되자 전 애인에게 당사자 간 직접 대화를 제안함'
        }
      },
      B: {
        text: '일단 말을 아끼고 어떤 증거가 나올지 머릿속으로 정리한다.',
        img: 'assets/choices/q9_b.svg',
        mbti: 'I',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"74건의 타임스탬프를 머릿속으로 대조하고 계시는군요. 침착함이 무섭습니다."',
          desc: '섣불리 변명했다가 추가 캡처본이 터질까 봐 입을 다물고 방어 논리를 계산했다.',
          flagKey: 'exResponse',
          flagValue: 'silent_review',
          flagLabel: '추가 캡처본 대비 침묵 방어선 구축',
          memoryText: '읽씹 74번 폭로 앞에서도 말을 아끼며 추가 증거가 뭐가 나올지 조용히 머리를 굴림'
        }
      },
      C: {
        text: '네 기억과 당시 대화 내용을 조용히 떠올린다. 불리한 사실도 꽤 있다.',
        img: 'assets/choices/q9_c.svg',
        mbti: 'I',
        reaction: {
          speaker: '세 번째 외계인 면접관',
          line: '"본인도 속으로 \'아 맞다 그때 게임하느라 안 봤지\' 하고 인정하는 표정이네요."',
          desc: '차마 거짓말은 못 하고 속으로 과거의 업보를 조용히 되짚어보며 시선을 떨궜다.',
          flagKey: 'exResponse',
          flagValue: 'inner_reflect',
          flagLabel: '과거 읽씹 업보 조용히 자아성찰',
          memoryText: '전 애인의 폭로에 반박하는 대신 속으로 당시 정황을 떠올리며 조용히 업보를 인정함'
        }
      },
      D: {
        text: '"그건 오해가 있습니다. 지금 여기서 해명하겠습니다." 공개 설명을 시작한다.',
        img: 'assets/choices/q9_d.svg',
        mbti: 'E',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"우주 청문회 오픈! 자, 읽씹 1번 사건부터 브리핑 들어갑니다!"',
          desc: '마이크를 잡고 면접관들과 전 애인 앞에서 공개 기자회견급 해명 브리핑을 시작했다.',
          flagKey: 'exResponse',
          flagValue: 'public_hearing',
          flagLabel: '우주 면접장 읽씹 74건 공개 기자회견',
          memoryText: '카톡 읽씹 74번을 외계인 면접관들 앞에서 공개 청문회 방식으로 정면 해명함'
        }
      }
    }
  },

  {
    id: 10,
    act: 'ACT 3 · 지구 멸망 직전의 사회생활',
    sceneCode: 'SCENE 10',
    title: '지구 멸망의 진짜 이유',
    dimension: 'SN',
    mainImg: 'assets/scenes/s10_main.svg',
    getNarration: () =>
      '전 애인의 폭로전까지 끝난 뒤, 외계인 면접관이 충격적인 기밀 자료를 띄운다.\n"사실 우리는 오늘 지구를 철거할 계획이었습니다."\n홀로그램 화면에 붉은 글씨가 떠오른다.\n[지구 멸망 예정 사유]\n1. 과도한 스팸 문자\n2. 읽지 않은 단체 채팅 999+\n3. 쓸데없는 회사 회의가 너무 많음',
    getDialogue: () => ({
      speaker: '중앙 외계인 면접관',
      line: '"지구에서 발생하는 디지털 피로도와 회의록 트래픽이 우주 서버 전체에 악영향을 미치고 있습니다."'
    }),
    choices: {
      A: {
        text: '"잠깐. 이 정도면 지구 문제가 아니라 우주 통신 시스템의 설계 문제 아닙니까?"',
        img: 'assets/choices/q10_a.svg',
        mbti: 'N',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"헉... 우리 은하 서버 아키텍처가 레거시 코드인 걸 어떻게 눈치챘지?!"',
          desc: '지구의 잘못을 따지는 자리에서 오히려 우주 시스템의 근본적 설계 결함을 역공했다.',
          flagKey: 'doomAnalysis',
          flagValue: 'system_flaw',
          flagLabel: '우주 서버 아키텍처 설계 결함 역공',
          memoryText: '지구 멸망 사유를 듣고 오히려 우주 통신 시스템의 설계 결함을 탓하며 역공함'
        }
      },
      B: {
        text: '"회의가 정확히 얼마나 많길래요? 다른 행성과 비교한 자료 있나요?"',
        img: 'assets/choices/q10_b.svg',
        mbti: 'S',
        reaction: {
          speaker: '두 번째 외계인 면접관',
          line: '"화성은 주당 평균 0.4회인데 지구는 회의를 위한 사전 회의를 또 하더군요!"',
          desc: '막연한 주장 대신 행성 간 비교 통계 데이터와 정확한 수치 제시를 요구했다.',
          flagKey: 'doomAnalysis',
          flagValue: 'data_compare',
          flagLabel: '행성 간 회의 빈도 비교 통계 요구',
          memoryText: '지구에 회의가 너무 많다는 지적에 타 행성과 비교한 정확한 통계 수치부터 요구함'
        }
      },
      C: {
        text: '"문제가 메시지 수가 아니라 지구인의 의사소통 방식에 있을 수도 있습니다."',
        img: 'assets/choices/q10_c.svg',
        mbti: 'N',
        reaction: {
          speaker: '우측 외계인 면접관',
          line: '"맞습니다! \'넵\', \'네!\', \'네~\'에 담긴 미묘한 눈치 문화를 분석하다 서버가 터졌거든요!"',
          desc: '단순 트래픽 수치가 아니라 이면에 숨겨진 인간 소통 문화의 본질을 꿰뚫어 봤다.',
          flagKey: 'doomAnalysis',
          flagValue: 'comm_culture',
          flagLabel: 'K-직장인 넵병 등 의사소통 본질 통찰',
          memoryText: '단톡방 999+ 현상을 지구인의 의사소통 문화 본질 문제로 재해석함'
        }
      },
      D: {
        text: '"그런데 스팸 문자가 우주까지 어떻게 전송되는 거죠? 경로부터 확인해야죠."',
        img: 'assets/choices/q10_d.svg',
        mbti: 'S',
        reaction: {
          speaker: '세 번째 외계인 면접관',
          line: '"김 실장입니다~ 문자가 성간 중계기 주파수를 타고 안드로메다까지 날아왔습니다!"',
          desc: '추상적인 멸망 담론보다 실제 스팸 문자의 물리적 전송 경로와 중계기 상태부터 체크했다.',
          flagKey: 'doomAnalysis',
          flagValue: 'trace_route',
          flagLabel: '스팸 문자 성간 전송 물리 경로 추적',
          memoryText: '지구 멸망 위기에도 스팸 문자가 우주까지 날아간 통신 경로부터 확인하자고 나섬'
        }
      }
    }
  },

  {
    id: 11,
    act: 'ACT 3 · 지구 멸망 직전의 사회생활',
    sceneCode: 'SCENE 11',
    title: '지구를 살리는 조건',
    dimension: 'TF',
    mainImg: 'assets/scenes/s11_main.svg',
    getNarration: () =>
      '외계인이 손가락을 하나 치켜든다.\n"지구를 살릴 수 있는 방법이 딱 하나 있습니다. 지구인 전원이 은하 멤버십에 가입하면 됩니다."\n화면에 조건이 뜬다.\n[월 구독료: 1인당 1,399원 (첫 달 무료)]\n[※ 단, 해지 버튼이 존재하지 않음]',
    getDialogue: () => ({
      speaker: '중앙 외계인 면접관',
      line: '"자, 지구 대표 후보님. 이 조건에 동의하시겠습니까?"'
    }),
    choices: {
      A: {
        text: '"지구를 살리려는 거라면 이해하지만, 모두의 동의를 먼저 구해야 합니다."',
        img: 'assets/choices/q11_a.svg',
        mbti: 'F',
        reaction: {
          speaker: '우측 외계인 면접관',
          line: '"80억 명의 의사를 존중하시다니... 민주적인 대표의 자세군요."',
          desc: '당장 급하다고 독단적으로 도장을 찍지 않고 지구 시민들의 의사와 공감을 우선시했다.',
          flagKey: 'membershipDeal',
          flagValue: 'citizen_consent',
          flagLabel: '전 인류 사전 동의 및 의견 수렴 요구',
          memoryText: '지구 멸망을 막는 월 1,399원 구독 계약 앞에서도 지구인 모두의 동의를 먼저 구해야 한다고 주장함'
        }
      },
      B: {
        text: '"영구 구독이라면 총비용부터 계산해야 합니다. 해지 불가능 조건은 받아들이기 어렵습니다."',
        img: 'assets/choices/q11_b.svg',
        mbti: 'T',
        reaction: {
          speaker: '두 번째 외계인 면접관',
          line: '"80억 명 × 1,399원 × 무한대... 다크패턴 약관을 단숨에 간파하셨군요!"',
          desc: '첫 달 무료라는 미끼에 속지 않고 영구 귀속 약관의 재무적 리스크를 칼같이 거절했다.',
          flagKey: 'membershipDeal',
          flagValue: 'reject_cost',
          flagLabel: '영구 구독 총비용 산출 및 불공정 약관 거부',
          memoryText: '첫 달 무료라는 말에 속지 않고 해지 불가 영구 구독의 총비용을 암산해 계약을 거절함'
        }
      },
      C: {
        text: '"이 조건 때문에 앞으로 피해받을 사람들도 생각해야 합니다. 다른 방법을 찾아주세요."',
        img: 'assets/choices/q11_c.svg',
        mbti: 'F',
        reaction: {
          speaker: '세 번째 외계인 면접관',
          line: '"매달 1,399원 빠져나가서 서러울 미래 세대까지 걱정하시다니..."',
          desc: '당장의 생존 뒤에 숨어 있는 사람들의 고충을 헤아리며 대안 마련을 호소했다.',
          flagKey: 'membershipDeal',
          flagValue: 'protect_people',
          flagLabel: '구독료 피해 취약계층 보호 및 대안 요청',
          memoryText: '해지 버튼 없는 우주 멤버십 때문에 고통받을 사람들의 마음을 걱정하며 대안을 요구함'
        }
      },
      D: {
        text: '"계약 내용에 문제가 있습니다. 우선 해지 조건부터 수정합시다."',
        img: 'assets/choices/q11_d.svg',
        mbti: 'T',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"외계 공정거래위원회에서도 안 걸린 조항인데! 수정안 레드라인을 그으시네요!"',
          desc: '감정적 호소 대신 계약서 제4조 해지 불가 조항에 빨간 줄을 긋고 수정 협상에 돌입했다.',
          flagKey: 'membershipDeal',
          flagValue: 'amend_clause',
          flagLabel: '계약서 해지 조항 독소조항 수정 협상',
          memoryText: '외계인의 지구 구제 계약서를 보자마자 해지 조건 조항부터 뜯어고치자고 협상 테이블을 엶'
        }
      }
    }
  },

  {
    id: 12,
    act: 'ACT 3 · 지구 멸망 직전의 사회생활',
    sceneCode: 'SCENE 12',
    title: '최후의 20초',
    dimension: 'JP',
    mainImg: 'assets/scenes/s12_main.svg',
    getNarration: (state) => {
      const deal = state.flags.membershipDeal;
      let prefix = '외계인 면접관들이 귓속말로 긴급회의를 연다.';
      if (deal === 'reject_cost' || deal === 'amend_clause') {
        prefix = '네가 계약서 독소조항을 물고 늘어지자, 외계인들이 당황하며 긴급회의를 연다.';
      } else {
        prefix = '네가 지구인들의 입장을 대변하자, 외계인들이 고개를 끄덕이며 긴급회의를 연다.';
      }
      return `${prefix}\n전광판에 중간 집계 결과가 공개된다.\n[지구 멸망 찬성 50% vs 지구 멸망 반대 50%]\n남은 시간은 단 20초. 이제 네 마지막 행동이 지구의 결말을 결정한다.`;
    },
    getDialogue: () => ({
      speaker: '중앙 외계인 면접관',
      line: '"찬반 동률입니다. 지구 대표 후보에게 마지막 20초 발언 기회를 드리겠습니다."'
    }),
    choices: {
      A: {
        text: '분위기를 보고 즉흥적으로 승부수를 던진다. "혹시 저희 치킨 드셔보셨어요?"',
        img: 'assets/choices/q12_a.svg',
        mbti: 'P',
        reaction: {
          speaker: '세 번째 외계인 면접관',
          line: '"잠깐만요! 지구를 없애면 양념치킨이랑 뿌링클도 사라지는 거잖아요?! 반대표 누릅니다!!"',
          desc: '논리 대신 K-치킨의 맛을 건 즉흥 승부수가 면접관들의 미각을 정통으로 강타했다!',
          flagKey: 'finalPitch',
          flagValue: 'chicken_gambit',
          flagLabel: '최후의 20초 K-치킨 미각 외교 승부수',
          memoryText: '지구 멸망 20초 전 최후 변론에서 논리 대신 "저희 치킨 드셔보셨어요?"로 승부수를 던짐'
        }
      },
      B: {
        text: '지금까지 제시된 문제와 해결안을 20초 안에 정리해서 발표한다.',
        img: 'assets/choices/q12_b.svg',
        mbti: 'J',
        reaction: {
          speaker: '중앙 외계인 면접관',
          line: '"스팸 차단, 단톡방 무음, 회의시간 반감까지 20초 만에 완벽한 로드맵을 제시했군요!"',
          desc: '오늘 면접에서 나온 3대 문제점과 실행 가능한 해결책을 정확히 19초 만에 요약 브리핑했다.',
          flagKey: 'finalPitch',
          flagValue: 'summary_roadmap',
          flagLabel: '20초 칼정리 문제 해결 로드맵 브리핑',
          memoryText: '지구 멸망까지 20초 남은 상황에서 당황하지 않고 문제점과 해결방안 3가지를 요약 발표함'
        }
      },
      C: {
        text: '미리 준비한 핵심 문장을 차분하게 전달한다. "멸망보다 개선이 합리적입니다."',
        img: 'assets/choices/q12_c.svg',
        mbti: 'J',
        reaction: {
          speaker: '두 번째 외계인 면접관',
          line: '"단 한 줄로 철거 비용 대비 개선 효율을 증명하다니... 반박할 수가 없군요."',
          desc: '흔들림 없는 눈빛으로 준비해 둔 핵심 명제를 전달해 회의장을 단숨에 납득시켰다.',
          flagKey: 'finalPitch',
          flagValue: 'prepared_thesis',
          flagLabel: '사전 준비된 핵심 명제로 정면 돌파',
          memoryText: '최후의 20초 동안 흔들림 없이 "멸망보다 개선이 합리적입니다"라는 핵심 문장으로 승부를 봄'
        }
      },
      D: {
        text: '외계인들의 반응에 맞춰 멘트를 바꿔가며 마지막까지 설득한다.',
        img: 'assets/choices/q12_d.svg',
        mbti: 'P',
        reaction: {
          speaker: '우측 외계인 면접관',
          line: '"우리 눈썹 움직일 때마다 맞춤형 멘트가 바뀌는데?! 무슨 인공지능 상담원 같아요!"',
          desc: '면접관 세 명의 표정 변화를 실시간으로 읽으며 20초 동안 4번이나 논조를 바꿨다.',
          flagKey: 'finalPitch',
          flagValue: 'adaptive_persuasion',
          flagLabel: '면접관 표정 맞춤형 실시간 카멜레온 화술',
          memoryText: '남은 20초 동안 외계인들의 눈치를 실시간으로 보며 멘트를 4번이나 바꿔가며 설득함'
        }
      }
    }
  }
];

// ============================================================================
// 멀티 엔딩 데이터 (MBTI와 별도로 누적 플레이 플래그에 의해 결정 — 섹션 5)
// ============================================================================
const STORY_ENDINGS = {
  ENDING_A: {
    code: 'ENDING A',
    title: '지구 대표 정규직 합격',
    img: 'assets/endings/ending_a.svg',
    badge: '🎉 최종 전형 결과: 정규직 채용 확정',
    narration:
      '외계인 면접관 세 명이 기립 박수를 친다.\n"축하합니다. 지구는 살았습니다."\n안도의 한숨을 쉬는 순간, 허공에서 홀로그램 근로계약서가 날아와 네 손에 꽂힌다.\n\n[직급: 지구 대표 (정규직)]\n[연봉: 추후 협의]\n[근무지: 지구 전체]\n[퇴사: 영구 불가]',
    finalQuote: '"지구는 살렸습니다. 대신 출근할 곳이 지구 전체로 늘었습니다."',
    protagonistLine: '"잠깐만요, 주 52시간제는 적용되는 거 맞죠? 야근 수당은요?!"'
  },
  ENDING_B: {
    code: 'ENDING B',
    title: '지구 멸망 임시 보류 (30일 구독형)',
    img: 'assets/endings/ending_b.svg',
    badge: '⏳ 최종 전형 결과: 30일 무료 체험 유예',
    narration:
      '전광판에 초록색 불이 켜진다.\n"지구 멸망이 30일간 유예되었습니다!"\n모두가 얼싸안고 환호한다. 그런데 네가 받은 확인서 맨 아래에 개미만 한 글씨가 적혀 있다.\n\n[※ 30일 후 매월 자동 갱신]\n[※ 결제 수단 한도 초과 또는 갱신 실패 시 즉시 멸망 예정]',
    finalQuote: '"인류의 운명을 월간 구독 서비스로 만들어버린 인간."',
    protagonistLine: '"다들 기뻐할 때가 아니야! 다음 달 결제일 전에 해지 버튼 위치부터 찾아야 돼!"'
  },
  ENDING_C: {
    code: 'ENDING C',
    title: '외계인 고객센터 특채 취업',
    img: 'assets/endings/ending_c.svg',
    badge: '🎧 최종 전형 결과: 은하 고객센터 전환 배치',
    narration:
      '중앙 면접관이 고개를 끄덕이며 서류에 도장을 찍는다.\n"지구 대표보다는 우리 공단 핵심 부서에 훨씬 적합해 보이는군요."\n갑자기 네 머리 위로 상담용 헤드셋이 씌워지고, 눈앞에 착신 램프가 깜빡인다.\n\n[부서: 은하인사관리공단 범우주 민원상담실]\n첫 전화가 울린다.\n"안녕하세요, 화성 거주민인데요. 지구인 단톡방 알림음 때문에 잠을 못 자겠어요."',
    finalQuote: '"지구는 살았는지 모르겠고, 너는 오늘도 우주 민원 처리 중이다."',
    protagonistLine: '"네, 고객님 많이 불편하셨겠습니다~ 해당 행성 스팸 건은 확인 후 피드백 드리겠습니다~"'
  }
};

// 누적된 선택 플래그를 바탕으로 멀티 엔딩 판정 (MBTI와 독립적으로 계산)
function determineStoryEnding(state) {
  const f = state.flags;
  let scoreA = 0; // 정규직 대표 적합도 (체계적 분석·정면 돌파·구조적 해결)
  let scoreB = 0; // 구독형 유예 적합도 (유연한 협상·임기응변·실리 추구)
  let scoreC = 0; // 은하 고객센터 적합도 (공손한 상담·감정 케어·실시간 응대)

  // Scene 01
  if (f.firstContact === 'counselor') scoreC += 2;
  else if (f.firstContact === 'observer' || f.firstContact === 'silent_judge') scoreA += 2;
  else scoreB += 2;

  // Scene 03
  if (f.recruitResponse === 'ask_criteria') scoreA += 2;
  else if (f.recruitResponse === 'check_salary') scoreB += 2;
  else scoreC += 2;

  // Scene 04
  if (f.boardingStyle === 'planned' || f.boardingStyle === 'audit_process') scoreA += 2;
  else scoreB += 2;

  // Scene 06
  if (f.interviewPitch === 'grand_purpose' || f.interviewPitch === 'civilization_redesign') scoreA += 1;
  else if (f.interviewPitch === 'factual_card') scoreC += 1;
  else scoreB += 1;

  // Scene 08
  if (f.pptStrategy === 'structured_outline' || f.pptStrategy === 'time_priority') scoreA += 2;
  else if (f.pptStrategy === 'live_improv' || f.pptStrategy === 'funny_hook') scoreB += 2;

  // Scene 09
  if (f.exResponse === 'public_hearing') scoreA += 1;
  else if (f.exResponse === 'direct_talk') scoreC += 2;
  else scoreB += 1;

  // Scene 11
  if (f.membershipDeal === 'amend_clause') scoreB += 2;
  else if (f.membershipDeal === 'reject_cost') scoreA += 2;
  else scoreC += 2;

  // Scene 12
  if (f.finalPitch === 'summary_roadmap' || f.finalPitch === 'prepared_thesis') scoreA += 2;
  else if (f.finalPitch === 'chicken_gambit') scoreB += 2;
  else if (f.finalPitch === 'adaptive_persuasion') scoreC += 2;

  if (scoreC >= scoreA && scoreC >= scoreB) return 'ENDING_C';
  if (scoreB > scoreA) return 'ENDING_B';
  return 'ENDING_A';
}

// ============================================================================
// 16가지 MBTI 결과 데이터 (섹션 7 요구사항 완벽 반영)
// ============================================================================
const MBTI_RESULTS = {
  ISTJ: {
    emoji: '📋',
    subtitle: '지구 멸망에도 출근 도장 찍는 인간',
    quote: '"운석 충돌은 12시니까 11시 50분까지는 오전 근무 맞잖아."',
    tags: ['#메뉴얼집착광공', '#좀비도줄세움', '#근태만점사망', '#영수증챙김'],
    description:
      '창밖으로 외계 모선이 떠 있고 좀비가 유리를 두드려도 일단 오늘 할 일 체크리스트부터 끝내야 직성이 풀립니다. 납치범이 몸값을 요구하면 세금계산서 발행 여부를 진지하게 물어봐서 범인을 질리게 만드는 인간입니다.',
    facts: [
      '위기 상황에 남들이 소리 지를 때 혼자 비상구 위치랑 소화기 점검일자 확인함',
      '약속 시간 5분 늦은 친구보다 예고 공문 없이 쳐들어온 외계인을 더 무례하다고 생각함',
      '죽기 직전에도 내 방 컴퓨터 자동결제 해지 안 한 게 제일 신경 쓰임'
    ],
    strength: '극한 상황에서도 흔들리지 않는 침착함과 정확한 일 처리 능력',
    weakness: '예고 없는 변수나 무계획 즉흥 작전이 나오면 내면에서 에러코드 발생',
    stats: [
      { label: '메뉴얼 준수력', value: 99 },
      { label: '눈치력 및 침착함', value: 94 },
      { label: '납치범 피곤하게 만들기', value: 91 }
    ],
    oneliner: '인류가 다 멸망해도 마지막까지 연말정산 마치고 떠날 모범 생존자.',
    celebrities: [
      { avatar: '📈', category: '유명인', name: '워런 버핏', role: '투자의 귀재' },
      { avatar: '🪄', category: '캐릭터', name: '헤르미온느', role: '해리포터' },
      { avatar: '🐰', category: '캐릭터', name: '주디 (원칙 모드)', role: '모범 경찰' }
    ],
    best: 'ESFP',
    worst: 'ENFP'
  },
  ISFJ: {
    emoji: '🍙',
    subtitle: '납치범한테 도시락 싸주는 인간',
    quote: '"저기... 저 묶으시느라 땀 많이 흘리셨는데 식사는 하셨어요?"',
    tags: ['#예의바른인질', '#거절못해서납치됨', '#눈치백단', '#배려과다'],
    description:
      '총구 앞에서도 상대방 무안할까 봐 거절을 못 해 따라간 눈물겨운 평화주의자입니다. 외계인이 침공해도 면접관 목 아플까 봐 따뜻한 보리차를 내오며, 결국 납치범이 양심의 가책을 느끼고 먼저 풀어주게 만듭니다.',
    facts: [
      '전 애인을 우주 셔틀버스에서 만나도 어색할까 봐 혼자 창문만 뚫어져라 쳐다봄',
      '좀비한테 물렸는데 팀원들 걱정할까 봐 혼자 구석 가서 조용히 변신 준비함',
      '겉으로는 다 맞춰주는데 속으로는 상대방이 무례했던 포인트 수첩에 다 적어둠'
    ],
    stats: [
      { label: '눈치력', value: 98 },
      { label: '사회생활력', value: 96 },
      { label: '거절 못 할 확률', value: 95 }
    ],
    strength: '주변 사람의 감정 변화를 귀신같이 읽고 갈등을 부드럽게 완충하는 힘',
    weakness: '남 배려하느라 정작 내 실속과 탈출 타이밍을 놓치기 일쑤임',
    oneliner: '죽기 직전에도 남 걱정하다가 정작 본인은 인덕으로 살아남는 인간.',
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
    subtitle: '좀비의 가정환경까지 분석하는 인간',
    quote: '"저 외계인이 지구를 미워하는 건... 유년기의 결핍 때문이 아닐까요?"',
    tags: ['#겉차속광', '#방구석예언가', '#사연수집가', '#조용한도어슬램'],
    description:
      '겉으로는 차분하게 면접장에 앉아 있지만 머릿속으로는 이미 외계 문명의 철학적 고독과 인류 멸망 이후의 대서사시를 3부작으로 집필했습니다. 조용히 미소 짓다가도 상대가 선을 넘으면 마음속에서 영구 차단해 버립니다.',
    facts: [
      '평소엔 온화한데 극한 상황에서 혼자 제일 서늘한 눈빛으로 본질을 꿰뚫어 봄',
      '지구 멸망 소식 들으면 놀라기보다 "드디어 올 것이 왔군" 하며 고개를 끄덕임',
      '상대방이 총 겨누고 있는데 눈빛만으로 심리 상담해 줘서 범인을 오열하게 만듦'
    ],
    strength: '사건의 표면 뒤에 숨은 진짜 의도와 인간 심리를 꿰뚫어 보는 통찰력',
    weakness: '생각이 너무 깊어 혼자 우주 끝까지 과몰입하다가 에너지를 다 씀',
    stats: [
      { label: '맑은 눈의 광기', value: 97 },
      { label: '악당 심리 간파력', value: 96 },
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
    subtitle: '인류 멸망을 예상했는데 아무도 안 믿어준 인간',
    quote: '"거봐, 내가 우주 통신 서버 터질 줄 알고 단톡방 나가자고 했지?"',
    tags: ['#빅픽처중독', '#플랜Z보유자', '#인류애바닥', '#효율성괴물'],
    description:
      '모두가 패닉에 빠진 면접장에서도 팔짱을 끼고 "우주 공단 일 처리가 비효율적이군"이라고 중얼거리는 냉혈 전략가입니다. 이미 플랜 A부터 플랜 Z까지 시뮬레이션이 끝나 있으며, 외계인의 논리적 허점을 정면으로 타격합니다.',
    facts: [
      '납치당하는 와중에도 납치범의 허술한 동선과 보안 허점을 속으로 채점함',
      '빈 PPT 슬라이드를 봐도 당황하지 않고 1분 만에 핵심 구조도를 설계함',
      '말투는 차가운데 결과적으로 지구 구할 가장 확실한 방법을 혼자 찾아냄'
    ],
    strength: '혼란스러운 위기 속에서도 구조적 원인을 파악해 최적의 전략을 짜는 능력',
    weakness: '감정적 공감보다 팩트와 효율이 먼저 나가서 주변에서 피도 눈물도 없다고 오해함',
    stats: [
      { label: '생존 시뮬레이션', value: 99 },
      { label: '비명 대신 한숨 쉴 확률', value: 96 },
      { label: '쓸데없는 자신감', value: 92 }
    ],
    oneliner: '지구에 마지막으로 살아남아 "내 예상이 정확했군"이라고 혼잣말할 인간.',
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
    subtitle: '폭탄 해체하고 말없이 퇴근하는 인간',
    quote: '"지구 구했으니까 나 이제 집에 가도 되지? 인터뷰는 사양함."',
    tags: ['#귀차니즘만렙', '#감정소모거부', '#실전파생존왕', '#쿨병말기'],
    description:
      '세상이 멸망하든 말든 내 휴식 시간 방해하는 놈이 제일 나쁜 놈입니다. 구구절절한 연설이나 감동 서사는 질색하며, 최소한의 단어와 동작만으로 위기를 해결한 뒤 아무도 모르게 뒷문으로 칼퇴근합니다.',
    facts: [
      '납치범이 거창한 사연을 늘어놓으면 3초 만에 하품해서 맥을 끊어버림',
      '말은 아끼는데 눈알은 이미 비상구 위치와 탈출 도구 스캔을 마침',
      '지구 대표 감투 쓰라고 하면 귀찮다고 거절하고 야생에서 혼자 제일 잘 삶'
    ],
    strength: '감정에 휘둘리지 않는 동물적 상황 판단력과 위기 대처 순발력',
    weakness: '귀찮은 절차나 설명하기를 극도로 싫어해 오해를 사도 해명을 안 함',
    stats: [
      { label: '도주 본능 및 실전 감각', value: 99 },
      { label: '귀차니즘 지수', value: 100 },
      { label: '사회생활력', value: 24 }
    ],
    oneliner: '우주 전쟁이 터져도 혼자 캠핑카 개조해서 제일 꿀 빨며 살아남을 인간.',
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
    subtitle: '지구 멸망 직전에도 플레이리스트 고르는 인간',
    quote: '"잠깐만, 지구 최후의 날인데 브금이 이게 뭐야... 선곡만 바꾸고 발표할게."',
    tags: ['#침대일체형', '#감성생존자', '#일단누움', '#온화한마이웨이'],
    description:
      '운석이 날아와도 이불 밖으로 나가는 게 더 큰 재난인 영혼입니다. 우주 면접장에서도 외계인의 촌스러운 다이소 넥타이 색조합이 신경 쓰이며, 갈등 상황에서는 조용히 평화를 택하다가도 결정적 순간에 은근한 고집을 발휘합니다.',
    facts: [
      '전 애인이 읽씹 74번 폭로하면 변명할 기운도 없어서 그냥 아련하게 먼 산 봄',
      '위기 상황에서도 내가 좋아하는 치킨이랑 침대만 있으면 스트레스 안 받음',
      '도망치기 귀찮아서 가만히 구석에 앉아 있다가 기적적으로 폭격을 피함'
    ],
    strength: '어떤 이상한 상황도 있는 그대로 받아들이는 유연함과 부드러운 공감력',
    weakness: '압박이 심해지면 현실 도피 모드가 켜지며 연락 두절될 수 있음',
    stats: [
      { label: '은신 및 보호색 능력', value: 95 },
      { label: '이불 밖 탈출 의지', value: 9 },
      { label: '감성 충만도', value: 98 }
    ],
    oneliner: '도망치기 귀찮아서 가만히 누워 있다가 얼떨결에 최후의 생존자가 될 운명.',
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
    subtitle: '좀비한테 물리고도 좀비 기분 걱정하는 인간',
    quote: '"외계인님... 지구 철거하시느라 야근 많이 하셨죠? 마음은 이해해요..."',
    tags: ['#망상풀가동', '#쿠크다스멘탈', '#과몰입장인', '#진정성100%'],
    description:
      '총구 앞에서도 혼자 영화 세 편 분량의 대서사시를 상상하는 과몰입 로맨티스트입니다. 면접관이 독설을 날리면 속으로 상처받으면서도, 정작 인류가 왜 싸우냐는 질문에는 눈물 고인 눈으로 진심을 전해 외계인을 감화시킵니다.',
    facts: [
      '납치당한 지 3분 만에 머릿속으로 이미 지구 구하고 회고록 쓰는 엔딩까지 상상함',
      '남한테 싫은 소리 못 해서 해지 버튼 없는 멤버십도 거절 못 할 뻔함',
      '평소엔 소심한데 내 가치관을 건드리면 갑자기 눈빛 변해서 할 말 다 함'
    ],
    strength: '상대방의 아픔에 깊이 공감하고 진심 어린 이야기로 마음을 움직이는 힘',
    weakness: '현실적인 계약 조건이나 냉정한 손익 계산 앞에서 쉽게 멘탈이 흔들림',
    stats: [
      { label: '망상 시나리오 집필력', value: 100 },
      { label: '외계인 감화 확률', value: 94 },
      { label: '도주 본능', value: 38 }
    ],
    oneliner: '울면서 면접 보다가도 외계인 면접관과 시집 추천하며 영혼의 단짝이 될 인간.',
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
    subtitle: '죽기 3초 전에 우주 원리 깨달은 인간',
    quote: '"잠깐만요, 지구 멸망은 둘째 치고 스팸 문자가 초광속 통신을 한 원리부터 봅시다."',
    tags: ['#호기심으로사망', '#분석충', '#사회성절전모드', '#팩트폭격기'],
    description:
      '목숨이 오가는 순간에도 공포보다 "외계 서버 아키텍처는 왜 저 모양이지?"라는 지적 호기심이 앞서는 기이한 연구자입니다. 전 애인이 읽씹 74번을 폭로해도 그중 몇 건이 단순 단답형이었는지 통계적 반론을 머릿속으로 계산합니다.',
    facts: [
      '골목길에서 총 맞을 뻔했는데 총기 모델명이랑 장난감 금형 사출 상태부터 관찰함',
      '외계인의 지구 멸망 사유가 비논리적이면 목숨 걸고 오류를 지적함',
      '사회생활 멘트는 어색한데 아이디어 하나로 판을 뒤집는 천재성이 있음'
    ],
    strength: '남들이 당연하게 넘기는 문제에서 구조적 모순과 창의적 해법을 찾아내는 두뇌',
    weakness: '감정적 분위기 파악보다 논리 검증에 몰두해 눈치 없다는 소리를 들음',
    stats: [
      { label: '쓸데없는 지적 호기심', value: 100 },
      { label: '외계 논리 파괴력', value: 97 },
      { label: '사회생활력', value: 29 }
    ],
    oneliner: '외계인에게 끌려가도 외계 과학자들에게 훈수 두다가 연구소장으로 스카우트될 인간.',
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
    subtitle: '생존율 1%인데 재밌겠다고 뛰어드는 인간',
    quote: '"빈 PPT면 어때! 일단 마이크 잡고 부딪혀 보면 답 나오겠지!"',
    tags: ['#아드레날린중독', '#노빠꾸승부사', '#임기응변만렙', '#주인공병'],
    description:
      '정체불명의 우주 면접 셔틀버스를 보고도 "재밌네"라며 제일 먼저 올라타는 야생의 승부사입니다. 빈 슬라이드와 20초 타이머 앞에서도 쫄기는커녕 즉흥 치킨 딜 하나로 외계인들의 판결을 뒤집어버리는 미친 순발력을 자랑합니다.',
    facts: [
      '복잡한 약관이나 미래 계획보다 당장 눈앞의 판을 흔드는 데 특화됨',
      '전 애인이 폭로전을 걸어도 당황하지 않고 현장에서 입담으로 맞받아침',
      '사전 준비는 0점인데 실전 임기응변 하나로 1등 먹어서 주변 사람 킹받게 함'
    ],
    strength: '절체절명의 위기에서도 쫄지 않는 담력과 현장을 장악하는 순발력',
    weakness: '장기적인 계획이나 꼼꼼한 문서 작업이 필요할 때 집중력이 급격히 하락함',
    stats: [
      { label: '쓸데없는 자신감', value: 100 },
      { label: '도주 및 임기응변 본능', value: 98 },
      { label: '사전 계획성', value: 7 }
    ],
    oneliner: '지구가 폭발해도 폭발 배경으로 선글라스 끼고 치킨 뜯으며 걸어 나올 인간.',
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
    subtitle: '인류 최후의 날에 단체사진 찍자는 인간',
    quote: '"외계인 면접관님들! 지구 멸망 투표하기 전에 치킨 들고 브이 한 번만 해주세요!"',
    tags: ['#분위기메이커', '#우주급인싸', '#일단즐겨', '#친화력괴물'],
    description:
      '좀비와 외계인, 전 애인이 합석한 공포의 셔틀버스 안에서도 단체 대화를 주도하며 레크리에이션 분위기를 만드는 타고난 스타입니다. 심각한 우주 재판장조차 본인의 토크쇼 무대로 바꿔버려 외계인들이 홀린 듯 합격 버튼을 누르게 만듭니다.',
    facts: [
      '우주 셔틀에 타면서도 휴게소 간식이랑 호두과자 파는지부터 궁금해함',
      '빈 PPT 슬라이드가 나와도 개그 멘트 하나로 면접관들 빵 터지게 만듦',
      '진지하고 무거운 침묵을 견디지 못해 어떻게든 말을 걸어 분위기를 풂'
    ],
    strength: '어떤 적대적인 환경에서도 사람들의 경계심을 무장해제시키는 친화력과 에너지',
    weakness: '복잡한 계약 조항 분석이나 냉정한 숫자 계산 앞에서는 귀가 자동으로 닫힘',
    stats: [
      { label: '사회생활력 및 인싸력', value: 100 },
      { label: '입만 살아남을 확률', value: 96 },
      { label: '침묵 인내심', value: 3 }
    ],
    oneliner: '외계인 침공군과도 10분 만에 깐부 맺고 치맥 파티를 열 우주 평화대사.',
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
    subtitle: '납치범이랑 30분 만에 절친 되는 인간',
    quote: '"야 박민수!! 너 은하공단 대리 달았어?! 대박, 외계인 친구들도 다 소개해 줘!!"',
    tags: ['#인간리트리버', '#납치범과절친', '#상상력폭발', '#감정롤러코스터'],
    description:
      '납치범의 외로움을 위로해 주다가 30분 만에 호형호제하고, 외계인 면접관의 표정을 보며 실시간으로 만담을 주고받는 마성의 인류입니다. 엉뚱한 상상력과 따뜻한 인간미가 동시에 폭발해 우주 면접장을 감동과 혼돈의 도가니로 만듭니다.',
    facts: [
      '총구 앞에서도 "혹시 김 씨세요?"라며 인맥과 공통점부터 찾으려 함',
      '창고 면접장을 보고도 우주 문명 재설계 프로젝트라며 혼자 거창한 상상의 나래를 펼침',
      '계획은 없는데 위기 순간마다 기상천외한 임기응변과 진심으로 살아남음'
    ],
    strength: '상상치 못한 창의적 발상과 타인의 마음을 무장해제시키는 따뜻한 공감력',
    weakness: '체계적인 시간 관리나 반복적인 실무 체크리스트 앞에서 쉽게 산만해짐',
    stats: [
      { label: '친화력 치사량', value: 100 },
      { label: '입만 살아남을 확률', value: 97 },
      { label: '메뉴얼 준수력', value: 14 }
    ],
    oneliner: '인질로 끌려갔다가 외계인들과 호형호제하며 우주 홍보대사로 금의환향할 인간.',
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
    subtitle: '총 겨눈 사람한테 논리적으로 반박하는 인간',
    quote: '"잠깐만요 면접관님, 스팸 문자 때문에 지구를 멸망시킨다는 건 우주 서버 설계 결함 아닌가요?"',
    tags: ['#아가리파이터', '#논리왕', '#외계인멘탈파괴', '#역공장인'],
    description:
      '지구가 멸망할 위기인데도 외계인 주장의 논리적 허점이 더 신경 쓰이는 타고난 변론가입니다. 빈 PPT 앞에서도 눈 하나 깜짝 안 하고 현란한 말발과 역질문으로 면접관들의 혼을 빼놓아, 결국 외계인이 먼저 항복 선언을 하게 만듭니다.',
    facts: [
      '피고인으로 불려 갔다가 외계 공단의 통신 시스템 결함을 지적하며 원고로 돌변함',
      '해지 버튼 없는 약관을 보자마자 그 자리에서 계약서 조항 수정 협상을 벌임',
      '위기 상황에서도 입만 살아있어서 말싸움으로는 우주 최강임'
    ],
    strength: '기존의 틀을 깨는 날카로운 비판적 사고와 어떤 상황도 뒤집는 협상·토론 능력',
    weakness: '논쟁에서 이기려다 상대방의 감정을 건드리거나 굳이 안 해도 될 말까지 얹음',
    stats: [
      { label: '입만 살아남을 확률', value: 100 },
      { label: '외계인 혈압 상승 유발력', value: 99 },
      { label: '고분고분함', value: 1 }
    ],
    oneliner: '우주 재판장에 끌려가도 외계 판사들을 말발로 털어버리고 무죄 판결 받아낼 인간.',
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
    subtitle: '좀비들한테 업무 분장하는 인간',
    quote: '"자, 시간 없습니다! 외계인분들은 해지 조항 수정하시고, 지구인들은 회의 시간 절반으로 줄이세요!"',
    tags: ['#본투비교관', '#우주공단감사팀장', '#체계적돌파', '#현실주의보스'],
    description:
      '우주로 납치되는 와중에도 담당자와 행정 절차를 따지고, 빈 슬라이드 앞에서도 3분 안에 발표 목차와 실행 로드맵을 완성하는 강철 실무자입니다. 외계인 면접관들조차 당신의 칼 같은 일 처리에 감탄해 그 자리에서 본부장으로 모셔갑니다.',
    facts: [
      '청테이프로 붙인 셔틀버스 안내문을 보자마자 담당자가 누구냐며 절차부터 추궁함',
      '전 애인의 폭로에도 흔들리지 않고 공개 해명 브리핑으로 정면 돌파함',
      '최후의 20초 동안 문제점과 해결 방안을 1초의 오차도 없이 요약 발표함'
    ],
    strength: '혼돈에 빠진 조직과 위기 상황을 단숨에 체계화하고 결과물로 증명하는 실행력',
    weakness: '효율과 원칙을 앞세우다 보니 주변 사람들의 서운한 감정을 놓치기 쉬움',
    stats: [
      { label: '사회생활 및 통솔력', value: 100 },
      { label: '쓸데없는 자신감', value: 94 },
      { label: '감성 위로 능력', value: 12 }
    ],
    oneliner: '외계 공단에 끌려갔다가 외계인들의 근무 태만을 잡고 감사팀장으로 승진할 인간.',
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
    subtitle: '지구 멸망 전 마지막 단톡방 공지 올리는 인간',
    quote: '"여러분~ 지구 멸망 여부는 다 같이 투표로 정해야죠! 안 읽으신 분 빨리 확인 부탁드려요~!"',
    tags: ['#단톡방총무', '#평화주의협상가', '#오지랖국가대표', '#사회생활만렙'],
    description:
      '총구 앞에서도 "대화로 풀 수 있을까요?"라며 예의 바르게 중재를 시도하고, 어색한 셔틀버스 안에서 먼저 인사를 건네는 사회생활 만렙입니다. 지구의 운명이 걸린 계약 앞에서도 지구 시민 모두의 동의와 약자의 입장을 먼저 챙기는 따뜻한 리더입니다.',
    facts: [
      '괴한이 총을 겨눠도 일단 공손한 상담원 톤으로 대화를 시도해 상대를 당황시킴',
      '전 애인이 면접장에 난입해도 싸우는 대신 당사자끼리 원만하게 풀자고 유도함',
      '구독료 1,399원 때문에 피해 입을 사람이 없는지 끝까지 챙김'
    ],
    strength: '탁월한 대인관계 감각과 조화로운 소통으로 극단적인 갈등을 봉합하는 능력',
    weakness: '모두를 만족시키려다 정작 본인이 독박을 쓰거나 감정 에너지를 과소비함',
    stats: [
      { label: '사회생활력', value: 100 },
      { label: '눈치력', value: 98 },
      { label: '독고다이 생존력', value: 20 }
    ],
    oneliner: '우주 전쟁이 나도 양측 대표 단톡방을 파서 회식 자리로 평화 협정을 이끌어낼 인간.',
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
    subtitle: '외계인 침공 중에도 인류에게 동기부여하는 인간',
    quote: '"면접관님! 인간은 비록 부족하지만 서로를 위해 희생하고 화해할 줄 아는 존재입니다!"',
    tags: ['#열혈주인공', '#외계인감화전문', '#진심어린웅변', '#인류애풀충전'],
    description:
      '삭막한 우주 창고 면접장을 순식간에 감동적인 TED 강연장으로 바꿔버리는 카리스마 연설가입니다. 인류의 단점을 추궁하는 외계인 앞에서도 인간의 사랑과 가능성을 진심으로 변호해, 면접관들이 눈물을 훔치며 지구 구제안에 서명하게 만듭니다.',
    facts: [
      '불법 납치를 당하고도 동창의 외로운 타지 생활을 먼저 위로해 줌',
      '인류가 왜 싸우냐는 질문에 화해와 희생의 가치를 역설해 외계인을 감동시킴',
      '마지막 20초까지 포기하지 않고 진심 어린 설득으로 찬반 동률을 뒤집음'
    ],
    strength: '타인의 마음을 움직이는 진정성 있는 설득력과 공동체를 하나로 묶는 리더십',
    weakness: '대의명분과 타인의 구제를 우선시하느라 본인이 가장 무거운 짐을 떠안음',
    stats: [
      { label: '사회생활력 및 설득력', value: 100 },
      { label: '외계인 개과천선 확률', value: 96 },
      { label: '이기적 도주 본능', value: 8 }
    ],
    oneliner: '지구를 침공한 외계 함대 사령관마저 팬클럽 회장으로 만들어버릴 인간.',
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
    subtitle: '외계인 우주선 빼앗아서 CEO 되는 인간',
    quote: '"은하인사관리공단 수익 모델이 너무 구리네요. 제가 오늘부터 구조조정 들어갑니다."',
    tags: ['#야망폭주기관차', '#우주M&A전문', '#협상테이블장악', '#최종보스'],
    description:
      '지구 대표 후보로 끌려갔다가 외계 공단의 허술한 시스템과 불공정 약관을 단숨에 장악해 버리는 타고난 지배자입니다. 위기 앞에서도 머뭇거림 없이 핵심 결론과 해결 로드맵을 꽂아 넣어, 면접이 끝날 때쯤엔 외계인 면접관들이 당신에게 결재를 받으러 옵니다.',
    facts: [
      '납치범이 명함을 건네자마자 선정 기준과 연봉·계약 조건부터 협상 테이블에 올림',
      '창고 면접장을 보고도 지구와 우주 문명 재설계 프로젝트라며 판을 키움',
      '최후의 20초 동안 가장 완벽한 전략 브리핑으로 면접장을 평정함'
    ],
    strength: '거시적인 비전 제시와 단호한 결단력으로 절체절명의 위기를 기회로 바꾸는 힘',
    weakness: '목표 달성을 향해 돌진하느라 주변의 사소한 감정선을 지나칠 때가 있음',
    stats: [
      { label: '야망 및 협상 장악력', value: 100 },
      { label: '쓸데없는 자신감', value: 98 },
      { label: '남 밑에서 시키는 대로 할 확률', value: 0 }
    ],
    oneliner: '지구를 구하러 갔다가 은하인사관리공단 경영권을 인수하고 돌아올 최종 보스.',
    celebrities: [
      { avatar: '📱', category: '유명인', name: '스티브 잡스', role: '애플 공동창업자' },
      { avatar: '👨‍🍳', category: '유명인', name: '백종원', role: '요리연구가·사업가' },
      { avatar: '👠', category: '캐릭터', name: '미란다 프리슬리', role: '악마는 프라다를 입는다' }
    ],
    best: 'INTP',
    worst: 'ISFP'
  }
};

// 브라우저 및 Node.js(자동 검증 스크립트) 양쪽 호환 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCENARIO_SCENES, STORY_ENDINGS, MBTI_RESULTS, determineStoryEnding };
}
