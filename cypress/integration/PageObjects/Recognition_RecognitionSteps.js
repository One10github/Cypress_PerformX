class RecognitionSteps {
  getBriefDescriptionInputbox() {
    return cy.get("#ctl00_pageContent_txtRecogntionDescription");
  }
  getHardWorkCheckbox() {
    return cy.get("#ctl00_pageContent_rblCriteria_0");
  }
  getNiceJobCheckbox() {
    return cy.get("#ctl00_pageContent_rblSubCriteria_0");
  }
  getAwardreasonInputbox() {
    return cy.get("#ctl00_pageContent_txtVerbatim");
  }
}
export default RecognitionSteps;
