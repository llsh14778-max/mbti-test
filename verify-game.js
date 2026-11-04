const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { SCENARIO_SCENES, STORY_ENDINGS, MBTI_RESULTS, determineStoryEnding } = require('./scenario-data.js');

// 1. 12개 장면 및 섹션 6의 MBTI 매핑 테이블 검증
const expectedMapping = [
  ['E', 'I', 'E', 'I'], // Scene 01
  ['N', 'S', 'S', 'N'], // Scene 02
  ['F', 'T', 'T', 'F'], // Scene 03
  ['P', 'J', 'P', 'J'], // Scene 04
  ['I', 'E', 'I', 'E'], // Scene 05
  ['S', 'N', 'S', 'N'], // Scene 06
  ['T', 'F', 'T', 'F'], // Scene 07
  ['J', 'P', 'J', 'P'], // Scene 08
  ['E', 'I', 'I', 'E'], // Scene 09
  ['N', 'S', 'N', 'S'], // Scene 10
  ['F', 'T', 'F', 'T'], // Scene 11
  ['P', 'J', 'J', 'P']  // Scene 12
];

assert.strictEqual(SCENARIO_SCENES.length, 12, '장면 수는 정확히 12개여야 합니다.');

SCENARIO_SCENES.forEach((scene, idx) => {
  const actual = ['A', 'B', 'C', 'D'].map((k) => scene.choices[k].mbti);
  assert.deepStrictEqual(actual, expectedMapping[idx], `Scene ${scene.id} MBTI 매핑 불일치`);

  // 메인 이미지 파일 존재 확인
  const mainImgPath = path.join(__dirname, scene.mainImg);
  assert.ok(fs.existsSync(mainImgPath), `메인 이미지 누락: ${scene.mainImg}`);

  // 4개 선택지 이미지 및 반응 대사 확인
  ['A', 'B', 'C', 'D'].forEach((k) => {
    const ch = scene.choices[k];
    const chImgPath = path.join(__dirname, ch.img);
    assert.ok(fs.existsSync(chImgPath), `선택지 이미지 누락: ${ch.img}`);
    assert.ok(ch.reaction && ch.reaction.line && ch.reaction.flagKey, `Scene ${scene.id}-${k} 반응 데이터 누락`);
  });
});

// 2. 16가지 모든 MBTI 유형 도출 가능 여부 자동 검증
const all16Types = Object.keys(MBTI_RESULTS);
assert.strictEqual(all16Types.length, 16, '16가지 MBTI 결과 데이터가 모두 존재해야 합니다.');

const reachedMbti = new Set();
const reachedEndings = new Set();

all16Types.forEach((targetMbti) => {
  const targetTraits = new Set(targetMbti.split(''));
  const pickedChoices = SCENARIO_SCENES.map((scene) => {
    const matchKey = ['A', 'B', 'C', 'D'].find((k) => targetTraits.has(scene.choices[k].mbti));
    assert.ok(matchKey, `Scene ${scene.id}에서 ${targetMbti}를 위한 선택지를 찾을 수 없습니다.`);
    return matchKey;
  });

  // 계산 검증
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  pickedChoices.forEach((k, idx) => {
    counts[SCENARIO_SCENES[idx].choices[k].mbti] += 1;
  });

  const computed =
    (counts.E >= counts.I ? 'E' : 'I') +
    (counts.S >= counts.N ? 'S' : 'N') +
    (counts.T >= counts.F ? 'T' : 'F') +
    (counts.J >= counts.P ? 'J' : 'P');

  assert.strictEqual(computed, targetMbti, `${targetMbti} 도출 실패 (계산값: ${computed})`);
  reachedMbti.add(computed);
});

assert.strictEqual(reachedMbti.size, 16, '16개 MBTI 유형이 모두 도출되어야 합니다.');

// 3. 3가지 멀티 엔딩 도출 가능 및 이미지 존재 검증
Object.values(STORY_ENDINGS).forEach((ending) => {
  assert.ok(fs.existsSync(path.join(__dirname, ending.img)), `엔딩 이미지 누락: ${ending.img}`);
});

const sampleFlagSets = [
  // ENDING A 유도 플래그
  {
    firstContact: 'observer',
    recruitResponse: 'ask_criteria',
    boardingStyle: 'planned',
    interviewPitch: 'grand_purpose',
    pptStrategy: 'structured_outline',
    exResponse: 'public_hearing',
    membershipDeal: 'reject_cost',
    finalPitch: 'summary_roadmap'
  },
  // ENDING B 유도 플래그
  {
    firstContact: 'networker',
    recruitResponse: 'check_salary',
    boardingStyle: 'spontaneous',
    interviewPitch: 'raw_observation',
    pptStrategy: 'funny_hook',
    exResponse: 'silent_review',
    membershipDeal: 'amend_clause',
    finalPitch: 'chicken_gambit'
  },
  // ENDING C 유도 플래그
  {
    firstContact: 'counselor',
    recruitResponse: 'demand_apology',
    boardingStyle: 'spontaneous',
    interviewPitch: 'factual_card',
    pptStrategy: 'live_improv',
    exResponse: 'direct_talk',
    membershipDeal: 'citizen_consent',
    finalPitch: 'adaptive_persuasion'
  }
];

sampleFlagSets.forEach((flags) => {
  reachedEndings.add(determineStoryEnding({ flags }));
});

assert.strictEqual(reachedEndings.size, 3, 'ENDING A, B, C 3종이 모두 도출 가능해야 합니다.');

// 4. 이전 선택 플래그에 따른 후속 장면 대사 변화 검증
const stateCounselor = { flags: { firstContact: 'counselor' } };
const stateSilent = { flags: { firstContact: 'observer' } };
assert.notStrictEqual(
  SCENARIO_SCENES[1].getNarration(stateCounselor),
  SCENARIO_SCENES[1].getNarration(stateSilent),
  'SCENE 01의 선택 결과가 SCENE 02 내레이션에 반영되어야 합니다.'
);

console.log('✅ 모든 검증 통과: 12개 시나리오 장면, 48개 선택지 반응, 63개 이미지 에셋, 16종 MBTI 도출, 3종 멀티 엔딩 도출 확인 완료!');
