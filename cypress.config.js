const { defineConfig } = require("cypress");
//Added code to get current timestamp in Indian Standard Time
function getCurrentISTTimestamp() {
  const now = new Date();

  const timestamp = now

    .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) // Convert to IST timezone

    .replace(/[/\\:*?"<>|]/g, "-"); // Remove characters not allowed in folder names

  return timestamp;
}
//End of timestamp code
module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  video: false,

  reporterOptions: {
    charts: true,
    //reportFilename: "Report011a.html",

    reportPageTitle: "PerformX Core Test Report",

    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
    reportDir: "cypress/report/" + getCurrentISTTimestamp(),
    //reportDir: "cypress/report",
  },
  // env: {
  //   RecognitionPage:
  //     "https://prototype.performx.qa.one10marketing.com/QA/pages/Recognition/RecognitionRecipientSelection.aspx?PromotionId=Pnt_Rec1",
  // },
  env: {
    Salesdemo1: "https://salesdemo1.one10marketing.com/UAT/",
    // RecognitionPage:
    //   "https://prototype.performx.qa.one10marketing.com/QA/pages/Recognition/RecognitionRecipientSelection.aspx?PromotionId=Pnt_Rec1",
    RecognitionPage:
      "https://qa-performx-prototype-ui-v2.azurewebsites.net/recognition/RecognitionRecipientSelection/?PromotionId=Pnt_Rec1",
  },
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 60000,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
    },
    specPattern: "cypress/integration/Testcases/*.js",
  },
});
