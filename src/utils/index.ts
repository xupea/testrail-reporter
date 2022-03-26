import { AddResultForCase } from "@dlenroc/testrail";
import { TestResult } from "@jest/reporters";

const regularExp = /[C][?\d]{1,6}/gm;

const statusMapping = {
  passed: 1,
  failed: 5,
  skipped: 999,
  pending: 888,
  todo: 777,
  disabled: 666,
};

export function parseTitle(title: string) {
  const matchedIds = title.match(regularExp);
  return matchedIds.map((matchedId) => matchedId.match(/\d+/gm)[0]);
}

export function formatTime(ms?: number | null) {
  if (!ms) {
    return undefined;
  }

  const milsecond = 1000;
  const second = 60;
  const minute = 60;
  if (ms >= minute * second * milsecond) {
    const h = Math.floor(ms / (minute * second * milsecond));
    const m = Math.floor(ms / (second * milsecond)) - h * minute;
    const s = Math.round(ms / milsecond) - m * second;
    return `${h}h ${m}m ${s}s`;
  }
  if (ms >= second * milsecond) {
    const m = Math.floor(ms / (second * milsecond));
    const s = Math.round(ms / milsecond) - m * second;
    return `${m}m ${s}s`;
  }
  let s = Math.round(ms / milsecond);
  s = !!s ? s : 1;
  return `${s}s`;
}

export function assembleTestrailCases(testResult: TestResult) {
  const { testResults } = testResult;

  const parsedResults: AddResultForCase[] = [];
  testResults.forEach((result) => {
    const ids = parseTitle(result.title);
    ids.forEach((id) => {
      parsedResults.push({
        status_id: statusMapping[result.status],
        comment: "comment from api",
        elapsed: formatTime(result.duration),
        case_id: +id,
      });
    });
  });
  return parsedResults;
}
