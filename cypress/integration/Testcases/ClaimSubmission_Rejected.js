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
let ctext;
//const randomNumber = Math.floor(1000 + Math.random() * 9000);
describe("Test Suite - Claim Submission & Audit", function () {
  beforeEach(() => {
    cy.visit(Cypress.env("Salesdemo1"));
    cy.login();
  });

  it("01 - Claim Submission", function () {
    cy.fixture("ClaimSubmission").then((jsonData) => {
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
        //cy.screenshot();

        claimOverview.getSubmitClaimButton().click({
          force: true,
        });
        cy.shouldExist(claimOverview.getClaimSubmittedPopup());
        //cy.screenshot();
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
  const records = ["299423"]; //const records = ["299020"];
  //299231 299233
  //const claimIDs = ["299476"]; //Need to delete this - Only for Testing purpose.
  it("02 - Claim Audit - Reject", function () {
    cy.fixture("ClaimAudit_Rejected").then((Auditdata) => {
      // this.data = data;
      //cy.log(claimIDs);
      //console.log("Hello");
      //homepage.getLeftNavigationMenuButton().click();
      claimIDs.forEach((claimID, index) => {
        homepage.getAdmin().click();
        admin.getAuditClaim().click();
        auditClaim.getSearchByClaimIDRadioButton().click();
        // auditClaim
        //   .getClaimIDInputbox()
        //   .type(copiedtext)
        //   .should("have.value", copiedtext); - Need to Uncomment in real framework
        cy.isDisabled(auditClaim.getSearchClaims());
        auditClaim.getClaimIDInputbox().type(claimID);
        auditClaim.getSelectionCriteriaHeading().click(); //Clicking on the Heading to Enable "Search claims" button
        //auditClaim.getClaimID(copiedtext).click();
        cy.isEnabled(auditClaim.getSearchClaims());
        auditClaim.getSearchClaims().click();
        auditClaim.getClaimRowCheckbox().should("have.length", 1);
        cy.isDisabled(auditClaim.getUpdateSelectedButton());
        cy.isDisabled(auditClaim.getMoveSelectedButton());
        cy.shouldExist(auditClaim.getItemCheckbox());
        //auditClaim.getItemCheckbox().should("be.visible");
        auditClaim.getSelectAllRows().click();
        cy.isEnabled(auditClaim.getUpdateSelectedButton());
        cy.isEnabled(auditClaim.getMoveSelectedButton());
        auditClaim.getUpdateSelectedButton().click();
        cy.isDisabled(auditClaim.getApplyToSelectedButton());
        auditClaim.getClaimStatusDropdown().click(); //Claim Status Dropdown
        auditClaim.getRejectedClaimStatus().click(); //Clicking on "Approved" as Status
        auditClaim.getStatusReasonDropdown().click();
        auditClaim.getStatusReason(Auditdata[index].StatusReason).click();
        //cy.contains("Looks All Good.").click();
        auditClaim.getCommentInputbox().type(Auditdata[index].Comment);
        auditClaim
          .getInternalCommentInputbox()
          .type(Auditdata[index].InternalComment);
        cy.isEnabled(auditClaim.getApplyToSelectedButton());

        auditClaim.getApplyToSelectedButton().click();
        auditClaim.getUpdateSelectedButton().should("not.be.enabled"); //Added this because test is failing as loader is involved in between these actions
        //cy.isDisabled(auditClaim.getUpdateSelectedButton());

        cy.isDisabled(auditClaim.getMoveSelectedButton());
        //cy.isNotVisible(auditClaim.getItemCheckbox());
        auditClaim.getItemCheckbox().should("not.be.visible");
        cy.shouldExist(auditClaim.getTableCell(Auditdata[index].ClaimStatus));
        //auditClaim.getTableCell("Approved").should("exist");
        cy.shouldExist(auditClaim.getTableCell(Auditdata[index].StatusReason));
        //auditClaim.getTableCell("Looks All Good.").should("exist");
        cy.shouldExist(auditClaim.getTableCell(Auditdata[index].Comment));
        //auditClaim.getTableCell("Test Comment").should("exist");
        cy.shouldExist(
          auditClaim.getTableCell(Auditdata[index].InternalComment)
        );
        cy.contains(InvoiceNumbers[index]).should("exist");
        //auditClaim.getTableCell("Test Internal Comment").should("exist");
        auditClaim.getClaimIDInputbox().type("{selectall}{backspace}");
        // cy.contains("th", "Status Reason")
        //   .siblings()
        //   .contains("td", "Looks All Good.")
        //   .should("exist");

        //cy.visit("https://prototype.performx.qa.one10marketing.com/QA/");
      }); //end of for each loop
    });
    cy.log("Suite completed");
    //cy.wait(120000);
  });

  // let Invoice = ["Invoicev2l", "Invoiceu5o"];
  // let Claim = ["299583", "299586"];
  it("03 - Validation of Claim Audit", function () {
    cy.fixture("ClaimAudit_Rejected").then((AuditData) => {
      InvoiceNumbers.forEach((Item, index) => {
        homepage.getClaimOverview().click();
        claimOverview.getCompletedTab().click({ force: true });

        claimOverview.getVisibleEyeIcon().should("be.visible");
        claimOverview.getInvoiceNumberSearchboxCompletedTab().type(Item);
        claimOverview.getInvoiceNumberSearchboxCompletedTab().type("{enter}");
        cy.wait(5000);
        claimOverview.getTableCell(claimIDs[index].trim()).should("exist");
        // claimOverview
        //   .getTableCell(AuditData[index].ClaimStatus)
        //   .should("exist");
        claimOverview.getTableCell(AuditData[index].Comment).should("exist");
        //claimOverview.getTableCell("Rejected").should("exist");
        claimOverview.getRejectedCell().should("exist");
        claimOverview
          .getInvoiceNumberSearchboxCompletedTab()
          .type("{selectall}{backspace}");
      });
    });
  });
});
