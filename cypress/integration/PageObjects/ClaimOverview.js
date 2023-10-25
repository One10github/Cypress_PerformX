class ClaimOverview {
  getStartAClaim() {
    return cy.contains("Start A Claim");
  }
  getClaimForm() {
    return cy.contains("MostBasicForm1");
  }
  getClaimSubmittingForMe() {
    return cy.get("#radioMe");
  }
  getClaimSubmittingForSomeOneElse() {
    return cy.get("#radioSomeoneElse");
  }
  getParticipantNameInputbox() {
    return cy.get("input[name='participantName_input']");
  }
  getNextButton() {
    return cy.contains("Next");
  }
  getInvoiceNumberInputbox() {
    return cy.get("#InvoiceNumber");
  }
  getContinueButton() {
    return cy.contains("Continue");
  }
  getPageBody() {
    return cy.get("#pageMain");
  }
  getCalenderBoard() {
    return cy.get("span[aria-controls='invoiceDate_dateview']");
  }
  getCurrentMonth() {
    return cy.get(".k-nav-fast.k-button.k-flat.k-flex");
  }
  getCurrentYear() {
    return cy.get(".k-nav-fast.k-button.k-flat.k-flex");
  }
  getInvoiceYear(invoiceyear) {
    return cy.xpath("//a[normalize-space()='" + invoiceyear + "']");
  }
  getInvoiceMonth(invoicemonth) {
    return cy.xpath("//a[normalize-space()='" + invoicemonth + "']");
  }
  getInvoiceDate(invoicedate) {
    return cy.contains(".k-calendar-td", invoicedate);
  }
  getProductInputbox() {
    return cy.get("input[placeholder='Product'][name='productSkuBox_input']");
  }
  selectProduct(product) {
    return cy.contains(product);
  }
  getLineItemObject() {
    return cy.xpath("//h6[normalize-space()='Line Items']");
  }
  getAddThisProductButton() {
    return cy.get(
      ":nth-child(3) > .grid-x > :nth-child(9) > #undefined > .mdc-button__ripple"
    );
  }
  getQauntityInputbox() {
    return cy.get(".k-formatted-value");
  }
  getSerialNumberInputbox() {
    return cy.get("#ProductUniqueId");
  }
  getSaveButton() {
    return cy.get(".acceptedButton > .mdc-button__ripple");
  }
  getQuantityDialogBox() {
    cy.get(
      "div[class='mdc-dialog mdc-dialog--small mdc-dialog--autoHeight mdc-dialog--open'] div[role='alertdialog']"
    );
  }
  getProductAddedPopup() {
    return cy.contains("The product line item has been saved.");
  }

  getSelectAllCheckbox() {
    return cy.get("input[aria-label='Select all rows']");
  }
  getItemCheckbox() {
    return cy.get("input[aria-label='Select row']");
  }
  getSubmitClaimButton() {
    return cy.xpath("//span[normalize-space()='Submit Claims']");
  }
  getClaimSubmittedPopup() {
    return cy.contains("The selected claims have been submitted.");
  }
  getRecallAllText() {
    return cy.get("#recallAllWithButtonDisplayText");
  }
  getTableCell(Text) {
    return cy.xpath("//td[contains(text(),'" + Text + "')]");
  }
  getCompletedTab() {
    return cy.get("#pageMain_3_0-panel2-label > .mdc-tab__ripple");
  }
  getTodoTab() {
    return cy.get("#pageMain_3_0-panel0-label > .mdc-tab__ripple");
  }
  getInvoiceNumberSearchboxCompletedTab() {
    return cy.get("#searchField");
  }
  getInvoiceNumberSearchboxTodoTab() {
    return cy.get("#searchField");
  }
  getVisibleEyeIcon() {
    return cy.xpath("(//span[text()='visibility'])[1]");
  }
  getRejectedCell() {
    return cy.get(
      "a[title='This claim could not be approved.<br/> View the claim to see the comments.']"
    );
  }
  getReturnCell() {
    return cy.get("#return__tooltip");
  }
  getFirstEditIcon() {
    return cy.xpath("(//span[text()=' edit '])[1]");
  }
}
export default ClaimOverview;
