class HomePage {
  getLeftNavigationMenuButton() {
    return cy.get("#sideNavBtn > span");
  }
  getAdmin() {
    return cy.xpath("//span[normalize-space()='Admin']");
  }
  getClaimOverview() {
    return cy.contains("Claims Overview");
  }
}
export default HomePage;
