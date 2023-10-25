class AwardAmount {
  getBudgetDropdown() {
    return cy.get("#ctl00_pageContent_ddlBudgets");
  }
  getAmountInputbox() {
    return cy.get("#ctl00_pageContent_gvRecipientList_ctl02_txtAwardAmount");
  }
  getDescriptionInputbox() {
    return cy.get("#ctl00_pageContent_gvRecipientList_ctl02_txtDescription", {
      timeout: 2000,
    });
  }
  getContinueButton() {
    return cy.get("#ctl00_pageContent_btnContinue");
  }
}
export default AwardAmount;
