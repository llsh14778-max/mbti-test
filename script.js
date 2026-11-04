// ============================================================================
// 총구 앞 MBTI — 지구 대표로 끌려갔습니다 (게임 엔진 & 상태 관리 & UI 컨트롤러)
// ============================================================================

const STORAGE_KEY = 'gunpoint_mbti_save_v2';

const randomRoasts = [
  '생각보다 심각한 인간이군요.',
  '정상적인 반응을 찾는 중... 실패.',
  '이런 유형도 살아남을 수 있나?',
  '당신의 정신 상태를 이해하는 데 실패했습니다.',
  'MBTI보다 다른 검사가 시급해 보입니다.'
];

// 게임 상태 객체 (선택 기록 및 파생 플래그를 일관되게 관리)
let gameState = {
  currentIndex: 0,
  choices: [], // 길이 0~12, 각 장면에서 고른 선택지 ('A' | 'B' | 'C' | 'D')
  flags: {},   // 이전 선택에 의해 누적된 스토리 플래그
  memories: [], // 각 장면의 병맛 행동 회상록
  soundEnabled: false
};

// Web Audio API 기반 경량 효과음 합성기 (기본 OFF, 사용자 토글 시 작동)
let audioCtx = null;
function playSfx(type) {
  if (!gameState.soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'select') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'next') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.11);
      osc.start(now);
      osc.stop(now + 0.11);
    } else if (type === 'ending') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(261.6, now);
      osc.frequency.setValueAtTime(329.6, now + 0.1);
      osc.frequency.setValueAtTime(392.0, now + 0.2);
      osc.frequency.setValueAtTime(523.2, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch {
    // 오디오 미지원 환경 무시
  }
}

// 선택 배열(0 ~ targetIdx-1)로부터 플래그와 회상 기록을 모순 없이 재계산
function recomputeDerivedState(upToLength) {
  const validChoices = gameState.choices.slice(0, upToLength);
  gameState.choices = validChoices;
  gameState.flags = {};
  gameState.memories = [];

  validChoices.forEach((choiceKey, idx) => {
    const scene = SCENARIO_SCENES[idx];
    if (!scene || !scene.choices[choiceKey]) return;
    const rx = scene.choices[choiceKey].reaction;
    if (rx && rx.flagKey) {
      gameState.flags[rx.flagKey] = rx.flagValue;
    }
    if (rx && rx.memoryText) {
      gameState.memories.push({
        sceneCode: scene.sceneCode,
        title: scene.title,
        text: rx.memoryText
      });
    }
  });
}

// MBTI 점수 및 유형 계산기 (섹션 6 표 기준)
function calculateMbtiFromChoices(choicesArray) {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  choicesArray.forEach((choiceKey, idx) => {
    const scene = SCENARIO_SCENES[idx];
    if (scene && scene.choices[choiceKey]) {
      const trait = scene.choices[choiceKey].mbti;
      if (counts[trait] !== undefined) {
        counts[trait] += 1;
      }
    }
  });

  const mbti =
    (counts.E >= counts.I ? 'E' : 'I') +
    (counts.S >= counts.N ? 'S' : 'N') +
    (counts.T >= counts.F ? 'T' : 'F') +
    (counts.J >= counts.P ? 'J' : 'P');

  return { mbti, counts };
}

// 로컬 스토리지 저장 및 복원
function saveProgress() {
  try {
    const payload = {
      currentIndex: gameState.currentIndex,
      choices: gameState.choices,
      completed: gameState.choices.length === SCENARIO_SCENES.length
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // 시크릿 모드 등 예외 무시
  }
}

function clearSavedProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 무시
  }
}

function checkSavedProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.choices) && parsed.choices.length > 0) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

// DOM 요소 참조
const appContainer = document.querySelector('.app-container');
const soundToggleBtn = document.getElementById('sound-toggle-btn');

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const resumeBtn = document.getElementById('resume-btn');
const prevBtn = document.getElementById('prev-btn');
const resetMidBtn = document.getElementById('reset-mid-btn');
const progressText = document.getElementById('progress-text');
const progressBarFill = document.getElementById('progress-bar-fill');

const sceneActEl = document.getElementById('scene-act');
const sceneTitleEl = document.getElementById('scene-title');
const sceneMainImgEl = document.getElementById('scene-main-img');
const sceneSpeakerEl = document.getElementById('scene-speaker');
const sceneDialogueEl = document.getElementById('scene-dialogue');
const sceneNarrationEl = document.getElementById('scene-narration');

const reactionPanel = document.getElementById('reaction-panel');
const reactionChoiceBadge = document.getElementById('reaction-choice-badge');
const reactionFlagBadge = document.getElementById('reaction-flag-badge');
const reactionChosenAction = document.getElementById('reaction-chosen-action');
const reactionSpeaker = document.getElementById('reaction-speaker');
const reactionLine = document.getElementById('reaction-line');
const reactionDesc = document.getElementById('reaction-desc');
const nextSceneBtn = document.getElementById('next-scene-btn');

const choicesWrapper = document.getElementById('choices-wrapper');
const choicesContainer = document.querySelector('.choices-container');

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

const loadingMessage = document.getElementById('loading-message');
const loadingBarFill = document.getElementById('loading-bar-fill');

const saveImgBtn = document.getElementById('save-img-btn');
const shareBtn = document.getElementById('share-btn');
const restartBtn = document.getElementById('restart-btn');
const toastMessage = document.getElementById('toast-message');

// 이미지 폴백 등록 (로딩 실패 시에도 깨진 아이콘 없이 텍스트 선택지 정상 작동)
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

// 화면 전환
function showScreen(targetScreen) {
  [startScreen, questionScreen, loadingScreen, resultScreen].forEach((screen) => {
    screen.classList.remove('active');
  });
  targetScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 새 게임 시작
function startNewGame() {
  playSfx('next');
  clearSavedProgress();
  gameState.currentIndex = 0;
  gameState.choices = [];
  gameState.flags = {};
  gameState.memories = [];
  toastMessage.textContent = '';
  renderCurrentScene();
  showScreen(questionScreen);
}

// 저장된 진행 상태 이어하기
function resumeSavedGame() {
  const saved = checkSavedProgress();
  if (!saved) {
    startNewGame();
    return;
  }
  playSfx('next');
  gameState.choices = saved.choices;
  if (saved.completed && saved.choices.length === SCENARIO_SCENES.length) {
    recomputeDerivedState(SCENARIO_SCENES.length);
    showResult(randomRoasts[0]);
  } else {
    const nextIdx = Math.min(saved.choices.length, SCENARIO_SCENES.length - 1);
    gameState.currentIndex = nextIdx;
    recomputeDerivedState(nextIdx);
    renderCurrentScene();
    showScreen(questionScreen);
  }
}

// 현재 장면 렌더링
function renderCurrentScene() {
  recomputeDerivedState(gameState.currentIndex);

  const scene = SCENARIO_SCENES[gameState.currentIndex];
  const total = SCENARIO_SCENES.length;
  const sNum = String(scene.id).padStart(2, '0');

  progressText.textContent = `SCENE ${sNum} / ${total}`;
  progressBarFill.style.width = `${(scene.id / total) * 100}%`;
  prevBtn.disabled = gameState.currentIndex === 0;

  sceneActEl.textContent = scene.act;
  sceneTitleEl.textContent = `${scene.sceneCode} — ${scene.title}`;
  sceneMainImgEl.src = scene.mainImg;
  sceneMainImgEl.alt = `${scene.sceneCode} ${scene.title} 스틸컷`;

  const dlg = scene.getDialogue(gameState);
  sceneSpeakerEl.textContent = dlg.speaker;
  sceneDialogueEl.textContent = dlg.line;
  sceneNarrationEl.textContent = scene.getNarration(gameState);

  // 중요한 반전 장면(SCENE 02, 05, 09, 10) 진입 시 절제된 흔들림 연출
  if ([2, 5, 9, 10].includes(scene.id)) {
    appContainer.classList.remove('twist-shake');
    void appContainer.offsetWidth;
    appContainer.classList.add('twist-shake');
  }

  // 반응 패널 숨기고 선택지 카드 표시
  reactionPanel.classList.add('hidden');
  choicesWrapper.classList.remove('hidden');

  let maxLen = 0;
  ['A', 'B', 'C', 'D'].forEach((key) => {
    const cData = scene.choices[key];
    choiceBtns[key].classList.remove('selected-pop');
    choiceBtns[key].disabled = false;
    choiceTexts[key].textContent = cData.text;
    choiceImgs[key].src = cData.img;
    choiceImgs[key].alt = `${scene.sceneCode} 선택지 ${key} 이미지`;
    if (cData.text.length > maxLen) {
      maxLen = cData.text.length;
    }
  });

  if (choicesContainer) {
    const isNarrow = window.innerWidth < 380 && maxLen > 52;
    choicesContainer.classList.toggle('single-column', isNarrow);
  }
}

// 선택지 클릭 처리 -> 즉각 반응 컷신 패널 표시 (섹션 3 요구사항)
function handleChoiceClick(choiceKey) {
  playSfx('select');
  const scene = SCENARIO_SCENES[gameState.currentIndex];
  const chosen = scene.choices[choiceKey];
  if (!chosen) return;

  // 선택 기록 및 상태 업데이트
  gameState.choices[gameState.currentIndex] = choiceKey;
  recomputeDerivedState(gameState.currentIndex + 1);
  saveProgress();

  // 선택한 카드 애니메이션 강조
  ['A', 'B', 'C', 'D'].forEach((k) => {
    choiceBtns[k].disabled = true;
  });
  choiceBtns[choiceKey].classList.add('selected-pop');

  setTimeout(() => {
    const rx = chosen.reaction;
    reactionChoiceBadge.textContent = `선택 ${choiceKey}의 후폭풍`;
    reactionFlagBadge.textContent = `📌 ${rx.flagLabel}`;
    reactionChosenAction.textContent = `나의 행동: ${chosen.text}`;
    reactionSpeaker.textContent = rx.speaker;
    reactionLine.textContent = rx.line;
    reactionDesc.textContent = rx.desc;

    const isLastScene = gameState.currentIndex === SCENARIO_SCENES.length - 1;
    nextSceneBtn.textContent = isLastScene
      ? '최종 엔딩 & MBTI 판정 보기 ▶'
      : `다음 장면 (SCENE ${String(scene.id + 1).padStart(2, '0')})으로 이동 ▶`;

    choicesWrapper.classList.add('hidden');
    reactionPanel.classList.remove('hidden');
    reactionPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 240);
}

// 반응 확인 후 다음 장면으로 이동
function handleNextScene() {
  playSfx('next');
  if (gameState.currentIndex < SCENARIO_SCENES.length - 1) {
    gameState.currentIndex += 1;
    renderCurrentScene();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    runAnalysisLoading();
  }
}

// 이전 장면으로 돌아가 선택 변경 (이후 선택 및 플래그 일관되게 재계산)
function handlePrevScene() {
  playSfx('next');
  // 만약 현재 장면에서 반응 패널이 열려 있다면 선택지 화면으로 먼저 복귀
  if (!reactionPanel.classList.contains('hidden')) {
    recomputeDerivedState(gameState.currentIndex);
    saveProgress();
    renderCurrentScene();
    return;
  }
  if (gameState.currentIndex > 0) {
    gameState.currentIndex -= 1;
    recomputeDerivedState(gameState.currentIndex);
    saveProgress();
    renderCurrentScene();
  }
}

// 로딩 화면 연출
function runAnalysisLoading() {
  showScreen(loadingScreen);
  loadingBarFill.style.width = '20%';

  const shuffled = [...randomRoasts].sort(() => Math.random() - 0.5);
  loadingMessage.textContent = `"${shuffled[0]}"`;

  setTimeout(() => {
    loadingBarFill.style.width = '70%';
    loadingMessage.textContent = `"${shuffled[1]}"`;
  }, 700);

  setTimeout(() => {
    loadingBarFill.style.width = '100%';
  }, 1250);

  setTimeout(() => {
    showResult(shuffled[2]);
  }, 1500);
}

// 결과 화면 렌더링 (PART A: 멀티 엔딩 + PART B: MBTI 보고서)
function showResult(finalRoast) {
  playSfx('ending');
  recomputeDerivedState(SCENARIO_SCENES.length);
  saveProgress();

  // 1. PART A: 스토리 멀티 엔딩 판정
  const endingKey = determineStoryEnding(gameState);
  const endingData = STORY_ENDINGS[endingKey];

  document.getElementById('ending-code-badge').textContent = `${endingData.code} · ${endingData.badge}`;
  document.getElementById('ending-title').textContent = endingData.title;
  document.getElementById('ending-img').src = endingData.img;
  document.getElementById('ending-narration').textContent = endingData.narration;
  document.getElementById('ending-final-quote').textContent = endingData.finalQuote;
  document.getElementById('ending-protagonist-line').textContent = endingData.protagonistLine;

  // 플레이 중 가장 인상적이었던 병맛 행동 회상 (SCENE 01, 05, 09, 12 중 대표 추출)
  const highlightIdx = gameState.memories.length > 8 ? 8 : 0;
  const highlightItem = gameState.memories[highlightIdx] || {
    sceneCode: 'SCENE 01',
    text: '총구 앞에서도 당황하지 않고 자기 성격대로 행동함'
  };
  document.getElementById('highlight-memory-text').textContent =
    `[${highlightItem.sceneCode}] ${highlightItem.text}`;

  // 2. PART B: MBTI 계산 및 렌더링
  const { mbti, counts } = calculateMbtiFromChoices(gameState.choices);
  const data = MBTI_RESULTS[mbti];

  document.getElementById('result-random-roast').textContent = `"${finalRoast}"`;
  document.getElementById('result-emoji').textContent = data.emoji;
  document.getElementById('result-type').textContent = mbti;
  document.getElementById('result-subtitle').textContent = data.subtitle;
  document.getElementById('result-quote').textContent = data.quote;
  document.getElementById('result-description').textContent = data.description;
  document.getElementById('result-strength').textContent = data.strength;
  document.getElementById('result-weakness').textContent = data.weakness;
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

  // 팩폭 3연타
  const factsContainer = document.getElementById('result-facts');
  factsContainer.innerHTML = '';
  data.facts.forEach((fact) => {
    const li = document.createElement('li');
    li.textContent = fact;
    factsContainer.appendChild(li);
  });

  // 병맛 생존 능력 지표
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

  // 유명인 & 캐릭터
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

  // 4대 지표 비율 바
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
        <span class="${leftPercent >= rightPercent ? 'winner' : ''}">${pair.leftName} ${leftPercent}% (${leftScore}/3)</span>
        <span class="${rightPercent > leftPercent ? 'winner' : ''}">(${rightScore}/3) ${rightPercent}% ${pair.rightName}</span>
      </div>
      <div class="score-track">
        <div class="score-fill-left" style="width: ${leftPercent}%"></div>
        <div class="score-fill-right" style="width: ${rightPercent}%"></div>
      </div>
    `;
    container.appendChild(row);
  });
}

// Canvas API를 이용한 결과 카드 이미지(PNG) 생성 및 다운로드
function downloadResultCardImage() {
  const mbti = document.getElementById('result-type').textContent;
  const data = MBTI_RESULTS[mbti];
  const endingKey = determineStoryEnding(gameState);
  const endingData = STORY_ENDINGS[endingKey];

  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 960;
  const ctx = canvas.getContext('2d');

  // 배경 (검정 테두리 + 빨간 메인 카드)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 720, 960);

  ctx.fillStyle = '#dc2626';
  ctx.fillRect(24, 24, 672, 912);
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, 672, 912);

  // 상단 타이틀 배지
  ctx.fillStyle = '#000000';
  ctx.fillRect(60, 56, 600, 54);
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 22px Pretendard, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎬 총구 앞 MBTI — 지구 대표로 끌려갔습니다', 360, 91);

  // 엔딩 정보
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Pretendard, sans-serif';
  ctx.fillText(`[${endingData.code}] ${endingData.title}`, 360, 155);

  // MBTI 유형 대형 텍스트
  ctx.fillStyle = '#fde047';
  ctx.font = '900 92px Pretendard, sans-serif';
  ctx.fillText(`${data.emoji} ${mbti}`, 360, 275);

  // 별명
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px Pretendard, sans-serif';
  ctx.fillText(data.subtitle, 360, 330);

  // 대표 대사 박스
  ctx.fillStyle = '#09090b';
  ctx.fillRect(60, 365, 600, 110);
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 365, 600, 110);

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 18px Pretendard, sans-serif';
  ctx.fillText('💬 총구 앞 대표 대사', 360, 398);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Pretendard, sans-serif';
  wrapCanvasText(ctx, data.quote, 360, 434, 540, 28);

  // 팩폭 박스
  ctx.fillStyle = '#fffbeb';
  ctx.fillRect(60, 500, 600, 240);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 500, 600, 240);

  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 22px Pretendard, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('💣 뼈 때리는 팩폭 3연타', 88, 540);

  ctx.fillStyle = '#111827';
  ctx.font = 'bold 18px Pretendard, sans-serif';
  let factY = 580;
  data.facts.forEach((f, idx) => {
    factY = wrapCanvasTextLeft(ctx, `${idx + 1}. ${f}`, 88, factY, 544, 26) + 12;
  });

  // 하단 한 줄 결론
  ctx.fillStyle = '#000000';
  ctx.fillRect(60, 765, 600, 105);
  ctx.fillStyle = '#fde047';
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Pretendard, sans-serif';
  ctx.fillText('📌 한 줄 최종 결론', 360, 798);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Pretendard, sans-serif';
  wrapCanvasText(ctx, data.oneliner, 360, 832, 540, 26);

  ctx.fillStyle = '#fecaca';
  ctx.font = 'bold 16px Pretendard, sans-serif';
  ctx.fillText('https://mbti-test-neon.vercel.app', 360, 910);

  const link = document.createElement('a');
  link.download = `총구앞MBTI_${mbti}_${endingData.code.replace(/\s+/g, '')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  toastMessage.textContent = '🖼️ 결과 카드 이미지가 기기에 저장되었습니다!';
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY;
}

function wrapCanvasTextLeft(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY;
}

// 결과 링크 및 보고서 공유 (Web Share API + 클립보드 폴백)
async function shareResultReport() {
  const mbti = document.getElementById('result-type').textContent;
  const data = MBTI_RESULTS[mbti];
  const endingKey = determineStoryEnding(gameState);
  const endingData = STORY_ENDINGS[endingKey];
  const shareUrl = window.location.href;

  const textToCopy = [
    `🎬 [총구 앞 MBTI — 지구 대표로 끌려갔습니다]`,
    `◼ 나의 스토리 결말: ${endingData.code} (${endingData.title})`,
    `◼ 나의 MBTI: ${mbti} — ${data.subtitle}`,
    `💬 대표 대사: ${data.quote}`,
    `📌 한 줄 결론: ${data.oneliner}`,
    `👉 너도 이 상황에서 이럴 거냐고 플레이해보기: ${shareUrl}`
  ].join('\n');

  if (navigator.share) {
    try {
      await navigator.share({
        title: `총구 앞 MBTI — ${mbti} (${data.subtitle})`,
        text: textToCopy,
        url: shareUrl
      });
      toastMessage.textContent = '✅ 공유 창이 열렸습니다!';
      return;
    } catch {
      // 사용자가 공유 창을 닫은 경우 클립보드 복사로 진행
    }
  }

  try {
    await navigator.clipboard.writeText(textToCopy);
    toastMessage.textContent = '✅ 결과 보고서와 링크가 복사되었습니다! 카톡 단톡방에 붙여넣어 보세요!';
  } catch {
    toastMessage.textContent = `나의 결과: ${mbti} (${data.subtitle})`;
  }
}

// 사운드 토글
soundToggleBtn.addEventListener('click', () => {
  gameState.soundEnabled = !gameState.soundEnabled;
  soundToggleBtn.setAttribute('aria-pressed', String(gameState.soundEnabled));
  soundToggleBtn.textContent = gameState.soundEnabled ? '🔊 효과음 ON' : '🔇 효과음 OFF';
  if (gameState.soundEnabled) {
    playSfx('select');
  }
});

// 이벤트 리스너 연결
startBtn.addEventListener('click', startNewGame);
resumeBtn.addEventListener('click', resumeSavedGame);
prevBtn.addEventListener('click', handlePrevScene);
resetMidBtn.addEventListener('click', () => {
  clearSavedProgress();
  resumeBtn.classList.add('hidden');
  showScreen(startScreen);
});

['A', 'B', 'C', 'D'].forEach((key) => {
  choiceBtns[key].addEventListener('click', () => handleChoiceClick(key));
});

nextSceneBtn.addEventListener('click', handleNextScene);
saveImgBtn.addEventListener('click', downloadResultCardImage);
shareBtn.addEventListener('click', shareResultReport);
restartBtn.addEventListener('click', () => {
  clearSavedProgress();
  resumeBtn.classList.add('hidden');
  showScreen(startScreen);
});

// 초기 로드 시 저장된 진행 상태가 있으면 '이어서 플레이하기' 버튼 활성화
window.addEventListener('DOMContentLoaded', () => {
  const saved = checkSavedProgress();
  if (saved) {
    resumeBtn.classList.remove('hidden');
    resumeBtn.textContent = saved.completed
      ? '이전 최종 결과 다시 보기'
      : `이어서 플레이하기 (SCENE ${String(saved.choices.length + 1).padStart(2, '0')}부터)`;
  }
});
