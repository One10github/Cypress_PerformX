class LoginPage {
  getUsernameInputbox() {
    return cy.get("#txtUsername");
  }
  getPasswordInputbox() {
    return cy.get("#txtPassword");
  }
  getSignInButton() {
    return cy.contains("SIGN IN");
  }
}
export default LoginPage;
