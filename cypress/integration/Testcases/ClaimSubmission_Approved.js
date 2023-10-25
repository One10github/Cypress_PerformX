//@Author - Shubham Motwani
///<reference types="Cypress" />;
import HomePage from "../PageObjects/HomePage";
import ClaimOverview from "../PageObjects/ClaimOverview";
import Admin from "../PageObjects/Admin";
import AuditClaim from "../PageObjects/AuditClaim";
import generateString from "../utils/utility";

const homepage = new HomePage();
const claimOverview = new ClaimOverview();
const admin = new Admin();
const auditClaim = new AuditClaim();
let claimIDs = []; //Initializing an empty array to store the Claim IDs
let ctext; //Initialized a variabele to store the claim ID generated in Runtime
let InvoiceNumbers = [];

describe("Test Suite - Claim Submission & Audit", function () {
  beforeEach(() => {
    cy.visit(Cypress.env("Salesdemo1"));
    cy.login();
  });

  it.only("01 - Claim Submission", function () {
    cy.fixture("ClaimSubmission").then((jsonData) => {
      jsonData.forEach((item, index) => {
        let InvoiceNumber = "Invoice" + generateString();
        InvoiceNumbers.push(InvoiceNumber);
        //homepage.getLeftNavigationMenuButton().click();
        homepage.getClaimOverview().click();
        claimOverview.getStartAClaim().click();
        claimOverview.getClaimForm().click();
        cy.isDisabled(claimOverview.getNextButton());
        //cy.screenshot();

        if (`${item.ClaimSubmittingFor}` == "Me") {
          claimOverview.getClaimSubmittingForMe().click();
        } else if (`${item.ClaimSubmittingFor}` == "Someone else") {
          claimOverview.getClaimSubmittingForSomeOneElse().click();
          claimOverview
            .getParticipantNameInputbox()
            .type(`${item.Participantusername}`);
          cy.contains(`${item.Participantusername}`).click();
        }

        claimOverview.getNextButton().click();
        cy.isDisabled(claimOverview.getContinueButton());
        //cy.screenshot();
        claimOverview.getInvoiceNumberInputbox().type(InvoiceNumber);
        //cy.screenshot();
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
            //Need to add a valid Serial number and not random number
          } else {
            cy.fail("No inputfield for Qunatity/Serial number is present");
          }
        });

        claimOverview.getSaveButton().click();
        cy.shouldExist(claimOverview.getProductAddedPopup());
        //cy.screenshot();

        cy.get("td:nth-child(2)")
          .invoke("html")
          .then((text) => {
            ctext = text;
            claimIDs.push(ctext);
          });

        cy.log(claimIDs);
        cy.log(InvoiceNumbers);

        cy.isVisible(claimOverview.getItemCheckbox());

        claimOverview.getSelectAllCheckbox().click();

        claimOverview.getCalenderBoard().click(); //Clicking on Calender Board

        claimOverview.getCurrentMonth().click({ force: true }); //Clicking on Current Month
        claimOverview.getCurrentYear().click({ force: true }); //gettting current year

        //Dynamically fetching the data from Json for Year
        claimOverview.getInvoiceYear(`${item.invoiceyear}`).click();
        //Dynamically fetching the data from Json for Month
        claimOverview.getInvoiceMonth(`${item.invoicemonth}`).click();

        //Dynamically fetching the data from Json for date
        claimOverview.getInvoiceDate(`${item.invoicedate}`).click();
        //cy.screenshot();

        claimOverview.getSubmitClaimButton().click({
          force: true,
        });
        cy.shouldExist(claimOverview.getClaimSubmittedPopup());

        cy.isNotVisible(claimOverview.getItemCheckbox());
        cy.isDisabled(claimOverview.getSubmitClaimButton());
        cy.isVisible(claimOverview.getRecallAllText());
        cy.shouldExist(claimOverview.getTableCell("Pending"));
        cy.shouldExist(claimOverview.getTableCell(`${item.Quantity}`));
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
    //cy.wait(45000);
    cy.exec(
      "\\\\nuse2bchapp01\\42detq$\\AccProd\\SalesDemo\\Scripts\\ClaimValidation\\ClaimValidation.bat QA ClaimsSystemValidation",
      {
        log: true,
        timeout: 300000,
      }
    ).then((result) => {
      cy.log(result.stdout);
    });
  });
  //const claimIDs = ["299560 ", "299563"];
  //const claimIDs = ["5807", "5809"]; //Need to delete this - Only for Testing purpose.

  it.only("02 - Claim Audit - Approve", function () {
    cy.fixture("ClaimAudit_Approved").then((AuditData) => {
      claimIDs.forEach((claimID, index) => {
        //homepage.getLeftNavigationMenuButton().click();
        homepage.getAdmin().click();
        admin.getAuditClaim().click();
        auditClaim.getSearchByClaimIDRadioButton().click();
        cy.isDisabled(auditClaim.getSearchClaims());
        auditClaim.getClaimIDInputbox().type(claimID);
        auditClaim.getSelectionCriteriaHeading().click(); //Clicking on the Heading to Enable "Search claims" button

        cy.isEnabled(auditClaim.getSearchClaims());
        auditClaim.getSearchClaims().click();
        auditClaim.getClaimRowCheckbox().should("have.length", 1);
        //cy.wait(10000);
        cy.isDisabled(auditClaim.getUpdateSelectedButton());
        cy.isDisabled(auditClaim.getMoveSelectedButton());
        cy.shouldExist(auditClaim.getItemCheckbox());
        auditClaim.getSelectAllRows().click();
        cy.isEnabled(auditClaim.getUpdateSelectedButton());
        cy.isEnabled(auditClaim.getMoveSelectedButton());
        auditClaim.getUpdateSelectedButton().click();
        auditClaim.getClaimStatusDropdown().click(); //Claim Status Dropdown

        //cy.wait(3000);
        //cy.contains("Approved").click(); //Status
        auditClaim.getApprovedClaimStatus().click(); //Clicking on "Approved" as Status
        //cy.wait(3000);
        auditClaim.getStatusReasonDropdown().click();
        auditClaim.getStatusReason(AuditData[index].StatusReason).click();
        //cy.contains("Looks All Good.").click();
        auditClaim.getCommentInputbox().type(AuditData[index].Comment);
        auditClaim
          .getInternalCommentInputbox()
          .type(AuditData[index].InternalComment);
        cy.isEnabled(auditClaim.getApplyToSelectedButton());

        auditClaim.getApplyToSelectedButton().click();
        auditClaim.getUpdateSelectedButton().should("not.be.enabled"); //Added this because test is failing as loader is involved in between these actions
        //cy.isDisabled(auditClaim.getUpdateSelectedButton());

        cy.isDisabled(auditClaim.getMoveSelectedButton());

        cy.shouldExist(auditClaim.getTableCell(AuditData[index].ClaimStatus));
        //auditClaim.getTableCell("Approved").should("exist");
        cy.shouldExist(auditClaim.getTableCell(AuditData[index].StatusReason));
        //auditClaim.getTableCell("Looks All Good.").should("exist");
        cy.shouldExist(auditClaim.getTableCell(AuditData[index].Comment));
        //auditClaim.getTableCell("Test Comment").should("exist");
        cy.shouldExist(
          auditClaim.getTableCell(AuditData[index].InternalComment)
        );
        cy.contains(InvoiceNumbers[index]).should("exist");
        //claimOverview.getTableCell(InvoiceNumbers[index]).should("exist");
        //auditClaim.getTableCell("Test Internal Comment").should("exist");
        auditClaim.getClaimIDInputbox().type("{selectall}{backspace}");

        //cy.visit("https://prototype.performx.qa.one10marketing.com/QA/");
      }); //end of for each loop
      cy.log("Suite completed");
      cy.wait(120000);
    });
  });

  // let Invoice = ["Invoicep7l"];
  // let Claim = ["299596"];
  // let InvoiceNumbers = ["Invoicel4b", "Invoicea2r"];
  // let claimIDs = ["5811", "5814"];

  it("03 - Validation of Claim Audit", function () {
    cy.fixture("ClaimAudit_Approved").then((AuditData) => {
      InvoiceNumbers.forEach((Item, index) => {
        homepage.getClaimOverview().click();
        claimOverview.getCompletedTab().click({ force: true });
        //cy.wait(10000);

        claimOverview.getVisibleEyeIcon().should("be.visible");
        claimOverview.getInvoiceNumberSearchboxCompletedTab().type(Item);
        // cy.wait(5000);
        claimOverview.getInvoiceNumberSearchboxCompletedTab().type("{enter}");
        cy.wait(5000);
        claimOverview.getTableCell(claimIDs[index].trim()).should("exist");
        claimOverview
          .getTableCell(AuditData[index].ClaimStatus)
          .should("exist");
        claimOverview.getTableCell(AuditData[index].Comment).should("exist");
        claimOverview.getTableCell("Completed").should("exist");

        claimOverview
          .getInvoiceNumberSearchboxCompletedTab()
          .type("{selectall}{backspace}");
      });
    });
  });
});
