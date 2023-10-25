class RecipientSeletion {
  getFirstNameInputbox() {
    return cy.get("#ctl00_pageContent_TxtFirstName");
  }
  getLastNameInputbox() {
    return cy.get("#ctl00_pageContent_TxtLastName");
  }
  getEmployeeIdInputbox() {
    return cy.get("#ctl00_pageContent_TxtEmployeeID");
  }
  getSearchButton() {
    return cy.get("#ctl00_pageContent_btnSearch");
  }
  getAddButton() {
    return cy.get(
      "#ctl00_pageContent_rptRecipientSearchResultsGrid_ctl00_lbtnAdd > i"
    );
  }
  getCancelButton() {
    return cy.xpath("//i[@class='material-icons md-36']");
  }
  getContinueButton() {
    return cy.get("#ctl00_pageContent_btnContinue");
  }
}
export default RecipientSeletion;
