import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
    viewportWidth: 1000,
    viewportHeight: 660
  },
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile:false
  },
});
