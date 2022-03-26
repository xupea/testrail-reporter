import { AddResultForCase } from "@dlenroc/testrail";
import {
  AggregatedResult,
  Context,
  Reporter,
  ReporterOnStartOptions,
  Test,
  TestResult,
} from "@jest/reporters";

import { assembleTestrailCases } from "../../utils";

class JestReporter implements Reporter {
  private results: AddResultForCase[] = [];

  /**
   * a test suite has been executed
   */
  onTestResult = (
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult
  ) => {
    const testrailCases = assembleTestrailCases(testResult);
    this.results.push(...testrailCases);
  };
  /**
   * running the tests
   */
  onRunStart = (
    results: AggregatedResult,
    options: ReporterOnStartOptions
  ) => {};
  /**
   * all the test suites have been executed
   */
  onRunComplete = (contexts: Set<Context>, results: AggregatedResult) => {};

  getLastError = () => {};
}

export default JestReporter;
