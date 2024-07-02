import { defineConfig } from "cypress";
import { VERSION } from "cypress/types/lodash";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {

    },
  },
});
