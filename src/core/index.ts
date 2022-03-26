import Testrail from "@dlenroc/testrail";

interface TestRunIds {
  id: number;
  suiteId: number;
  planId?: number;
}

interface TestIds {
  caseId: number;
  runId: number;
  testId: number;
}
const api = new Testrail({
  host: "https://xxooxx.testrail.io",
  username: "guest@qq.com",
  password: "gogogo521",
});

// 获取里程碑下的测试计划
async function main() {
  const runIds: TestRunIds[] = [];
  const testIds: TestIds[] = [];

  const projectId = 1;
  const milestoneId = 3;

  const plans = await api.getPlans(projectId, {
    is_completed: false,
    milestone_id: milestoneId,
  });

  // entries 就是 test runs
  const plansWithEntries = await Promise.all(
    plans.map((plan) => api.getPlan(plan.id))
  );

  // 遍历出所有 test run
  plansWithEntries.forEach((plan) => {
    plan.entries.forEach((entry) => {
      entry.runs.forEach((run) => {
        runIds.push({
          id: run.id,
          suiteId: run.suite_id,
          planId: run.plan_id,
        });
      });
    });
  });

  const runs = await api.getRuns(projectId, {
    is_completed: false,
    milestone_id: milestoneId,
  });

  runs.forEach((run) => {
    runIds.push({
      id: run.id,
      suiteId: run.suite_id,
    });
  });

  const testsArray = await Promise.all(
    runIds.map((run) => api.getTests(run.id))
  );

  testsArray.forEach((tests) => {
    tests.forEach((test) => {
      testIds.push({
        testId: test.id,
        caseId: test.case_id,
        runId: test.run_id,
      });
    });
  });

  const jestResults: Record<string, any> = {
    "10": {
      status: false,
    },
  };

  const r = testIds.filter((testId) => !!jestResults[`${testId.caseId}`]);

  console.log(r);
}

async function demo() {
  await api.addResult(3571, {
    status_id: 1,
    comment: "from api",
  });
}

main();
// demo();
