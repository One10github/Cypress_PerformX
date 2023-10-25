///<reference types="Cypress" />;
class AuditClaim {
  getSearchByClaimIDRadioButton() {
    return cy.get("#pageMain_0_1_0_0_2-1");
  }
  getClaimIDInputbox() {
    return cy.get("input[placeholder='Claim ID']");
  }
  getClaimID(ClaimID) {
    return cy.contains(ClaimID);
  }
  getSearchClaims() {
    return cy.contains("SEARCH CLAIMS");
  }
  getSelectionCriteriaHeading() {
    return cy.get("h6[class='mdc-typography--headline6']");
  }
  getItemCheckbox() {
    return cy.get("input[aria-label='Select row']");
  }
  getSelectAllRows() {
    return cy.get("input[aria-label='Select all rows']");
  }
  getItemCheckbox() {
    return cy.get("input[aria-label='Select row']");
  }
  getUpdateSelectedButton() {
    return cy.get("#gridUpdateBtn");
  }
  getMoveSelectedButton() {
    return cy.get("#gridMoveBtn");
  }
  getClaimStatusDropdown() {
    return cy.get("span[aria-owns='updateCritClaimStatus_listbox']");
  }
  getApprovedClaimStatus() {
    return cy.xpath("/html/body/div[23]/div/div[2]/ul/li[1]");
  }
  getStatusReasonDropdown() {
    return cy.get(
      "div[class='k-floating-label-container k-state-empty'] span[class='k-dropdown-wrap k-state-default'] span[role='option']"
    );
  }
  getStatusReason(Reason) {
    return cy.contains(Reason);
  }
  getCommentInputbox() {
    return cy.get("#updateFormModal_0_2_0-inputid");
  }
  getInternalCommentInputbox() {
    return cy.get("#updateFormModal_0_3_0-inputid");
  }
  getApplyToSelectedButton() {
    return cy.contains("APPLY TO SELECTED");
  }
  getTableCell(Text) {
    return cy.xpath("//td[text()='" + Text + "']");
  }
  getRejectedClaimStatus() {
    return cy.xpath('//ul[@id="updateCritClaimStatus_listbox"]/li[2]');
  }
  getReturnedClaimStatus() {
    return cy.xpath('//ul[@id="updateCritClaimStatus_listbox"]/li[3]');
  }
  getRecallAllText() {
    return cy.get("#recallAllWithButtonDisplayText");
  }
  getClaimRowCheckbox() {
    return cy.xpath("//input[@aria-label='Select row']");
  }
}
export default AuditClaim;
