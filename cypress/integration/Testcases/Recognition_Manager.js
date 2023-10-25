///<reference types="Cypress" />;
import LoginPage from "../PageObjects/LoginPage";
import RecipientSeletion from "../PageObjects/Recognition_RecipientSelection";
import AwardAmount from "../PageObjects/Recognition_AwardAmount";
import RecognitionSteps from "../PageObjects/Recognition_RecognitionSteps";
import ConfirmationPage from "../PageObjects/Recognition_ConfirmationPage";
import { recurse } from "cypress-recurse";

// const loginpage = new LoginPage();
const recipientSeletion = new RecipientSeletion();
const awardAmount = new AwardAmount();
const recognitionSteps = new RecognitionSteps();
const confirmationPage = new ConfirmationPage();

describe("Manager Recognition Suite", function () {
  //Testcase starts from Here
  it.only("01 - Manager Recognition", function () {
    cy.visit(Cypress.env("QA"));
    cy.loginWithoutSidenavClick();
    cy.pause();
    cy.fixture("Recognition").then((JsonData) => {
      JsonData.forEach((item, index) => {
        if (
          item.hasOwnProperty("FirstName") &&
          item.hasOwnProperty("LastName")
        ) {
          recipientSeletion.getFirstNameInputbox().type(item.FirstName);
          recipientSeletion.getLastNameInputbox().type("samundre");
        } else if (item.hasOwnProperty("FirstName")) {
          recipientSeletion.getFirstNameInputbox().type(item.FirstName);
        } else if (item.hasOwnProperty("LastName")) {
          recipientSeletion.getLastNameInputbox().type("samundre");
        } else if (item.hasOwnProperty("EmployeeID")) {
          recipientSeletion.getEmployeeIdInputbox().type("Employeee ID");
        } else if (item.hasOwnProperty("EmailAddress")) {
          recipientSeletion
            .getEmployeeIdInputbox()
            .type("gina.drewek@One10Marketing.com");
        }
        //cy.pause();
        recipientSeletion.getSearchButton().click();
        recipientSeletion.getAddButton().click();
        recipientSeletion.getCancelButton().should("be.visible"); //Validating if Cancel button is present or not

        recipientSeletion.getContinueButton().click();

        awardAmount.getBudgetDropdown().should("be.visible");
        awardAmount.getBudgetDropdown().select("LL Test");

        awardAmount.getAmountInputbox().type(item.awardAmount);
        awardAmount.getDescriptionInputbox().click();
        cy.wait(2000);

        awardAmount
          .getDescriptionInputbox()
          .should("be.enabled")
          .type(item.description);

        awardAmount
          .getDescriptionInputbox()
          .should("have.value", item.description);

        awardAmount.getContinueButton().click();
        //cy.pause();
        recognitionSteps
          .getBriefDescriptionInputbox()
          .type(item.fullDescription);
        recognitionSteps.getHardWorkCheckbox().click();
        recognitionSteps.getNiceJobCheckbox().should("be.visible").click();
        recognitionSteps
          .getAwardreasonInputbox()
          .type(item.detailedDescription);
        awardAmount.getContinueButton().click();
        confirmationPage.getPrintNowCheckbox().click();
        confirmationPage.getSubmitButton().click();
        confirmationPage
          .getConfirmationPopupTitle()
          .should("contain.text", "Message");
        confirmationPage
          .getConfirmationPopupText()
          .should("contain.text", "Thank you");
        confirmationPage
          .getConfirmationPopupText()
          .should("contain.text", "Your recognition has been submitted.");

        confirmationPage.getConfirmationPopupCloseButton().should("be.visible");
        confirmationPage.getPrintCertificateButton().should("be.visible");
        if (index === JsonData.length - 1) {
          cy.log("Recognitions Completed");
        } else {
          cy.visit(Cypress.env("RecognitionPage"));
        }
      });
    }); //End of Fixture
  });
  it("Manager Recognition - Using Select List", function () {
    // cy.visit(
    //   "https://prototype.performx.qa.one10marketing.com/QA/pages/Recognition/RecognitionRecipientSelection.aspx?PromotionId=Pnt_Rec1"
    // );
    // cy.get("#txtUsername").type("admin");
    // cy.get("#txtPassword").type("1$haredAccount");
    // cy.contains("SIGN IN").click();
    cy.get("#liSelectList").click();
    cy.contains("Kunal25").parent().next().click();
    cy.get("#ctl00_pageContent_btnContinue").click();
    cy.wait(3000);
    //cy.get("#ctl00_pageContent_gvRecipientList_ctl02_txtDescription").click();
    cy.get("#ctl00_pageContent_ddlBudgets").select("LL Test");
    cy.get("#ctl00_pageContent_gvRecipientList_ctl02_txtDescription")
      .type(item.description)
      .should("have.value", this.data.description);
    cy.wait(6000);
    cy.get("#ctl00_pageContent_gvRecipientList_ctl02_txtAwardAmount").type(
      this.data.awardAmount
    );

    cy.get("#ctl00_pageContent_btnContinue").click();

    cy.get("#ctl00_pageContent_txtRecogntionDescription")
      .type(this.data.fullDescription)
      .should("have.value", this.data.fullDescription);
    cy.get("#ctl00_pageContent_txtBeginDate")
      .type(this.data.beginDate)
      .should("have.value", this.data.beginDate);
    cy.get("#ctl00_pageContent_txtEndDate")
      .type(this.data.endDate)
      .should("have.value", this.data.endDate);
    cy.get("#ctl00_pageContent_rblCriteria_0").click();
    cy.wait(3000);
    cy.get("#ctl00_pageContent_rblSubCriteria_0").click();
    cy.get("#ctl00_pageContent_txtVerbatim")
      .type(this.data.detailedDescription)
      .should("have.value", this.data.detailedDescription);
    cy.get("#ctl00_pageContent_btnContinue").click();
    cy.get("#ctl00_pageContent_rblPrintWithoutEmail_0").click();
    cy.get("#ctl00_pageContent_btnSubmit").click();
    cy.get(".modal-title").should("contain.text", "Message");
    cy.get(".text").should("contain.text", "Thank you");
    cy.get("#ctl00_pageContent_btnCloseUpdate1").should("be.visible");

    //liSelectList
    //
  });
});
