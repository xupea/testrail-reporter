import {
  Reporter,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";

class PlaywrightReporter implements Reporter {
  onTestEnd?(test: TestCase, result: TestResult) {
    console.log(result);
  }
  onEnd?(result: FullResult) {
    console.log(result);
  }
}
export default PlaywrightReporter;
