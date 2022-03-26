import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    trace: "on-first-retry",
  },
  reporter: [['line'], ["../../src/reporters/playwright-reporter/index.ts"]],
};
export default config;
