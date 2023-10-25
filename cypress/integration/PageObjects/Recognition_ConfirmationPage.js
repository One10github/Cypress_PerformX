class ConfirmationPage {
  getSendEmailCheckbox() {
    return cy.get("#ctl00_pageContent_rblPrintWithoutEmail_0");
  }
  getPrintNowCheckbox() {
    return cy.get("#ctl00_pageContent_rblPrintWithoutEmail_1");
  }
  getSubmitButton() {
    return cy.get("#ctl00_pageContent_btnSubmit");
  }
  getConfirmationPopupTitle() {
    return cy.get(".modal-title");
  }
  getConfirmationPopupText() {
    return cy.get(".text");
  }
  getConfirmationPopupCloseButton() {
    return cy.get("#ctl00_pageContent_btnCloseUpdate1");
  }
  getPrintCertificateButton() {
    return cy.get("#ctl00_pageContent_lnkPrint");
  }
}
export default ConfirmationPage;
