//@Author - Shubham Motwani
///<reference types="Cypress" />;
import LoginPage from "../PageObjects/LoginPage";
import HomePage from "../PageObjects/HomePage";
import ClaimOverview from "../PageObjects/ClaimOverview";
import Admin from "../PageObjects/Admin";
import AuditClaim from "../PageObjects/AuditClaim";
import generateString from "../utils/utility";

const homepage = new HomePage();
const loginpage = new LoginPage();
const claimOverview = new ClaimOverview();
const admin = new Admin();
const auditClaim = new AuditClaim();
let claimIDs = [];
let InvoiceNumbers = [];

describe("Test Suite - Claim Submission & Audit", function () {
  beforeEach(() => {
    cy.visit(Cypress.env("Salesdemo1"));
    cy.login();
  });
  let ctext;

  it("01 - Claim Submission", function () {
    cy.fixture("ClaimSubmission").then((jsonData) => {
      cy.log(jsonData[0].ClaimSubmittingFor);
      //cy.pause();
      jsonData.forEach((item, index) => {
        let InvoiceNumber = "Invoice" + generateString();
        InvoiceNumbers.push(InvoiceNumber);
        homepage.getClaimOverview().click();

        claimOverview.getStartAClaim().click();
        claimOverview.getClaimForm().screenshot().click();
        cy.isDisabled(claimOverview.getNextButton());

        if (`${item.ClaimSubmittingFor}` == "Me") {
          claimOverview.getClaimSubmittingForMe().click();
        } else if (`${item.ClaimSubmittingFor}` == "Someone else") {
          claimOverview.getClaimSubmittingForSomeOneElse().click();
          claimOverview
            .getParticipantNameInputbox()
            .type(`${item.Participantusername}`);
          cy.contains(`${item.Participantusername}`).click();
        }

        claimOverview.getNextButton().screenshot().click();
        cy.isDisabled(claimOverview.getContinueButton());
        claimOverview.getInvoiceNumberInputbox().type(InvoiceNumber);
        cy.screenshot();
        claimOverview.getPageBody().click();
        cy.isEnabled(claimOverview.getContinueButton());
        claimOverview.getContinueButton().click();
        claimOverview.getProductInputbox().type(`${item.products}`);
        claimOverview.selectProduct(`${item.products}`).click({ force: true });

        claimOverview.getLineItemObject().click(); //Clicking on Line items to enable "Add this Product" button
        claimOverview.getAddThisProductButton().click();

        cy.get(
          "div[class='mdc-dialog mdc-dialog--small mdc-dialog--autoHeight mdc-dialog--open'] div[role='alertdialog']"
        ).then(($element) => {
          if ($element.find(".k-formatted-value").is(":visible")) {
            claimOverview.getQauntityInputbox().type(`${item.Quantity}`);
          } else if ($element.find("#ProductUniqueId").is(":visible")) {
            //claimOverview.getSerialNumberInputbox().type("Serial Number");
            //Need to add a valid Serial number and not random number
          } else {
            cy.fail("No inputfield for Qunatity/Serial number is present");
          }
        });

        claimOverview.getSaveButton().screenshot().click();
        cy.shouldExist(claimOverview.getProductAddedPopup());
        //claimOverview.getProductAddedPopup().should("exist");
        cy.get("td:nth-child(2)")
          .invoke("html")
          .then((text) => {
            ctext = text;
            claimIDs.push(ctext);
          });
        //cy.screenshot(); //Need to Convert it to POM
        cy.log(claimIDs);
        cy.log(InvoiceNumbers);
        //claimIDs.push(copiedtext);
        cy.isVisible(claimOverview.getItemCheckbox());
        //claimOverview.getItemCheckbox().should("be.visible");
        claimOverview.getSelectAllCheckbox().screenshot().click();

        claimOverview.getCalenderBoard().click(); //Clicking on Calender Board

        claimOverview.getCurrentMonth().click({ force: true }); //Clicking on Current Month
        claimOverview.getCurrentYear().click({ force: true }); //gettting current year

        //Dynamically fetching the data from Json for Year
        claimOverview.getInvoiceYear(`${item.invoiceyear}`).click();
        //Dynamically fetching the data from Json for Month
        claimOverview.getInvoiceMonth(`${item.invoicemonth}`).click();

        //Dynamically fetching the data from Json for date
        claimOverview.getInvoiceDate(`${item.invoicedate}`).click();
        cy.screenshot();

        claimOverview.getSubmitClaimButton().click({
          force: true,
        });
        cy.shouldExist(claimOverview.getClaimSubmittedPopup());
        cy.screenshot();
        //claimOverview.getClaimSubmittedPopup().should("exist"); //Validating claim submission popup
        cy.isNotVisible(claimOverview.getItemCheckbox());
        //claimOverview.getItemCheckbox().should("not.be.visible"); // Validatimg that the checkbox for item should not be visible
        cy.isDisabled(claimOverview.getSubmitClaimButton());
        cy.isVisible(claimOverview.getRecallAllText());
        //claimOverview.getRecallAllText().should("be.visible"); //Validating the Recall text (These inputs are locked because...) is visible on UI
        cy.shouldExist(claimOverview.getTableCell("Pending"));
        //claimOverview.getTableCell("Pending").should("exist"); //Validatig status as pending
        cy.shouldExist(claimOverview.getTableCell(`${item.Quantity}`));
        //claimOverview.getTableCell(`${item.Quantity}`).should("exist"); //Validating the Quantity
        cy.shouldExist(claimOverview.getTableCell(`${item.products}`));

        if (index === jsonData.length - 1) {
          cy.log("Claim Submissions Completed");
        } else {
          cy.visit(Cypress.env("Salesdemo1"));
        }
      }); //End of Json Loop
      //cy.wait(45000);
    }); //End of fixture loop
    cy.log(claimIDs); // Priting the claim IDs in the cypress logs
    console.log(claimIDs); //Priting the Claim IDs in console
    cy.wait(45000);
  });
  //const records = ["299020"];
  //299231 299233
  //const claimIDs = ["299453"];
  it("02 - Claim Audit - Return", function () {
    cy.fixture("ClaimAudit_Returned").then((Auditdata) => {
      claimIDs.forEach((claimID, index) => {
        homepage.getAdmin().click();
        admin.getAuditClaim().click();
        auditClaim.getSearchByClaimIDRadioButton().click();
        // auditClaim
        //   .getClaimIDInputbox()
        //   .type(copiedtext)
        //   .should("have.value", copiedtext); - Need to Uncomment in real framework
        auditClaim.getClaimIDInputbox().type(claimID);
        auditClaim.getSelectionCriteriaHeading().click(); //Clicking on the Heading to Enable "Search claims" button
        //auditClaim.getClaimID(copiedtext).click();
        auditClaim.getSearchClaims().click();
        auditClaim.getClaimRowCheckbox().should("have.length", 1);
        cy.isDisabled(auditClaim.getUpdateSelectedButton());
        cy.isDisabled(auditClaim.getMoveSelectedButton());
        cy.shouldExist(auditClaim.getItemCheckbox());
        auditClaim.getSelectAllRows().click();
        auditClaim.getUpdateSelectedButton().click();
        auditClaim.getClaimStatusDropdown().click(); //Claim Status Dropdown

        auditClaim.getReturnedClaimStatus().click(); //Clicking on "Returned" as Status

        auditClaim.getStatusReasonDropdown().click();
        auditClaim.getStatusReason(Auditdata[index].StatusReason).click();

        auditClaim.getCommentInputbox().type(Auditdata[index].Comment);
        auditClaim
          .getInternalCommentInputbox()
          .type(Auditdata[index].InternalComment);
        auditClaim.getApplyToSelectedButton().click();
        auditClaim.getTableCell(Auditdata[index].ClaimStatus).should("exist");
        auditClaim.getTableCell(Auditdata[index].StatusReason).should("exist");
        auditClaim.getTableCell(Auditdata[index].Comment).should("exist");
        auditClaim
          .getTableCell(Auditdata[index].InternalComment)
          .should("exist");
        //claimOverview.getTableCell(InvoiceNumbers[index]).should("exist");
        cy.contains(InvoiceNumbers[index]).should("exist");
        auditClaim.getClaimIDInputbox().type("{selectall}{backspace}");
        // cy.contains("th", "Status Reason")
        //   .siblings()
        //   .contains("td", "Looks All Good.")
        //   .should("exist");

        //cy.visit("https://prototype.performx.qa.one10marketing.com/QA/");
      }); //end of for each loop
      cy.log("Suite completed");
    });
  });
  // InvoiceNumbers = ["Invoiceh4y"];
  // claimIDs = ["299604"];
  it("03 - Validation of Claim Audit", function () {
    cy.fixture("ClaimAudit_Returned").then((AuditData) => {
      InvoiceNumbers.forEach((Item, index) => {
        homepage.getClaimOverview().click();
        claimOverview.getTodoTab().click();
        claimOverview.getFirstEditIcon().should("be.visible");
        claimOverview.getInvoiceNumberSearchboxTodoTab().type(Item);
        claimOverview.getInvoiceNumberSearchboxTodoTab().type("{enter}");
        cy.wait(5000);
        claimOverview.getTableCell(claimIDs[index].trim()).should("exist");
        claimOverview.getTableCell(AuditData[index].Comment).should("exist");
        claimOverview.getReturnCell().should("exist");
        claimOverview
          .getInvoiceNumberSearchboxCompletedTab()
          .type("{selectall}{backspace}");
      });
    });
  });
});
