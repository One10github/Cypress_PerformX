///<reference types="Cypress" />;

const { recurse } = require("cypress-recurse");

describe("Dummy", function () {
  it("Demo1", function () {
    // cy.visit("https://prototype.performx.qa.one10marketing.com/QA/");
    // cy.get("#txtUsername").type("admin");
    // cy.get("#txtPassword").type("1$haredAccount");
    // cy.contains("SIGN IN").click();
    // cy.get("#sideNavBtn > span").should("be.visible");
    // //cy.wait(10000);
    // //cy.scrollTo("bottom");
    // // cy.scrollToBottomUntilElementFound(
    // //   '#toplinks_recognitionv1_recognitionv1 > a[href*="Manager"]',
    // // );
    // // .get('#toplinks_recognitionv1_recognitionv1 > a[href*="Manager"]')
    // // .scrollIntoView()
    // // .should("be.visible");

    // //

    // //
    // recurse(
    //   () =>
    //     cy
    //       .get('#toplinks_recognitionv1_recognitionv1 > a[href*="Manager"]')
    //       .should(() => {}),
    //   ($obj) => $obj.length > 0,
    //   {
    //     limit: 20,
    //     timeout: 180000,
    //     //delay: 10000,
    //     post() {
    //       cy.scrollTo("bottom");
    //     },
    //   }
    // ).scrollIntoView();

    //cy.GetElement("a[href$='/QA/recognition/ManagerRecognition']");
    // cy.get('#toplinks_recognitionv1_recognitionv1 > a[href*="Manager"]')
    //   .should("be.visible")
    //   .click({ timeout: 600000 });
    // cy.get("#filled-basic-firstame").type("Shubham");
    // cy.exec("cd C:/Users/USXM526.GBLMKTG.000", {
    //   log: true,
    //   timeout: 300000,
    // }).then((result) => {
    //   cy.log(result.stdout);
    // });
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
});
