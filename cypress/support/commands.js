// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Added Code @Author - Shubham
// cypress/support/commands.js
const { recurse } = require("cypress-recurse");
Cypress.Commands.add("login", () => {
  cy.get("#txtUsername").type("SalesDemo1Admin");
  cy.get("#txtPassword").type("Wintertime2023!!");
  cy.contains("SIGN IN").click();
  cy.get("#sideNavBtn > span").click();
});
Cypress.Commands.add("loginWithoutSidenavClick", () => {
  cy.get("#txtUsername").type("SalesDemo1Admin");
  cy.get("#txtPassword").type("Wintertime2023!!");
  cy.contains("SIGN IN").click();
});

//Custom command to validate if element is Disabled
Cypress.Commands.add("isDisabled", (elementLoctor) => {
  elementLoctor.should("not.be.enabled");
});

//Custom command to validate if element is Enabled
Cypress.Commands.add("isEnabled", (elementLoctor) => {
  elementLoctor.should("be.enabled");
});

Cypress.Commands.add("isVisible", (elementLoctor) => {
  elementLoctor.should("be.visible");
});

Cypress.Commands.add("isNotVisible", (elementLoctor) => {
  elementLoctor.should("not.be.visible");
});

Cypress.Commands.add("shouldExist", (elementLoctor) => {
  elementLoctor.should("exist");
});

Cypress.Commands.add("setDatePickerDate", (selector, date) => {
  cy.get(selector).then(($datePicker) => {
    // Use custom date picker function to set the date
    $datePicker.datepicker("setDate", date);
  });
});

Cypress.Commands.add("GetElement", (ElementLocator) => {
  recurse(
    () => ElementLocator.should(() => {}),
    ($obj) => $obj.length > 0,
    {
      limit: 20,
      timeout: 180000,
      delay: 10000,
      post() {
        cy.scrollTo("bottom");
      },
    }
  ).scrollIntoView();
});
// Usage

//cy.scrollToBottomUntilElementFound(".your-element-selector");
