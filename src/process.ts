import React from 'react';
import Tesseract from 'tesseract.js';

export const recognize = (
  img: File,
  setter: React.Dispatch<number>,
  processSetter: React.Dispatch<number>
) => {
  Tesseract.recognize(img, 'eng', {
    logger: m => {
      if (m.status === 'recognizing text') {
        processSetter(m.progress * 100);
      }
    },
  }).then(({ data: { text } }) => {
    const parsedText = parseRecognizeText(text);
    setter(calculate(parsedText));
  });
};

const parseRecognizeText = (text: string) => {
  /** 개행문자 기준으로 split, 빈 라인 제거 */
  const splitNewLine = text.split('\n').filter(x => !!x);
  /** 공백 기준으로 split */
  const splitEmptySpace = Array.from(splitNewLine, x => x.split(' '));
  /** 구분선 제거 */
  return Array.from(splitEmptySpace, x => x.filter(el => el !== '|'));
};

/** '원점수/평균점수(표준편차)' 통 문자열을 파싱하는 함수 */
const parseScoreInfo = (score: string) => {
  const [original, average, standardDeviation] = (
    score.match(/(\d*\.?\d*)/g) || []
  ).filter(x => !!x);
  return {
    original: Number(original),
    average: Number(average),
    standardDeviation: Number(standardDeviation),
  };
};

/** pass 과목을 필터링하는 함수 */
const filterPassSubject = (parsedArr: string[][]) => {
  const floatRegex = /(\d*\.?\d+)/g;
  return parsedArr.filter(arr => !arr.includes('P') && floatRegex.test(arr[1]));
};

/** a 이상 b 이하인지를 확인하는 함수 */
const isBetween = (a: number, b: number, target: number) => {
  return a <= target && target <= b;
};

/** 표준화 점수를 석차 등급으로 환산하는 함수 */
const getOrderGradeWithStandardDeviationScore = (score: number) => {
  const fixedScore = Number(score.toFixed(2));
  if (isBetween(1.76, 3.0, fixedScore)) return 1;
  if (isBetween(1.23, 1.75, fixedScore)) return 2;
  if (isBetween(0.74, 1.22, fixedScore)) return 3;
  if (isBetween(0.26, 0.73, fixedScore)) return 4;
  if (isBetween(-0.25, 0.25, fixedScore)) return 5;
  if (isBetween(-0.73, -0.26, fixedScore)) return 6;
  if (isBetween(-1.22, -0.74, fixedScore)) return 7;
  if (isBetween(-1.75, -1.23, fixedScore)) return 8;
  if (isBetween(-3.0, -1.76, fixedScore)) return 9;
  return 9;
};

/** 석차등급이 없는 과목의 석차등급을 구하여 할당해주는 함수 */
const convertToOrderGrade = (subjectScore: string[]) => {
  const { original, average, standardDeviation } = parseScoreInfo(
    subjectScore[1]
  );
  const numberGrade = (original - average) / standardDeviation;

  const newOrderGradeSubjectScore = subjectScore as [
    string,
    string,
    string,
    number
  ];
  newOrderGradeSubjectScore[3] =
    getOrderGradeWithStandardDeviationScore(numberGrade);
  return subjectScore;
};

const calculate = (arr: string[][]) => {
  /** P 과목 제외  */
  const filteredPassSubjectScore = filterPassSubject(arr);

  /** 석차등급이 없는 경우의 로직  */
  const hasNotOrderGrade = ([, , , numberGrade]: string[]) => !numberGrade;

  filteredPassSubjectScore.forEach((subjectScore, index) => {
    /** 석차 등급이 없는 경우 (성취평가제 교과인 경우, ex. A, B, C) */
    if (hasNotOrderGrade(subjectScore)) {
      /** 해당 과목의 석차등급을 구하여 할당해준다. (표준화 점수 사용하여 환산) */
      filteredPassSubjectScore[index] = convertToOrderGrade(subjectScore);
    }
  });

  return calculateWithOrderGrade(filteredPassSubjectScore);
};

/** 석차등급과 교과별 이수단위수를 사용하여 평균 등급 확인 */
const calculateWithOrderGrade = (parsedArr: string[][]) => {
  if (parsedArr.length === 0) return 0;
  let allTimesMultiplyNumberGrades = 0;
  let allTimes = 0;

  parsedArr.forEach(x => {
    const [times, , , numberGrade] = Array.from(x, e => Number(e));
    allTimesMultiplyNumberGrades += times * numberGrade;
    allTimes += times;
  });

  return allTimesMultiplyNumberGrades / allTimes;
};
