const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: { 
    baseUrl: 'http://192.168.0.16:8080/',
    env: {
      apiUrl: 'http://localhost:3333',
    },
    viewportWidth: 1920,
    viewportHeight:1080,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
