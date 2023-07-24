import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
     displayName: {
     name: "interview-task",
     color: "greenBright",
   },
   verbose: true,
   setupFiles: ["dotenv/config"],
   testMatch: ["**/**/*.spec.ts"],
   testEnvironment: "node",
   detectOpenHandles: true,
   collectCoverage: false,
   transform: { "^.+\\.tsx?$": "ts-jest" },
   forceExit: true
 };
};