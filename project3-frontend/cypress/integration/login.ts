/* eslint-disable jest/valid-expect */
/* eslint-disable cypress/no-unnecessary-waiting */

describe("Test log in", () => {
  // eslint-disable-next-line jest/expect-expect
  it("Test that", () => {
    cy.visit("/");
    cy.get("[data-testid=alias-field]").type("username");
    cy.get("[data-testid=loginbutton").click();
    cy.wait(3000);
    cy.url().should("include", "/groups");
  });
});
